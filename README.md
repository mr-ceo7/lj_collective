<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a1b6f89c-b56e-4e0c-a4a4-1a4ca1289a46

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local` and set the values you need.
3. Run the storefront:
   `npm run dev`
4. In a second terminal, run the admin API:
   `npm run api:dev`

## Admin and production notes

- Visit `/admin` to open the admin dashboard.
- The dashboard calls `/api/admin/*`; in local development Vite proxies those requests to `server/adminApi.ts` on port `8787`.
- Set `ADMIN_API_TOKEN` before using the admin API. The current API is a production boundary scaffold with in-memory data for development.
- Before launch, connect the admin API to durable storage, a real auth provider, object storage signed uploads, and a payment provider.
