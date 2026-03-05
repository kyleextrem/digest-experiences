const BASE_ID = process.env.AIRTABLE_BASE_ID!;
const TABLE = process.env.AIRTABLE_TABLE_NAME ?? 'Signups';
const TOKEN = process.env.AIRTABLE_API_KEY!;
const CAP = 30;

export async function GET() {
  if (!BASE_ID || !TOKEN) {
    return Response.json({ remaining: CAP, soldOut: false });
  }
  const filterByFormula = encodeURIComponent("{Status} = 'paid'");
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}?fields[]=Name&filterByFormula=${filterByFormula}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    next: { revalidate: 30 },
  });
  const data = await res.json();
  const count = data.records?.length ?? 0;
  const remaining = Math.max(0, CAP - count);
  return Response.json({ remaining, soldOut: remaining === 0 });
}
