/** Read raw body from Node IncomingMessage (required for Stripe signature verification). */
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Signups';
  const apiKey = process.env.AIRTABLE_API_KEY;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not set');
    return res.status(500).json({ error: 'Webhook not configured' });
  }
  if (!baseId || !apiKey) {
    console.error('Airtable not configured for webhook');
    return res.status(500).json({ error: 'Airtable not configured' });
  }

  let event;
  try {
    const rawBody = await getRawBody(req);
    const sig = req.headers['stripe-signature'];
    if (!sig) {
      return res.status(400).json({ error: 'Missing stripe-signature' });
    }
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: err.message });
  }

  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true });
  }

  const session = event.data.object;
  const airtableRecordId = session.metadata?.airtable_record_id;
  if (!airtableRecordId) {
    console.error('No airtable_record_id in session metadata:', session.id);
    return res.status(200).json({ received: true });
  }

  try {
    const patchUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}/${encodeURIComponent(airtableRecordId)}`;
    const patchRes = await fetch(patchUrl, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Status: 'paid',
          StripeSessionId: session.id,
        },
      }),
    });

    if (!patchRes.ok) {
      const errText = await patchRes.text();
      console.error('Airtable PATCH error:', patchRes.status, errText);
      return res.status(500).json({ error: 'Failed to update record' });
    }
  } catch (err) {
    console.error('Webhook Airtable update error:', err);
    return res.status(500).json({ error: 'Failed to update record' });
  }

  return res.status(200).json({ received: true });
}
