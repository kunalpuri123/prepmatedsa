#!/usr/bin/env node
/**
 * Extract NeetCode 250 problems from OCR text produced from the provided PDF.
 *
 * This script parses the OCR output and reconstructs LeetCode URLs by slugifying
 * the canonical LeetCode problem titles.
 *
 * Usage:
 *   node scripts/extract-neetcode250-from-pdf-ocr.mjs tmp/neetcode250-ocr > neetcode250.json
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const ORDERED_CATEGORIES = [
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Stack',
  'Binary Search',
  'Linked List',
  'Trees',
  'Heap / Priority Queue',
  'Backtracking',
  'Tries',
  'Graphs',
  'Advanced Graphs',
  '1-D DP',
  '2-D DP',
  'Greedy',
  'Intervals',
  'Math & Geometry',
  'Bit Manipulation',
];

const MARKER_RE = /^\s*Status\s+Star\s+Problem\b/i;
const DIFF_RE = /\b(Easy|Medium|Hard|Herd)\b/i;
const TRAILING_SCORE_RE = /\s+[\d=)\]}Bfi]+$/; // OCR tail noise like "6", "=}", "B", "fj"
// Strip a small prefix of non-alphanumeric noise (but never strip actual title letters).
const LEADING_ICON_RE = /^\s*[^A-Za-z0-9]{0,3}\s*/;
const MULTI_ICON_RE = /^\s*(?:[A-Za-z]{1,2}|[iIyYwWvVdD*]{1,3})\s+/; // e.g. "wv", "Ww", "id"

function die(msg) {
  process.stderr.write(`${msg}\n`);
  process.exit(1);
}

