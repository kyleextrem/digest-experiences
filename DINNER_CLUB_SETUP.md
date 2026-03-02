# Dinner Club: 28 signups gate + HubSpot

The April 9 dinner is gated to **28 signups**. Submissions are stored in **Airtable** (for counting and viewing) and optionally sent to **HubSpot** (for CRM).

## 1. Gating (28 max) and viewing submissions — Airtable

1. Create an [Airtable](https://airtable.com) base (free tier is fine).
2. Create a table named **Signups** (or any name) with these columns:
   - **Name** (Single line text)
   - **Email** (Email)
   - **Quiz (JSON)** (Long text) — stores the full questionnaire answers
   - **Event** (Single line text) — auto-filled
   - **Created** (Date) — optional, we send ISO string
3. Get your **Base ID** from the Airtable URL: `https://airtable.com/appXXXXXXXXXXXXXX/...` → `appXXXXXXXXXXXXXX` is the Base ID.
4. Create a [Personal Access Token](https://airtable.com/create/tokens) with scope `data.records:read` and `data.records:write` for this base.
5. In **Vercel** (or your host), add environment variables:
   - `AIRTABLE_BASE_ID` = your base ID (e.g. `appXXXXXXXXXXXXXX`)
   - `AIRTABLE_TABLE_NAME` = `Signups` (or your table name)
   - `AIRTABLE_API_KEY` = your Airtable personal access token

**View submissions:** Open the Airtable base and the Signups table. You’ll see every submission with name, email, and the full quiz JSON.

If these env vars are **not** set, the app still works but **does not gate** (everyone can submit) and submissions are not stored.

---

## 2. Sending submissions to HubSpot

To have each signup appear as a contact in HubSpot:

1. In HubSpot, create a **form** (e.g. “Dinner Club April 9”).
2. Add fields: **Email**, **First name**, **Last name** (required for the API). Optional: a hidden or long-text field for the quiz JSON if you want it in HubSpot.
3. Get the **Form GUID**: Form options → Share → “Get form ID” or from the form URL. It looks like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.
4. Add environment variables:
   - `HUBSPOT_PORTAL_ID` = `442301086` (you already use this)
   - `HUBSPOT_DINNER_CLUB_FORM_GUID` = the form’s GUID
   - Optional: `HUBSPOT_QUIZ_FIELD_NAME` = the internal name of the field where you want the quiz JSON (so it’s stored in HubSpot too)

**View in HubSpot:** Contacts → filter or search by the form name / source. Each submission creates or updates a contact with the form submission.

---

## 3. Local development

The gating and submit APIs run as **Vercel serverless functions** (`/api/dinner-club/remaining` and `/api/dinner-club/submit`). With `npm run dev` (Vite only), those routes don’t exist locally, so:

- **Remaining** will not load (the form still shows; no “sold out”).
- **Submit** will fail when completing the quiz (you’ll see an error).

To test the full flow locally, run **Vercel dev** so the API runs too:

```bash
npx vercel dev
```

Then open the app at the URL it prints (e.g. `http://localhost:3000`) and set the same env vars in a `.env.local` that Vercel dev reads.

---

## 4. Changing the cap (e.g. 30 instead of 28)

Edit the `MAX_SIGNUPS` constant in both files:

- `api/dinner-club/remaining.js`
- `api/dinner-club/submit.js`

Redeploy so the new limit is used.
