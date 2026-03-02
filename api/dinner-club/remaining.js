const MAX_SIGNUPS = 28;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const baseId = (process.env.AIRTABLE_BASE_ID || '').trim();
  const tableName = (process.env.AIRTABLE_TABLE_NAME || 'Signups').trim();
  const apiKey = (process.env.AIRTABLE_API_KEY || '').trim();

  if (!baseId || !apiKey) {
    return res.status(200).json({ remaining: MAX_SIGNUPS, soldOut: false });
  }

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
    const filterByFormula = encodeURIComponent("{Status} = 'paid'");
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableIdOrName)}?pageSize=100&filterByFormula=${filterByFormula}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Airtable error:', response.status, await response.text());
      return res.status(200).json({ remaining: MAX_SIGNUPS, soldOut: false });
    }

    const data = await response.json();
    const count = data.records?.length ?? 0;
    const remaining = Math.max(0, MAX_SIGNUPS - count);
    const soldOut = count >= MAX_SIGNUPS;

    return res.status(200).json({ remaining, soldOut, count });
  } catch (err) {
    console.error('remaining API error:', err);
    return res.status(200).json({ remaining: MAX_SIGNUPS, soldOut: false });
  }
}
