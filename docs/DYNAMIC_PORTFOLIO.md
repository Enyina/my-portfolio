# Dynamic Portfolio Implementation Roadmap

## Verified baseline (17 October 2026)

- Codebase: `Enyina/my-portfolio`, React 18 / Create React App 5, SCSS, Formspree.
- Public historical URL identified by user: https://enyina.netlify.app/
- Netlify's actual connected GitHub repository **has not yet been verified**. Do not merge or deploy until Netlify project settings confirm it.
- No Vinext application, Cloudflare D1/R2 bindings, or protected admin backend have been identified in this repository.
- This branch introduces published-section ordering only; it is not a completed CMS.

## Required public site

1. Compare current desktop and mobile views against authoritative Builder/Figma exports once available.
2. Preserve existing hero, navigation and contact while migrating sections incrementally.
3. Render publicly visible sections by a *published* snapshot with order: About, Experience, Projects, Skills, Testimonials, Contact. Show only sections that have an implemented component and published content.
4. Replace fixed project arrays with validated published project records and implement `/project/:slug` details.
5. Add accessible resume links with friendly download names.
6. Ensure keyboard navigation, reduced-motion support, responsive media sizing and focus styles.

## Required private admin

- All edits must be server-authorized. **Never** treat a client-side check or an email string as authentication.
- Requested editor is `enyina3848@gmail.com`, but trust that claim only when verified by a supported identity provider.
- The requested 'ChatGPT sign-in' needs verification: an arbitrary third-party website cannot assume ChatGPT accounts provide an OAuth login integration.
- Structured CRUD forms for profile, stats, experience, skills, projects, testimonials, services, links and section order.
- Draft/published separation, visible unsaved state, preview and explicit publish.
- Validate types and sizes before upload (PDF <= 10 MB, images <= 8 MB); use safe R2 lifecycle with reference checks before deletion.
- Draft content and upload endpoints must never be exposed to unauthenticated visitors.
- If moving from Netlify/CRA to Vinext/Cloudflare, do so with a separate staging deployment, data migration plan and rollback; do not replace the live app blindly.

## Verification gates

- Unit tests: `node --test tests/*.test.mjs` (Node 20+).
- Current full React build must be tested with dependencies installed; passing the standalone unit suite alone is insufficient.
- Public anonymous routes return only published, visible data.
- Admin unauthenticated/unauthorized read and write paths are tested at the server boundary.
- File replacement and publish are atomic or compensating, idempotent, logged and reversible.
- Desktop/mobile visual comparison against supplied exports.
- Verify Netlify source mapping, preview and production deployment before merge.

## Safety

Do not commit secrets, session keys, Cloudflare credentials, D1 snapshots or private drafts. A public Git repository may contain the public portfolio frontend and **server code**, but never real credentials or private customer data.
