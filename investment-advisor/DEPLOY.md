# SKY invest Deployment Notes

## Recommended Path

Use Vercel first.

Why:
- Good for PWA hosting.
- Easy to add API routes later.
- Easy to connect GitHub for automatic deploys.
- Can add Neon/Supabase/Firebase later for login and portfolio history.

## Current Version

This is a static PWA prototype. It stores portfolio data in the browser with `localStorage`.

That means:
- Same browser/device keeps history.
- iPhone and Mac will not sync yet.
- If browser storage is cleared, local portfolio data can be lost.

## To Store History Across Devices

Add:
- Auth: Supabase Auth, Firebase Auth, Clerk, or Auth0.
- Database: Supabase Postgres, Neon Postgres, or Firebase Firestore.
- Tables/collections:
  - users
  - portfolios
  - holdings
  - transactions
  - alerts
  - daily_briefings

## Deploy Options

### Vercel

Best next step.

Needed:
- Vercel account
- GitHub account, or Vercel CLI login/token
- Optional later: Supabase/Neon/Firebase account for cloud history

### Netlify

Good for static websites and simple forms.

Less ideal than Vercel if SKY invest later becomes an AI/API-heavy app.

### GitHub Pages

Good for free static hosting.

Not ideal for login, API, server-side AI, or private portfolio history.

## Suggested Production Stack

- Frontend: Next.js or current static PWA upgraded gradually
- Hosting: Vercel
- Auth + Database: Supabase
- AI Analysis: OpenAI API via backend route
- Market data: free APIs first, paid market data later if needed
- Push notifications: PWA push / Firebase Cloud Messaging later
