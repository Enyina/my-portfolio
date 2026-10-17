import test from 'node:test';
import assert from 'node:assert/strict';
import {
  publishedSectionDefaults,
  resolveVisibleSections,
  resolveVisibleProjects,
} from '../src/portfolio/sections.mjs';

test('defaults preserve the existing public sequence', () => {
  assert.deepEqual(resolveVisibleSections(publishedSectionDefaults), [
    'projects', 'experience', 'about', 'contact',
  ]);
});

test('published order is respected', () => {
  assert.deepEqual(resolveVisibleSections([
    { id: 'about', publishedVisible: true, publishedOrder: 3 },
    { id: 'contact', publishedVisible: true, publishedOrder: 0 },
    { id: 'projects', publishedVisible: true, publishedOrder: 2 },
  ]), ['contact', 'projects', 'about']);
});

test('hidden, unknown and invalid-order sections cannot render', () => {
  assert.deepEqual(resolveVisibleSections([
    { id: 'projects', publishedVisible: false, publishedOrder: 0 },
    { id: 'experience', publishedOrder: 1 },
    { id: 'secret', publishedVisible: true, publishedOrder: 1 },
    { id: 'about', publishedVisible: true, publishedOrder: -1 },
    { id: 'contact', publishedVisible: true, publishedOrder: 3 },
  ]), ['contact']);
});

test('future sections are supported but hidden by default', () => {
  assert.deepEqual(resolveVisibleSections(publishedSectionDefaults), [
    'projects', 'experience', 'about', 'contact',
  ]);
  assert.deepEqual(resolveVisibleSections([
    { id: 'skills', publishedVisible: true, publishedOrder: 1 },
    { id: 'testimonials', publishedVisible: true, publishedOrder: 2 },
  ]), ['skills', 'testimonials']);
});

test('duplicate known sections are rejected', () => {
  assert.throws(() => resolveVisibleSections([
    { id: 'about', publishedVisible: true, publishedOrder: 0 },
    { id: 'about', publishedVisible: true, publishedOrder: 1 },
  ]), /Duplicate/);
});

test('draft and hidden projects are not public', () => {
  assert.deepEqual(resolveVisibleProjects([
    { slug: 'draft', status: 'draft', publishedVisible: true, publishedOrder: 0 },
    { slug: 'hidden', status: 'published', publishedVisible: false, publishedOrder: 0 },
    { slug: 'second', status: 'published', publishedVisible: true, publishedOrder: 5 },
    { slug: 'first', status: 'published', publishedVisible: true, publishedOrder: 2 },
  ]).map(({slug}) => slug), ['first', 'second']);
});

test('non-array values cannot publish anything', () => {
  assert.throws(() => resolveVisibleSections(null), TypeError);
  assert.throws(() => resolveVisibleProjects(undefined), TypeError);
});
