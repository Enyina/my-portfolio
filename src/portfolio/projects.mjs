import { resolveVisibleProjects } from './sections.mjs';

// Public seed data migrated from src/data.js. No draft content belongs in this module.
// These are legacy examples, NOT assertions about unverified production projects.
export const publishedProjects = Object.freeze([
  {
    id: 'shopping-app',
    slug: 'shopping-app',
    title: 'Shopping App',
    summary: 'An earlier web application project.',
    category: 'web',
    imageSrc: '/assets/shop%20(1).png',
    imageAlt: 'Shopping App project screenshot',
    publishedOrder: 0,
    publishedVisible: true,
    status: 'published',
    featured: false,
  },
  {
    id: 'wishlist-app',
    slug: 'wishlist-app',
    title: 'WishList App',
    summary: 'An earlier web application project.',
    category: 'web',
    imageSrc: '/assets/OIP.jpg',
    imageAlt: 'WishList App project screenshot',
    publishedOrder: 1,
    publishedVisible: true,
    status: 'published',
    featured: false,
  },
  {
    id: 'bbc-clone',
    slug: 'bbc-clone',
    title: 'BBC Clone',
    summary: 'A project from the original featured portfolio.',
    category: 'web',
    imageSrc: '/assets/bbc.png',
    imageAlt: 'BBC Clone project screenshot',
    publishedOrder: 2,
    publishedVisible: true,
    status: 'published',
    featured: true,
    repositoryUrl: 'https://github.com/Enyina/BBC-Clone-Project',
  },
]);

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidPublicSlug(slug) {
  return typeof slug === 'string' && slug.length <= 100 && slugPattern.test(slug);
}

/** Public projects must be published AND marked visible. */
export function listPublicProjects(rows = publishedProjects, category = 'all') {
  const published = resolveVisibleProjects(rows).filter((item) => isValidPublicSlug(item.slug));
  if (category === 'featured') return published.filter((item) => item.featured === true);
  if (category === 'web') return published.filter((item) => item.category === 'web');
  return published;
}

export function getPublicProject(slug, rows = publishedProjects) {
  if (!isValidPublicSlug(slug)) return null;
  return listPublicProjects(rows).find((project) => project.slug === slug) ?? null;
}
