This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Neon lead storage

Contact enquiries are stored in Neon PostgreSQL through the server-only `/api/leads` route.

1. Create a Neon project.
2. Copy its pooled, serverless-compatible connection string.
3. Copy `.env.example` to `.env.local` and set `DATABASE_URL`.
4. Run `database/migrations/20260823_create_leads.sql` against the Neon database.
5. Add `DATABASE_URL` to the appropriate Vercel project environments.
6. Redeploy the application.

Never commit the connection string. The in-memory request throttle is best-effort on serverless infrastructure because separate function instances do not share memory.

## Lead notification email

After a contact enquiry is stored successfully, the server sends a notification through Resend. Email delivery is intentionally non-transactional: a provider or configuration failure is logged but does not discard the database lead or return an error to the visitor.

1. Add and verify psdigilabs.in (or a dedicated sending subdomain) in Resend.
2. Publish the SPF and DKIM records supplied by Resend and wait for the domain to show as verified.
3. Create a Resend API key with sending access.
4. Configure RESEND_API_KEY, LEAD_NOTIFICATION_TO, and LEAD_NOTIFICATION_FROM in Vercel Production. The domain in LEAD_NOTIFICATION_FROM must match the verified Resend domain.
5. Redeploy after changing the Vercel environment variables.

Keep all three variables server-only; do not prefix them with NEXT_PUBLIC_.
