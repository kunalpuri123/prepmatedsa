import { Difficulty, Topic, Problem } from '@/data/dsaProblems';

// NeetCode 250 topic structure is intentionally aligned with TopicAccordion.
//
// This file contains the category scaffolding and helpers. The actual 250 problem
// list can be generated from an export of the NeetCode 250 page (LeetCode links
// only) using `scripts/generate-neetcode250-from-export.mjs`.
//
// Extraction is required because neetcode.io renders the sheet client-side and
// may not expose a stable public JSON endpoint.

const makeTopic = (id: string, name: string, description: string): Topic => ({
  id,
  name,
  description,
  patterns: [
    {
      id: `${id}-problems`,
      name: 'Problems',
      problems: [],
    },
  ],
});

// BEGIN GENERATED_NEETCODE250_TOPICS
export const neetcode250Topics: Topic[] = [
  {
    id: 'nc250-arrays-hashing',
    name: 'Arrays & Hashing',
    description: 'Hash maps, frequency, prefix sums, sorting',
    patterns: [
      {
        id: 'nc250-arrays-hashing-easy',
        name: 'Easy',
        problems: [
          { id: 'nc250-concatenation-of-array', title: 'Concatenation of Array', url: 'https://leetcode.com/problems/concatenation-of-array/', difficulty: 'Easy', pattern: 'nc250-arrays-hashing-easy' },
          { id: 'nc250-contains-duplicate', title: 'Contains Duplicate', url: 'https://leetcode.com/problems/contains-duplicate/', difficulty: 'Easy', pattern: 'nc250-arrays-hashing-easy' },
          { id: 'nc250-valid-anagram', title: 'Valid Anagram', url: 'https://leetcode.com/problems/valid-anagram/', difficulty: 'Easy', pattern: 'nc250-arrays-hashing-easy' },
          { id: 'nc250-two-sum', title: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/', difficulty: 'Easy', pattern: 'nc250-arrays-hashing-easy' },
          { id: 'nc250-longest-common-prefix', title: 'Longest Common Prefix', url: 'https://leetcode.com/problems/longest-common-prefix/', difficulty: 'Easy', pattern: 'nc250-arrays-hashing-easy' },
          { id: 'nc250-remove-element', title: 'Remove Element', url: 'https://leetcode.com/problems/remove-element/', difficulty: 'Easy', pattern: 'nc250-arrays-hashing-easy' },
          { id: 'nc250-majority-element', title: 'Majority Element', url: 'https://leetcode.com/problems/majority-element/', difficulty: 'Easy', pattern: 'nc250-arrays-hashing-easy' },
          { id: 'nc250-design-hashset', title: 'Design HashSet', url: 'https://leetcode.com/problems/design-hashset/', difficulty: 'Easy', pattern: 'nc250-arrays-hashing-easy' },
          { id: 'nc250-design-hashmap', title: 'Design HashMap', url: 'https://leetcode.com/problems/design-hashmap/', difficulty: 'Easy', pattern: 'nc250-arrays-hashing-easy' },
        ],
      },
      {
        id: 'nc250-arrays-hashing-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-group-anagrams', title: 'Group Anagrams', url: 'https://leetcode.com/problems/group-anagrams/', difficulty: 'Medium', pattern: 'nc250-arrays-hashing-medium' },
          { id: 'nc250-sort-an-array', title: 'Sort an Array', url: 'https://leetcode.com/problems/sort-an-array/', difficulty: 'Medium', pattern: 'nc250-arrays-hashing-medium' },
          { id: 'nc250-sort-colors', title: 'Sort Colors', url: 'https://leetcode.com/problems/sort-colors/', difficulty: 'Medium', pattern: 'nc250-arrays-hashing-medium' },
          { id: 'nc250-top-k-frequent-elements', title: 'Top K Frequent Elements', url: 'https://leetcode.com/problems/top-k-frequent-elements/', difficulty: 'Medium', pattern: 'nc250-arrays-hashing-medium' },
          { id: 'nc250-encode-and-decode-strings', title: 'Encode and Decode Strings', url: 'https://leetcode.com/problems/encode-and-decode-strings/', difficulty: 'Medium', pattern: 'nc250-arrays-hashing-medium' },
          { id: 'nc250-range-sum-query-2d-immutable', title: 'Range Sum Query 2D Immutable', url: 'https://leetcode.com/problems/range-sum-query-2d-immutable/', difficulty: 'Medium', pattern: 'nc250-arrays-hashing-medium' },
          { id: 'nc250-product-of-array-except-self', title: 'Product of Array Except Self', url: 'https://leetcode.com/problems/product-of-array-except-self/', difficulty: 'Medium', pattern: 'nc250-arrays-hashing-medium' },
          { id: 'nc250-valid-sudoku', title: 'Valid Sudoku', url: 'https://leetcode.com/problems/valid-sudoku/', difficulty: 'Medium', pattern: 'nc250-arrays-hashing-medium' },
          { id: 'nc250-longest-consecutive-sequence', title: 'Longest Consecutive Sequence', url: 'https://leetcode.com/problems/longest-consecutive-sequence/', difficulty: 'Medium', pattern: 'nc250-arrays-hashing-medium' },
          { id: 'nc250-best-time-to-buy-and-sell-stock-ii', title: 'Best Time to Buy And Sell Stock II', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/', difficulty: 'Medium', pattern: 'nc250-arrays-hashing-medium' },
          { id: 'nc250-majority-element-ii', title: 'Majority Element II', url: 'https://leetcode.com/problems/majority-element-ii/', difficulty: 'Medium', pattern: 'nc250-arrays-hashing-medium' },
          { id: 'nc250-subarray-sum-equals-k', title: 'Subarray Sum Equals K', url: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'Medium', pattern: 'nc250-arrays-hashing-medium' },
        ],
      },
      {
        id: 'nc250-arrays-hashing-hard',
        name: 'Hard',
        problems: [
          { id: 'nc250-first-missing-positive', title: 'First Missing Positive', url: 'https://leetcode.com/problems/first-missing-positive/', difficulty: 'Hard', pattern: 'nc250-arrays-hashing-hard' },
        ],
      },
    ],
  },
  {
    id: 'nc250-two-pointers',
    name: 'Two Pointers',
    description: 'Opposite ends, slow/fast, in-place',
    patterns: [
      {
        id: 'nc250-two-pointers-easy',
        name: 'Easy',
        problems: [
          { id: 'nc250-reverse-string', title: 'Reverse String', url: 'https://leetcode.com/problems/reverse-string/', difficulty: 'Easy', pattern: 'nc250-two-pointers-easy' },
          { id: 'nc250-valid-palindrome', title: 'Valid Palindrome', url: 'https://leetcode.com/problems/valid-palindrome/', difficulty: 'Easy', pattern: 'nc250-two-pointers-easy' },
          { id: 'nc250-valid-palindrome-ii', title: 'Valid Palindrome II', url: 'https://leetcode.com/problems/valid-palindrome-ii/', difficulty: 'Easy', pattern: 'nc250-two-pointers-easy' },
          { id: 'nc250-merge-strings-alternately', title: 'Merge Strings Alternately', url: 'https://leetcode.com/problems/merge-strings-alternately/', difficulty: 'Easy', pattern: 'nc250-two-pointers-easy' },
          { id: 'nc250-merge-sorted-array', title: 'Merge Sorted Array', url: 'https://leetcode.com/problems/merge-sorted-array/', difficulty: 'Easy', pattern: 'nc250-two-pointers-easy' },
          { id: 'nc250-remove-duplicates-from-sorted-array', title: 'Remove Duplicates From Sorted Array', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', difficulty: 'Easy', pattern: 'nc250-two-pointers-easy' },
        ],
      },
      {
        id: 'nc250-two-pointers-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-two-sum-ii-input-array-is-sorted', title: 'Two Sum II - Input Array Is Sorted', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', difficulty: 'Medium', pattern: 'nc250-two-pointers-medium' },
          { id: 'nc250-3sum', title: '3Sum', url: 'https://leetcode.com/problems/3sum/', difficulty: 'Medium', pattern: 'nc250-two-pointers-medium' },
          { id: 'nc250-4sum', title: '4Sum', url: 'https://leetcode.com/problems/4sum/', difficulty: 'Medium', pattern: 'nc250-two-pointers-medium' },
          { id: 'nc250-rotate-array', title: 'Rotate Array', url: 'https://leetcode.com/problems/rotate-array/', difficulty: 'Medium', pattern: 'nc250-two-pointers-medium' },
          { id: 'nc250-container-with-most-water', title: 'Container With Most Water', url: 'https://leetcode.com/problems/container-with-most-water/', difficulty: 'Medium', pattern: 'nc250-two-pointers-medium' },
          { id: 'nc250-boats-to-save-people', title: 'Boats to Save People', url: 'https://leetcode.com/problems/boats-to-save-people/', difficulty: 'Medium', pattern: 'nc250-two-pointers-medium' },
        ],
      },
      {
        id: 'nc250-two-pointers-hard',
        name: 'Hard',
        problems: [
          { id: 'nc250-trapping-rain-water', title: 'Trapping Rain Water', url: 'https://leetcode.com/problems/trapping-rain-water/', difficulty: 'Hard', pattern: 'nc250-two-pointers-hard' },
        ],
      },
    ],
  },
  {
    id: 'nc250-stack',
    name: 'Stack',
    description: 'Monotonic stack, parsing, evaluation',
    patterns: [
      {
        id: 'nc250-stack-easy',
        name: 'Easy',
        problems: [
          { id: 'nc250-baseball-game', title: 'Baseball Game', url: 'https://leetcode.com/problems/baseball-game/', difficulty: 'Easy', pattern: 'nc250-stack-easy' },
          { id: 'nc250-valid-parentheses', title: 'Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses/', difficulty: 'Easy', pattern: 'nc250-stack-easy' },
          { id: 'nc250-implement-stack-using-queues', title: 'Implement Stack Using Queues', url: 'https://leetcode.com/problems/implement-stack-using-queues/', difficulty: 'Easy', pattern: 'nc250-stack-easy' },
          { id: 'nc250-implement-queue-using-stacks', title: 'Implement Queue using Stacks', url: 'https://leetcode.com/problems/implement-queue-using-stacks/', difficulty: 'Easy', pattern: 'nc250-stack-easy' },
        ],
      },
      {
        id: 'nc250-stack-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-min-stack', title: 'Min Stack', url: 'https://leetcode.com/problems/min-stack/', difficulty: 'Medium', pattern: 'nc250-stack-medium' },
          { id: 'nc250-evaluate-reverse-polish-notation', title: 'Evaluate Reverse Polish Notation', url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', difficulty: 'Medium', pattern: 'nc250-stack-medium' },
          { id: 'nc250-asteroid-collision', title: 'Asteroid Collision', url: 'https://leetcode.com/problems/asteroid-collision/', difficulty: 'Medium', pattern: 'nc250-stack-medium' },
          { id: 'nc250-daily-temperatures', title: 'Daily Temperatures', url: 'https://leetcode.com/problems/daily-temperatures/', difficulty: 'Medium', pattern: 'nc250-stack-medium' },
          { id: 'nc250-online-stock-span', title: 'Online Stock Span', url: 'https://leetcode.com/problems/online-stock-span/', difficulty: 'Medium', pattern: 'nc250-stack-medium' },
          { id: 'nc250-car-fleet', title: 'Car Fleet', url: 'https://leetcode.com/problems/car-fleet/', difficulty: 'Medium', pattern: 'nc250-stack-medium' },
          { id: 'nc250-simplify-path', title: 'Simplify Path', url: 'https://leetcode.com/problems/simplify-path/', difficulty: 'Medium', pattern: 'nc250-stack-medium' },
          { id: 'nc250-decode-string', title: 'Decode String', url: 'https://leetcode.com/problems/decode-string/', difficulty: 'Medium', pattern: 'nc250-stack-medium' },
        ],
      },
      {
        id: 'nc250-stack-hard',
        name: 'Hard',
        problems: [
          { id: 'nc250-maximum-frequency-stack', title: 'Maximum Frequency Stack', url: 'https://leetcode.com/problems/maximum-frequency-stack/', difficulty: 'Hard', pattern: 'nc250-stack-hard' },
          { id: 'nc250-largest-rectangle-in-histogram', title: 'Largest Rectangle In Histogram', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', difficulty: 'Hard', pattern: 'nc250-stack-hard' },
        ],
      },
    ],
  },
  {
    id: 'nc250-binary-search',
    name: 'Binary Search',
    description: 'Search on answer, rotated, bounds',
    patterns: [
      {
        id: 'nc250-binary-search-easy',
        name: 'Easy',
        problems: [
          { id: 'nc250-binary-search', title: 'Binary Search', url: 'https://leetcode.com/problems/binary-search/', difficulty: 'Easy', pattern: 'nc250-binary-search-easy' },
          { id: 'nc250-search-insert-position', title: 'Search Insert Position', url: 'https://leetcode.com/problems/search-insert-position/', difficulty: 'Easy', pattern: 'nc250-binary-search-easy' },
          { id: 'nc250-guess-number-higher-or-lower', title: 'Guess Number Higher Or Lower', url: 'https://leetcode.com/problems/guess-number-higher-or-lower/', difficulty: 'Easy', pattern: 'nc250-binary-search-easy' },
          { id: 'nc250-sqrtx', title: 'Sqrt(x)', url: 'https://leetcode.com/problems/sqrtx/', difficulty: 'Easy', pattern: 'nc250-binary-search-easy' },
        ],
      },
      {
        id: 'nc250-binary-search-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-search-a-2d-matrix', title: 'Search a 2D Matrix', url: 'https://leetcode.com/problems/search-a-2d-matrix/', difficulty: 'Medium', pattern: 'nc250-binary-search-medium' },
          { id: 'nc250-koko-eating-bananas', title: 'Koko Eating Bananas', url: 'https://leetcode.com/problems/koko-eating-bananas/', difficulty: 'Medium', pattern: 'nc250-binary-search-medium' },
          { id: 'nc250-capacity-to-ship-packages-within-d-days', title: 'Capacity to Ship Packages Within D Days', url: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', difficulty: 'Medium', pattern: 'nc250-binary-search-medium' },
          { id: 'nc250-find-minimum-in-rotated-sorted-array', title: 'Find Minimum In Rotated Sorted Array', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'Medium', pattern: 'nc250-binary-search-medium' },
          { id: 'nc250-search-in-rotated-sorted-array', title: 'Search In Rotated Sorted Array', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'Medium', pattern: 'nc250-binary-search-medium' },
          { id: 'nc250-search-in-rotated-sorted-array-ii', title: 'Search In Rotated Sorted Array II', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array-ii/', difficulty: 'Medium', pattern: 'nc250-binary-search-medium' },
          { id: 'nc250-time-based-key-value-store', title: 'Time Based Key Value Store', url: 'https://leetcode.com/problems/time-based-key-value-store/', difficulty: 'Medium', pattern: 'nc250-binary-search-medium' },
        ],
      },
      {
        id: 'nc250-binary-search-hard',
        name: 'Hard',
        problems: [
          { id: 'nc250-split-array-largest-sum', title: 'Split Array Largest Sum', url: 'https://leetcode.com/problems/split-array-largest-sum/', difficulty: 'Hard', pattern: 'nc250-binary-search-hard' },
          { id: 'nc250-median-of-two-sorted-arrays', title: 'Median of Two Sorted Arrays', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', difficulty: 'Hard', pattern: 'nc250-binary-search-hard' },
          { id: 'nc250-find-in-mountain-array', title: 'Find in Mountain Array', url: 'https://leetcode.com/problems/find-in-mountain-array/', difficulty: 'Hard', pattern: 'nc250-binary-search-hard' },
        ],
      },
    ],
  },
  {
    id: 'nc250-sliding-window',
    name: 'Sliding Window',
    description: 'Fixed/variable windows, frequency windows',
    patterns: [
      {
        id: 'nc250-sliding-window-easy',
        name: 'Easy',
        problems: [
          { id: 'nc250-contains-duplicate-ii', title: 'Contains Duplicate II', url: 'https://leetcode.com/problems/contains-duplicate-ii/', difficulty: 'Easy', pattern: 'nc250-sliding-window-easy' },
          { id: 'nc250-best-time-to-buy-and-sell-stock', title: 'Best Time to Buy And Sell Stock', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', difficulty: 'Easy', pattern: 'nc250-sliding-window-easy' },
        ],
      },
      {
        id: 'nc250-sliding-window-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-longest-substring-without-repeating-characters', title: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'Medium', pattern: 'nc250-sliding-window-medium' },
          { id: 'nc250-longest-repeating-character-replacement', title: 'Longest Repeating Character Replacement', url: 'https://leetcode.com/problems/longest-repeating-character-replacement/', difficulty: 'Medium', pattern: 'nc250-sliding-window-medium' },
          { id: 'nc250-permutation-in-string', title: 'Permutation In String', url: 'https://leetcode.com/problems/permutation-in-string/', difficulty: 'Medium', pattern: 'nc250-sliding-window-medium' },
          { id: 'nc250-minimum-size-subarray-sum', title: 'Minimum Size Subarray Sum', url: 'https://leetcode.com/problems/minimum-size-subarray-sum/', difficulty: 'Medium', pattern: 'nc250-sliding-window-medium' },
          { id: 'nc250-find-k-closest-elements', title: 'Find K Closest Elements', url: 'https://leetcode.com/problems/find-k-closest-elements/', difficulty: 'Medium', pattern: 'nc250-sliding-window-medium' },
        ],
      },
      {
        id: 'nc250-sliding-window-hard',
        name: 'Hard',
        problems: [
          { id: 'nc250-minimum-window-substring', title: 'Minimum Window Substring', url: 'https://leetcode.com/problems/minimum-window-substring/', difficulty: 'Hard', pattern: 'nc250-sliding-window-hard' },
          { id: 'nc250-sliding-window-maximum', title: 'Sliding Window Maximum', url: 'https://leetcode.com/problems/sliding-window-maximum/', difficulty: 'Hard', pattern: 'nc250-sliding-window-hard' },
        ],
      },
    ],
  },
  {
    id: 'nc250-linked-list',
    name: 'Linked List',
    description: 'Pointers, cycles, reverse, merge',
    patterns: [
      {
        id: 'nc250-linked-list-easy',
        name: 'Easy',
        problems: [
          { id: 'nc250-reverse-linked-list', title: 'Reverse Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/', difficulty: 'Easy', pattern: 'nc250-linked-list-easy' },
          { id: 'nc250-merge-two-sorted-lists', title: 'Merge Two Sorted Lists', url: 'https://leetcode.com/problems/merge-two-sorted-lists/', difficulty: 'Easy', pattern: 'nc250-linked-list-easy' },
          { id: 'nc250-linked-list-cycle', title: 'Linked List Cycle', url: 'https://leetcode.com/problems/linked-list-cycle/', difficulty: 'Easy', pattern: 'nc250-linked-list-easy' },
        ],
      },
      {
        id: 'nc250-linked-list-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-reorder-list', title: 'Reorder List', url: 'https://leetcode.com/problems/reorder-list/', difficulty: 'Medium', pattern: 'nc250-linked-list-medium' },
          { id: 'nc250-remove-n-th-node-from-end-of-list', title: 'Remove Nth Node From End of List', url: 'https://leetcode.com/problems/remove-n-th-node-from-end-of-list/', difficulty: 'Medium', pattern: 'nc250-linked-list-medium' },
          { id: 'nc250-copy-list-with-random-pointer', title: 'Copy List With Random Pointer', url: 'https://leetcode.com/problems/copy-list-with-random-pointer/', difficulty: 'Medium', pattern: 'nc250-linked-list-medium' },
          { id: 'nc250-add-two-numbers', title: 'Add Two Numbers', url: 'https://leetcode.com/problems/add-two-numbers/', difficulty: 'Medium', pattern: 'nc250-linked-list-medium' },
          { id: 'nc250-find-the-duplicate-number', title: 'Find The Duplicate Number', url: 'https://leetcode.com/problems/find-the-duplicate-number/', difficulty: 'Medium', pattern: 'nc250-linked-list-medium' },
          { id: 'nc250-reverse-linked-list-ii', title: 'Reverse Linked List II', url: 'https://leetcode.com/problems/reverse-linked-list-ii/', difficulty: 'Medium', pattern: 'nc250-linked-list-medium' },
          { id: 'nc250-design-circular-queue', title: 'Design Circular Queue', url: 'https://leetcode.com/problems/design-circular-queue/', difficulty: 'Medium', pattern: 'nc250-linked-list-medium' },
          { id: 'nc250-lru-cache', title: 'LRU Cache', url: 'https://leetcode.com/problems/lru-cache/', difficulty: 'Medium', pattern: 'nc250-linked-list-medium' },
        ],
      },
      {
        id: 'nc250-linked-list-hard',
        name: 'Hard',
        problems: [
          { id: 'nc250-lfu-cache', title: 'LFU Cache', url: 'https://leetcode.com/problems/lfu-cache/', difficulty: 'Hard', pattern: 'nc250-linked-list-hard' },
          { id: 'nc250-merge-k-sorted-lists', title: 'Merge K Sorted Lists', url: 'https://leetcode.com/problems/merge-k-sorted-lists/', difficulty: 'Hard', pattern: 'nc250-linked-list-hard' },
          { id: 'nc250-reverse-nodes-in-k-group', title: 'Reverse Nodes In K Group', url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', difficulty: 'Hard', pattern: 'nc250-linked-list-hard' },
        ],
      },
    ],
  },
  {
    id: 'nc250-trees',
    name: 'Trees',
    description: 'DFS/BFS, recursion, BSTs',
    patterns: [
      {
        id: 'nc250-trees-easy',
        name: 'Easy',
        problems: [
          { id: 'nc250-binary-tree-inorder-traversal', title: 'Binary Tree Inorder Traversal', url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', difficulty: 'Easy', pattern: 'nc250-trees-easy' },
          { id: 'nc250-binary-tree-preorder-traversal', title: 'Binary Tree Preorder Traversal', url: 'https://leetcode.com/problems/binary-tree-preorder-traversal/', difficulty: 'Easy', pattern: 'nc250-trees-easy' },
          { id: 'nc250-binary-tree-postorder-traversal', title: 'Binary Tree Postorder Traversal', url: 'https://leetcode.com/problems/binary-tree-postorder-traversal/', difficulty: 'Easy', pattern: 'nc250-trees-easy' },
          { id: 'nc250-invert-binary-tree', title: 'Invert Binary Tree', url: 'https://leetcode.com/problems/invert-binary-tree/', difficulty: 'Easy', pattern: 'nc250-trees-easy' },
          { id: 'nc250-maximum-depth-of-binary-tree', title: 'Maximum Depth of Binary Tree', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'Easy', pattern: 'nc250-trees-easy' },
          { id: 'nc250-diameter-of-binary-tree', title: 'Diameter of Binary Tree', url: 'https://leetcode.com/problems/diameter-of-binary-tree/', difficulty: 'Easy', pattern: 'nc250-trees-easy' },
          { id: 'nc250-balanced-binary-tree', title: 'Balanced Binary Tree', url: 'https://leetcode.com/problems/balanced-binary-tree/', difficulty: 'Easy', pattern: 'nc250-trees-easy' },
          { id: 'nc250-same-tree', title: 'Same Tree', url: 'https://leetcode.com/problems/same-tree/', difficulty: 'Easy', pattern: 'nc250-trees-easy' },
          { id: 'nc250-subtree-of-another-tree', title: 'Subtree of Another Tree', url: 'https://leetcode.com/problems/subtree-of-another-tree/', difficulty: 'Easy', pattern: 'nc250-trees-easy' },
        ],
      },
      {
        id: 'nc250-trees-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-lowest-common-ancestor-of-a-binary-search-tree', title: 'Lowest Common Ancestor of a Binary Search Tree', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', difficulty: 'Medium', pattern: 'nc250-trees-medium' },
          { id: 'nc250-insert-into-a-binary-search-tree', title: 'Insert into a Binary Search Tree', url: 'https://leetcode.com/problems/insert-into-a-binary-search-tree/', difficulty: 'Medium', pattern: 'nc250-trees-medium' },
          { id: 'nc250-delete-node-in-a-bst', title: 'Delete Node in a BST', url: 'https://leetcode.com/problems/delete-node-in-a-bst/', difficulty: 'Medium', pattern: 'nc250-trees-medium' },
          { id: 'nc250-binary-tree-level-order-traversal', title: 'Binary Tree Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'Medium', pattern: 'nc250-trees-medium' },
          { id: 'nc250-binary-tree-right-side-view', title: 'Binary Tree Right Side View', url: 'https://leetcode.com/problems/binary-tree-right-side-view/', difficulty: 'Medium', pattern: 'nc250-trees-medium' },
          { id: 'nc250-construct-quad-tree', title: 'Construct Quad Tree', url: 'https://leetcode.com/problems/construct-quad-tree/', difficulty: 'Medium', pattern: 'nc250-trees-medium' },
          { id: 'nc250-count-good-nodes-in-binary-tree', title: 'Count Good Nodes In Binary Tree', url: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/', difficulty: 'Medium', pattern: 'nc250-trees-medium' },
          { id: 'nc250-validate-binary-search-tree', title: 'Validate Binary Search Tree', url: 'https://leetcode.com/problems/validate-binary-search-tree/', difficulty: 'Medium', pattern: 'nc250-trees-medium' },
          { id: 'nc250-kth-smallest-element-in-a-bst', title: 'Kth Smallest Element In a Bst', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', difficulty: 'Medium', pattern: 'nc250-trees-medium' },
          { id: 'nc250-construct-binary-tree-from-preorder-and-inorder-traversal', title: 'Construct Binary Tree from Preorder and Inorder Traversal', url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', difficulty: 'Medium', pattern: 'nc250-trees-medium' },
          { id: 'nc250-house-robber-iii', title: 'House Robber III', url: 'https://leetcode.com/problems/house-robber-iii/', difficulty: 'Medium', pattern: 'nc250-trees-medium' },
          { id: 'nc250-delete-leaves-with-a-given-value', title: 'Delete Leaves With a Given Value', url: 'https://leetcode.com/problems/delete-leaves-with-a-given-value/', difficulty: 'Medium', pattern: 'nc250-trees-medium' },
        ],
      },
      {
        id: 'nc250-trees-hard',
        name: 'Hard',
        problems: [
          { id: 'nc250-binary-tree-maximum-path-sum', title: 'Binary Tree Maximum Path Sum', url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', difficulty: 'Hard', pattern: 'nc250-trees-hard' },
          { id: 'nc250-serialize-and-deserialize-binary-tree', title: 'Serialize And Deserialize Binary Tree', url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', difficulty: 'Hard', pattern: 'nc250-trees-hard' },
        ],
      },
    ],
  },
  {
    id: 'nc250-tries',
    name: 'Tries',
    description: 'Prefix trees, word search',
    patterns: [
      {
        id: 'nc250-tries-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-implement-trie-prefix-tree', title: 'Implement Trie Prefix Tree', url: 'https://leetcode.com/problems/implement-trie-prefix-tree/', difficulty: 'Medium', pattern: 'nc250-tries-medium' },
          { id: 'nc250-design-add-and-search-words-data-structure', title: 'Design Add and Search Words Data Structure', url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', difficulty: 'Medium', pattern: 'nc250-tries-medium' },
          { id: 'nc250-extra-characters-in-a-string', title: 'Extra Characters in a String', url: 'https://leetcode.com/problems/extra-characters-in-a-string/', difficulty: 'Medium', pattern: 'nc250-tries-medium' },
        ],
      },
      {
        id: 'nc250-tries-hard',
        name: 'Hard',
        problems: [
          { id: 'nc250-word-search-ii', title: 'Word Search II', url: 'https://leetcode.com/problems/word-search-ii/', difficulty: 'Hard', pattern: 'nc250-tries-hard' },
        ],
      },
    ],
  },
  {
    id: 'nc250-heap',
    name: 'Heap / Priority Queue',
    description: 'Top-K, streaming, merge',
    patterns: [
      {
        id: 'nc250-heap-easy',
        name: 'Easy',
        problems: [
          { id: 'nc250-kth-largest-element-in-a-stream', title: 'Kth Largest Element In a Stream', url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/', difficulty: 'Easy', pattern: 'nc250-heap-easy' },
          { id: 'nc250-last-stone-weight', title: 'Last Stone Weight', url: 'https://leetcode.com/problems/last-stone-weight/', difficulty: 'Easy', pattern: 'nc250-heap-easy' },
        ],
      },
      {
        id: 'nc250-heap-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-k-closest-points-to-origin', title: 'K Closest Points to Origin', url: 'https://leetcode.com/problems/k-closest-points-to-origin/', difficulty: 'Medium', pattern: 'nc250-heap-medium' },
          { id: 'nc250-kth-largest-element-in-an-array', title: 'Kth Largest Element In An Array', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', difficulty: 'Medium', pattern: 'nc250-heap-medium' },
          { id: 'nc250-task-scheduler', title: 'Task Scheduler', url: 'https://leetcode.com/problems/task-scheduler/', difficulty: 'Medium', pattern: 'nc250-heap-medium' },
          { id: 'nc250-design-twitter', title: 'Design Twitter', url: 'https://leetcode.com/problems/design-twitter/', difficulty: 'Medium', pattern: 'nc250-heap-medium' },
          { id: 'nc250-single-threaded-cpu', title: 'Single Threaded CPU', url: 'https://leetcode.com/problems/single-threaded-cpu/', difficulty: 'Medium', pattern: 'nc250-heap-medium' },
          { id: 'nc250-reorganize-string', title: 'Reorganize String', url: 'https://leetcode.com/problems/reorganize-string/', difficulty: 'Medium', pattern: 'nc250-heap-medium' },
          { id: 'nc250-longest-happy-string', title: 'Longest Happy String', url: 'https://leetcode.com/problems/longest-happy-string/', difficulty: 'Medium', pattern: 'nc250-heap-medium' },
          { id: 'nc250-car-pooling', title: 'Car Pooling', url: 'https://leetcode.com/problems/car-pooling/', difficulty: 'Medium', pattern: 'nc250-heap-medium' },
        ],
      },
      {
        id: 'nc250-heap-hard',
        name: 'Hard',
        problems: [
          { id: 'nc250-find-median-from-data-stream', title: 'Find Median from Data Stream', url: 'https://leetcode.com/problems/find-median-from-data-stream/', difficulty: 'Hard', pattern: 'nc250-heap-hard' },
          { id: 'nc250-ipo', title: 'IPO', url: 'https://leetcode.com/problems/ipo/', difficulty: 'Hard', pattern: 'nc250-heap-hard' },
        ],
      },
    ],
  },
  {
    id: 'nc250-backtracking',
    name: 'Backtracking',
    description: 'Subsets, permutations, pruning',
    patterns: [
      {
        id: 'nc250-backtracking-easy',
        name: 'Easy',
        problems: [
          { id: 'nc250-sum-of-all-subsets-xor-total', title: 'Sum of All Subsets XOR Total', url: 'https://leetcode.com/problems/sum-of-all-subsets-xor-total/', difficulty: 'Easy', pattern: 'nc250-backtracking-easy' },
        ],
      },
      {
        id: 'nc250-backtracking-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-subsets', title: 'Subsets', url: 'https://leetcode.com/problems/subsets/', difficulty: 'Medium', pattern: 'nc250-backtracking-medium' },
          { id: 'nc250-combination-sum', title: 'Combination Sum', url: 'https://leetcode.com/problems/combination-sum/', difficulty: 'Medium', pattern: 'nc250-backtracking-medium' },
          { id: 'nc250-combination-sum-ii', title: 'Combination Sum II', url: 'https://leetcode.com/problems/combination-sum-ii/', difficulty: 'Medium', pattern: 'nc250-backtracking-medium' },
          { id: 'nc250-combinations', title: 'Combinations', url: 'https://leetcode.com/problems/combinations/', difficulty: 'Medium', pattern: 'nc250-backtracking-medium' },
          { id: 'nc250-permutations', title: 'Permutations', url: 'https://leetcode.com/problems/permutations/', difficulty: 'Medium', pattern: 'nc250-backtracking-medium' },
          { id: 'nc250-subsets-ii', title: 'Subsets II', url: 'https://leetcode.com/problems/subsets-ii/', difficulty: 'Medium', pattern: 'nc250-backtracking-medium' },
          { id: 'nc250-permutations-ii', title: 'Permutations II', url: 'https://leetcode.com/problems/permutations-ii/', difficulty: 'Medium', pattern: 'nc250-backtracking-medium' },
          { id: 'nc250-generate-parentheses', title: 'Generate Parentheses', url: 'https://leetcode.com/problems/generate-parentheses/', difficulty: 'Medium', pattern: 'nc250-backtracking-medium' },
          { id: 'nc250-word-search', title: 'Word Search', url: 'https://leetcode.com/problems/word-search/', difficulty: 'Medium', pattern: 'nc250-backtracking-medium' },
          { id: 'nc250-palindrome-partitioning', title: 'Palindrome Partitioning', url: 'https://leetcode.com/problems/palindrome-partitioning/', difficulty: 'Medium', pattern: 'nc250-backtracking-medium' },
          { id: 'nc250-letter-combinations-of-a-phone-number', title: 'Letter Combinations of a Phone Number', url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', difficulty: 'Medium', pattern: 'nc250-backtracking-medium' },
          { id: 'nc250-matchsticks-to-square', title: 'Matchsticks to Square', url: 'https://leetcode.com/problems/matchsticks-to-square/', difficulty: 'Medium', pattern: 'nc250-backtracking-medium' },
          { id: 'nc250-partition-to-k-equal-sum-subsets', title: 'Partition to K Equal Sum Subsets', url: 'https://leetcode.com/problems/partition-to-k-equal-sum-subsets/', difficulty: 'Medium', pattern: 'nc250-backtracking-medium' },
        ],
      },
      {
        id: 'nc250-backtracking-hard',
        name: 'Hard',
        problems: [
          { id: 'nc250-n-queens', title: 'N Queens', url: 'https://leetcode.com/problems/n-queens/', difficulty: 'Hard', pattern: 'nc250-backtracking-hard' },
          { id: 'nc250-n-queens-ii', title: 'N Queens II', url: 'https://leetcode.com/problems/n-queens-ii/', difficulty: 'Hard', pattern: 'nc250-backtracking-hard' },
          { id: 'nc250-word-break-ii', title: 'Word Break II', url: 'https://leetcode.com/problems/word-break-ii/', difficulty: 'Hard', pattern: 'nc250-backtracking-hard' },
        ],
      },
    ],
  },
  {
    id: 'nc250-graphs',
    name: 'Graphs',
    description: 'DFS/BFS, union-find, topo sort',
    patterns: [
      {
        id: 'nc250-graphs-easy',
        name: 'Easy',
        problems: [
          { id: 'nc250-island-perimeter', title: 'Island Perimeter', url: 'https://leetcode.com/problems/island-perimeter/', difficulty: 'Easy', pattern: 'nc250-graphs-easy' },
          { id: 'nc250-verifying-an-alien-dictionary', title: 'Verifying An Alien Dictionary', url: 'https://leetcode.com/problems/verifying-an-alien-dictionary/', difficulty: 'Easy', pattern: 'nc250-graphs-easy' },
          { id: 'nc250-find-the-town-judge', title: 'Find the Town Judge', url: 'https://leetcode.com/problems/find-the-town-judge/', difficulty: 'Easy', pattern: 'nc250-graphs-easy' },
        ],
      },
      {
        id: 'nc250-graphs-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-number-of-islands', title: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
          { id: 'nc250-max-area-of-island', title: 'Max Area of Island', url: 'https://leetcode.com/problems/max-area-of-island/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
          { id: 'nc250-clone-graph', title: 'Clone Graph', url: 'https://leetcode.com/problems/clone-graph/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
          { id: 'nc250-walls-and-gates', title: 'Walls And Gates', url: 'https://leetcode.com/problems/walls-and-gates/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
          { id: 'nc250-rotting-oranges', title: 'Rotting Oranges', url: 'https://leetcode.com/problems/rotting-oranges/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
          { id: 'nc250-pacific-atlantic-water-flow', title: 'Pacific Atlantic Water Flow', url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
          { id: 'nc250-surrounded-regions', title: 'Surrounded Regions', url: 'https://leetcode.com/problems/surrounded-regions/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
          { id: 'nc250-open-the-lock', title: 'Open The Lock', url: 'https://leetcode.com/problems/open-the-lock/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
          { id: 'nc250-course-schedule', title: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
          { id: 'nc250-course-schedule-ii', title: 'Course Schedule II', url: 'https://leetcode.com/problems/course-schedule-ii/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
          { id: 'nc250-graph-valid-tree', title: 'Graph Valid Tree', url: 'https://leetcode.com/problems/graph-valid-tree/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
          { id: 'nc250-course-schedule-iv', title: 'Course Schedule IV', url: 'https://leetcode.com/problems/course-schedule-iv/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
          { id: 'nc250-number-of-connected-components-in-an-undirected-graph', title: 'Number of Connected Components in an Undirected Graph', url: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
          { id: 'nc250-redundant-connection', title: 'Redundant Connection', url: 'https://leetcode.com/problems/redundant-connection/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
          { id: 'nc250-accounts-merge', title: 'Accounts Merge', url: 'https://leetcode.com/problems/accounts-merge/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
          { id: 'nc250-evaluate-division', title: 'Evaluate Division', url: 'https://leetcode.com/problems/evaluate-division/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
          { id: 'nc250-minimum-height-trees', title: 'Minimum Height Trees', url: 'https://leetcode.com/problems/minimum-height-trees/', difficulty: 'Medium', pattern: 'nc250-graphs-medium' },
        ],
      },
      {
        id: 'nc250-graphs-hard',
        name: 'Hard',
        problems: [
          { id: 'nc250-word-ladder', title: 'Word Ladder', url: 'https://leetcode.com/problems/word-ladder/', difficulty: 'Hard', pattern: 'nc250-graphs-hard' },
        ],
      },
    ],
  },
  {
    id: 'nc250-adv-graphs',
    name: 'Advanced Graphs',
    description: 'Shortest paths, MST, advanced traversals',
    patterns: [
      {
        id: 'nc250-adv-graphs-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-path-with-minimum-effort', title: 'Path with Minimum Effort', url: 'https://leetcode.com/problems/path-with-minimum-effort/', difficulty: 'Medium', pattern: 'nc250-adv-graphs-medium' },
          { id: 'nc250-network-delay-time', title: 'Network Delay Time', url: 'https://leetcode.com/problems/network-delay-time/', difficulty: 'Medium', pattern: 'nc250-adv-graphs-medium' },
          { id: 'nc250-min-cost-to-connect-all-points', title: 'Min Cost to Connect All Points', url: 'https://leetcode.com/problems/min-cost-to-connect-all-points/', difficulty: 'Medium', pattern: 'nc250-adv-graphs-medium' },
          { id: 'nc250-cheapest-flights-within-k-stops', title: 'Cheapest Flights Within K Stops', url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', difficulty: 'Medium', pattern: 'nc250-adv-graphs-medium' },
        ],
      },
      {
        id: 'nc250-adv-graphs-hard',
        name: 'Hard',
        problems: [
          { id: 'nc250-reconstruct-itinerary', title: 'Reconstruct Itinerary', url: 'https://leetcode.com/problems/reconstruct-itinerary/', difficulty: 'Hard', pattern: 'nc250-adv-graphs-hard' },
          { id: 'nc250-swim-in-rising-water', title: 'Swim In Rising Water', url: 'https://leetcode.com/problems/swim-in-rising-water/', difficulty: 'Hard', pattern: 'nc250-adv-graphs-hard' },
          { id: 'nc250-alien-dictionary', title: 'Alien Dictionary', url: 'https://leetcode.com/problems/alien-dictionary/', difficulty: 'Hard', pattern: 'nc250-adv-graphs-hard' },
          { id: 'nc250-find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree', title: 'Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree', url: 'https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/', difficulty: 'Hard', pattern: 'nc250-adv-graphs-hard' },
          { id: 'nc250-build-a-matrix-with-conditions', title: 'Build a Matrix With Conditions', url: 'https://leetcode.com/problems/build-a-matrix-with-conditions/', difficulty: 'Hard', pattern: 'nc250-adv-graphs-hard' },
          { id: 'nc250-greatest-common-divisor-traversal', title: 'Greatest Common Divisor Traversal', url: 'https://leetcode.com/problems/greatest-common-divisor-traversal/', difficulty: 'Hard', pattern: 'nc250-adv-graphs-hard' },
        ],
      },
    ],
  },
  {
    id: 'nc250-1d-dp',
    name: '1-D DP',
    description: 'Linear DP, Kadane, LIS-style',
    patterns: [
      {
        id: 'nc250-1d-dp-easy',
        name: 'Easy',
        problems: [
          { id: 'nc250-climbing-stairs', title: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'Easy', pattern: 'nc250-1d-dp-easy' },
          { id: 'nc250-min-cost-climbing-stairs', title: 'Min Cost Climbing Stairs', url: 'https://leetcode.com/problems/min-cost-climbing-stairs/', difficulty: 'Easy', pattern: 'nc250-1d-dp-easy' },
          { id: 'nc250-n-th-tribonacci-number', title: 'N-th Tribonacci Number', url: 'https://leetcode.com/problems/n-th-tribonacci-number/', difficulty: 'Easy', pattern: 'nc250-1d-dp-easy' },
        ],
      },
      {
        id: 'nc250-1d-dp-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-house-robber', title: 'House Robber', url: 'https://leetcode.com/problems/house-robber/', difficulty: 'Medium', pattern: 'nc250-1d-dp-medium' },
          { id: 'nc250-house-robber-ii', title: 'House Robber II', url: 'https://leetcode.com/problems/house-robber-ii/', difficulty: 'Medium', pattern: 'nc250-1d-dp-medium' },
          { id: 'nc250-longest-palindromic-substring', title: 'Longest Palindromic Substring', url: 'https://leetcode.com/problems/longest-palindromic-substring/', difficulty: 'Medium', pattern: 'nc250-1d-dp-medium' },
          { id: 'nc250-palindromic-substrings', title: 'Palindromic Substrings', url: 'https://leetcode.com/problems/palindromic-substrings/', difficulty: 'Medium', pattern: 'nc250-1d-dp-medium' },
          { id: 'nc250-decode-ways', title: 'Decode Ways', url: 'https://leetcode.com/problems/decode-ways/', difficulty: 'Medium', pattern: 'nc250-1d-dp-medium' },
          { id: 'nc250-coin-change', title: 'Coin Change', url: 'https://leetcode.com/problems/coin-change/', difficulty: 'Medium', pattern: 'nc250-1d-dp-medium' },
          { id: 'nc250-maximum-product-subarray', title: 'Maximum Product Subarray', url: 'https://leetcode.com/problems/maximum-product-subarray/', difficulty: 'Medium', pattern: 'nc250-1d-dp-medium' },
          { id: 'nc250-word-break', title: 'Word Break', url: 'https://leetcode.com/problems/word-break/', difficulty: 'Medium', pattern: 'nc250-1d-dp-medium' },
          { id: 'nc250-longest-increasing-subsequence', title: 'Longest Increasing Subsequence', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', difficulty: 'Medium', pattern: 'nc250-1d-dp-medium' },
          { id: 'nc250-partition-equal-subset-sum', title: 'Partition Equal Subset Sum', url: 'https://leetcode.com/problems/partition-equal-subset-sum/', difficulty: 'Medium', pattern: 'nc250-1d-dp-medium' },
          { id: 'nc250-combination-sum-iv', title: 'Combination Sum IV', url: 'https://leetcode.com/problems/combination-sum-iv/', difficulty: 'Medium', pattern: 'nc250-1d-dp-medium' },
          { id: 'nc250-perfect-squares', title: 'Perfect Squares', url: 'https://leetcode.com/problems/perfect-squares/', difficulty: 'Medium', pattern: 'nc250-1d-dp-medium' },
          { id: 'nc250-integer-break', title: 'Integer Break', url: 'https://leetcode.com/problems/integer-break/', difficulty: 'Medium', pattern: 'nc250-1d-dp-medium' },
        ],
      },
      {
        id: 'nc250-1d-dp-hard',
        name: 'Hard',
        problems: [
          { id: 'nc250-stone-game-iii', title: 'Stone Game III', url: 'https://leetcode.com/problems/stone-game-iii/', difficulty: 'Hard', pattern: 'nc250-1d-dp-hard' },
        ],
      },
    ],
  },
  {
    id: 'nc250-2d-dp',
    name: '2-D DP',
    description: 'Grid DP, knapsack-style',
    patterns: [
      {
        id: 'nc250-2d-dp-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-unique-paths', title: 'Unique Paths', url: 'https://leetcode.com/problems/unique-paths/', difficulty: 'Medium', pattern: 'nc250-2d-dp-medium' },
          { id: 'nc250-unique-paths-ii', title: 'Unique Paths II', url: 'https://leetcode.com/problems/unique-paths-ii/', difficulty: 'Medium', pattern: 'nc250-2d-dp-medium' },
          { id: 'nc250-minimum-path-sum', title: 'Minimum Path Sum', url: 'https://leetcode.com/problems/minimum-path-sum/', difficulty: 'Medium', pattern: 'nc250-2d-dp-medium' },
          { id: 'nc250-longest-common-subsequence', title: 'Longest Common Subsequence', url: 'https://leetcode.com/problems/longest-common-subsequence/', difficulty: 'Medium', pattern: 'nc250-2d-dp-medium' },
          { id: 'nc250-last-stone-weight-ii', title: 'Last Stone Weight II', url: 'https://leetcode.com/problems/last-stone-weight-ii/', difficulty: 'Medium', pattern: 'nc250-2d-dp-medium' },
          { id: 'nc250-best-time-to-buy-and-sell-stock-with-cooldown', title: 'Best Time to Buy and Sell Stock with Cooldown', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/', difficulty: 'Medium', pattern: 'nc250-2d-dp-medium' },
          { id: 'nc250-coin-change-ii', title: 'Coin Change II', url: 'https://leetcode.com/problems/coin-change-ii/', difficulty: 'Medium', pattern: 'nc250-2d-dp-medium' },
          { id: 'nc250-target-sum', title: 'Target Sum', url: 'https://leetcode.com/problems/target-sum/', difficulty: 'Medium', pattern: 'nc250-2d-dp-medium' },
          { id: 'nc250-interleaving-string', title: 'Interleaving String', url: 'https://leetcode.com/problems/interleaving-string/', difficulty: 'Medium', pattern: 'nc250-2d-dp-medium' },
          { id: 'nc250-stone-game', title: 'Stone Game', url: 'https://leetcode.com/problems/stone-game/', difficulty: 'Medium', pattern: 'nc250-2d-dp-medium' },
          { id: 'nc250-stone-game-ii', title: 'Stone Game II', url: 'https://leetcode.com/problems/stone-game-ii/', difficulty: 'Medium', pattern: 'nc250-2d-dp-medium' },
          { id: 'nc250-edit-distance', title: 'Edit Distance', url: 'https://leetcode.com/problems/edit-distance/', difficulty: 'Medium', pattern: 'nc250-2d-dp-medium' },
        ],
      },
      {
        id: 'nc250-2d-dp-hard',
        name: 'Hard',
        problems: [
          { id: 'nc250-longest-increasing-path-in-a-matrix', title: 'Longest Increasing Path In a Matrix', url: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/', difficulty: 'Hard', pattern: 'nc250-2d-dp-hard' },
          { id: 'nc250-distinct-subsequences', title: 'Distinct Subsequences', url: 'https://leetcode.com/problems/distinct-subsequences/', difficulty: 'Hard', pattern: 'nc250-2d-dp-hard' },
          { id: 'nc250-burst-balloons', title: 'Burst Balloons', url: 'https://leetcode.com/problems/burst-balloons/', difficulty: 'Hard', pattern: 'nc250-2d-dp-hard' },
          { id: 'nc250-regular-expression-matching', title: 'Regular Expression Matching', url: 'https://leetcode.com/problems/regular-expression-matching/', difficulty: 'Hard', pattern: 'nc250-2d-dp-hard' },
        ],
      },
    ],
  },
  {
    id: 'nc250-greedy',
    name: 'Greedy',
    description: 'Local optimal choices, intervals, scheduling',
    patterns: [
      {
        id: 'nc250-greedy-easy',
        name: 'Easy',
        problems: [
          { id: 'nc250-lemonade-change', title: 'Lemonade Change', url: 'https://leetcode.com/problems/lemonade-change/', difficulty: 'Easy', pattern: 'nc250-greedy-easy' },
        ],
      },
      {
        id: 'nc250-greedy-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-maximum-subarray', title: 'Maximum Subarray', url: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'Medium', pattern: 'nc250-greedy-medium' },
          { id: 'nc250-maximum-sum-circular-subarray', title: 'Maximum Sum Circular Subarray', url: 'https://leetcode.com/problems/maximum-sum-circular-subarray/', difficulty: 'Medium', pattern: 'nc250-greedy-medium' },
          { id: 'nc250-longest-turbulent-subarray', title: 'Longest Turbulent Subarray', url: 'https://leetcode.com/problems/longest-turbulent-subarray/', difficulty: 'Medium', pattern: 'nc250-greedy-medium' },
          { id: 'nc250-jump-game', title: 'Jump Game', url: 'https://leetcode.com/problems/jump-game/', difficulty: 'Medium', pattern: 'nc250-greedy-medium' },
          { id: 'nc250-jump-game-ii', title: 'Jump Game II', url: 'https://leetcode.com/problems/jump-game-ii/', difficulty: 'Medium', pattern: 'nc250-greedy-medium' },
          { id: 'nc250-jump-game-vii', title: 'Jump Game VII', url: 'https://leetcode.com/problems/jump-game-vii/', difficulty: 'Medium', pattern: 'nc250-greedy-medium' },
          { id: 'nc250-gas-station', title: 'Gas Station', url: 'https://leetcode.com/problems/gas-station/', difficulty: 'Medium', pattern: 'nc250-greedy-medium' },
          { id: 'nc250-hand-of-straights', title: 'Hand of Straights', url: 'https://leetcode.com/problems/hand-of-straights/', difficulty: 'Medium', pattern: 'nc250-greedy-medium' },
          { id: 'nc250-dota2-senate', title: 'Dota2 Senate', url: 'https://leetcode.com/problems/dota2-senate/', difficulty: 'Medium', pattern: 'nc250-greedy-medium' },
          { id: 'nc250-5a-merge-triple-o-form-target-triple', title: '5a Merge Triple o Form Target Triple', url: 'https://leetcode.com/problems/5a-merge-triple-o-form-target-triple/', difficulty: 'Medium', pattern: 'nc250-greedy-medium' },
          { id: 'nc250-partition-labels', title: 'Partition Labels', url: 'https://leetcode.com/problems/partition-labels/', difficulty: 'Medium', pattern: 'nc250-greedy-medium' },
          { id: 'nc250-valid-parenthesis-string', title: 'Valid Parenthesis String', url: 'https://leetcode.com/problems/valid-parenthesis-string/', difficulty: 'Medium', pattern: 'nc250-greedy-medium' },
        ],
      },
      {
        id: 'nc250-greedy-hard',
        name: 'Hard',
        problems: [
          { id: 'nc250-candy', title: 'Candy', url: 'https://leetcode.com/problems/candy/', difficulty: 'Hard', pattern: 'nc250-greedy-hard' },
        ],
      },
    ],
  },
  {
    id: 'nc250-intervals',
    name: 'Intervals',
    description: 'Merge, sweep line, meeting rooms',
    patterns: [
      {
        id: 'nc250-intervals-easy',
        name: 'Easy',
        problems: [
          { id: 'nc250-meeting-rooms', title: 'Meeting Rooms', url: 'https://leetcode.com/problems/meeting-rooms/', difficulty: 'Easy', pattern: 'nc250-intervals-easy' },
        ],
      },
      {
        id: 'nc250-intervals-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-insert-interval', title: 'Insert Interval', url: 'https://leetcode.com/problems/insert-interval/', difficulty: 'Medium', pattern: 'nc250-intervals-medium' },
          { id: 'nc250-merge-intervals', title: 'Merge Intervals', url: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'Medium', pattern: 'nc250-intervals-medium' },
          { id: 'nc250-non-overlapping-intervals', title: 'Non Overlapping Intervals', url: 'https://leetcode.com/problems/non-overlapping-intervals/', difficulty: 'Medium', pattern: 'nc250-intervals-medium' },
          { id: 'nc250-meeting-rooms-ii', title: 'Meeting Rooms II', url: 'https://leetcode.com/problems/meeting-rooms-ii/', difficulty: 'Medium', pattern: 'nc250-intervals-medium' },
        ],
      },
      {
        id: 'nc250-intervals-hard',
        name: 'Hard',
        problems: [
          { id: 'nc250-meeting-rooms-iii', title: 'Meeting Rooms III', url: 'https://leetcode.com/problems/meeting-rooms-iii/', difficulty: 'Hard', pattern: 'nc250-intervals-hard' },
          { id: 'nc250-minimum-interval-to-include-each-query', title: 'Minimum Interval to Include Each Query', url: 'https://leetcode.com/problems/minimum-interval-to-include-each-query/', difficulty: 'Hard', pattern: 'nc250-intervals-hard' },
        ],
      },
    ],
  },
  {
    id: 'nc250-math-geometry',
    name: 'Math & Geometry',
    description: 'Number theory, geometry, combinatorics',
    patterns: [
      {
        id: 'nc250-math-geometry-easy',
        name: 'Easy',
        problems: [
          { id: 'nc250-excel-sheet-column-title', title: 'Excel Sheet Column Title', url: 'https://leetcode.com/problems/excel-sheet-column-title/', difficulty: 'Easy', pattern: 'nc250-math-geometry-easy' },
          { id: 'nc250-greatest-common-divisor-of-strings', title: 'Greatest Common Divisor of Strings', url: 'https://leetcode.com/problems/greatest-common-divisor-of-strings/', difficulty: 'Easy', pattern: 'nc250-math-geometry-easy' },
          { id: 'nc250-transpose-matrix', title: 'Transpose Matrix', url: 'https://leetcode.com/problems/transpose-matrix/', difficulty: 'Easy', pattern: 'nc250-math-geometry-easy' },
          { id: 'nc250-happy-number', title: 'Happy Number', url: 'https://leetcode.com/problems/happy-number/', difficulty: 'Easy', pattern: 'nc250-math-geometry-easy' },
          { id: 'nc250-plus-one', title: 'Plus One', url: 'https://leetcode.com/problems/plus-one/', difficulty: 'Easy', pattern: 'nc250-math-geometry-easy' },
          { id: 'nc250-roman-to-integer', title: 'Roman to Integer', url: 'https://leetcode.com/problems/roman-to-integer/', difficulty: 'Easy', pattern: 'nc250-math-geometry-easy' },
        ],
      },
      {
        id: 'nc250-math-geometry-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-insert-greatest-common-divisors-in-linked-list', title: 'Insert Greatest Common Divisors in Linked List', url: 'https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/', difficulty: 'Medium', pattern: 'nc250-math-geometry-medium' },
          { id: 'nc250-rotate-image', title: 'Rotate Image', url: 'https://leetcode.com/problems/rotate-image/', difficulty: 'Medium', pattern: 'nc250-math-geometry-medium' },
          { id: 'nc250-spiral-matrix', title: 'Spiral Matrix', url: 'https://leetcode.com/problems/spiral-matrix/', difficulty: 'Medium', pattern: 'nc250-math-geometry-medium' },
          { id: 'nc250-set-matrix-zeroes', title: 'Set Matrix Zeroes', url: 'https://leetcode.com/problems/set-matrix-zeroes/', difficulty: 'Medium', pattern: 'nc250-math-geometry-medium' },
          { id: 'nc250-powx-n', title: 'Pow(x, n)', url: 'https://leetcode.com/problems/powx-n/', difficulty: 'Medium', pattern: 'nc250-math-geometry-medium' },
          { id: 'nc250-multiply-strings', title: 'Multiply Strings', url: 'https://leetcode.com/problems/multiply-strings/', difficulty: 'Medium', pattern: 'nc250-math-geometry-medium' },
          { id: 'nc250-detect-squares', title: 'Detect Squares', url: 'https://leetcode.com/problems/detect-squares/', difficulty: 'Medium', pattern: 'nc250-math-geometry-medium' },
        ],
      },
    ],
  },
  {
    id: 'nc250-bit',
    name: 'Bit Manipulation',
    description: 'XOR, masks, shifts',
    patterns: [
      {
        id: 'nc250-bit-easy',
        name: 'Easy',
        problems: [
          { id: 'nc250-single-number', title: 'Single Number', url: 'https://leetcode.com/problems/single-number/', difficulty: 'Easy', pattern: 'nc250-bit-easy' },
          { id: 'nc250-number-of-1-bits', title: 'Number of 1 Bits', url: 'https://leetcode.com/problems/number-of-1-bits/', difficulty: 'Easy', pattern: 'nc250-bit-easy' },
          { id: 'nc250-counting-bits', title: 'Counting Bits', url: 'https://leetcode.com/problems/counting-bits/', difficulty: 'Easy', pattern: 'nc250-bit-easy' },
          { id: 'nc250-add-binary', title: 'Add Binary', url: 'https://leetcode.com/problems/add-binary/', difficulty: 'Easy', pattern: 'nc250-bit-easy' },
          { id: 'nc250-reverse-bits', title: 'Reverse Bits', url: 'https://leetcode.com/problems/reverse-bits/', difficulty: 'Easy', pattern: 'nc250-bit-easy' },
          { id: 'nc250-missing-number', title: 'Missing Number', url: 'https://leetcode.com/problems/missing-number/', difficulty: 'Easy', pattern: 'nc250-bit-easy' },
        ],
      },
      {
        id: 'nc250-bit-medium',
        name: 'Medium',
        problems: [
          { id: 'nc250-sum-of-two-integers', title: 'Sum of Two Integers', url: 'https://leetcode.com/problems/sum-of-two-integers/', difficulty: 'Medium', pattern: 'nc250-bit-medium' },
          { id: 'nc250-reverse-integer', title: 'Reverse Integer', url: 'https://leetcode.com/problems/reverse-integer/', difficulty: 'Medium', pattern: 'nc250-bit-medium' },
          { id: 'nc250-bitwise-and-of-numbers-range', title: 'Bitwise AND of Numbers Range', url: 'https://leetcode.com/problems/bitwise-and-of-numbers-range/', difficulty: 'Medium', pattern: 'nc250-bit-medium' },
          { id: 'nc250-minimum-array-end', title: 'Minimum Array End', url: 'https://leetcode.com/problems/minimum-array-end/', difficulty: 'Medium', pattern: 'nc250-bit-medium' },
        ],
      },
    ],
  },
];
// END GENERATED_NEETCODE250_TOPICS

export const getNeetcode250AllProblems = (): Problem[] => {
  const problems: Problem[] = [];
  neetcode250Topics.forEach((topic) => {
    topic.patterns.forEach((pattern) => {
      problems.push(...pattern.problems);
    });
  });
  return problems;
};

export const getNeetcode250TotalCount = (): number => getNeetcode250AllProblems().length;

export const getNeetcode250CountByDifficulty = (): { easy: number; medium: number; hard: number } => {
  const all = getNeetcode250AllProblems();
  return {
    easy: all.filter((p) => p.difficulty === 'Easy').length,
    medium: all.filter((p) => p.difficulty === 'Medium').length,
    hard: all.filter((p) => p.difficulty === 'Hard').length,
  };
};

export const getNeetcode250CompletedCount = (
  progress: Record<string, { completed?: boolean }>,
): number => {
  const ids = new Set(getNeetcode250AllProblems().map((p) => p.id));
  let completed = 0;
  Object.entries(progress).forEach(([id, entry]) => {
    if (!ids.has(id)) return;
    if (entry?.completed) completed += 1;
  });
  return completed;
};

export const isValidLeetCodeProblemUrl = (url: string): boolean => {
  // Keep it strict: only canonical LeetCode problem URLs.
  return /^https:\/\/leetcode\.com\/problems\/[a-z0-9-]+\/?$/.test(url);
};

export const makeNeetcode250ProblemId = (leetcodeUrl: string): string => {
  const slug = leetcodeUrl
    .replace('https://leetcode.com/problems/', '')
    .replace(/\/+$/, '')
    .trim();
  return `nc250-${slug}`;
};

export const normalizeLeetCodeProblemUrl = (leetcodeUrl: string): string => {
  const url = leetcodeUrl.trim();
  if (url.endsWith('/')) return url;
  return `${url}/`;
};

export const createNeetcode250Problem = (input: {
  title: string;
  url: string;
  difficulty: Difficulty;
  patternId: string;
}): Problem => {
  const url = normalizeLeetCodeProblemUrl(input.url);
  if (!isValidLeetCodeProblemUrl(url)) {
    throw new Error(`Invalid LeetCode problem URL (must be https://leetcode.com/problems/<slug>/): ${input.url}`);
  }

  return {
    id: makeNeetcode250ProblemId(url),
    title: input.title,
    url,
    difficulty: input.difficulty,
    pattern: input.patternId,
  };
};
