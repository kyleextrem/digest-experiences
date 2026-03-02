export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, answers } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }

  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;
  const apiKey = process.env.AIRTABLE_API_KEY;

  if (!baseId || !tableName || !apiKey) {
    console.error('Missing Airtable env: AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME, AIRTABLE_API_KEY');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const createUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
    const createRes = await fetch(createUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Name: String(name).trim(),
          Email: String(email).trim(),
          Phone: phone != null ? String(phone).trim() : '',
          Quiz: typeof answers === 'object' ? JSON.stringify(answers) : String(answers ?? ''),
          Event: 'Dinner Club #1',
          Status: 'registered',
        },
      }),
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      console.error('Airtable create error:', createRes.status, errText);
      return res.status(500).json({ error: 'Failed to save submission.' });
    }
  } catch (err) {
    console.error('Airtable submit error:', err);
    return res.status(500).json({ error: 'Failed to save submission.' });
  }

  return res.status(200).json({ success: true });
}
