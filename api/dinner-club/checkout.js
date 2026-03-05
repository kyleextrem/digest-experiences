const MAX_SIGNUPS = 30;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, answers, quiz, event } = req.body || {};
  const quizData = answers !== undefined ? answers : quiz;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }

  const baseId = (process.env.AIRTABLE_BASE_ID || '').trim();
  const tableName = (process.env.AIRTABLE_TABLE_NAME || 'Signups').trim();
  const apiKey = (process.env.AIRTABLE_API_KEY || '').trim();
  const stripeSecretKey = (process.env.STRIPE_SECRET_KEY || '').trim();
  const priceId = (process.env.STRIPE_PRICE_ID || '').trim();
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || '').replace(/\/$/, '').trim();

  if (!baseId || !apiKey) {
    return res.status(500).json({ error: 'Airtable not configured' });
  }
  if (!stripeSecretKey || !priceId) {
    return res.status(500).json({ error: 'Stripe not configured' });
  }
  if (!baseUrl) {
    return res.status(500).json({ error: 'NEXT_PUBLIC_BASE_URL not set' });
  }

  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(stripeSecretKey);

  // Resolve table name to table ID (avoids 403 "model not found" when name doesn't match exactly)
  let tableIdOrName = tableName;
  const metaRes = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });
  if (metaRes.ok) {
    const meta = await metaRes.json();
    const table = meta.tables?.find((t) => t.name && t.name.trim().toLowerCase() === tableName.toLowerCase());
    if (table?.id) tableIdOrName = table.id;
  }

  try {
    // Capacity check: only count paid
    const filterByFormula = encodeURIComponent("{Status} = 'paid'");
    const listUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableIdOrName)}?pageSize=100&filterByFormula=${filterByFormula}`;
    const listRes = await fetch(listUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    if (listRes.ok) {
      const listData = await listRes.json();
      const count = listData.records?.length ?? 0;
      if (count >= MAX_SIGNUPS) {
        return res.status(409).json({ soldOut: true, error: 'This dinner is fully booked.' });
      }
    }

    // Create pending row in Airtable (no StripeSessionId yet) — field names match submit.js
    const quizStr = typeof quizData === 'object' ? JSON.stringify(quizData) : String(quizData ?? '');
    const fields = {
      Name: String(name).trim(),
      Email: String(email).trim(),
      Phone: phone != null ? String(phone).trim() : '',
      'Quiz (JSON)': quizStr,
      Status: 'pending_payment',
    };
    const eventVal = String(event ?? '').trim();
    if (eventVal) fields.Event = eventVal;

    const createUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableIdOrName)}`;
    const createRes = await fetch(createUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      console.error('Airtable create error:', createRes.status, errText);
      let message = errText || 'Failed to save signup.';
      try {
        const errJson = JSON.parse(errText);
        message = errJson.error?.message || errJson.error || message;
      } catch (_) {}
      if (message.length > 280) message = message.slice(0, 277) + '...';
      return res.status(500).json({ error: message });
    }

    const createData = await createRes.json();
    const airtableRecordId = createData.id;
    if (!airtableRecordId) {
      return res.status(500).json({ error: 'Failed to get record id.' });
    }

    // Create Stripe Checkout session; webhook will set Status + StripeSessionId
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/dinner-club/confirmed`,
      cancel_url: `${baseUrl}/dinner-club`,
      metadata: { airtable_record_id: airtableRecordId },
      customer_email: String(email).trim(),
    });

    return res.status(200).json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(500).json({ error: err.message || 'Checkout failed.' });
  }
}
