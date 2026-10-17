import test from 'node:test';
import assert from 'node:assert/strict';
import { getPublicProject, isValidPublicSlug, listPublicProjects, publishedProjects } from '../src/portfolio/projects.mjs';
import { readProjectRoute } from '../src/portfolio/routing.mjs';

test('legacy seed projects remain publicly visible and ordered', () => {
  assert.deepEqual(listPublicProjects().map(({ slug }) => slug), [
    'shopping-app', 'wishlist-app', 'bbc-clone',
  ]);
});

test('featured filter excludes non-featured projects', () => {
  assert.deepEqual(listPublicProjects(publishedProjects, 'featured').map(({ slug }) => slug), ['bbc-clone']);
});

test('hidden, draft and invalid-slug content cannot be found', () => {
  const content = [
    { slug: 'draft', status: 'draft', publishedVisible: true, publishedOrder: 0 },
    { slug: 'hidden', status: 'published', publishedVisible: false, publishedOrder: 1 },
    { slug: 'bad/slug', status: 'published', publishedVisible: true, publishedOrder: 2 },
    { slug: 'visible', status: 'published', publishedVisible: true, publishedOrder: 3 },
  ];
  assert.deepEqual(listPublicProjects(content).map(({ slug }) => slug), ['visible']);
  assert.equal(getPublicProject('draft', content), null);
  assert.equal(getPublicProject('hidden', content), null);
  assert.equal(getPublicProject('bad/slug', content), null);
  assert.equal(getPublicProject('visible', content).slug, 'visible');
});

test('slug rule only accepts lowercase safe path segments', () => {
  for (const value of ['abc', 'shop-app', 'a1']) assert.equal(isValidPublicSlug(value), true);
  for (const value of ['', 'Bad', '../admin', 'a--b', '%2f', 'é', 'a'.repeat(101)]) assert.equal(isValidPublicSlug(value), false);
});

test('project routes support reload, trailing slash and missing routes', () => {
  assert.deepEqual(readProjectRoute('/'), { type: 'home' });
  assert.deepEqual(readProjectRoute('/project/bbc-clone'), { type: 'project', slug: 'bbc-clone' });
  assert.deepEqual(readProjectRoute('/project/bbc-clone/'), { type: 'project', slug: 'bbc-clone' });
  assert.deepEqual(readProjectRoute('/admin'), { type: 'not-found' });
  assert.deepEqual(readProjectRoute('/project/%2e%2e'), { type: 'not-found' });
  assert.deepEqual(readProjectRoute('/project/foo/bar'), { type: 'not-found' });
});
