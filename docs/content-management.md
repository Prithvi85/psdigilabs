# Content Management

The site includes an embedded Sanity Studio at `/studio` and schemas for services, case studies, and resource articles. Public listing and detail pages use published Sanity content when a project is configured and fall back to the reviewed local content in `data/` when no documents are published or the service is unavailable.

## Configure Sanity

1. Create a Sanity project and a `production` dataset.
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in local and deployment environments. For a private dataset, add a read-only `SANITY_API_READ_TOKEN`; never expose that token with a `NEXT_PUBLIC_` prefix.
3. Run `npx sanity schema deploy` from the repository root to deploy the schemas in `sanity/schemas.ts`.
4. Start the app and open `/studio` to create and publish content.

## Content Migration

- Create service documents from `data/services.ts`, keeping the existing slugs so current URLs do not change.
- Create case-study documents from `data/case-studies.ts` and upload the matching images from `public/images/projects/`.
- Create resource documents from `data/resources.ts`, preserving article publication dates and section order.
- Publish and verify each document. Existing page slugs are preserved so current URLs and local fallbacks remain stable.
- Publish only outcome metrics that have been confirmed by the client. Existing case-study copy explicitly notes when performance or business results have not been supplied.

The CMS project, dataset, content migration, access policy, and deployment environment must be supplied by the site owner. The local fallback keeps the public site buildable before those external resources exist. WhatsApp, calendar booking and newsletter links are shown only when `NEXT_PUBLIC_WHATSAPP_URL`, `NEXT_PUBLIC_BOOKING_URL` and `NEXT_PUBLIC_NEWSLETTER_URL` are configured with real public destinations.