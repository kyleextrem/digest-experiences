const BASE_ID = process.env.AIRTABLE_BASE_ID!;
const TABLE = process.env.AIRTABLE_TABLE_NAME ?? 'Signups';
const TOKEN = process.env.AIRTABLE_API_KEY!;
const CAP = 28;

export async function POST(req: Request) {
  const body = await req.json();

  if (!BASE_ID || !TOKEN) {
    return Response.json({ error: 'Server not configured' }, { status: 500 });
  }

  // Check capacity (only count paid)
  const filterByFormula = encodeURIComponent("{Status} = 'paid'");
  const countRes = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}?fields[]=Name&filterByFormula=${filterByFormula}`,
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  const countData = await countRes.json();
  if ((countData.records?.length ?? 0) >= CAP) {
    return Response.json({ error: 'Sold out' }, { status: 409 });
  }

  // Save to Airtable (single record: use "fields" at top level)
  const createRes = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        Name: body.name,
        Email: body.email,
        Phone: body.phone ?? '',
        Quiz: JSON.stringify(body.answers ?? {}),
        Event: body.event ?? 'Dinner Club #1',
      },
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    console.error('Airtable create error:', createRes.status, err);
    return Response.json({ error: 'Failed to save' }, { status: 500 });
  }

  return Response.json({ success: true });
}
