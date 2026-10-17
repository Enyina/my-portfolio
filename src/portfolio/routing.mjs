import { isValidPublicSlug } from './projects.mjs';

/**
 * Client-side entry resolution. Netlify's SPA fallback sends /project/:slug
 * to the application, which then resolves only published projects.
 */
export function readProjectRoute(pathname) {
  if (typeof pathname !== 'string') return { type: 'not-found' };
  if (pathname === '/' || pathname === '/index.html') return { type: 'home' };
  const match = /^\/project\/([^/]+)\/?$/.exec(pathname);
  if (!match || !isValidPublicSlug(match[1])) return { type: 'not-found' };
  return { type: 'project', slug: match[1] };
}