function canonicalizeTitleAndDifficulty(inputTitle, inputDifficulty, category) {
  let title = inputTitle.trim();
  let difficulty = inputDifficulty?.trim() || '';
  let fixed = false;

  // Fix common OCR roman numeral confusion.
  title = title.replace(/\bIl\b/g, 'II');
  title = title.replace(/\bIll\b/g, 'III');

  // Join artifacts that leaked in as separate lines.
  title = title.replace(/\s+/g, ' ').trim();

  // Targeted fixes for the provided PDF OCR (400dpi).
  const fixes = [
    {
      re: /^Cheectee Without Repeating Mean$/i,
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
    },
    {
      re: /^Greetee Without Repeating Mean$/i,
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
    },
    {
      re: /^Cheectee Without Repeating Meet$/i,
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
    },
    {
      re: /^Rewucement Character.*$/i,
      title: 'Longest Repeating Character Replacement',
      difficulty: 'Medium',
    },
    {
      re: /^Revcement.*Character.*$/i,
      title: 'Longest Repeating Character Replacement',
      difficulty: 'Medium',
    },
    {
      re: /^Lowest Common Ancestor of a Binary Search Tree$/i,
      title: 'Lowest Common Ancestor of a Binary Search Tree',
      difficulty: 'Medium',
    },
    {
      re: /^Lowest Common Ancestor of a Binary\b/i,
      title: 'Lowest Common Ancestor of a Binary Search Tree',
      difficulty: 'Medium',
    },
    {
      re: /^Construct Binary Tree From Preorder And Inorder Traversal$/i,
      title: 'Construct Binary Tree from Preorder and Inorder Traversal',
      difficulty: 'Medium',
    },
    {
      re: /^Construct Binary Tree From Preorder And\b/i,
      title: 'Construct Binary Tree from Preorder and Inorder Traversal',
      difficulty: 'Medium',
    },
    {
      re: /^Design Add And Search Words Data Structure$/i,
      title: 'Design Add and Search Words Data Structure',
      difficulty: 'Medium',
    },
    {
      re: /^Design Add And Search Words Data.*$/i,
      title: 'Design Add and Search Words Data Structure',
      difficulty: 'Medium',
    },
    {
      re: /^Letter Combinations of a Phone Number.*$/i,
      title: 'Letter Combinations of a Phone Number',
      difficulty: 'Medium',
    },
    {
      re: /^ind Median From Data Stream.*$/i,
      title: 'Find Median from Data Stream',
      difficulty: 'Hard',
    },
    {
      re: /^Find Median From Data Stream.*$/i,
      title: 'Find Median from Data Stream',
      difficulty: 'Hard',
    },
    {
      re: /^Best Time to Buy And Sell Stock With Cooldown$/i,
      title: 'Best Time to Buy and Sell Stock with Cooldown',
      difficulty: 'Medium',
    },
    {
      re: /^Best Time to Buy And Sell Stock With.*$/i,
      title: 'Best Time to Buy and Sell Stock with Cooldown',
      difficulty: 'Medium',
    },
    {
      re: /^Two Sum II Input Array Is Sorted$/i,
      title: 'Two Sum II - Input Array Is Sorted',
      difficulty: 'Medium',
    },
    {
      re: /^Two Sum II.*Input Array Is Sorted$/i,
      title: 'Two Sum II - Input Array Is Sorted',
      difficulty: 'Medium',
    },
    {
      re: /^Minimum Interval to Include Each Query.*$/i,
      title: 'Minimum Interval to Include Each Query',
      difficulty: 'Hard',
    },
    {
      re: /^ire Valid Sudoku$/i,
      title: 'Valid Sudoku',
      difficulty: 'Medium',
    },
    {
      re: /^[a-z]{1,3}\s+Find in Mountain Array$/i,
      title: 'Find in Mountain Array',
      difficulty: 'Hard',
    },
    {
      re: /^«?IPO$/i,
      title: 'IPO',
      difficulty: 'Hard',
    },
    {
      re: /^Pacitic Atlantic Water Flow$/i,
      title: 'Pacific Atlantic Water Flow',
      difficulty: 'Medium',
    },
    {
      re: /^Insert Greatest Common Divisors in Linked List$/i,
      title: 'Insert Greatest Common Divisors in Linked List',
      difficulty: 'Medium',
    },
    {
      re: /^Insert Greatest Common Divisors in$/i,
      title: 'Insert Greatest Common Divisors in Linked List',
      difficulty: 'Medium',
    },
    {
      re: /^Number of Connected Components In An Undirected Graph$/i,
      title: 'Number of Connected Components in an Undirected Graph',
      difficulty: 'Medium',
    },
    {
      re: /^Number of Connected Components In An$/i,
      title: 'Number of Connected Components in an Undirected Graph',
      difficulty: 'Medium',
    },
    {
      re: /^Bitwise AND of Numbers Range.*$/i,
      title: 'Bitwise AND of Numbers Range',
      difficulty: 'Medium',
    },
    {
      re: /^Minimum Array End.*$/i,
      title: 'Minimum Array End',
      difficulty: 'Medium',
    },
    {
      re: /Critical.*Edges in.*Minimum Spanning Tree/i,
      title: 'Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree',
      difficulty: 'Hard',
    },
    {
      re: /Critical and Pseudo/i,
      title: 'Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree',
      difficulty: 'Hard',
    },
  ];

  for (const f of fixes) {
    if (f.re.test(title)) {
      title = f.title;
      difficulty = f.difficulty;
      fixed = true;
      break;
    }
  }

  // If OCR failed to capture difficulty but we have it by category+fix, keep it.
  if (!difficulty) {
    // Default fallback: many OCR tails drop "Medium". Use category-informed default.
    // This should be rare after applying targeted fixes.
    difficulty = category === 'Bit Manipulation' ? 'Easy' : 'Medium';
  }
  if (difficulty.toLowerCase() === 'herd') difficulty = 'Hard';

  return { title, difficulty, fixed };
}

