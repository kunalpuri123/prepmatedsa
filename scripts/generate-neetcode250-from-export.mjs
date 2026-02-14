#!/usr/bin/env node
/**
 * Generate `src/data/neetcode250.ts` from a JSON export of the NeetCode 250 sheet.
 *
 * Input JSON format (array of objects):
 *   [{ "category": "Arrays & Hashing", "title": "Two Sum", "difficulty": "Easy", "url": "https://leetcode.com/problems/two-sum/" }, ...]
 *
 * Usage:
 *   node scripts/generate-neetcode250-from-export.mjs neetcode250.json
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const TARGET = path.join(ROOT, 'src/data/neetcode250.ts');

const VALID_DIFF = new Set(['Easy', 'Medium', 'Hard']);
const LC_URL_RE = /^https:\/\/leetcode\.com\/problems\/[a-z0-9-]+\/$/;

const CATEGORY_TO_TOPIC_ID = new Map([
  ['Arrays & Hashing', 'nc250-arrays-hashing'],
  ['Two Pointers', 'nc250-two-pointers'],
  ['Stack', 'nc250-stack'],
  ['Binary Search', 'nc250-binary-search'],
  ['Sliding Window', 'nc250-sliding-window'],
  ['Linked List', 'nc250-linked-list'],
  ['Trees', 'nc250-trees'],
  ['Tries', 'nc250-tries'],
  ['Heap / Priority Queue', 'nc250-heap'],
  ['Backtracking', 'nc250-backtracking'],
  ['Graphs', 'nc250-graphs'],
  ['Advanced Graphs', 'nc250-adv-graphs'],
  ['1-D DP', 'nc250-1d-dp'],
  ['2-D DP', 'nc250-2d-dp'],
  ['Greedy', 'nc250-greedy'],
  ['Intervals', 'nc250-intervals'],
  ['Math & Geometry', 'nc250-math-geometry'],
  ['Bit Manipulation', 'nc250-bit'],
]);

const CATEGORY_TO_DESCRIPTION = new Map([
  ['Arrays & Hashing', 'Hash maps, frequency, prefix sums, sorting'],
  ['Two Pointers', 'Opposite ends, slow/fast, in-place'],
  ['Stack', 'Monotonic stack, parsing, evaluation'],
  ['Binary Search', 'Search on answer, rotated, bounds'],
  ['Sliding Window', 'Fixed/variable windows, frequency windows'],
  ['Linked List', 'Pointers, cycles, reverse, merge'],
  ['Trees', 'DFS/BFS, recursion, BSTs'],
  ['Tries', 'Prefix trees, word search'],
  ['Heap / Priority Queue', 'Top-K, streaming, merge'],
  ['Backtracking', 'Subsets, permutations, pruning'],
  ['Graphs', 'DFS/BFS, union-find, topo sort'],
  ['Advanced Graphs', 'Shortest paths, MST, advanced traversals'],
  ['1-D DP', 'Linear DP, Kadane, LIS-style'],
  ['2-D DP', 'Grid DP, knapsack-style'],
  ['Greedy', 'Local optimal choices, intervals, scheduling'],
  ['Intervals', 'Merge, sweep line, meeting rooms'],
  ['Math & Geometry', 'Number theory, geometry, combinatorics'],
  ['Bit Manipulation', 'XOR, masks, shifts'],
]);

function die(msg) {
  process.stderr.write(`${msg}\n`);
  process.exit(1);
}

function stableSlugFromUrl(url) {
  return url.replace('https://leetcode.com/problems/', '').replace(/\/$/, '');
}

function sanitizeJson(input) {
  if (!Array.isArray(input)) die('Export JSON must be an array.');
  return input.map((row, idx) => {
    const category = String(row.category ?? '').trim();
    const title = String(row.title ?? '').trim();
    const difficulty = String(row.difficulty ?? '').trim();
    const url = String(row.url ?? '').trim();
    if (!category || !title || !difficulty || !url) {
      die(`Row ${idx} is missing required fields (category/title/difficulty/url).`);
    }
    if (!VALID_DIFF.has(difficulty)) die(`Row ${idx} has invalid difficulty: ${difficulty}`);
    if (!LC_URL_RE.test(url)) die(`Row ${idx} has non-canonical LeetCode URL (must end with /): ${url}`);
    if (!CATEGORY_TO_TOPIC_ID.has(category)) die(`Row ${idx} has unknown category: ${category}`);
    return { category, title, difficulty, url };
  });
}

function groupByCategory(rows) {
  const byCat = new Map();
  for (const row of rows) {
    if (!byCat.has(row.category)) byCat.set(row.category, []);
    byCat.get(row.category).push(row);
  }
  return byCat;
}

function buildTopicsTs(byCat) {
  // Keep the same topic order as the existing scaffold.
  const orderedCategories = [
    'Arrays & Hashing',
    'Two Pointers',
    'Stack',
    'Binary Search',
    'Sliding Window',
    'Linked List',
    'Trees',
    'Tries',
    'Heap / Priority Queue',
    'Backtracking',
    'Graphs',
    'Advanced Graphs',
    '1-D DP',
    '2-D DP',
    'Greedy',
    'Intervals',
    'Math & Geometry',
    'Bit Manipulation',
  ];

  const difficultyOrder = ['Easy', 'Medium', 'Hard'];

  const lines = [];
  lines.push('export const neetcode250Topics: Topic[] = [');

  for (const category of orderedCategories) {
    const topicId = CATEGORY_TO_TOPIC_ID.get(category);
    const description = CATEGORY_TO_DESCRIPTION.get(category) ?? '';
    const rows = byCat.get(category) ?? [];
    const byDiff = new Map(difficultyOrder.map((d) => [d, []]));
    for (const r of rows) {
      if (!byDiff.has(r.difficulty)) byDiff.set(r.difficulty, []);
      byDiff.get(r.difficulty).push(r);
    }
    lines.push('  {');
    lines.push(`    id: '${topicId}',`);
    lines.push(`    name: '${category.replace(/'/g, "\\'")}',`);
    lines.push(`    description: '${description.replace(/'/g, "\\'")}',`);
    lines.push('    patterns: [');
    for (const diff of difficultyOrder) {
      const diffRows = byDiff.get(diff) ?? [];
      if (diffRows.length === 0) continue;
      const patternId = `${topicId}-${diff.toLowerCase()}`;
      lines.push('      {');
      lines.push(`        id: '${patternId}',`);
      lines.push(`        name: '${diff}',`);
      lines.push('        problems: [');
      for (const r of diffRows) {
        const slug = stableSlugFromUrl(r.url);
        const id = `nc250-${slug}`;
        lines.push(
          `          { id: '${id}', title: '${r.title.replace(/'/g, "\\'")}', url: '${r.url}', difficulty: '${r.difficulty}', pattern: '${patternId}' },`,
        );
      }
      lines.push('        ],');
      lines.push('      },');
    }
    lines.push('    ],');
    lines.push('  },');
  }

  lines.push('];');
  return lines.join('\n');
}

function replaceGeneratedBlock(fileText, replacement) {
  const start = '// BEGIN GENERATED_NEETCODE250_TOPICS';
  const end = '// END GENERATED_NEETCODE250_TOPICS';
  const i = fileText.indexOf(start);
  const j = fileText.indexOf(end);
  if (i === -1 || j === -1 || j < i) die(`Missing generated block markers in ${TARGET}`);

  const before = fileText.slice(0, i + start.length);
  const after = fileText.slice(j);
  return `${before}\n${replacement}\n${after}`;
}

const inputPath = process.argv[2];
if (!inputPath) {
  die('Usage: node scripts/generate-neetcode250-from-export.mjs neetcode250.json');
}

const raw = fs.readFileSync(path.resolve(ROOT, inputPath), 'utf8');
let parsed;
try {
  parsed = JSON.parse(raw);
} catch {
  die('Invalid JSON input file.');
}

const rows = sanitizeJson(parsed);
if (rows.length !== 250) die(`Expected exactly 250 problems, got ${rows.length}.`);

const slugs = new Set();
for (const r of rows) {
  const slug = stableSlugFromUrl(r.url);
  if (slugs.has(slug)) die(`Duplicate LeetCode slug found: ${slug}`);
  slugs.add(slug);
}

const byCat = groupByCategory(rows);
const topicTs = buildTopicsTs(byCat);

const fileText = fs.readFileSync(TARGET, 'utf8');
const next = replaceGeneratedBlock(fileText, topicTs);
fs.writeFileSync(TARGET, next);

process.stdout.write(`Updated ${path.relative(ROOT, TARGET)} from ${path.relative(ROOT, inputPath)}\n`);
