/**
 * Published-only section projection for the existing React portfolio.
 * Draft data must never be included in the public payload.
 */
const ORDERABLE_SECTION_IDS = Object.freeze(['projects', 'experience', 'about', 'skills', 'testimonials', 'contact']);
const allowedIds = new Set(ORDERABLE_SECTION_IDS);

export const publishedSectionDefaults = Object.freeze([
  { id: 'projects', publishedVisible: true, publishedOrder: 0 },
  { id: 'experience', publishedVisible: true, publishedOrder: 1 },
  { id: 'about', publishedVisible: true, publishedOrder: 2 },
  { id: 'contact', publishedVisible: true, publishedOrder: 3 },
  { id: 'skills', publishedVisible: false, publishedOrder: 4 },
  { id: 'testimonials', publishedVisible: false, publishedOrder: 5 },
]);

/**
 * Only explicitly visible, known sections with valid order values render.
 * Duplicate known sections fail closed rather than creating ambiguous order.
 * The hero remains independently mounted while existing components migrate.
 */
export function resolveVisibleSections(rows) {
  if (!Array.isArray(rows)) throw new TypeError('sections must be an array');
  const seen = new Set();
  return rows
    .filter((row) => {
      if (!row || !allowedIds.has(row.id)) return false;
      if (seen.has(row.id)) throw new Error(`Duplicate public section: ${row.id}`);
      seen.add(row.id);
      return row.publishedVisible === true && Number.isSafeInteger(row.publishedOrder) && row.publishedOrder >= 0;
    })
    .sort((a, b) => a.publishedOrder - b.publishedOrder || ORDERABLE_SECTION_IDS.indexOf(a.id) - ORDERABLE_SECTION_IDS.indexOf(b.id))
    .map(({ id }) => id);
}

/** Never expose draft or hidden projects to anonymous readers. */
export function resolveVisibleProjects(rows) {
  if (!Array.isArray(rows)) throw new TypeError('projects must be an array');
  return rows
    .filter((row) => row && row.status === 'published' && row.publishedVisible === true)
    .sort((a, b) => (Number.isSafeInteger(a.publishedOrder) ? a.publishedOrder : Number.MAX_SAFE_INTEGER)
       - (Number.isSafeInteger(b.publishedOrder) ? b.publishedOrder : Number.MAX_SAFE_INTEGER));
}