function toLeetCodeSlug(title) {
  const t = title.trim();

  // A couple of LeetCode special slugs.
  if (/^Sqrt\(x\)$/i.test(t)) return 'sqrtx';
  if (/^Pow\(x,\s*n\)$/i.test(t)) return 'powx-n';

  let s = t;
  s = s.replace(/&/g, 'and');
  s = s.replace(/[’']/g, '');
  s = s.replace(/\bN-?\s*th\b/gi, 'n-th');
  // Normalize separators.
  s = s.replace(/[:/]/g, ' ');
  s = s.replace(/[-–—]+/g, ' ');
  s = s.replace(/[(),]/g, ' ');
  s = s.replace(/\./g, ' ');
  s = s.toLowerCase();
  s = s.replace(/[^a-z0-9]+/g, ' ');
  s = s.trim().replace(/\s+/g, '-');
  return s;
}

function listOcrFiles(dir) {
  const abs = path.isAbsolute(dir) ? dir : path.join(ROOT, dir);
  if (!fs.existsSync(abs)) die(`OCR dir not found: ${abs}`);
  const files = fs
    .readdirSync(abs)
    .filter((f) => /^page-\d+\.txt$/.test(f))
    .sort((a, b) => {
      const ai = Number(a.match(/\d+/)?.[0] ?? 0);
      const bi = Number(b.match(/\d+/)?.[0] ?? 0);
      return ai - bi;
    })
    .map((f) => path.join(abs, f));
  if (files.length === 0) die(`No OCR page-*.txt files found in: ${abs}`);
  return files;
}

function cleanLine(line) {
  let s = line.replace(/\t/g, ' ').trim();
  s = s.replace(/\s+/g, ' ');
  return s;
}

function stripRowDecorations(line) {
  let s = line;
  s = s.replace(LEADING_ICON_RE, '');
  s = s.replace(MULTI_ICON_RE, ''); // drop "wv"/"Ww"/"id" tokens
  s = s.replace(TRAILING_SCORE_RE, '');
  return s.trim();
}

function maybeJoinWrappedTitle(line, nextLine) {
  // Handle a couple of known wraps in the PDF OCR output.
  const endsWith = (suffix) => line.toLowerCase().endsWith(suffix.toLowerCase());
  if (!nextLine) return null;
  const n = cleanLine(nextLine);
  if (!n) return null;
  if (MARKER_RE.test(n)) return null;
  if (DIFF_RE.test(n)) return null; // next line is another row
  if (n.length > 40) return null;

  if (endsWith('binary') || endsWith('and') || endsWith('with') || endsWith('cooldown')) {
    return `${line} ${n}`.replace(/\s+/g, ' ').trim();
  }
  if (line.toLowerCase().includes('lowest common ancestor of a binary') && n.toLowerCase().includes('search tree')) {
    return `${line} ${n}`.replace(/\s+/g, ' ').trim();
  }
  if (line.toLowerCase().includes('construct binary tree from preorder and') && n.toLowerCase().includes('inorder traversal')) {
    return `${line} ${n}`.replace(/\s+/g, ' ').trim();
  }
  if (line.toLowerCase().includes('best time to buy and sell stock with') && n.toLowerCase() === 'cooldown') {
    return `${line} ${n}`.replace(/\s+/g, ' ').trim();
  }
  if (line.toLowerCase().includes('design add and search words data') && n.toLowerCase() === 'structure') {
    return `${line} ${n}`.replace(/\s+/g, ' ').trim();
  }
  if (line.toLowerCase().includes('number of connected components in an') && n.toLowerCase() === 'undirected graph') {
    return `${line} ${n}`.replace(/\s+/g, ' ').trim();
  }
  if (line.toLowerCase().includes('insert greatest common divisors in') && n.toLowerCase() === 'linked list') {
    return `${line} ${n}`.replace(/\s+/g, ' ').trim();
  }
  if (line.toLowerCase().includes('critical edges in') && n.toLowerCase() === 'minimum spanning tree') {
    return `${line} ${n}`.replace(/\s+/g, ' ').trim();
  }
  return null;
}

function parseProblemCandidate(line) {
  const s = stripRowDecorations(line);
  if (!s) return null;
  if (/^links\s+social\s+contact/i.test(s)) return null;
  if (/^menu\b/i.test(s)) return null;
  if (/^sign\s*in\b/i.test(s)) return null;
  if (/^expand\b/i.test(s)) return null;
  if (/^array\s+\d+/i.test(s)) return null; // tag cloud like "Array 269"
  if (/@/.test(s)) return null;
  if (s.length < 4) return null;

  // Extract difficulty token wherever it appears (OCR sometimes appends noise after it).
  let title = s;
  let difficulty = '';
  let hadDifficulty = false;
  const matches = Array.from(s.matchAll(/\b(Easy|Medium|Hard|Herd)\b/gi));
  if (matches.length > 0) {
    const last = matches[matches.length - 1];
    const idx = last.index ?? -1;
    if (idx >= 0) {
      title = s.slice(0, idx).trim();
      difficulty = String(last[1] ?? '').trim();
      hadDifficulty = true;
    }
  }
  if (!title) return null;

  // Filter out known non-row headings.
  if (/^status star problem/i.test(title)) return null;
  if (/^problem of the day/i.test(title)) return null;
  if (/^(easy|medium|hard)\s+\d+\/\d+/i.test(title)) return null;
  if (title.toLowerCase() === 'search tree' || title.toLowerCase() === 'inorder traversal' || title.toLowerCase() === 'cooldown') {
    return null;
  }

  return { title, difficulty, hadDifficulty };
}

function main() {
  const ocrDir = process.argv[2];
  if (!ocrDir) die('Usage: node scripts/extract-neetcode250-from-pdf-ocr.mjs <ocr_dir>');

  const files = listOcrFiles(ocrDir);

  const rows = [];
  const seenUrl = new Set();
  let categoryIdx = -1;
  const skippedWithDiff = [];

  for (const file of files) {
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const raw = cleanLine(lines[i]);
      if (!raw) continue;

      if (MARKER_RE.test(raw)) {
        categoryIdx += 1;
        if (categoryIdx >= ORDERED_CATEGORIES.length) {
          // Ignore extra markers after the last category (footer area).
          continue;
        }
        continue;
      }

      if (categoryIdx < 0 || categoryIdx >= ORDERED_CATEGORIES.length) continue;

      // Join wrapped titles.
      const joined = maybeJoinWrappedTitle(raw, lines[i + 1]);
      const candidate = parseProblemCandidate(joined ?? raw);
      if (!candidate) {
        if (process.env.DEBUG_SKIPS && DIFF_RE.test(raw)) {
          skippedWithDiff.push({ category: ORDERED_CATEGORIES[categoryIdx], line: raw });
        }
        continue;
      }
      if (joined) i += 1;

      const category = ORDERED_CATEGORIES[categoryIdx];
      const canon = canonicalizeTitleAndDifficulty(candidate.title, candidate.difficulty, category);
      // Avoid parsing footer/non-problem UI lines: require OCR difficulty token
      // unless the title hit a targeted fix.
      if (!candidate.hadDifficulty && !canon.fixed) continue;
      const slug = toLeetCodeSlug(canon.title);
      const url = `https://leetcode.com/problems/${slug}/`;

      if (seenUrl.has(url)) continue;
      seenUrl.add(url);

      rows.push({
        category,
        title: canon.title,
        difficulty: canon.difficulty,
        url,
      });
    }
  }

  // NeetCode 250 should be exactly 250 distinct problems.
  if (rows.length !== 250) {
    process.stderr.write(`Parsed ${rows.length} problems (expected 250).\n`);
    process.stderr.write('If this is off, re-run OCR at higher resolution or provide a JSON export.\n');
    if (process.env.DEBUG_SKIPS && skippedWithDiff.length > 0) {
      process.stderr.write(`Skipped lines containing a difficulty token (${skippedWithDiff.length}):\n`);
      skippedWithDiff.slice(0, 50).forEach((s) => process.stderr.write(`- [${s.category}] ${s.line}\n`));
      if (skippedWithDiff.length > 50) process.stderr.write(`... +${skippedWithDiff.length - 50} more\n`);
    }
    process.stdout.write(`${JSON.stringify(rows, null, 2)}\n`);
    process.exit(2);
  }

  process.stdout.write(`${JSON.stringify(rows, null, 2)}\n`);
}

main();
