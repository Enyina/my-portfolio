# Engineering Rules — Dynamic Portfolio

## Project goal
Evolve the existing personal portfolio into an accessible, polished public site with a server-authorized private admin dashboard. Do not create a disconnected replacement.

## Reverse Engineering First
1. Inspect existing code, routes, styles, and the live deployed behavior before rewriting.
2. Compare against supplied Figma/Builder desktop and mobile exports, recording the observed behavior and meaningful differences.
3. Extract useful approaches from established portfolio and CMS products, implement independently, and measure results. Do not copy copyrighted assets or proprietary implementations.
4. Validate affected routes and workflows with tests before requesting production deployment.

## Source of truth
- Verify which repository and branch Netlify deploys to `enyina.netlify.app`. Currently **not confirmed**.
- Existing source baseline: `Enyina/my-portfolio` (React/CRA). Do not assume Vinext, D1, R2, or any secure login are already installed.
- Public readers may only receive explicitly published, visible content.
- Draft content is never bundled into a public JavaScript file, endpoint, or static JSON asset.
- Do not implement an admin editor with browser-only authorization or localStorage as persistent source of truth.

## Auth and media safety
- Server-verify identity on every draft read, upload, CRUD and publish endpoint. Allowlist: `enyina3848@gmail.com`.
- Fail closed on missing config, missing session, mismatched email, invalid slug, duplicate key, or malformed payload.
- Validate size, MIME and actual file signatures (not filenames alone), including PDF (<=10MB) and images (<=8MB).
- On media replacement: upload new object, update references, then clean unused assets after verifying no other records reference them.
- Do not add credentials, private drafts, user identifiers or sensitive data to this public repo.
- Use safe schema migrations and backup/rollback before any production write.

## Current verified progress
- GitHub PR #1: dynamic section projection, published-only project cards, public slug pages, and Netlify SPA routing.
- GitHub Actions published-content unit suite passed on 17 Oct 2026.
- Full React production build, Netlify source mapping, and design comparison remain unverified.
- Admin backend, database, media management and publishing UI remain unimplemented.

## Release
Changes go to development branches and reviewable pull requests. Never merge/deploy based on unit tests alone; also verify build, mobile/desktop UX, anonymous access, and server authorization.
