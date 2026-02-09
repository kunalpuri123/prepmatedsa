export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Problem {
  id: string;
  title: string;
  url: string;
  difficulty: Difficulty;
  pattern: string;
  youtubeUrl?: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  patterns: Pattern[];
}

export interface Pattern {
  id: string;
  name: string;
  problems: Problem[];
}

export const dsaTopics: Topic[] = [
  {
    id: 'maths',
    name: 'Maths / Number Theory',
    description: 'Foundation concepts for DSA',
    patterns: [
      {
        id: 'maths-basics',
        name: 'Basic Maths',
        problems: [
          { id: 'm1', title: 'Count Primes', url: 'https://leetcode.com/problems/count-primes/', difficulty: 'Medium', pattern: 'maths-basics' },
          { id: 'm2', title: 'Sqrt(x)', url: 'https://leetcode.com/problems/sqrtx/', difficulty: 'Easy', pattern: 'maths-basics' },
          { id: 'm3', title: 'Happy Number', url: 'https://leetcode.com/problems/happy-number/', difficulty: 'Easy', pattern: 'maths-basics' },
          { id: 'm4', title: 'Excel Sheet Column Number', url: 'https://leetcode.com/problems/excel-sheet-column-number/', difficulty: 'Easy', pattern: 'maths-basics' },
          { id: 'm5', title: 'Factorial Trailing Zeroes', url: 'https://leetcode.com/problems/factorial-trailing-zeroes/', difficulty: 'Medium', pattern: 'maths-basics' },
          { id: 'm6', title: 'Pow(x, n)', url: 'https://leetcode.com/problems/powx-n/', difficulty: 'Medium', pattern: 'maths-basics' },
          { id: 'm7', title: 'Divide Two Integers', url: 'https://leetcode.com/problems/divide-two-integers/', difficulty: 'Medium', pattern: 'maths-basics' },
        ]
      }
    ]
  },
  {
    id: 'recursion-basics',
    name: 'Recursion Basics',
    description: 'Master recursion before trees/DP',
    patterns: [
      {
        id: 'recursion-fundamentals',
        name: 'Fundamentals',
        problems: [
          { id: 'r1', title: 'Fibonacci Number', url: 'https://leetcode.com/problems/fibonacci-number/', difficulty: 'Easy', pattern: 'recursion-fundamentals' },
          { id: 'r2', title: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'Easy', pattern: 'recursion-fundamentals' },
          { id: 'r3', title: 'Generate Parentheses', url: 'https://leetcode.com/problems/generate-parentheses/', difficulty: 'Medium', pattern: 'recursion-fundamentals' },
          { id: 'r7', title: 'Pow(x, n)', url: 'https://leetcode.com/problems/powx-n/', difficulty: 'Medium', pattern: 'recursion-fundamentals' },
          { id: 'r4', title: 'Subsets', url: 'https://leetcode.com/problems/subsets/', difficulty: 'Medium', pattern: 'recursion-fundamentals' },
          { id: 'r5', title: 'Permutations', url: 'https://leetcode.com/problems/permutations/', difficulty: 'Medium', pattern: 'recursion-fundamentals' },
          { id: 'r6', title: 'Letter Combinations of Phone Number', url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', difficulty: 'Medium', pattern: 'recursion-fundamentals' },
        ]
      }
    ]
  },
  {
    id: 'hashing',
    name: 'Hashing Basics',
    description: 'Very important - appears everywhere',
    patterns: [
      {
        id: 'hashing-fundamentals',
        name: 'Hash Map/Set',
        problems: [
          { id: 'h1', title: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/', difficulty: 'Easy', pattern: 'hashing-fundamentals' },
          { id: 'h2', title: 'Contains Duplicate', url: 'https://leetcode.com/problems/contains-duplicate/', difficulty: 'Easy', pattern: 'hashing-fundamentals' },
          { id: 'h3', title: 'Intersection of Two Arrays', url: 'https://leetcode.com/problems/intersection-of-two-arrays/', difficulty: 'Easy', pattern: 'hashing-fundamentals' },
          { id: 'h4', title: 'First Unique Character', url: 'https://leetcode.com/problems/first-unique-character-in-a-string/', difficulty: 'Easy', pattern: 'hashing-fundamentals' },
          { id: 'h5', title: 'Valid Anagram', url: 'https://leetcode.com/problems/valid-anagram/', difficulty: 'Easy', pattern: 'hashing-fundamentals' },
          { id: 'h6', title: 'Group Anagrams', url: 'https://leetcode.com/problems/group-anagrams/', difficulty: 'Medium', pattern: 'hashing-fundamentals' },
          { id: 'h7', title: 'Top K Frequent Elements', url: 'https://leetcode.com/problems/top-k-frequent-elements/', difficulty: 'Medium', pattern: 'hashing-fundamentals' },
          { id: 'h8', title: 'Subarray Sum Equals K', url: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'Medium', pattern: 'hashing-fundamentals' },
        ]
      }
    ]
  },
  {
    id: 'sorting',
    name: 'Sorting Algorithms',
    description: 'Selection, Bubble, Insertion, Merge, Quick, Heap',
    patterns: [
      {
        id: 'sorting-practice',
        name: 'Sorting Practice',
        problems: [
          { id: 's1', title: 'Sort an Array', url: 'https://leetcode.com/problems/sort-an-array/', difficulty: 'Medium', pattern: 'sorting-practice' },
          { id: 's2', title: 'Sort Colors', url: 'https://leetcode.com/problems/sort-colors/', difficulty: 'Medium', pattern: 'sorting-practice' },
          { id: 's3', title: 'Merge Sorted Array', url: 'https://leetcode.com/problems/merge-sorted-array/', difficulty: 'Easy', pattern: 'sorting-practice' },
          { id: 's4', title: 'Kth Largest Element', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', difficulty: 'Medium', pattern: 'sorting-practice' },
          { id: 's5', title: 'Relative Sort Array', url: 'https://leetcode.com/problems/relative-sort-array/', difficulty: 'Easy', pattern: 'sorting-practice' },
          { id: 's6', title: 'Wiggle Sort', url: 'https://leetcode.com/problems/wiggle-sort/', difficulty: 'Medium', pattern: 'sorting-practice' },
          { id: 's7', title: 'Merge Intervals', url: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'Medium', pattern: 'sorting-practice' },
        ]
      }
    ]
  },
  {
    id: 'stl',
    name: 'STL / Collections',
    description: 'Data Structures Usage',
    patterns: [
      {
        id: 'stl-design',
        name: 'Design Data Structures',
        problems: [
          { id: 'stl1', title: 'Design HashSet', url: 'https://leetcode.com/problems/design-hashset/', difficulty: 'Easy', pattern: 'stl-design' },
          { id: 'stl2', title: 'Design HashMap', url: 'https://leetcode.com/problems/design-hashmap/', difficulty: 'Easy', pattern: 'stl-design' },
          { id: 'stl3', title: 'Min Stack', url: 'https://leetcode.com/problems/min-stack/', difficulty: 'Medium', pattern: 'stl-design' },
          { id: 'stl4', title: 'Implement Queue using Stacks', url: 'https://leetcode.com/problems/implement-queue-using-stacks/', difficulty: 'Easy', pattern: 'stl-design' },
          { id: 'stl5', title: 'Implement Stack using Queues', url: 'https://leetcode.com/problems/implement-stack-using-queues/', difficulty: 'Easy', pattern: 'stl-design' },
        ]
      }
    ]
  },
  {
    id: 'arrays',
    name: 'Arrays',
    description: '70+ problems from Basic to Advanced',
    patterns: [
      {
        id: 'basic-traversal',
        name: 'Basic Traversal & Observation',
        problems: [
          { id: 'a1', title: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/', difficulty: 'Easy', pattern: 'basic-traversal' },
          { id: 'a2', title: 'Contains Duplicate', url: 'https://leetcode.com/problems/contains-duplicate/', difficulty: 'Easy', pattern: 'basic-traversal' },
          { id: 'a3', title: 'Remove Duplicates from Sorted Array', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', difficulty: 'Easy', pattern: 'basic-traversal' },
          { id: 'a4', title: 'Remove Element', url: 'https://leetcode.com/problems/remove-element/', difficulty: 'Easy', pattern: 'basic-traversal' },
          { id: 'a5', title: 'Plus One', url: 'https://leetcode.com/problems/plus-one/', difficulty: 'Easy', pattern: 'basic-traversal' },
          { id: 'a6', title: 'Missing Number', url: 'https://leetcode.com/problems/missing-number/', difficulty: 'Easy', pattern: 'basic-traversal' },
          { id: 'a7', title: 'Single Number', url: 'https://leetcode.com/problems/single-number/', difficulty: 'Easy', pattern: 'basic-traversal' },
          { id: 'a8', title: 'Majority Element', url: 'https://leetcode.com/problems/majority-element/', difficulty: 'Easy', pattern: 'basic-traversal' },
          { id: 'a9', title: 'Find Pivot Index', url: 'https://leetcode.com/problems/find-pivot-index/', difficulty: 'Easy', pattern: 'basic-traversal' },
          { id: 'a10', title: 'Check if Array Is Sorted and Rotated', url: 'https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/', difficulty: 'Easy', pattern: 'basic-traversal' },
        ]
      },
      {
        id: 'prefix-sum',
        name: 'Prefix Sum Pattern',
        problems: [
          { id: 'a11', title: 'Running Sum of 1D Array', url: 'https://leetcode.com/problems/running-sum-of-1d-array/', difficulty: 'Easy', pattern: 'prefix-sum' },
          { id: 'a12', title: 'Range Sum Query – Immutable', url: 'https://leetcode.com/problems/range-sum-query-immutable/', difficulty: 'Easy', pattern: 'prefix-sum' },
          { id: 'a13', title: 'Subarray Sum Equals K', url: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'Medium', pattern: 'prefix-sum' },
          { id: 'a14', title: 'Continuous Subarray Sum', url: 'https://leetcode.com/problems/continuous-subarray-sum/', difficulty: 'Medium', pattern: 'prefix-sum' },
          { id: 'a15', title: 'Corporate Flight Bookings', url: 'https://leetcode.com/problems/corporate-flight-bookings/', difficulty: 'Medium', pattern: 'prefix-sum' },
          { id: 'a16', title: 'Find the Highest Altitude', url: 'https://leetcode.com/problems/find-the-highest-altitude/', difficulty: 'Easy', pattern: 'prefix-sum' },
        ]
      },
      {
        id: 'two-pointer',
        name: 'Two Pointer Pattern',
        problems: [
          { id: 'a17', title: 'Move Zeroes', url: 'https://leetcode.com/problems/move-zeroes/', difficulty: 'Easy', pattern: 'two-pointer' },
          { id: 'a18', title: 'Squares of a Sorted Array', url: 'https://leetcode.com/problems/squares-of-a-sorted-array/', difficulty: 'Easy', pattern: 'two-pointer' },
          { id: 'a19', title: 'Container With Most Water', url: 'https://leetcode.com/problems/container-with-most-water/', difficulty: 'Medium', pattern: 'two-pointer' },
          { id: 'a20', title: '3Sum', url: 'https://leetcode.com/problems/3sum/', difficulty: 'Medium', pattern: 'two-pointer' },
          { id: 'a21', title: '3Sum Closest', url: 'https://leetcode.com/problems/3sum-closest/', difficulty: 'Medium', pattern: 'two-pointer' },
          { id: 'a22', title: '4Sum', url: 'https://leetcode.com/problems/4sum/', difficulty: 'Medium', pattern: 'two-pointer' },
          { id: 'a23', title: 'Sort Colors (Dutch National Flag)', url: 'https://leetcode.com/problems/sort-colors/', difficulty: 'Medium', pattern: 'two-pointer' },
          { id: 'a24', title: 'Reverse String', url: 'https://leetcode.com/problems/reverse-string/', difficulty: 'Easy', pattern: 'two-pointer' },
        ]
      },
      {
        id: 'sliding-window-array',
        name: 'Sliding Window Pattern',
        problems: [
          { id: 'a25', title: 'Maximum Average Subarray I', url: 'https://leetcode.com/problems/maximum-average-subarray-i/', difficulty: 'Easy', pattern: 'sliding-window-array' },
          { id: 'a26', title: 'Max Consecutive Ones III', url: 'https://leetcode.com/problems/max-consecutive-ones-iii/', difficulty: 'Medium', pattern: 'sliding-window-array' },
          { id: 'a27', title: 'Longest Subarray of 1s After Deleting One Element', url: 'https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/', difficulty: 'Medium', pattern: 'sliding-window-array' },
          { id: 'a28', title: 'Minimum Size Subarray Sum', url: 'https://leetcode.com/problems/minimum-size-subarray-sum/', difficulty: 'Medium', pattern: 'sliding-window-array' },
          { id: 'a29', title: 'Subarray Product Less Than K', url: 'https://leetcode.com/problems/subarray-product-less-than-k/', difficulty: 'Medium', pattern: 'sliding-window-array' },
          { id: 'a30', title: 'Fruits Into Baskets', url: 'https://leetcode.com/problems/fruit-into-baskets/', difficulty: 'Medium', pattern: 'sliding-window-array' },
          { id: 'a31', title: 'Longest Mountain in Array', url: 'https://leetcode.com/problems/longest-mountain-in-array/', difficulty: 'Medium', pattern: 'sliding-window-array' },
        ]
      },
      {
        id: 'kadane',
        name: "Kadane's Algorithm",
        problems: [
          { id: 'a32', title: 'Maximum Subarray', url: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'Medium', pattern: 'kadane' },
          { id: 'a33', title: 'Maximum Product Subarray', url: 'https://leetcode.com/problems/maximum-product-subarray/', difficulty: 'Medium', pattern: 'kadane' },
          { id: 'a34', title: 'Maximum Sum Circular Subarray', url: 'https://leetcode.com/problems/maximum-sum-circular-subarray/', difficulty: 'Medium', pattern: 'kadane' },
        ]
      },
      {
        id: 'interval',
        name: 'Interval Based Problems',
        problems: [
          { id: 'a35i', title: 'Merge Intervals', url: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'Medium', pattern: 'interval' },
          { id: 'a35j', title: 'Insert Interval', url: 'https://leetcode.com/problems/insert-interval/', difficulty: 'Medium', pattern: 'interval' },
          { id: 'a35k', title: 'Non-overlapping Intervals', url: 'https://leetcode.com/problems/non-overlapping-intervals/', difficulty: 'Medium', pattern: 'interval' },
          { id: 'a35l', title: 'Meeting Rooms', url: 'https://leetcode.com/problems/meeting-rooms/', difficulty: 'Easy', pattern: 'interval' },
          { id: 'a35m', title: 'Meeting Rooms II', url: 'https://leetcode.com/problems/meeting-rooms-ii/', difficulty: 'Medium', pattern: 'interval' },
          { id: 'a35n', title: 'Interval List Intersections', url: 'https://leetcode.com/problems/interval-list-intersections/', difficulty: 'Medium', pattern: 'interval' },
        ]
      },
      {
        id: 'matrix',
        name: 'Matrix / 2D Arrays',
        problems: [
          { id: 'a35', title: 'Set Matrix Zeroes', url: 'https://leetcode.com/problems/set-matrix-zeroes/', difficulty: 'Medium', pattern: 'matrix' },
          { id: 'a36', title: 'Spiral Matrix', url: 'https://leetcode.com/problems/spiral-matrix/', difficulty: 'Medium', pattern: 'matrix' },
          { id: 'a37', title: 'Spiral Matrix II', url: 'https://leetcode.com/problems/spiral-matrix-ii/', difficulty: 'Medium', pattern: 'matrix' },
          { id: 'a38', title: 'Rotate Image', url: 'https://leetcode.com/problems/rotate-image/', difficulty: 'Medium', pattern: 'matrix' },
          { id: 'a39', title: 'Diagonal Traverse', url: 'https://leetcode.com/problems/diagonal-traverse/', difficulty: 'Medium', pattern: 'matrix' },
          { id: 'a40', title: 'Game of Life', url: 'https://leetcode.com/problems/game-of-life/', difficulty: 'Medium', pattern: 'matrix' },
        ]
      },
      {
        id: 'binary-search-array',
        name: 'Binary Search on Array',
        problems: [
          { id: 'a41', title: 'Binary Search', url: 'https://leetcode.com/problems/binary-search/', difficulty: 'Easy', pattern: 'binary-search-array' },
          { id: 'a42', title: 'Search Insert Position', url: 'https://leetcode.com/problems/search-insert-position/', difficulty: 'Easy', pattern: 'binary-search-array' },
          { id: 'a43', title: 'Find Peak Element', url: 'https://leetcode.com/problems/find-peak-element/', difficulty: 'Medium', pattern: 'binary-search-array' },
          { id: 'a44', title: 'Search in Rotated Sorted Array', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'Medium', pattern: 'binary-search-array' },
          { id: 'a45', title: 'Find Minimum in Rotated Sorted Array', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'Medium', pattern: 'binary-search-array' },
          { id: 'a46', title: 'Koko Eating Bananas', url: 'https://leetcode.com/problems/koko-eating-bananas/', difficulty: 'Medium', pattern: 'binary-search-array' },
        ]
      },
      {
        id: 'advanced-array',
        name: 'Advanced / Tricky Problems',
        problems: [
          { id: 'a47', title: 'Trapping Rain Water', url: 'https://leetcode.com/problems/trapping-rain-water/', difficulty: 'Hard', pattern: 'advanced-array' },
          { id: 'a48', title: 'First Missing Positive', url: 'https://leetcode.com/problems/first-missing-positive/', difficulty: 'Hard', pattern: 'advanced-array' },
          { id: 'a49', title: 'Find the Duplicate Number', url: 'https://leetcode.com/problems/find-the-duplicate-number/', difficulty: 'Medium', pattern: 'advanced-array' },
          { id: 'a50', title: 'Next Permutation', url: 'https://leetcode.com/problems/next-permutation/', difficulty: 'Medium', pattern: 'advanced-array' },
          { id: 'a51', title: 'Jump Game', url: 'https://leetcode.com/problems/jump-game/', difficulty: 'Medium', pattern: 'advanced-array' },
          { id: 'a52', title: 'Jump Game II', url: 'https://leetcode.com/problems/jump-game-ii/', difficulty: 'Medium', pattern: 'advanced-array' },
          { id: 'a53', title: 'Gas Station', url: 'https://leetcode.com/problems/gas-station/', difficulty: 'Medium', pattern: 'advanced-array' },
          { id: 'a54', title: 'Candy', url: 'https://leetcode.com/problems/candy/', difficulty: 'Hard', pattern: 'advanced-array' },
        ]
      },
      {
        id: 'bonus-array',
        name: 'Bonus (Good for Confidence)',
        problems: [
          { id: 'a55', title: 'Summary Ranges', url: 'https://leetcode.com/problems/summary-ranges/', difficulty: 'Easy', pattern: 'bonus-array' },
          { id: 'a56', title: 'Find All Numbers Disappeared in an Array', url: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/', difficulty: 'Easy', pattern: 'bonus-array' },
          { id: 'a57', title: 'Maximum Area of a Piece of Cake', url: 'https://leetcode.com/problems/maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts/', difficulty: 'Medium', pattern: 'bonus-array' },
          { id: 'a58', title: 'Find K Closest Elements', url: 'https://leetcode.com/problems/find-k-closest-elements/', difficulty: 'Medium', pattern: 'bonus-array' },
          { id: 'a59', title: 'Random Pick with Weight', url: 'https://leetcode.com/problems/random-pick-with-weight/', difficulty: 'Medium', pattern: 'bonus-array' },
          { id: 'a60', title: 'Car Fleet', url: 'https://leetcode.com/problems/car-fleet/', difficulty: 'Medium', pattern: 'bonus-array' },
          { id: 'a61', title: 'Subarrays with K Different Integers', url: 'https://leetcode.com/problems/subarrays-with-k-different-integers/', difficulty: 'Hard', pattern: 'bonus-array' },
          { id: 'a62', title: 'Count Nice Pairs in an Array', url: 'https://leetcode.com/problems/count-nice-pairs-in-an-array/', difficulty: 'Medium', pattern: 'bonus-array' },
          { id: 'a63', title: 'Partition Array into Disjoint Intervals', url: 'https://leetcode.com/problems/partition-array-into-disjoint-intervals/', difficulty: 'Medium', pattern: 'bonus-array' },
          { id: 'a64', title: 'Find Original Array From Doubled Array', url: 'https://leetcode.com/problems/find-original-array-from-doubled-array/', difficulty: 'Medium', pattern: 'bonus-array' },
        ]
      },
    ]
  },
  {
    id: 'strings',
    name: 'Strings',
    description: '65 problems - Very important for interviews',
    patterns: [
      {
        id: 'string-traversal',
        name: 'Basic String Traversal',
        problems: [
          { id: 'st1', title: 'Reverse String', url: 'https://leetcode.com/problems/reverse-string/', difficulty: 'Easy', pattern: 'string-traversal' },
          { id: 'st2', title: 'Valid Palindrome', url: 'https://leetcode.com/problems/valid-palindrome/', difficulty: 'Easy', pattern: 'string-traversal' },
          { id: 'st3', title: 'Defanging an IP Address', url: 'https://leetcode.com/problems/defanging-an-ip-address/', difficulty: 'Easy', pattern: 'string-traversal' },
          { id: 'st4', title: 'Shuffle String', url: 'https://leetcode.com/problems/shuffle-string/', difficulty: 'Easy', pattern: 'string-traversal' },
          { id: 'st5', title: 'Goal Parser Interpretation', url: 'https://leetcode.com/problems/goal-parser-interpretation/', difficulty: 'Easy', pattern: 'string-traversal' },
          { id: 'st6', title: 'To Lower Case', url: 'https://leetcode.com/problems/to-lower-case/', difficulty: 'Easy', pattern: 'string-traversal' },
          { id: 'st7', title: 'Detect Capital', url: 'https://leetcode.com/problems/detect-capital/', difficulty: 'Easy', pattern: 'string-traversal' },
          { id: 'st8', title: 'Length of Last Word', url: 'https://leetcode.com/problems/length-of-last-word/', difficulty: 'Easy', pattern: 'string-traversal' },
        ]
      },
      {
        id: 'string-hashing',
        name: 'Hashing / Frequency Map',
        problems: [
          { id: 'st9', title: 'Valid Anagram', url: 'https://leetcode.com/problems/valid-anagram/', difficulty: 'Easy', pattern: 'string-hashing' },
          { id: 'st10', title: 'Ransom Note', url: 'https://leetcode.com/problems/ransom-note/', difficulty: 'Easy', pattern: 'string-hashing' },
          { id: 'st11', title: 'First Unique Character in a String', url: 'https://leetcode.com/problems/first-unique-character-in-a-string/', difficulty: 'Easy', pattern: 'string-hashing' },
          { id: 'st12', title: 'Group Anagrams', url: 'https://leetcode.com/problems/group-anagrams/', difficulty: 'Medium', pattern: 'string-hashing' },
          { id: 'st13', title: 'Find the Difference', url: 'https://leetcode.com/problems/find-the-difference/', difficulty: 'Easy', pattern: 'string-hashing' },
          { id: 'st14', title: 'Word Pattern', url: 'https://leetcode.com/problems/word-pattern/', difficulty: 'Easy', pattern: 'string-hashing' },
          { id: 'st15', title: 'Isomorphic Strings', url: 'https://leetcode.com/problems/isomorphic-strings/', difficulty: 'Easy', pattern: 'string-hashing' },
          { id: 'st16', title: 'Custom Sort String', url: 'https://leetcode.com/problems/custom-sort-string/', difficulty: 'Medium', pattern: 'string-hashing' },
          { id: 'st16b', title: 'Minimum Deletions to Make Frequencies Unique', url: 'https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/', difficulty: 'Medium', pattern: 'string-hashing' },
        ]
      },
      {
        id: 'palindrome-pattern',
        name: 'Two Pointer / Palindrome',
        problems: [
          { id: 'st17', title: 'Valid Palindrome II', url: 'https://leetcode.com/problems/valid-palindrome-ii/', difficulty: 'Easy', pattern: 'palindrome-pattern' },
          { id: 'st18', title: 'Reverse Vowels of a String', url: 'https://leetcode.com/problems/reverse-vowels-of-a-string/', difficulty: 'Easy', pattern: 'palindrome-pattern' },
          { id: 'st19', title: 'Merge Strings Alternately', url: 'https://leetcode.com/problems/merge-strings-alternately/', difficulty: 'Easy', pattern: 'palindrome-pattern' },
          { id: 'st20', title: 'Backspace String Compare', url: 'https://leetcode.com/problems/backspace-string-compare/', difficulty: 'Easy', pattern: 'palindrome-pattern' },
          { id: 'st21', title: 'Longest Palindromic Substring', url: 'https://leetcode.com/problems/longest-palindromic-substring/', difficulty: 'Medium', pattern: 'palindrome-pattern' },
          { id: 'st22', title: 'Palindromic Substrings', url: 'https://leetcode.com/problems/palindromic-substrings/', difficulty: 'Medium', pattern: 'palindrome-pattern' },
          { id: 'st23', title: 'Shortest Palindrome', url: 'https://leetcode.com/problems/shortest-palindrome/', difficulty: 'Hard', pattern: 'palindrome-pattern' },
        ]
      },
      {
        id: 'sliding-window-string',
        name: 'Sliding Window (Very Important)',
        problems: [
          { id: 'st24', title: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'Medium', pattern: 'sliding-window-string' },
          { id: 'st25', title: 'Longest Repeating Character Replacement', url: 'https://leetcode.com/problems/longest-repeating-character-replacement/', difficulty: 'Medium', pattern: 'sliding-window-string' },
          { id: 'st26', title: 'Minimum Window Substring', url: 'https://leetcode.com/problems/minimum-window-substring/', difficulty: 'Hard', pattern: 'sliding-window-string' },
          { id: 'st27', title: 'Permutation in String', url: 'https://leetcode.com/problems/permutation-in-string/', difficulty: 'Medium', pattern: 'sliding-window-string' },
          { id: 'st28', title: 'Find All Anagrams in a String', url: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', difficulty: 'Medium', pattern: 'sliding-window-string' },
          { id: 'st29', title: 'Maximum Number of Vowels in Substring', url: 'https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/', difficulty: 'Medium', pattern: 'sliding-window-string' },
          { id: 'st30b', title: 'Substring with Concatenation of All Words', url: 'https://leetcode.com/problems/substring-with-concatenation-of-all-words/', difficulty: 'Hard', pattern: 'sliding-window-string' },
        ]
      },
      {
        id: 'stack-string',
        name: 'Stack Based / Parsing',
        problems: [
          { id: 'st30', title: 'Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses/', difficulty: 'Easy', pattern: 'stack-string' },
          { id: 'st31', title: 'Minimum Add to Make Parentheses Valid', url: 'https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/', difficulty: 'Medium', pattern: 'stack-string' },
          { id: 'st32', title: 'Minimum Remove to Make Valid Parentheses', url: 'https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/', difficulty: 'Medium', pattern: 'stack-string' },
          { id: 'st33', title: 'Score of Parentheses', url: 'https://leetcode.com/problems/score-of-parentheses/', difficulty: 'Medium', pattern: 'stack-string' },
          { id: 'st34', title: 'Decode String', url: 'https://leetcode.com/problems/decode-string/', difficulty: 'Medium', pattern: 'stack-string' },
          { id: 'st35', title: 'Simplify Path', url: 'https://leetcode.com/problems/simplify-path/', difficulty: 'Medium', pattern: 'stack-string' },
        ]
      },
      {
        id: 'string-building',
        name: 'String Building / Simulation',
        problems: [
          { id: 'st42', title: 'String to Integer (atoi)', url: 'https://leetcode.com/problems/string-to-integer-atoi/', difficulty: 'Medium', pattern: 'string-building' },
          { id: 'st43', title: 'Implement strStr()', url: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/', difficulty: 'Easy', pattern: 'string-building' },
          { id: 'st44', title: 'Multiply Strings', url: 'https://leetcode.com/problems/multiply-strings/', difficulty: 'Medium', pattern: 'string-building' },
          { id: 'st45', title: 'Add Strings', url: 'https://leetcode.com/problems/add-strings/', difficulty: 'Easy', pattern: 'string-building' },
          { id: 'st46', title: 'Compare Version Numbers', url: 'https://leetcode.com/problems/compare-version-numbers/', difficulty: 'Medium', pattern: 'string-building' },
          { id: 'st47', title: 'Zigzag Conversion', url: 'https://leetcode.com/problems/zigzag-conversion/', difficulty: 'Medium', pattern: 'string-building' },
          { id: 'st48', title: 'Count and Say', url: 'https://leetcode.com/problems/count-and-say/', difficulty: 'Medium', pattern: 'string-building' },
        ]
      },
      {
        id: 'trie-pattern',
        name: 'Trie / Prefix / Dictionary Based',
        problems: [
          { id: 'st49', title: 'Longest Common Prefix', url: 'https://leetcode.com/problems/longest-common-prefix/', difficulty: 'Easy', pattern: 'trie-pattern' },
          { id: 'st50', title: 'Word Break', url: 'https://leetcode.com/problems/word-break/', difficulty: 'Medium', pattern: 'trie-pattern' },
          { id: 'st51', title: 'Word Break II', url: 'https://leetcode.com/problems/word-break-ii/', difficulty: 'Hard', pattern: 'trie-pattern' },
          { id: 'st52', title: 'Replace Words', url: 'https://leetcode.com/problems/replace-words/', difficulty: 'Medium', pattern: 'trie-pattern' },
          { id: 'st53', title: 'Longest Word in Dictionary', url: 'https://leetcode.com/problems/longest-word-in-dictionary/', difficulty: 'Medium', pattern: 'trie-pattern' },
        ]
      },
      {
        id: 'string-dp',
        name: 'DP on Strings (Advanced)',
        problems: [
          { id: 'st36', title: 'Longest Common Subsequence', url: 'https://leetcode.com/problems/longest-common-subsequence/', difficulty: 'Medium', pattern: 'string-dp' },
          { id: 'st37', title: 'Edit Distance', url: 'https://leetcode.com/problems/edit-distance/', difficulty: 'Medium', pattern: 'string-dp' },
          { id: 'st38', title: 'Delete Operation for Two Strings', url: 'https://leetcode.com/problems/delete-operation-for-two-strings/', difficulty: 'Medium', pattern: 'string-dp' },
          { id: 'st39', title: 'Distinct Subsequences', url: 'https://leetcode.com/problems/distinct-subsequences/', difficulty: 'Hard', pattern: 'string-dp' },
          { id: 'st54', title: 'Interleaving String', url: 'https://leetcode.com/problems/interleaving-string/', difficulty: 'Medium', pattern: 'string-dp' },
          { id: 'st40', title: 'Regular Expression Matching', url: 'https://leetcode.com/problems/regular-expression-matching/', difficulty: 'Hard', pattern: 'string-dp' },
          { id: 'st41', title: 'Wildcard Matching', url: 'https://leetcode.com/problems/wildcard-matching/', difficulty: 'Hard', pattern: 'string-dp' },
        ]
      },
      {
        id: 'string-hard',
        name: 'Hard / Interview Favorite',
        problems: [
          { id: 'st55', title: 'Text Justification', url: 'https://leetcode.com/problems/text-justification/', difficulty: 'Hard', pattern: 'string-hard' },
          { id: 'st56', title: 'Reorganize String', url: 'https://leetcode.com/problems/reorganize-string/', difficulty: 'Medium', pattern: 'string-hard' },
          { id: 'st57', title: 'Remove Duplicate Letters', url: 'https://leetcode.com/problems/remove-duplicate-letters/', difficulty: 'Medium', pattern: 'string-hard' },
          { id: 'st58', title: 'Longest Happy Prefix', url: 'https://leetcode.com/problems/longest-happy-prefix/', difficulty: 'Hard', pattern: 'string-hard' },
          { id: 'st59', title: 'Repeated DNA Sequences', url: 'https://leetcode.com/problems/repeated-dna-sequences/', difficulty: 'Medium', pattern: 'string-hard' },
          { id: 'st60', title: 'Encode and Decode Strings', url: 'https://leetcode.com/problems/encode-and-decode-strings/', difficulty: 'Medium', pattern: 'string-hard' },
          { id: 'st61', title: 'Scramble String', url: 'https://leetcode.com/problems/scramble-string/', difficulty: 'Hard', pattern: 'string-hard' },
          { id: 'st62', title: 'Palindrome Partitioning', url: 'https://leetcode.com/problems/palindrome-partitioning/', difficulty: 'Medium', pattern: 'string-hard' },
          { id: 'st63', title: 'Partition Labels', url: 'https://leetcode.com/problems/partition-labels/', difficulty: 'Medium', pattern: 'string-hard' },
        ]
      },
    ]
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    description: '40 problems - Pointer manipulation & design',
    patterns: [
      {
        id: 'll-basics',
        name: 'Basics / Traversal',
        problems: [
          { id: 'll1', title: 'Linked List Cycle', url: 'https://leetcode.com/problems/linked-list-cycle/', difficulty: 'Easy', pattern: 'll-basics' },
          { id: 'll2', title: 'Linked List Cycle II', url: 'https://leetcode.com/problems/linked-list-cycle-ii/', difficulty: 'Medium', pattern: 'll-basics' },
          { id: 'll3', title: 'Middle of the Linked List', url: 'https://leetcode.com/problems/middle-of-the-linked-list/', difficulty: 'Easy', pattern: 'll-basics' },
          { id: 'll4', title: 'Intersection of Two Linked Lists', url: 'https://leetcode.com/problems/intersection-of-two-linked-lists/', difficulty: 'Easy', pattern: 'll-basics' },
          { id: 'll5', title: 'Delete Node in a Linked List', url: 'https://leetcode.com/problems/delete-node-in-a-linked-list/', difficulty: 'Medium', pattern: 'll-basics' },
          { id: 'll6', title: 'Remove Linked List Elements', url: 'https://leetcode.com/problems/remove-linked-list-elements/', difficulty: 'Easy', pattern: 'll-basics' },
        ]
      },
      {
        id: 'll-reversal',
        name: 'Reversal Pattern (Most Important)',
        problems: [
          { id: 'll7', title: 'Reverse Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/', difficulty: 'Easy', pattern: 'll-reversal' },
          { id: 'll8', title: 'Reverse Linked List II', url: 'https://leetcode.com/problems/reverse-linked-list-ii/', difficulty: 'Medium', pattern: 'll-reversal' },
          { id: 'll9', title: 'Reverse Nodes in k-Group', url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', difficulty: 'Hard', pattern: 'll-reversal' },
          { id: 'll10', title: 'Swap Nodes in Pairs', url: 'https://leetcode.com/problems/swap-nodes-in-pairs/', difficulty: 'Medium', pattern: 'll-reversal' },
          { id: 'll11', title: 'Palindrome Linked List', url: 'https://leetcode.com/problems/palindrome-linked-list/', difficulty: 'Easy', pattern: 'll-reversal' },
          { id: 'll12', title: 'Reorder List', url: 'https://leetcode.com/problems/reorder-list/', difficulty: 'Medium', pattern: 'll-reversal' },
        ]
      },
      {
        id: 'll-fast-slow',
        name: 'Fast & Slow Pointer',
        problems: [
          { id: 'll39', title: 'Middle of the Linked List', url: 'https://leetcode.com/problems/middle-of-the-linked-list/', difficulty: 'Easy', pattern: 'll-fast-slow' },
          { id: 'll40', title: 'Linked List Cycle', url: 'https://leetcode.com/problems/linked-list-cycle/', difficulty: 'Easy', pattern: 'll-fast-slow' },
          { id: 'll23', title: 'Find Duplicate Number (cycle logic)', url: 'https://leetcode.com/problems/find-the-duplicate-number/', difficulty: 'Medium', pattern: 'll-fast-slow' },
          { id: 'll24', title: 'Happy Number', url: 'https://leetcode.com/problems/happy-number/', difficulty: 'Easy', pattern: 'll-fast-slow' },
        ]
      },
      {
        id: 'll-merge',
        name: 'Merge Pattern',
        problems: [
          { id: 'll13', title: 'Merge Two Sorted Lists', url: 'https://leetcode.com/problems/merge-two-sorted-lists/', difficulty: 'Easy', pattern: 'll-merge' },
          { id: 'll14', title: 'Merge k Sorted Lists', url: 'https://leetcode.com/problems/merge-k-sorted-lists/', difficulty: 'Hard', pattern: 'll-merge' },
          { id: 'll15', title: 'Sort List', url: 'https://leetcode.com/problems/sort-list/', difficulty: 'Medium', pattern: 'll-merge' },
          { id: 'll16', title: 'Partition List', url: 'https://leetcode.com/problems/partition-list/', difficulty: 'Medium', pattern: 'll-merge' },
          { id: 'll17', title: 'Add Two Numbers', url: 'https://leetcode.com/problems/add-two-numbers/', difficulty: 'Medium', pattern: 'll-merge' },
          { id: 'll18', title: 'Add Two Numbers II', url: 'https://leetcode.com/problems/add-two-numbers-ii/', difficulty: 'Medium', pattern: 'll-merge' },
        ]
      },
      {
        id: 'll-deletion',
        name: 'Deletion / Modification',
        problems: [
          { id: 'll25', title: 'Remove Nth Node From End', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', difficulty: 'Medium', pattern: 'll-deletion' },
          { id: 'll26', title: 'Delete Duplicates from Sorted List', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list/', difficulty: 'Easy', pattern: 'll-deletion' },
          { id: 'll27', title: 'Delete Duplicates II', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/', difficulty: 'Medium', pattern: 'll-deletion' },
          { id: 'll28', title: 'Rotate List', url: 'https://leetcode.com/problems/rotate-list/', difficulty: 'Medium', pattern: 'll-deletion' },
          { id: 'll29', title: 'Odd Even Linked List', url: 'https://leetcode.com/problems/odd-even-linked-list/', difficulty: 'Medium', pattern: 'll-deletion' },
        ]
      },
      {
        id: 'll-random',
        name: 'Random Pointer / Deep Copy',
        problems: [
          { id: 'll30', title: 'Copy List with Random Pointer', url: 'https://leetcode.com/problems/copy-list-with-random-pointer/', difficulty: 'Medium', pattern: 'll-random' },
          { id: 'll31', title: 'Flatten a Multilevel Doubly Linked List', url: 'https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/', difficulty: 'Medium', pattern: 'll-random' },
        ]
      },
      {
        id: 'll-design',
        name: 'Design / Data Structure',
        problems: [
          { id: 'll19', title: 'LRU Cache', url: 'https://leetcode.com/problems/lru-cache/', difficulty: 'Medium', pattern: 'll-design' },
          { id: 'll20', title: 'LFU Cache', url: 'https://leetcode.com/problems/lfu-cache/', difficulty: 'Hard', pattern: 'll-design' },
          { id: 'll21', title: 'Design Browser History', url: 'https://leetcode.com/problems/design-browser-history/', difficulty: 'Medium', pattern: 'll-design' },
          { id: 'll22', title: 'Design Linked List', url: 'https://leetcode.com/problems/design-linked-list/', difficulty: 'Medium', pattern: 'll-design' },
        ]
      },
      {
        id: 'll-advanced',
        name: 'Advanced Linked List',
        problems: [
          { id: 'll32', title: 'Reverse Even Length Groups', url: 'https://leetcode.com/problems/reverse-nodes-in-even-length-groups/', difficulty: 'Medium', pattern: 'll-advanced' },
          { id: 'll33', title: 'Split Linked List in Parts', url: 'https://leetcode.com/problems/split-linked-list-in-parts/', difficulty: 'Medium', pattern: 'll-advanced' },
          { id: 'll34', title: 'Remove Zero Sum Consecutive Nodes', url: 'https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list/', difficulty: 'Medium', pattern: 'll-advanced' },
          { id: 'll35', title: 'Maximum Twin Sum of a Linked List', url: 'https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/', difficulty: 'Medium', pattern: 'll-advanced' },
          { id: 'll36', title: 'Insert GCD in Linked List', url: 'https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/', difficulty: 'Medium', pattern: 'll-advanced' },
          { id: 'll37', title: 'Delete the Middle Node', url: 'https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/', difficulty: 'Medium', pattern: 'll-advanced' },
          { id: 'll38', title: 'Merge In Between Linked Lists', url: 'https://leetcode.com/problems/merge-in-between-linked-lists/', difficulty: 'Medium', pattern: 'll-advanced' },
        ]
      },
    ]
  },
  {
    id: 'stack-queue',
    name: 'Stack & Queue',
    description: '45 problems - Monotonic stack, sliding window max, design',
    patterns: [
      {
        id: 'sq-basics',
        name: 'Stack Basics',
        problems: [
          { id: 'sq1', title: 'Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses/', difficulty: 'Easy', pattern: 'sq-basics' },
          { id: 'sq2', title: 'Min Stack', url: 'https://leetcode.com/problems/min-stack/', difficulty: 'Medium', pattern: 'sq-basics' },
          { id: 'sq3', title: 'Implement Stack using Queues', url: 'https://leetcode.com/problems/implement-stack-using-queues/', difficulty: 'Easy', pattern: 'sq-basics' },
          { id: 'sq4', title: 'Implement Queue using Stacks', url: 'https://leetcode.com/problems/implement-queue-using-stacks/', difficulty: 'Easy', pattern: 'sq-basics' },
          { id: 'sq5', title: 'Baseball Game', url: 'https://leetcode.com/problems/baseball-game/', difficulty: 'Easy', pattern: 'sq-basics' },
          { id: 'sq6', title: 'Backspace String Compare', url: 'https://leetcode.com/problems/backspace-string-compare/', difficulty: 'Easy', pattern: 'sq-basics' },
        ]
      },
      {
        id: 'parentheses-expression',
        name: 'Parentheses / Expression',
        problems: [
          { id: 'sq23', title: 'Generate Parentheses', url: 'https://leetcode.com/problems/generate-parentheses/', difficulty: 'Medium', pattern: 'parentheses-expression' },
          { id: 'sq24', title: 'Longest Valid Parentheses', url: 'https://leetcode.com/problems/longest-valid-parentheses/', difficulty: 'Hard', pattern: 'parentheses-expression' },
          { id: 'sq39', title: 'Minimum Add to Make Parentheses Valid', url: 'https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/', difficulty: 'Medium', pattern: 'parentheses-expression' },
          { id: 'sq40', title: 'Minimum Remove to Make Valid Parentheses', url: 'https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/', difficulty: 'Medium', pattern: 'parentheses-expression' },
          { id: 'sq41', title: 'Score of Parentheses', url: 'https://leetcode.com/problems/score-of-parentheses/', difficulty: 'Medium', pattern: 'parentheses-expression' },
          { id: 'sq25', title: 'Remove Outermost Parentheses', url: 'https://leetcode.com/problems/remove-outermost-parentheses/', difficulty: 'Easy', pattern: 'parentheses-expression' },
        ]
      },
      {
        id: 'monotonic-stack',
        name: 'Monotonic Stack (Very Important)',
        problems: [
          { id: 'sq7', title: 'Next Greater Element I', url: 'https://leetcode.com/problems/next-greater-element-i/', difficulty: 'Easy', pattern: 'monotonic-stack' },
          { id: 'sq8', title: 'Next Greater Element II', url: 'https://leetcode.com/problems/next-greater-element-ii/', difficulty: 'Medium', pattern: 'monotonic-stack' },
          { id: 'sq9', title: 'Daily Temperatures', url: 'https://leetcode.com/problems/daily-temperatures/', difficulty: 'Medium', pattern: 'monotonic-stack' },
          { id: 'sq10', title: 'Final Prices With Special Discount', url: 'https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/', difficulty: 'Easy', pattern: 'monotonic-stack' },
          { id: 'sq11', title: 'Stock Span', url: 'https://leetcode.com/problems/online-stock-span/', difficulty: 'Medium', pattern: 'monotonic-stack' },
          { id: 'sq12', title: 'Remove K Digits', url: 'https://leetcode.com/problems/remove-k-digits/', difficulty: 'Medium', pattern: 'monotonic-stack' },
          { id: 'sq13', title: 'Largest Rectangle in Histogram', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', difficulty: 'Hard', pattern: 'monotonic-stack' },
          { id: 'sq14', title: 'Maximal Rectangle', url: 'https://leetcode.com/problems/maximal-rectangle/', difficulty: 'Hard', pattern: 'monotonic-stack' },
        ]
      },
      {
        id: 'sliding-window-deque',
        name: 'Sliding Window + Deque',
        problems: [
          { id: 'sq15', title: 'Sliding Window Maximum', url: 'https://leetcode.com/problems/sliding-window-maximum/', difficulty: 'Hard', pattern: 'sliding-window-deque' },
          { id: 'sq16', title: 'Shortest Subarray with Sum at Least K', url: 'https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/', difficulty: 'Hard', pattern: 'sliding-window-deque' },
          { id: 'sq17', title: 'Constrained Subsequence Sum', url: 'https://leetcode.com/problems/constrained-subsequence-sum/', difficulty: 'Hard', pattern: 'sliding-window-deque' },
          { id: 'sq18', title: 'Moving Average from Data Stream', url: 'https://leetcode.com/problems/moving-average-from-data-stream/', difficulty: 'Easy', pattern: 'sliding-window-deque' },
          { id: 'sq26', title: 'Dota2 Senate', url: 'https://leetcode.com/problems/dota2-senate/', difficulty: 'Medium', pattern: 'sliding-window-deque' },
        ]
      },
      {
        id: 'stack-simulation',
        name: 'Stack + String / Simulation',
        problems: [
          { id: 'sq42', title: 'Simplify Path', url: 'https://leetcode.com/problems/simplify-path/', difficulty: 'Medium', pattern: 'stack-simulation' },
          { id: 'sq27', title: 'Remove All Adjacent Duplicates in String', url: 'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/', difficulty: 'Easy', pattern: 'stack-simulation' },
          { id: 'sq28', title: 'Remove Duplicate Letters', url: 'https://leetcode.com/problems/remove-duplicate-letters/', difficulty: 'Medium', pattern: 'stack-simulation' },
        ]
      },
      {
        id: 'calculator',
        name: 'Expression Evaluation',
        problems: [
          { id: 'sq19', title: 'Decode String', url: 'https://leetcode.com/problems/decode-string/', difficulty: 'Medium', pattern: 'calculator' },
          { id: 'sq20', title: 'Evaluate Reverse Polish Notation', url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', difficulty: 'Medium', pattern: 'calculator' },
          { id: 'sq21', title: 'Basic Calculator', url: 'https://leetcode.com/problems/basic-calculator/', difficulty: 'Hard', pattern: 'calculator' },
          { id: 'sq22', title: 'Basic Calculator II', url: 'https://leetcode.com/problems/basic-calculator-ii/', difficulty: 'Medium', pattern: 'calculator' },
          { id: 'sq29', title: 'Basic Calculator III', url: 'https://leetcode.com/problems/basic-calculator-iii/', difficulty: 'Hard', pattern: 'calculator' },
        ]
      },
      {
        id: 'queue-bfs',
        name: 'Queue / BFS Style',
        problems: [
          { id: 'sq30', title: 'Number of Recent Calls', url: 'https://leetcode.com/problems/number-of-recent-calls/', difficulty: 'Easy', pattern: 'queue-bfs' },
          { id: 'sq31', title: 'Design Circular Queue', url: 'https://leetcode.com/problems/design-circular-queue/', difficulty: 'Medium', pattern: 'queue-bfs' },
          { id: 'sq32', title: 'Time Needed to Buy Tickets', url: 'https://leetcode.com/problems/time-needed-to-buy-tickets/', difficulty: 'Easy', pattern: 'queue-bfs' },
          { id: 'sq33', title: 'Reveal Cards In Increasing Order', url: 'https://leetcode.com/problems/reveal-cards-in-increasing-order/', difficulty: 'Medium', pattern: 'queue-bfs' },
          { id: 'sq34', title: 'Task Scheduler', url: 'https://leetcode.com/problems/task-scheduler/', difficulty: 'Medium', pattern: 'queue-bfs' },
        ]
      },
      {
        id: 'sq-design',
        name: 'Design / Advanced',
        problems: [
          { id: 'sq43', title: 'LRU Cache', url: 'https://leetcode.com/problems/lru-cache/', difficulty: 'Medium', pattern: 'sq-design' },
          { id: 'sq44', title: 'LFU Cache', url: 'https://leetcode.com/problems/lfu-cache/', difficulty: 'Hard', pattern: 'sq-design' },
          { id: 'sq45', title: 'Design Browser History', url: 'https://leetcode.com/problems/design-browser-history/', difficulty: 'Medium', pattern: 'sq-design' },
          { id: 'sq35', title: 'Design Hit Counter', url: 'https://leetcode.com/problems/design-hit-counter/', difficulty: 'Medium', pattern: 'sq-design' },
          { id: 'sq36', title: 'Design Front Middle Back Queue', url: 'https://leetcode.com/problems/design-front-middle-back-queue/', difficulty: 'Medium', pattern: 'sq-design' },
          { id: 'sq37', title: 'Design Underground System', url: 'https://leetcode.com/problems/design-underground-system/', difficulty: 'Medium', pattern: 'sq-design' },
          { id: 'sq38', title: 'Dinner Plate Stacks', url: 'https://leetcode.com/problems/dinner-plate-stacks/', difficulty: 'Hard', pattern: 'sq-design' },
        ]
      },
    ]
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    description: '40 problems - Classic BS, rotated arrays, binary on answer',
    patterns: [
      {
        id: 'bs-classic',
        name: 'Classic Binary Search',
        problems: [
          { id: 'bs1', title: 'Binary Search', url: 'https://leetcode.com/problems/binary-search/', difficulty: 'Easy', pattern: 'bs-classic' },
          { id: 'bs2', title: 'Search Insert Position', url: 'https://leetcode.com/problems/search-insert-position/', difficulty: 'Easy', pattern: 'bs-classic' },
          { id: 'bs3', title: 'Guess Number Higher or Lower', url: 'https://leetcode.com/problems/guess-number-higher-or-lower/', difficulty: 'Easy', pattern: 'bs-classic' },
          { id: 'bs4', title: 'First Bad Version', url: 'https://leetcode.com/problems/first-bad-version/', difficulty: 'Easy', pattern: 'bs-classic' },
          { id: 'bs5', title: 'Sqrt(x)', url: 'https://leetcode.com/problems/sqrtx/', difficulty: 'Easy', pattern: 'bs-classic' },
          { id: 'bs6', title: 'Valid Perfect Square', url: 'https://leetcode.com/problems/valid-perfect-square/', difficulty: 'Easy', pattern: 'bs-classic' },
        ]
      },
      {
        id: 'bs-bounds',
        name: 'Lower/Upper Bound',
        problems: [
          { id: 'bs7', title: 'Find First and Last Position', url: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', difficulty: 'Medium', pattern: 'bs-bounds' },
          { id: 'bs28', title: 'Count Negative Numbers in Sorted Matrix', url: 'https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/', difficulty: 'Easy', pattern: 'bs-bounds' },
          { id: 'bs8', title: 'Peak Index in Mountain Array', url: 'https://leetcode.com/problems/peak-index-in-a-mountain-array/', difficulty: 'Medium', pattern: 'bs-bounds' },
          { id: 'bs9', title: 'Find Smallest Letter Greater Than Target', url: 'https://leetcode.com/problems/find-smallest-letter-greater-than-target/', difficulty: 'Easy', pattern: 'bs-bounds' },
          { id: 'bs10', title: 'Kth Missing Positive Number', url: 'https://leetcode.com/problems/kth-missing-positive-number/', difficulty: 'Easy', pattern: 'bs-bounds' },
          { id: 'bs11', title: 'Single Element in Sorted Array', url: 'https://leetcode.com/problems/single-element-in-a-sorted-array/', difficulty: 'Medium', pattern: 'bs-bounds' },
        ]
      },
      {
        id: 'bs-rotated',
        name: 'Rotated Sorted Array',
        problems: [
          { id: 'bs12', title: 'Search in Rotated Sorted Array', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'Medium', pattern: 'bs-rotated' },
          { id: 'bs13', title: 'Search in Rotated Sorted Array II', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array-ii/', difficulty: 'Medium', pattern: 'bs-rotated' },
          { id: 'bs14', title: 'Find Minimum in Rotated Sorted Array', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'Medium', pattern: 'bs-rotated' },
          { id: 'bs15', title: 'Find Minimum in Rotated Sorted Array II', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/', difficulty: 'Hard', pattern: 'bs-rotated' },
          { id: 'bs16', title: 'Find Peak Element', url: 'https://leetcode.com/problems/find-peak-element/', difficulty: 'Medium', pattern: 'bs-rotated' },
          { id: 'bs29', title: 'Find Peak Element II', url: 'https://leetcode.com/problems/find-a-peak-element-ii/', difficulty: 'Medium', pattern: 'bs-rotated' },
        ]
      },
      {
        id: 'bs-answer',
        name: 'Binary Search on Answer (Most Important)',
        problems: [
          { id: 'bs17', title: 'Koko Eating Bananas', url: 'https://leetcode.com/problems/koko-eating-bananas/', difficulty: 'Medium', pattern: 'bs-answer' },
          { id: 'bs18', title: 'Capacity To Ship Packages', url: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', difficulty: 'Medium', pattern: 'bs-answer' },
          { id: 'bs19', title: 'Split Array Largest Sum', url: 'https://leetcode.com/problems/split-array-largest-sum/', difficulty: 'Hard', pattern: 'bs-answer' },
          { id: 'bs20', title: 'Minimum Days to Make m Bouquets', url: 'https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/', difficulty: 'Medium', pattern: 'bs-answer' },
          { id: 'bs21', title: 'Magnetic Force Between Two Balls', url: 'https://leetcode.com/problems/magnetic-force-between-two-balls/', difficulty: 'Medium', pattern: 'bs-answer' },
          { id: 'bs30', title: 'Aggressive Cows', url: 'https://leetcode.com/problems/minimize-max-distance-to-gas-station/', difficulty: 'Hard', pattern: 'bs-answer' },
          { id: 'bs22', title: 'Find the Smallest Divisor', url: 'https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/', difficulty: 'Medium', pattern: 'bs-answer' },
          { id: 'bs23', title: 'Minimum Speed to Arrive on Time', url: 'https://leetcode.com/problems/minimum-speed-to-arrive-on-time/', difficulty: 'Medium', pattern: 'bs-answer' },
          { id: 'bs31', title: 'Minimize Maximum Pair Sum', url: 'https://leetcode.com/problems/minimize-maximum-pair-sum-in-array/', difficulty: 'Medium', pattern: 'bs-answer' },
        ]
      },
      {
        id: 'bs-matrix',
        name: 'Matrix Binary Search',
        problems: [
          { id: 'bs24', title: 'Search a 2D Matrix', url: 'https://leetcode.com/problems/search-a-2d-matrix/', difficulty: 'Medium', pattern: 'bs-matrix' },
          { id: 'bs25', title: 'Search a 2D Matrix II', url: 'https://leetcode.com/problems/search-a-2d-matrix-ii/', difficulty: 'Medium', pattern: 'bs-matrix' },
          { id: 'bs26', title: 'Kth Smallest Element in Sorted Matrix', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/', difficulty: 'Medium', pattern: 'bs-matrix' },
          { id: 'bs27', title: 'Median of Two Sorted Arrays', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', difficulty: 'Hard', pattern: 'bs-matrix' },
        ]
      },
      {
        id: 'bs-advanced',
        name: 'Advanced / Tricky',
        problems: [
          { id: 'bs32', title: 'Find Right Interval', url: 'https://leetcode.com/problems/find-right-interval/', difficulty: 'Medium', pattern: 'bs-advanced' },
          { id: 'bs33', title: 'H-Index II', url: 'https://leetcode.com/problems/h-index-ii/', difficulty: 'Medium', pattern: 'bs-advanced' },
          { id: 'bs34', title: 'Random Pick with Weight', url: 'https://leetcode.com/problems/random-pick-with-weight/', difficulty: 'Medium', pattern: 'bs-advanced' },
          { id: 'bs35', title: 'Time Based Key Value Store', url: 'https://leetcode.com/problems/time-based-key-value-store/', difficulty: 'Medium', pattern: 'bs-advanced' },
          { id: 'bs36', title: 'Snapshot Array', url: 'https://leetcode.com/problems/snapshot-array/', difficulty: 'Medium', pattern: 'bs-advanced' },
          { id: 'bs37', title: 'Maximum Value at a Given Index', url: 'https://leetcode.com/problems/maximum-value-at-a-given-index-in-a-bounded-array/', difficulty: 'Medium', pattern: 'bs-advanced' },
          { id: 'bs38', title: 'Find Distance Value Between Two Arrays', url: 'https://leetcode.com/problems/find-the-distance-value-between-two-arrays/', difficulty: 'Easy', pattern: 'bs-advanced' },
          { id: 'bs39', title: 'Heaters', url: 'https://leetcode.com/problems/heaters/', difficulty: 'Medium', pattern: 'bs-advanced' },
          { id: 'bs40', title: 'Longest Increasing Subsequence', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', difficulty: 'Medium', pattern: 'bs-advanced' },
        ]
      },
    ]
  },
  {
    id: 'tree-prep',
    name: 'Tree Prep - Recursion',
    description: '25 problems - Master recursion before trees',
    patterns: [
      {
        id: 'recursion-stage1',
        name: 'Stage 1 - Absolute Basics',
        problems: [
          { id: 'tp1', title: 'Fibonacci Number', url: 'https://leetcode.com/problems/fibonacci-number/', difficulty: 'Easy', pattern: 'recursion-stage1' },
          { id: 'tp2', title: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'Easy', pattern: 'recursion-stage1' },
          { id: 'tp3', title: 'Pow(x,n)', url: 'https://leetcode.com/problems/powx-n/', difficulty: 'Medium', pattern: 'recursion-stage1' },
          { id: 'tp4', title: 'Add Digits', url: 'https://leetcode.com/problems/add-digits/', difficulty: 'Easy', pattern: 'recursion-stage1' },
          { id: 'tp5', title: 'Reverse String', url: 'https://leetcode.com/problems/reverse-string/', difficulty: 'Easy', pattern: 'recursion-stage1' },
        ]
      },
      {
        id: 'recursion-stage2',
        name: 'Stage 2 - Arrays / Linked List',
        problems: [
          { id: 'tp6', title: 'Reverse Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/', difficulty: 'Easy', pattern: 'recursion-stage2' },
          { id: 'tp7', title: 'Merge Two Sorted Lists', url: 'https://leetcode.com/problems/merge-two-sorted-lists/', difficulty: 'Easy', pattern: 'recursion-stage2' },
          { id: 'tp8', title: 'Remove Linked List Elements', url: 'https://leetcode.com/problems/remove-linked-list-elements/', difficulty: 'Easy', pattern: 'recursion-stage2' },
          { id: 'tp9', title: 'Palindrome Linked List', url: 'https://leetcode.com/problems/palindrome-linked-list/', difficulty: 'Easy', pattern: 'recursion-stage2' },
          { id: 'tp10', title: 'Binary Search (recursive)', url: 'https://leetcode.com/problems/binary-search/', difficulty: 'Easy', pattern: 'recursion-stage2' },
        ]
      },
      {
        id: 'recursion-stage3',
        name: 'Stage 3 - Divide & Conquer',
        problems: [
          { id: 'tp11', title: 'Maximum Subarray (D&C)', url: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'Medium', pattern: 'recursion-stage3' },
          { id: 'tp12', title: 'Sort List', url: 'https://leetcode.com/problems/sort-list/', difficulty: 'Medium', pattern: 'recursion-stage3' },
          { id: 'tp13', title: 'Merge K Sorted Lists', url: 'https://leetcode.com/problems/merge-k-sorted-lists/', difficulty: 'Hard', pattern: 'recursion-stage3' },
          { id: 'tp14', title: 'Different Ways to Add Parentheses', url: 'https://leetcode.com/problems/different-ways-to-add-parentheses/', difficulty: 'Medium', pattern: 'recursion-stage3' },
          { id: 'tp15', title: 'Construct Binary Tree from Traversals', url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', difficulty: 'Medium', pattern: 'recursion-stage3' },
        ]
      },
      {
        id: 'recursion-stage4',
        name: 'Stage 4 - Backtracking Basics',
        problems: [
          { id: 'tp16', title: 'Subsets', url: 'https://leetcode.com/problems/subsets/', difficulty: 'Medium', pattern: 'recursion-stage4' },
          { id: 'tp17', title: 'Permutations', url: 'https://leetcode.com/problems/permutations/', difficulty: 'Medium', pattern: 'recursion-stage4' },
          { id: 'tp18', title: 'Generate Parentheses', url: 'https://leetcode.com/problems/generate-parentheses/', difficulty: 'Medium', pattern: 'recursion-stage4' },
          { id: 'tp19', title: 'Combination Sum', url: 'https://leetcode.com/problems/combination-sum/', difficulty: 'Medium', pattern: 'recursion-stage4' },
          { id: 'tp20', title: 'Letter Combinations of Phone Number', url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', difficulty: 'Medium', pattern: 'recursion-stage4' },
        ]
      },
      {
        id: 'recursion-stage5',
        name: 'Stage 5 - Direct Tree-Style Recursion',
        problems: [
          { id: 'tp21', title: 'Maximum Depth of Binary Tree', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'Easy', pattern: 'recursion-stage5' },
          { id: 'tp22', title: 'Same Tree', url: 'https://leetcode.com/problems/same-tree/', difficulty: 'Easy', pattern: 'recursion-stage5' },
          { id: 'tp23', title: 'Path Sum', url: 'https://leetcode.com/problems/path-sum/', difficulty: 'Easy', pattern: 'recursion-stage5' },
          { id: 'tp24', title: 'Balanced Binary Tree', url: 'https://leetcode.com/problems/balanced-binary-tree/', difficulty: 'Easy', pattern: 'recursion-stage5' },
          { id: 'tp25', title: 'Diameter of Binary Tree', url: 'https://leetcode.com/problems/diameter-of-binary-tree/', difficulty: 'Easy', pattern: 'recursion-stage5' },
        ]
      },
    ]
  },
  {
    id: 'trees-bst',
    name: 'Trees & BST',
    description: '70 problems - Traversals, DFS/BFS, LCA, DP on trees',
    patterns: [
      {
        id: 'tree-traversal',
        name: 'Traversals',
        problems: [
          { id: 'tr1', title: 'Binary Tree Inorder Traversal', url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', difficulty: 'Easy', pattern: 'tree-traversal' },
          { id: 'tr2', title: 'Binary Tree Preorder Traversal', url: 'https://leetcode.com/problems/binary-tree-preorder-traversal/', difficulty: 'Easy', pattern: 'tree-traversal' },
          { id: 'tr3', title: 'Binary Tree Postorder Traversal', url: 'https://leetcode.com/problems/binary-tree-postorder-traversal/', difficulty: 'Easy', pattern: 'tree-traversal' },
          { id: 'tr4', title: 'Binary Tree Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'Medium', pattern: 'tree-traversal' },
          { id: 'tr5', title: 'Binary Tree Level Order Traversal II', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal-ii/', difficulty: 'Medium', pattern: 'tree-traversal' },
          { id: 'tr6', title: 'Binary Tree Zigzag Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/', difficulty: 'Medium', pattern: 'tree-traversal' },
          { id: 'tr7', title: 'Average of Levels in Binary Tree', url: 'https://leetcode.com/problems/average-of-levels-in-binary-tree/', difficulty: 'Easy', pattern: 'tree-traversal' },
        ]
      },
      {
        id: 'tree-dfs-height',
        name: 'DFS / Height Based',
        problems: [
          { id: 'tr8', title: 'Maximum Depth of Binary Tree', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'Easy', pattern: 'tree-dfs-height' },
          { id: 'tr9', title: 'Minimum Depth of Binary Tree', url: 'https://leetcode.com/problems/minimum-depth-of-binary-tree/', difficulty: 'Easy', pattern: 'tree-dfs-height' },
          { id: 'tr10', title: 'Balanced Binary Tree', url: 'https://leetcode.com/problems/balanced-binary-tree/', difficulty: 'Easy', pattern: 'tree-dfs-height' },
          { id: 'tr11', title: 'Diameter of Binary Tree', url: 'https://leetcode.com/problems/diameter-of-binary-tree/', difficulty: 'Easy', pattern: 'tree-dfs-height' },
          { id: 'tr12', title: 'Same Tree', url: 'https://leetcode.com/problems/same-tree/', difficulty: 'Easy', pattern: 'tree-dfs-height' },
          { id: 'tr13', title: 'Symmetric Tree', url: 'https://leetcode.com/problems/symmetric-tree/', difficulty: 'Easy', pattern: 'tree-dfs-height' },
          { id: 'tr14', title: 'Count Complete Tree Nodes', url: 'https://leetcode.com/problems/count-complete-tree-nodes/', difficulty: 'Medium', pattern: 'tree-dfs-height' },
        ]
      },
      {
        id: 'tree-path',
        name: 'Path Problems',
        problems: [
          { id: 'tr15', title: 'Path Sum', url: 'https://leetcode.com/problems/path-sum/', difficulty: 'Easy', pattern: 'tree-path' },
          { id: 'tr16', title: 'Path Sum II', url: 'https://leetcode.com/problems/path-sum-ii/', difficulty: 'Medium', pattern: 'tree-path' },
          { id: 'tr17', title: 'Path Sum III', url: 'https://leetcode.com/problems/path-sum-iii/', difficulty: 'Medium', pattern: 'tree-path' },
          { id: 'tr18', title: 'Sum Root to Leaf Numbers', url: 'https://leetcode.com/problems/sum-root-to-leaf-numbers/', difficulty: 'Medium', pattern: 'tree-path' },
          { id: 'tr19', title: 'Binary Tree Maximum Path Sum', url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', difficulty: 'Hard', pattern: 'tree-path' },
          { id: 'tr20', title: 'Smallest String Starting From Leaf', url: 'https://leetcode.com/problems/smallest-string-starting-from-leaf/', difficulty: 'Medium', pattern: 'tree-path' },
          { id: 'tr21', title: 'Pseudo-Palindromic Paths in a Binary Tree', url: 'https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/', difficulty: 'Medium', pattern: 'tree-path' },
        ]
      },
      {
        id: 'tree-construct',
        name: 'Tree Construction / Modification',
        problems: [
          { id: 'tr22', title: 'Invert Binary Tree', url: 'https://leetcode.com/problems/invert-binary-tree/', difficulty: 'Easy', pattern: 'tree-construct' },
          { id: 'tr23', title: 'Merge Two Binary Trees', url: 'https://leetcode.com/problems/merge-two-binary-trees/', difficulty: 'Easy', pattern: 'tree-construct' },
          { id: 'tr24', title: 'Flatten Binary Tree to Linked List', url: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/', difficulty: 'Medium', pattern: 'tree-construct' },
          { id: 'tr25', title: 'Construct Binary Tree from Preorder and Inorder', url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', difficulty: 'Medium', pattern: 'tree-construct' },
          { id: 'tr26', title: 'Construct Binary Tree from Inorder and Postorder', url: 'https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/', difficulty: 'Medium', pattern: 'tree-construct' },
          { id: 'tr27', title: 'Serialize and Deserialize Binary Tree', url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', difficulty: 'Hard', pattern: 'tree-construct' },
          { id: 'tr28', title: 'Populating Next Right Pointers in Each Node', url: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node/', difficulty: 'Medium', pattern: 'tree-construct' },
        ]
      },
      {
        id: 'bst-specific',
        name: 'BST Specific',
        problems: [
          { id: 'tr29', title: 'Validate Binary Search Tree', url: 'https://leetcode.com/problems/validate-binary-search-tree/', difficulty: 'Medium', pattern: 'bst-specific' },
          { id: 'tr30', title: 'Search in a Binary Search Tree', url: 'https://leetcode.com/problems/search-in-a-binary-search-tree/', difficulty: 'Easy', pattern: 'bst-specific' },
          { id: 'tr31', title: 'Insert into a Binary Search Tree', url: 'https://leetcode.com/problems/insert-into-a-binary-search-tree/', difficulty: 'Medium', pattern: 'bst-specific' },
          { id: 'tr32', title: 'Delete Node in a BST', url: 'https://leetcode.com/problems/delete-node-in-a-bst/', difficulty: 'Medium', pattern: 'bst-specific' },
          { id: 'tr33', title: 'Kth Smallest Element in a BST', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-binary-search-tree/', difficulty: 'Medium', pattern: 'bst-specific' },
          { id: 'tr34', title: 'Convert Sorted Array to BST', url: 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/', difficulty: 'Easy', pattern: 'bst-specific' },
          { id: 'tr35', title: 'Minimum Absolute Difference in BST', url: 'https://leetcode.com/problems/minimum-absolute-difference-in-bst/', difficulty: 'Easy', pattern: 'bst-specific' },
          { id: 'tr36', title: 'Range Sum of BST', url: 'https://leetcode.com/problems/range-sum-of-bst/', difficulty: 'Easy', pattern: 'bst-specific' },
          { id: 'tr37', title: 'Binary Search Tree Iterator', url: 'https://leetcode.com/problems/binary-search-tree-iterator/', difficulty: 'Medium', pattern: 'bst-specific' },
        ]
      },
      {
        id: 'tree-lca',
        name: 'LCA / Ancestor',
        problems: [
          { id: 'tr38', title: 'Lowest Common Ancestor of a Binary Search Tree', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', difficulty: 'Easy', pattern: 'tree-lca' },
          { id: 'tr39', title: 'Lowest Common Ancestor of a Binary Tree', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', difficulty: 'Medium', pattern: 'tree-lca' },
          { id: 'tr40', title: 'Step by Step Directions From a Binary Tree Node to Another', url: 'https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/', difficulty: 'Medium', pattern: 'tree-lca' },
        ]
      },
      {
        id: 'tree-bfs',
        name: 'BFS / Level Order Variants',
        problems: [
          { id: 'tr41', title: 'Binary Tree Right Side View', url: 'https://leetcode.com/problems/binary-tree-right-side-view/', difficulty: 'Medium', pattern: 'tree-bfs' },
          { id: 'tr42', title: 'Binary Tree Left Side View', url: 'https://leetcode.com/problems/binary-tree-left-side-view/', difficulty: 'Medium', pattern: 'tree-bfs' },
          { id: 'tr43', title: 'Cousins in Binary Tree', url: 'https://leetcode.com/problems/cousins-in-binary-tree/', difficulty: 'Easy', pattern: 'tree-bfs' },
          { id: 'tr44', title: 'Maximum Width of Binary Tree', url: 'https://leetcode.com/problems/maximum-width-of-binary-tree/', difficulty: 'Medium', pattern: 'tree-bfs' },
          { id: 'tr45', title: 'Check Completeness of a Binary Tree', url: 'https://leetcode.com/problems/check-completeness-of-a-binary-tree/', difficulty: 'Medium', pattern: 'tree-bfs' },
          { id: 'tr46', title: 'Even Odd Tree', url: 'https://leetcode.com/problems/even-odd-tree/', difficulty: 'Medium', pattern: 'tree-bfs' },
        ]
      },
      {
        id: 'tree-dp',
        name: 'DP on Trees / Advanced',
        problems: [
          { id: 'tr47', title: 'House Robber III', url: 'https://leetcode.com/problems/house-robber-iii/', difficulty: 'Medium', pattern: 'tree-dp' },
          { id: 'tr48', title: 'Unique Binary Search Trees', url: 'https://leetcode.com/problems/unique-binary-search-trees/', difficulty: 'Medium', pattern: 'tree-dp' },
          { id: 'tr49', title: 'Unique Binary Search Trees II', url: 'https://leetcode.com/problems/unique-binary-search-trees-ii/', difficulty: 'Medium', pattern: 'tree-dp' },
          { id: 'tr50', title: 'Maximum Product of Splitted Binary Tree', url: 'https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/', difficulty: 'Medium', pattern: 'tree-dp' },
          { id: 'tr51', title: 'Longest Univalue Path', url: 'https://leetcode.com/problems/longest-univalue-path/', difficulty: 'Medium', pattern: 'tree-dp' },
          { id: 'tr52', title: 'Distribute Coins in Binary Tree', url: 'https://leetcode.com/problems/distribute-coins-in-binary-tree/', difficulty: 'Medium', pattern: 'tree-dp' },
        ]
      },
      {
        id: 'tree-hard',
        name: 'Hard / High Frequency',
        problems: [
          { id: 'tr53', title: 'Binary Tree Cameras', url: 'https://leetcode.com/problems/binary-tree-cameras/', difficulty: 'Hard', pattern: 'tree-hard' },
          { id: 'tr54', title: 'Recover Binary Search Tree', url: 'https://leetcode.com/problems/recover-binary-search-tree/', difficulty: 'Medium', pattern: 'tree-hard' },
          { id: 'tr55', title: 'Vertical Order Traversal of a Binary Tree', url: 'https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/', difficulty: 'Hard', pattern: 'tree-hard' },
          { id: 'tr56', title: 'Construct Maximum Binary Tree', url: 'https://leetcode.com/problems/construct-maximum-binary-tree/', difficulty: 'Medium', pattern: 'tree-hard' },
          { id: 'tr57', title: 'All Nodes Distance K in Binary Tree', url: 'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/', difficulty: 'Medium', pattern: 'tree-hard' },
          { id: 'tr58', title: 'Delete Leaves With a Given Value', url: 'https://leetcode.com/problems/delete-leaves-with-a-given-value/', difficulty: 'Medium', pattern: 'tree-hard' },
          { id: 'tr59', title: 'Sum of Distances in Tree', url: 'https://leetcode.com/problems/sum-of-distances-in-tree/', difficulty: 'Hard', pattern: 'tree-hard' },
          { id: 'tr60', title: 'Binary Tree Coloring Game', url: 'https://leetcode.com/problems/binary-tree-coloring-game/', difficulty: 'Medium', pattern: 'tree-hard' },
        ]
      },
      {
        id: 'tree-bonus',
        name: 'Bonus / Practice',
        problems: [
          { id: 'tr61', title: 'Leaf-Similar Trees', url: 'https://leetcode.com/problems/leaf-similar-trees/', difficulty: 'Easy', pattern: 'tree-bonus' },
          { id: 'tr62', title: 'Increasing Order Search Tree', url: 'https://leetcode.com/problems/increasing-order-search-tree/', difficulty: 'Easy', pattern: 'tree-bonus' },
          { id: 'tr63', title: 'Find Mode in Binary Search Tree', url: 'https://leetcode.com/problems/find-mode-in-binary-search-tree/', difficulty: 'Easy', pattern: 'tree-bonus' },
          { id: 'tr64', title: 'Subtree of Another Tree', url: 'https://leetcode.com/problems/subtree-of-another-tree/', difficulty: 'Easy', pattern: 'tree-bonus' },
          { id: 'tr65', title: 'Flip Equivalent Binary Trees', url: 'https://leetcode.com/problems/flip-equivalent-binary-trees/', difficulty: 'Medium', pattern: 'tree-bonus' },
          { id: 'tr66', title: 'Add One Row to Tree', url: 'https://leetcode.com/problems/add-one-row-to-tree/', difficulty: 'Medium', pattern: 'tree-bonus' },
          { id: 'tr67', title: 'Longest ZigZag Path in a Binary Tree', url: 'https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/', difficulty: 'Medium', pattern: 'tree-bonus' },
          { id: 'tr68', title: 'Maximum Difference Between Node and Ancestor', url: 'https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/', difficulty: 'Medium', pattern: 'tree-bonus' },
          { id: 'tr69', title: 'Deepest Leaves Sum', url: 'https://leetcode.com/problems/deepest-leaves-sum/', difficulty: 'Medium', pattern: 'tree-bonus' },
          { id: 'tr70', title: 'Count Good Nodes in Binary Tree', url: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/', difficulty: 'Medium', pattern: 'tree-bonus' },
        ]
      },
    ]
  },
  {
    id: 'graphs',
    name: 'Graphs',
    description: '55 problems - BFS/DFS, topo sort, DSU, shortest path',
    patterns: [
      {
        id: 'graph-bfs-dfs',
        name: 'BFS / DFS Basics',
        problems: [
          { id: 'gr1', title: 'Find if Path Exists in Graph', url: 'https://leetcode.com/problems/find-if-path-exists-in-graph/', difficulty: 'Easy', pattern: 'graph-bfs-dfs' },
          { id: 'gr2', title: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'Medium', pattern: 'graph-bfs-dfs' },
          { id: 'gr3', title: 'Max Area of Island', url: 'https://leetcode.com/problems/max-area-of-island/', difficulty: 'Medium', pattern: 'graph-bfs-dfs' },
          { id: 'gr4', title: 'Flood Fill', url: 'https://leetcode.com/problems/flood-fill/', difficulty: 'Easy', pattern: 'graph-bfs-dfs' },
          { id: 'gr5', title: 'Island Perimeter', url: 'https://leetcode.com/problems/island-perimeter/', difficulty: 'Easy', pattern: 'graph-bfs-dfs' },
          { id: 'gr6', title: 'Surrounded Regions', url: 'https://leetcode.com/problems/surrounded-regions/', difficulty: 'Medium', pattern: 'graph-bfs-dfs' },
          { id: 'gr7', title: 'Rotting Oranges', url: 'https://leetcode.com/problems/rotting-oranges/', difficulty: 'Medium', pattern: 'graph-bfs-dfs' },
          { id: 'gr8', title: 'Walls and Gates', url: 'https://leetcode.com/problems/walls-and-gates/', difficulty: 'Medium', pattern: 'graph-bfs-dfs' },
          { id: 'gr9', title: 'Number of Enclaves', url: 'https://leetcode.com/problems/number-of-enclaves/', difficulty: 'Medium', pattern: 'graph-bfs-dfs' },
          { id: 'gr10', title: 'Count Sub Islands', url: 'https://leetcode.com/problems/count-sub-islands/', difficulty: 'Medium', pattern: 'graph-bfs-dfs' },
        ]
      },
      {
        id: 'graph-multisource',
        name: 'Multi-Source BFS / Matrix BFS',
        problems: [
          { id: 'gr11', title: '01 Matrix', url: 'https://leetcode.com/problems/01-matrix/', difficulty: 'Medium', pattern: 'graph-multisource' },
          { id: 'gr12', title: 'Shortest Path in Binary Matrix', url: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/', difficulty: 'Medium', pattern: 'graph-multisource' },
          { id: 'gr13', title: 'As Far from Land as Possible', url: 'https://leetcode.com/problems/as-far-from-land-as-possible/', difficulty: 'Medium', pattern: 'graph-multisource' },
          { id: 'gr14', title: 'Nearest Exit from Entrance in Maze', url: 'https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/', difficulty: 'Medium', pattern: 'graph-multisource' },
          { id: 'gr15', title: 'Pacific Atlantic Water Flow', url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', difficulty: 'Medium', pattern: 'graph-multisource' },
        ]
      },
      {
        id: 'graph-cycle',
        name: 'Cycle Detection',
        problems: [
          { id: 'gr16', title: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/', difficulty: 'Medium', pattern: 'graph-cycle' },
          { id: 'gr17', title: 'Course Schedule II', url: 'https://leetcode.com/problems/course-schedule-ii/', difficulty: 'Medium', pattern: 'graph-cycle' },
          { id: 'gr18', title: 'Is Graph Bipartite?', url: 'https://leetcode.com/problems/is-graph-bipartite/', difficulty: 'Medium', pattern: 'graph-cycle' },
          { id: 'gr19', title: 'Possible Bipartition', url: 'https://leetcode.com/problems/possible-bipartition/', difficulty: 'Medium', pattern: 'graph-cycle' },
          { id: 'gr20', title: 'Redundant Connection', url: 'https://leetcode.com/problems/redundant-connection/', difficulty: 'Medium', pattern: 'graph-cycle' },
          { id: 'gr21', title: 'Redundant Connection II', url: 'https://leetcode.com/problems/redundant-connection-ii/', difficulty: 'Hard', pattern: 'graph-cycle' },
        ]
      },
      {
        id: 'graph-topo',
        name: 'Topological Sort',
        problems: [
          { id: 'gr22', title: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/', difficulty: 'Medium', pattern: 'graph-topo' },
          { id: 'gr23', title: 'Course Schedule II', url: 'https://leetcode.com/problems/course-schedule-ii/', difficulty: 'Medium', pattern: 'graph-topo' },
          { id: 'gr24', title: 'Alien Dictionary', url: 'https://leetcode.com/problems/alien-dictionary/', difficulty: 'Hard', pattern: 'graph-topo' },
          { id: 'gr25', title: 'Parallel Courses', url: 'https://leetcode.com/problems/parallel-courses/', difficulty: 'Medium', pattern: 'graph-topo' },
          { id: 'gr26', title: 'Minimum Height Trees', url: 'https://leetcode.com/problems/minimum-height-trees/', difficulty: 'Medium', pattern: 'graph-topo' },
        ]
      },
      {
        id: 'graph-dsu',
        name: 'Union Find / DSU',
        problems: [
          { id: 'gr27', title: 'Number of Connected Components in an Undirected Graph', url: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', difficulty: 'Medium', pattern: 'graph-dsu' },
          { id: 'gr28', title: 'Number of Provinces', url: 'https://leetcode.com/problems/number-of-provinces/', difficulty: 'Medium', pattern: 'graph-dsu' },
          { id: 'gr29', title: 'Accounts Merge', url: 'https://leetcode.com/problems/accounts-merge/', difficulty: 'Medium', pattern: 'graph-dsu' },
          { id: 'gr30', title: 'Evaluate Division', url: 'https://leetcode.com/problems/evaluate-division/', difficulty: 'Medium', pattern: 'graph-dsu' },
          { id: 'gr31', title: 'Satisfiability of Equality Equations', url: 'https://leetcode.com/problems/satisfiability-of-equality-equations/', difficulty: 'Medium', pattern: 'graph-dsu' },
          { id: 'gr32', title: 'Most Stones Removed with Same Row or Column', url: 'https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/', difficulty: 'Medium', pattern: 'graph-dsu' },
          { id: 'gr33', title: 'Regions Cut by Slashes', url: 'https://leetcode.com/problems/regions-cut-by-slashes/', difficulty: 'Hard', pattern: 'graph-dsu' },
        ]
      },
      {
        id: 'graph-shortest',
        name: 'Shortest Path',
        problems: [
          { id: 'gr34', title: 'Network Delay Time', url: 'https://leetcode.com/problems/network-delay-time/', difficulty: 'Medium', pattern: 'graph-shortest' },
          { id: 'gr35', title: 'Cheapest Flights Within K Stops', url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', difficulty: 'Medium', pattern: 'graph-shortest' },
          { id: 'gr36', title: 'Path With Minimum Effort', url: 'https://leetcode.com/problems/path-with-minimum-effort/', difficulty: 'Medium', pattern: 'graph-shortest' },
          { id: 'gr37', title: 'Min Cost to Connect All Points', url: 'https://leetcode.com/problems/min-cost-to-connect-all-points/', difficulty: 'Medium', pattern: 'graph-shortest' },
          { id: 'gr38', title: 'Swim in Rising Water', url: 'https://leetcode.com/problems/swim-in-rising-water/', difficulty: 'Hard', pattern: 'graph-shortest' },
          { id: 'gr39', title: 'The Maze II', url: 'https://leetcode.com/problems/the-maze-ii/', difficulty: 'Medium', pattern: 'graph-shortest' },
          { id: 'gr40', title: 'Number of Ways to Arrive at Destination', url: 'https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/', difficulty: 'Medium', pattern: 'graph-shortest' },
        ]
      },
      {
        id: 'graph-bfs-state',
        name: 'BFS + State / Hard',
        problems: [
          { id: 'gr41', title: 'Word Ladder', url: 'https://leetcode.com/problems/word-ladder/', difficulty: 'Hard', pattern: 'graph-bfs-state' },
          { id: 'gr42', title: 'Word Ladder II', url: 'https://leetcode.com/problems/word-ladder-ii/', difficulty: 'Hard', pattern: 'graph-bfs-state' },
          { id: 'gr43', title: 'Open the Lock', url: 'https://leetcode.com/problems/open-the-lock/', difficulty: 'Medium', pattern: 'graph-bfs-state' },
          { id: 'gr44', title: 'Sliding Puzzle', url: 'https://leetcode.com/problems/sliding-puzzle/', difficulty: 'Hard', pattern: 'graph-bfs-state' },
          { id: 'gr45', title: 'Snakes and Ladders', url: 'https://leetcode.com/problems/snakes-and-ladders/', difficulty: 'Medium', pattern: 'graph-bfs-state' },
        ]
      },
      {
        id: 'graph-dfs-backtrack',
        name: 'DFS Backtracking + Graph',
        problems: [
          { id: 'gr46', title: 'All Paths From Source to Target', url: 'https://leetcode.com/problems/all-paths-from-source-to-target/', difficulty: 'Medium', pattern: 'graph-dfs-backtrack' },
          { id: 'gr47', title: 'Clone Graph', url: 'https://leetcode.com/problems/clone-graph/', difficulty: 'Medium', pattern: 'graph-dfs-backtrack' },
          { id: 'gr48', title: 'Reconstruct Itinerary', url: 'https://leetcode.com/problems/reconstruct-itinerary/', difficulty: 'Hard', pattern: 'graph-dfs-backtrack' },
          { id: 'gr49', title: 'Keys and Rooms', url: 'https://leetcode.com/problems/keys-and-rooms/', difficulty: 'Medium', pattern: 'graph-dfs-backtrack' },
          { id: 'gr50', title: 'Critical Connections in a Network', url: 'https://leetcode.com/problems/critical-connections-in-a-network/', difficulty: 'Hard', pattern: 'graph-dfs-backtrack' },
        ]
      },
      {
        id: 'graph-hard',
        name: 'Hard / Interview Level',
        problems: [
          { id: 'gr51', title: 'Bus Routes', url: 'https://leetcode.com/problems/bus-routes/', difficulty: 'Hard', pattern: 'graph-hard' },
          { id: 'gr52', title: 'Shortest Path Visiting All Nodes', url: 'https://leetcode.com/problems/shortest-path-visiting-all-nodes/', difficulty: 'Hard', pattern: 'graph-hard' },
          { id: 'gr53', title: 'Frog Position After T Seconds', url: 'https://leetcode.com/problems/frog-position-after-t-seconds/', difficulty: 'Hard', pattern: 'graph-hard' },
          { id: 'gr54', title: 'Detonate the Maximum Bombs', url: 'https://leetcode.com/problems/detonate-the-maximum-bombs/', difficulty: 'Medium', pattern: 'graph-hard' },
          { id: 'gr55', title: 'Minimum Fuel Cost to Report to the Capital', url: 'https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital/', difficulty: 'Medium', pattern: 'graph-hard' },
        ]
      },
    ]
  },
  {
    id: 'dynamic-programming',
    name: 'Dynamic Programming',
    description: '75 problems - 1D/2D DP, LIS, Knapsack, DP on strings',
    patterns: [
      {
        id: 'dp-1d',
        name: '1D DP / Fibonacci Style',
        problems: [
          { id: 'dp1', title: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'Easy', pattern: 'dp-1d' },
          { id: 'dp2', title: 'Min Cost Climbing Stairs', url: 'https://leetcode.com/problems/min-cost-climbing-stairs/', difficulty: 'Easy', pattern: 'dp-1d' },
          { id: 'dp3', title: 'House Robber', url: 'https://leetcode.com/problems/house-robber/', difficulty: 'Medium', pattern: 'dp-1d' },
          { id: 'dp4', title: 'House Robber II', url: 'https://leetcode.com/problems/house-robber-ii/', difficulty: 'Medium', pattern: 'dp-1d' },
          { id: 'dp5', title: 'N-th Tribonacci Number', url: 'https://leetcode.com/problems/n-th-tribonacci-number/', difficulty: 'Easy', pattern: 'dp-1d' },
          { id: 'dp6', title: 'Jump Game', url: 'https://leetcode.com/problems/jump-game/', difficulty: 'Medium', pattern: 'dp-1d' },
          { id: 'dp7', title: 'Jump Game II', url: 'https://leetcode.com/problems/jump-game-ii/', difficulty: 'Medium', pattern: 'dp-1d' },
          { id: 'dp8', title: 'Maximum Sum Circular Subarray', url: 'https://leetcode.com/problems/maximum-sum-circular-subarray/', difficulty: 'Medium', pattern: 'dp-1d' },
        ]
      },
      {
        id: 'dp-grid',
        name: '2D Grid DP',
        problems: [
          { id: 'dp9', title: 'Unique Paths', url: 'https://leetcode.com/problems/unique-paths/', difficulty: 'Medium', pattern: 'dp-grid' },
          { id: 'dp10', title: 'Unique Paths II', url: 'https://leetcode.com/problems/unique-paths-ii/', difficulty: 'Medium', pattern: 'dp-grid' },
          { id: 'dp11', title: 'Minimum Path Sum', url: 'https://leetcode.com/problems/minimum-path-sum/', difficulty: 'Medium', pattern: 'dp-grid' },
          { id: 'dp12', title: 'Triangle', url: 'https://leetcode.com/problems/triangle/', difficulty: 'Medium', pattern: 'dp-grid' },
          { id: 'dp13', title: 'Dungeon Game', url: 'https://leetcode.com/problems/dungeon-game/', difficulty: 'Hard', pattern: 'dp-grid' },
          { id: 'dp14', title: 'Cherry Pickup', url: 'https://leetcode.com/problems/cherry-pickup/', difficulty: 'Hard', pattern: 'dp-grid' },
          { id: 'dp15', title: 'Cherry Pickup II', url: 'https://leetcode.com/problems/cherry-pickup-ii/', difficulty: 'Hard', pattern: 'dp-grid' },
        ]
      },
      {
        id: 'dp-subarray',
        name: 'Subarray / Kadane Style',
        problems: [
          { id: 'dp16', title: 'Maximum Subarray', url: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'Medium', pattern: 'dp-subarray' },
          { id: 'dp17', title: 'Maximum Product Subarray', url: 'https://leetcode.com/problems/maximum-product-subarray/', difficulty: 'Medium', pattern: 'dp-subarray' },
          { id: 'dp18', title: 'Maximum Sum of Two Non-Overlapping Subarrays', url: 'https://leetcode.com/problems/maximum-sum-of-two-non-overlapping-subarrays/', difficulty: 'Medium', pattern: 'dp-subarray' },
          { id: 'dp19', title: 'Best Time to Buy and Sell Stock', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', difficulty: 'Easy', pattern: 'dp-subarray' },
          { id: 'dp20', title: 'Best Time to Buy and Sell Stock II', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/', difficulty: 'Medium', pattern: 'dp-subarray' },
          { id: 'dp21', title: 'Best Time to Buy and Sell Stock III', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/', difficulty: 'Hard', pattern: 'dp-subarray' },
          { id: 'dp22', title: 'Best Time to Buy and Sell Stock IV', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/', difficulty: 'Hard', pattern: 'dp-subarray' },
          { id: 'dp23', title: 'Best Time to Buy and Sell Stock with Cooldown', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/', difficulty: 'Medium', pattern: 'dp-subarray' },
        ]
      },
      {
        id: 'dp-lis',
        name: 'Longest Increasing Subsequence',
        problems: [
          { id: 'dp24', title: 'Longest Increasing Subsequence', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', difficulty: 'Medium', pattern: 'dp-lis' },
          { id: 'dp25', title: 'Number of Longest Increasing Subsequence', url: 'https://leetcode.com/problems/number-of-longest-increasing-subsequence/', difficulty: 'Medium', pattern: 'dp-lis' },
          { id: 'dp26', title: 'Russian Doll Envelopes', url: 'https://leetcode.com/problems/russian-doll-envelopes/', difficulty: 'Hard', pattern: 'dp-lis' },
          { id: 'dp27', title: 'Maximum Length of Pair Chain', url: 'https://leetcode.com/problems/maximum-length-of-pair-chain/', difficulty: 'Medium', pattern: 'dp-lis' },
          { id: 'dp28', title: 'Largest Divisible Subset', url: 'https://leetcode.com/problems/largest-divisible-subset/', difficulty: 'Medium', pattern: 'dp-lis' },
        ]
      },
      {
        id: 'dp-knapsack',
        name: 'Knapsack Pattern',
        problems: [
          { id: 'dp29', title: 'Partition Equal Subset Sum', url: 'https://leetcode.com/problems/partition-equal-subset-sum/', difficulty: 'Medium', pattern: 'dp-knapsack' },
          { id: 'dp30', title: 'Target Sum', url: 'https://leetcode.com/problems/target-sum/', difficulty: 'Medium', pattern: 'dp-knapsack' },
          { id: 'dp31', title: 'Coin Change', url: 'https://leetcode.com/problems/coin-change/', difficulty: 'Medium', pattern: 'dp-knapsack' },
          { id: 'dp32', title: 'Coin Change II', url: 'https://leetcode.com/problems/coin-change-ii/', difficulty: 'Medium', pattern: 'dp-knapsack' },
          { id: 'dp33', title: 'Last Stone Weight II', url: 'https://leetcode.com/problems/last-stone-weight-ii/', difficulty: 'Medium', pattern: 'dp-knapsack' },
          { id: 'dp34', title: 'Ones and Zeroes', url: 'https://leetcode.com/problems/ones-and-zeroes/', difficulty: 'Medium', pattern: 'dp-knapsack' },
          { id: 'dp35', title: 'Combination Sum IV', url: 'https://leetcode.com/problems/combination-sum-iv/', difficulty: 'Medium', pattern: 'dp-knapsack' },
        ]
      },
      {
        id: 'dp-string',
        name: 'String DP',
        problems: [
          { id: 'dp36', title: 'Longest Common Subsequence', url: 'https://leetcode.com/problems/longest-common-subsequence/', difficulty: 'Medium', pattern: 'dp-string' },
          { id: 'dp37', title: 'Edit Distance', url: 'https://leetcode.com/problems/edit-distance/', difficulty: 'Hard', pattern: 'dp-string' },
          { id: 'dp38', title: 'Delete Operation for Two Strings', url: 'https://leetcode.com/problems/delete-operation-for-two-strings/', difficulty: 'Medium', pattern: 'dp-string' },
          { id: 'dp39', title: 'Distinct Subsequences', url: 'https://leetcode.com/problems/distinct-subsequences/', difficulty: 'Hard', pattern: 'dp-string' },
          { id: 'dp40', title: 'Interleaving String', url: 'https://leetcode.com/problems/interleaving-string/', difficulty: 'Medium', pattern: 'dp-string' },
          { id: 'dp41', title: 'Longest Palindromic Subsequence', url: 'https://leetcode.com/problems/longest-palindromic-subsequence/', difficulty: 'Medium', pattern: 'dp-string' },
          { id: 'dp42', title: 'Palindrome Partitioning II', url: 'https://leetcode.com/problems/palindrome-partitioning-ii/', difficulty: 'Hard', pattern: 'dp-string' },
          { id: 'dp43', title: 'Word Break', url: 'https://leetcode.com/problems/word-break/', difficulty: 'Medium', pattern: 'dp-string' },
          { id: 'dp44', title: 'Regular Expression Matching', url: 'https://leetcode.com/problems/regular-expression-matching/', difficulty: 'Hard', pattern: 'dp-string' },
          { id: 'dp45', title: 'Wildcard Matching', url: 'https://leetcode.com/problems/wildcard-matching/', difficulty: 'Hard', pattern: 'dp-string' },
        ]
      },
      {
        id: 'dp-interval',
        name: 'Partition / Interval DP',
        problems: [
          { id: 'dp46', title: 'Burst Balloons', url: 'https://leetcode.com/problems/burst-balloons/', difficulty: 'Hard', pattern: 'dp-interval' },
          { id: 'dp47', title: 'Minimum Cost Tree From Leaf Values', url: 'https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/', difficulty: 'Medium', pattern: 'dp-interval' },
          { id: 'dp48', title: 'Strange Printer', url: 'https://leetcode.com/problems/strange-printer/', difficulty: 'Hard', pattern: 'dp-interval' },
          { id: 'dp49', title: 'Palindrome Partitioning', url: 'https://leetcode.com/problems/palindrome-partitioning/', difficulty: 'Medium', pattern: 'dp-interval' },
          { id: 'dp50', title: 'Partition Labels', url: 'https://leetcode.com/problems/partition-labels/', difficulty: 'Medium', pattern: 'dp-interval' },
        ]
      },
      {
        id: 'dp-tree',
        name: 'Tree DP',
        problems: [
          { id: 'dp51', title: 'House Robber III', url: 'https://leetcode.com/problems/house-robber-iii/', difficulty: 'Medium', pattern: 'dp-tree' },
          { id: 'dp52', title: 'Binary Tree Maximum Path Sum', url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', difficulty: 'Hard', pattern: 'dp-tree' },
          { id: 'dp53', title: 'Unique Binary Search Trees', url: 'https://leetcode.com/problems/unique-binary-search-trees/', difficulty: 'Medium', pattern: 'dp-tree' },
        ]
      },
      {
        id: 'dp-advanced',
        name: 'Hard / Advanced DP',
        problems: [
          { id: 'dp54', title: 'Word Break II', url: 'https://leetcode.com/problems/word-break-ii/', difficulty: 'Hard', pattern: 'dp-advanced' },
          { id: 'dp55', title: 'Paint House', url: 'https://leetcode.com/problems/paint-house/', difficulty: 'Medium', pattern: 'dp-advanced' },
          { id: 'dp56', title: 'Paint House II', url: 'https://leetcode.com/problems/paint-house-ii/', difficulty: 'Hard', pattern: 'dp-advanced' },
          { id: 'dp57', title: 'Decode Ways', url: 'https://leetcode.com/problems/decode-ways/', difficulty: 'Medium', pattern: 'dp-advanced' },
          { id: 'dp58', title: 'Decode Ways II', url: 'https://leetcode.com/problems/decode-ways-ii/', difficulty: 'Hard', pattern: 'dp-advanced' },
          { id: 'dp59', title: 'Integer Break', url: 'https://leetcode.com/problems/integer-break/', difficulty: 'Medium', pattern: 'dp-advanced' },
          { id: 'dp60', title: 'Ugly Number II', url: 'https://leetcode.com/problems/ugly-number-ii/', difficulty: 'Medium', pattern: 'dp-advanced' },
          { id: 'dp61', title: 'Perfect Squares', url: 'https://leetcode.com/problems/perfect-squares/', difficulty: 'Medium', pattern: 'dp-advanced' },
          { id: 'dp62', title: 'Count Vowels Permutation', url: 'https://leetcode.com/problems/count-vowels-permutation/', difficulty: 'Hard', pattern: 'dp-advanced' },
          { id: 'dp63', title: 'Maximum Alternating Subsequence Sum', url: 'https://leetcode.com/problems/maximum-alternating-subsequence-sum/', difficulty: 'Medium', pattern: 'dp-advanced' },
          { id: 'dp64', title: 'Stone Game', url: 'https://leetcode.com/problems/stone-game/', difficulty: 'Medium', pattern: 'dp-advanced' },
          { id: 'dp65', title: 'Stone Game II', url: 'https://leetcode.com/problems/stone-game-ii/', difficulty: 'Medium', pattern: 'dp-advanced' },
          { id: 'dp66', title: 'Stone Game III', url: 'https://leetcode.com/problems/stone-game-iii/', difficulty: 'Hard', pattern: 'dp-advanced' },
          { id: 'dp67', title: 'Predict the Winner', url: 'https://leetcode.com/problems/predict-the-winner/', difficulty: 'Medium', pattern: 'dp-advanced' },
          { id: 'dp68', title: 'Minimum Falling Path Sum', url: 'https://leetcode.com/problems/minimum-falling-path-sum/', difficulty: 'Medium', pattern: 'dp-advanced' },
          { id: 'dp69', title: 'Minimum Falling Path Sum II', url: 'https://leetcode.com/problems/minimum-falling-path-sum-ii/', difficulty: 'Hard', pattern: 'dp-advanced' },
          { id: 'dp70', title: 'Shortest Common Supersequence', url: 'https://leetcode.com/problems/shortest-common-supersequence/', difficulty: 'Hard', pattern: 'dp-advanced' },
          { id: 'dp71', title: 'Maximum Dot Product of Two Subsequences', url: 'https://leetcode.com/problems/maximum-dot-product-of-two-subsequences/', difficulty: 'Medium', pattern: 'dp-advanced' },
          { id: 'dp72', title: 'Count Square Submatrices with All Ones', url: 'https://leetcode.com/problems/count-square-submatrices-with-all-ones/', difficulty: 'Medium', pattern: 'dp-advanced' },
          { id: 'dp73', title: 'Largest 1-Bordered Square', url: 'https://leetcode.com/problems/largest-1-bordered-square/', difficulty: 'Medium', pattern: 'dp-advanced' },
          { id: 'dp74', title: 'Tallest Billboard', url: 'https://leetcode.com/problems/tallest-billboard/', difficulty: 'Hard', pattern: 'dp-advanced' },
          { id: 'dp75', title: 'Profitable Schemes', url: 'https://leetcode.com/problems/profitable-schemes/', difficulty: 'Hard', pattern: 'dp-advanced' },
        ]
      },
    ]
  },
  {
    id: 'advanced-ds',
    name: 'Advanced DS & Algorithms',
    description: '55 problems - Heap, Trie, Greedy, Backtracking, Bitmask, Design',
    patterns: [
      {
        id: 'adv-heap',
        name: 'Heap / Priority Queue',
        problems: [
          { id: 'ad1', title: 'Kth Largest Element in an Array', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', difficulty: 'Medium', pattern: 'adv-heap' },
          { id: 'ad2', title: 'Top K Frequent Elements', url: 'https://leetcode.com/problems/top-k-frequent-elements/', difficulty: 'Medium', pattern: 'adv-heap' },
          { id: 'ad3', title: 'Top K Frequent Words', url: 'https://leetcode.com/problems/top-k-frequent-words/', difficulty: 'Medium', pattern: 'adv-heap' },
          { id: 'ad4', title: 'Find Median from Data Stream', url: 'https://leetcode.com/problems/find-median-from-data-stream/', difficulty: 'Hard', pattern: 'adv-heap' },
          { id: 'ad5', title: 'K Closest Points to Origin', url: 'https://leetcode.com/problems/k-closest-points-to-origin/', difficulty: 'Medium', pattern: 'adv-heap' },
          { id: 'ad6', title: 'Merge K Sorted Lists', url: 'https://leetcode.com/problems/merge-k-sorted-lists/', difficulty: 'Hard', pattern: 'adv-heap' },
          { id: 'ad7', title: 'Task Scheduler', url: 'https://leetcode.com/problems/task-scheduler/', difficulty: 'Medium', pattern: 'adv-heap' },
          { id: 'ad8', title: 'Reorganize String', url: 'https://leetcode.com/problems/reorganize-string/', difficulty: 'Medium', pattern: 'adv-heap' },
          { id: 'ad9', title: 'Furthest Building You Can Reach', url: 'https://leetcode.com/problems/furthest-building-you-can-reach/', difficulty: 'Medium', pattern: 'adv-heap' },
          { id: 'ad10', title: 'Smallest Range Covering Elements from K Lists', url: 'https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/', difficulty: 'Hard', pattern: 'adv-heap' },
        ]
      },
      {
        id: 'adv-trie',
        name: 'Trie (Prefix Tree)',
        problems: [
          { id: 'ad11', title: 'Implement Trie (Prefix Tree)', url: 'https://leetcode.com/problems/implement-trie-prefix-tree/', difficulty: 'Medium', pattern: 'adv-trie' },
          { id: 'ad12', title: 'Design Add and Search Words Data Structure', url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', difficulty: 'Medium', pattern: 'adv-trie' },
          { id: 'ad13', title: 'Word Search II', url: 'https://leetcode.com/problems/word-search-ii/', difficulty: 'Hard', pattern: 'adv-trie' },
          { id: 'ad14', title: 'Replace Words', url: 'https://leetcode.com/problems/replace-words/', difficulty: 'Medium', pattern: 'adv-trie' },
          { id: 'ad15', title: 'Map Sum Pairs', url: 'https://leetcode.com/problems/map-sum-pairs/', difficulty: 'Medium', pattern: 'adv-trie' },
          { id: 'ad16', title: 'Longest Word in Dictionary', url: 'https://leetcode.com/problems/longest-word-in-dictionary/', difficulty: 'Medium', pattern: 'adv-trie' },
        ]
      },
      {
        id: 'adv-greedy',
        name: 'Greedy Core',
        problems: [
          { id: 'ad17', title: 'Jump Game', url: 'https://leetcode.com/problems/jump-game/', difficulty: 'Medium', pattern: 'adv-greedy' },
          { id: 'ad18', title: 'Jump Game II', url: 'https://leetcode.com/problems/jump-game-ii/', difficulty: 'Medium', pattern: 'adv-greedy' },
          { id: 'ad19', title: 'Gas Station', url: 'https://leetcode.com/problems/gas-station/', difficulty: 'Medium', pattern: 'adv-greedy' },
          { id: 'ad20', title: 'Candy', url: 'https://leetcode.com/problems/candy/', difficulty: 'Hard', pattern: 'adv-greedy' },
          { id: 'ad21', title: 'Merge Intervals', url: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'Medium', pattern: 'adv-greedy' },
          { id: 'ad22', title: 'Insert Interval', url: 'https://leetcode.com/problems/insert-interval/', difficulty: 'Medium', pattern: 'adv-greedy' },
          { id: 'ad23', title: 'Non-overlapping Intervals', url: 'https://leetcode.com/problems/non-overlapping-intervals/', difficulty: 'Medium', pattern: 'adv-greedy' },
          { id: 'ad24', title: 'Partition Labels', url: 'https://leetcode.com/problems/partition-labels/', difficulty: 'Medium', pattern: 'adv-greedy' },
          { id: 'ad25', title: 'Minimum Number of Arrows to Burst Balloons', url: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/', difficulty: 'Medium', pattern: 'adv-greedy' },
          { id: 'ad26', title: 'Hand of Straights', url: 'https://leetcode.com/problems/hand-of-straights/', difficulty: 'Medium', pattern: 'adv-greedy' },
        ]
      },
      {
        id: 'adv-backtracking',
        name: 'Backtracking',
        problems: [
          { id: 'ad27', title: 'Subsets', url: 'https://leetcode.com/problems/subsets/', difficulty: 'Medium', pattern: 'adv-backtracking' },
          { id: 'ad28', title: 'Subsets II', url: 'https://leetcode.com/problems/subsets-ii/', difficulty: 'Medium', pattern: 'adv-backtracking' },
          { id: 'ad29', title: 'Permutations', url: 'https://leetcode.com/problems/permutations/', difficulty: 'Medium', pattern: 'adv-backtracking' },
          { id: 'ad30', title: 'Permutations II', url: 'https://leetcode.com/problems/permutations-ii/', difficulty: 'Medium', pattern: 'adv-backtracking' },
          { id: 'ad31', title: 'Combination Sum', url: 'https://leetcode.com/problems/combination-sum/', difficulty: 'Medium', pattern: 'adv-backtracking' },
          { id: 'ad32', title: 'Combination Sum II', url: 'https://leetcode.com/problems/combination-sum-ii/', difficulty: 'Medium', pattern: 'adv-backtracking' },
          { id: 'ad33', title: 'Combination Sum III', url: 'https://leetcode.com/problems/combination-sum-iii/', difficulty: 'Medium', pattern: 'adv-backtracking' },
          { id: 'ad34', title: 'Letter Combinations of Phone Number', url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', difficulty: 'Medium', pattern: 'adv-backtracking' },
          { id: 'ad35', title: 'Palindrome Partitioning', url: 'https://leetcode.com/problems/palindrome-partitioning/', difficulty: 'Medium', pattern: 'adv-backtracking' },
          { id: 'ad36', title: 'N-Queens', url: 'https://leetcode.com/problems/n-queens/', difficulty: 'Hard', pattern: 'adv-backtracking' },
          { id: 'ad37', title: 'N-Queens II', url: 'https://leetcode.com/problems/n-queens-ii/', difficulty: 'Hard', pattern: 'adv-backtracking' },
          { id: 'ad38', title: 'Sudoku Solver', url: 'https://leetcode.com/problems/sudoku-solver/', difficulty: 'Hard', pattern: 'adv-backtracking' },
          { id: 'ad39', title: 'Word Search', url: 'https://leetcode.com/problems/word-search/', difficulty: 'Medium', pattern: 'adv-backtracking' },
          { id: 'ad40', title: 'Restore IP Addresses', url: 'https://leetcode.com/problems/restore-ip-addresses/', difficulty: 'Medium', pattern: 'adv-backtracking' },
        ]
      },
      {
        id: 'adv-bitmask',
        name: 'Bitmask / Advanced State',
        problems: [
          { id: 'ad41', title: 'Subsets (Bitmask)', url: 'https://leetcode.com/problems/subsets/', difficulty: 'Medium', pattern: 'adv-bitmask' },
          { id: 'ad42', title: 'Maximum Product of Word Lengths', url: 'https://leetcode.com/problems/maximum-product-of-word-lengths/', difficulty: 'Medium', pattern: 'adv-bitmask' },
          { id: 'ad43', title: 'Single Number III', url: 'https://leetcode.com/problems/single-number-iii/', difficulty: 'Medium', pattern: 'adv-bitmask' },
          { id: 'ad44', title: 'Counting Bits', url: 'https://leetcode.com/problems/counting-bits/', difficulty: 'Easy', pattern: 'adv-bitmask' },
          { id: 'ad45', title: 'Number of 1 Bits', url: 'https://leetcode.com/problems/number-of-1-bits/', difficulty: 'Easy', pattern: 'adv-bitmask' },
          { id: 'ad46', title: 'Partition to K Equal Sum Subsets', url: 'https://leetcode.com/problems/partition-to-k-equal-sum-subsets/', difficulty: 'Medium', pattern: 'adv-bitmask' },
          { id: 'ad47', title: 'Beautiful Arrangement', url: 'https://leetcode.com/problems/beautiful-arrangement/', difficulty: 'Medium', pattern: 'adv-bitmask' },
        ]
      },
      {
        id: 'adv-design',
        name: 'Design / Data Structure Heavy',
        problems: [
          { id: 'ad48', title: 'LRU Cache', url: 'https://leetcode.com/problems/lru-cache/', difficulty: 'Medium', pattern: 'adv-design' },
          { id: 'ad49', title: 'LFU Cache', url: 'https://leetcode.com/problems/lfu-cache/', difficulty: 'Hard', pattern: 'adv-design' },
          { id: 'ad50', title: 'Random Pick with Weight', url: 'https://leetcode.com/problems/random-pick-with-weight/', difficulty: 'Medium', pattern: 'adv-design' },
          { id: 'ad51', title: 'Insert Delete GetRandom O(1)', url: 'https://leetcode.com/problems/insert-delete-getrandom-o1/', difficulty: 'Medium', pattern: 'adv-design' },
          { id: 'ad52', title: 'Design Twitter', url: 'https://leetcode.com/problems/design-twitter/', difficulty: 'Medium', pattern: 'adv-design' },
          { id: 'ad53', title: 'Time Based Key Value Store', url: 'https://leetcode.com/problems/time-based-key-value-store/', difficulty: 'Medium', pattern: 'adv-design' },
          { id: 'ad54', title: 'All O(1) Data Structure', url: 'https://leetcode.com/problems/all-oone-data-structure/', difficulty: 'Hard', pattern: 'adv-design' },
          { id: 'ad55', title: 'Design Search Autocomplete System', url: 'https://leetcode.com/problems/design-search-autocomplete-system/', difficulty: 'Hard', pattern: 'adv-design' },
        ]
      },
    ]
  },
  {
    id: 'greedy',
    name: 'Greedy Algorithms',
    description: '45 problems - Intervals, scheduling, sorting + greedy choice',
    patterns: [
      {
        id: 'greedy-easy',
        name: 'Easy Greedy',
        problems: [
          { id: 'g1', title: 'Assign Cookies', url: 'https://leetcode.com/problems/assign-cookies/', difficulty: 'Easy', pattern: 'greedy-easy' },
          { id: 'g2', title: 'Lemonade Change', url: 'https://leetcode.com/problems/lemonade-change/', difficulty: 'Easy', pattern: 'greedy-easy' },
          { id: 'g3', title: 'Best Time to Buy and Sell Stock', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', difficulty: 'Easy', pattern: 'greedy-easy' },
          { id: 'g4', title: 'Maximum Subarray', url: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'Medium', pattern: 'greedy-easy' },
          { id: 'g5', title: 'Can Place Flowers', url: 'https://leetcode.com/problems/can-place-flowers/', difficulty: 'Easy', pattern: 'greedy-easy' },
          { id: 'g6', title: 'Minimum Number of Moves to Seat Everyone', url: 'https://leetcode.com/problems/minimum-number-of-moves-to-seat-everyone/', difficulty: 'Medium', pattern: 'greedy-easy' },
          { id: 'g7', title: 'Largest Perimeter Triangle', url: 'https://leetcode.com/problems/largest-perimeter-triangle/', difficulty: 'Easy', pattern: 'greedy-easy' },
        ]
      },
      {
        id: 'greedy-jump',
        name: 'Jump / Reachability Pattern',
        problems: [
          { id: 'g8', title: 'Jump Game', url: 'https://leetcode.com/problems/jump-game/', difficulty: 'Medium', pattern: 'greedy-jump' },
          { id: 'g9', title: 'Jump Game II', url: 'https://leetcode.com/problems/jump-game-ii/', difficulty: 'Medium', pattern: 'greedy-jump' },
          { id: 'g10', title: 'Jump Game III', url: 'https://leetcode.com/problems/jump-game-iii/', difficulty: 'Medium', pattern: 'greedy-jump' },
          { id: 'g11', title: 'Jump Game IV', url: 'https://leetcode.com/problems/jump-game-iv/', difficulty: 'Hard', pattern: 'greedy-jump' },
        ]
      },
      {
        id: 'greedy-intervals',
        name: 'Interval Scheduling',
        problems: [
          { id: 'g12', title: 'Merge Intervals', url: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'Medium', pattern: 'greedy-intervals' },
          { id: 'g13', title: 'Insert Interval', url: 'https://leetcode.com/problems/insert-interval/', difficulty: 'Medium', pattern: 'greedy-intervals' },
          { id: 'g14', title: 'Non-overlapping Intervals', url: 'https://leetcode.com/problems/non-overlapping-intervals/', difficulty: 'Medium', pattern: 'greedy-intervals' },
          { id: 'g15', title: 'Meeting Rooms', url: 'https://leetcode.com/problems/meeting-rooms/', difficulty: 'Easy', pattern: 'greedy-intervals' },
          { id: 'g16', title: 'Meeting Rooms II', url: 'https://leetcode.com/problems/meeting-rooms-ii/', difficulty: 'Medium', pattern: 'greedy-intervals' },
          { id: 'g17', title: 'Interval List Intersections', url: 'https://leetcode.com/problems/interval-list-intersections/', difficulty: 'Medium', pattern: 'greedy-intervals' },
          { id: 'g18', title: 'Minimum Number of Arrows to Burst Balloons', url: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/', difficulty: 'Medium', pattern: 'greedy-intervals' },
          { id: 'g19', title: 'Partition Labels', url: 'https://leetcode.com/problems/partition-labels/', difficulty: 'Medium', pattern: 'greedy-intervals' },
          { id: 'g20', title: 'Video Stitching', url: 'https://leetcode.com/problems/video-stitching/', difficulty: 'Medium', pattern: 'greedy-intervals' },
        ]
      },
      {
        id: 'greedy-sorting',
        name: 'Sorting + Greedy Choice',
        problems: [
          { id: 'g21', title: 'Gas Station', url: 'https://leetcode.com/problems/gas-station/', difficulty: 'Medium', pattern: 'greedy-sorting' },
          { id: 'g22', title: 'Candy', url: 'https://leetcode.com/problems/candy/', difficulty: 'Hard', pattern: 'greedy-sorting' },
          { id: 'g23', title: 'Bag of Tokens', url: 'https://leetcode.com/problems/bag-of-tokens/', difficulty: 'Medium', pattern: 'greedy-sorting' },
          { id: 'g24', title: 'Boats to Save People', url: 'https://leetcode.com/problems/boats-to-save-people/', difficulty: 'Medium', pattern: 'greedy-sorting' },
          { id: 'g25', title: 'Minimum Cost to Move Chips to the Same Position', url: 'https://leetcode.com/problems/minimum-cost-to-move-chips-to-the-same-position/', difficulty: 'Easy', pattern: 'greedy-sorting' },
          { id: 'g26', title: 'Reorganize String', url: 'https://leetcode.com/problems/reorganize-string/', difficulty: 'Medium', pattern: 'greedy-sorting' },
          { id: 'g27', title: 'Hand of Straights', url: 'https://leetcode.com/problems/hand-of-straights/', difficulty: 'Medium', pattern: 'greedy-sorting' },
          { id: 'g28', title: 'Divide Array Into Increasing Sequences', url: 'https://leetcode.com/problems/divide-array-into-increasing-sequences/', difficulty: 'Medium', pattern: 'greedy-sorting' },
        ]
      },
      {
        id: 'greedy-heap',
        name: 'Heap + Greedy Hybrid',
        problems: [
          { id: 'g29', title: 'Task Scheduler', url: 'https://leetcode.com/problems/task-scheduler/', difficulty: 'Medium', pattern: 'greedy-heap' },
          { id: 'g30', title: 'Furthest Building You Can Reach', url: 'https://leetcode.com/problems/furthest-building-you-can-reach/', difficulty: 'Medium', pattern: 'greedy-heap' },
          { id: 'g31', title: 'K Closest Points to Origin', url: 'https://leetcode.com/problems/k-closest-points-to-origin/', difficulty: 'Medium', pattern: 'greedy-heap' },
          { id: 'g32', title: 'Minimum Cost to Connect Sticks', url: 'https://leetcode.com/problems/minimum-cost-to-connect-sticks/', difficulty: 'Medium', pattern: 'greedy-heap' },
          { id: 'g33', title: 'IPO', url: 'https://leetcode.com/problems/ipo/', difficulty: 'Hard', pattern: 'greedy-heap' },
          { id: 'g34', title: 'Course Schedule III', url: 'https://leetcode.com/problems/course-schedule-iii/', difficulty: 'Hard', pattern: 'greedy-heap' },
        ]
      },
      {
        id: 'greedy-hard',
        name: 'Hard / Interview Level Greedy',
        problems: [
          { id: 'g35', title: 'Minimum Number of Refueling Stops', url: 'https://leetcode.com/problems/minimum-number-of-refueling-stops/', difficulty: 'Hard', pattern: 'greedy-hard' },
          { id: 'g36', title: 'Candy', url: 'https://leetcode.com/problems/candy/', difficulty: 'Hard', pattern: 'greedy-hard' },
          { id: 'g37', title: 'Maximum Performance of a Team', url: 'https://leetcode.com/problems/maximum-performance-of-a-team/', difficulty: 'Hard', pattern: 'greedy-hard' },
          { id: 'g38', title: 'The Skyline Problem', url: 'https://leetcode.com/problems/the-skyline-problem/', difficulty: 'Hard', pattern: 'greedy-hard' },
          { id: 'g39', title: 'Remove K Digits', url: 'https://leetcode.com/problems/remove-k-digits/', difficulty: 'Medium', pattern: 'greedy-hard' },
          { id: 'g40', title: 'Patching Array', url: 'https://leetcode.com/problems/patching-array/', difficulty: 'Hard', pattern: 'greedy-hard' },
          { id: 'g41', title: 'Set Intersection Size At Least Two', url: 'https://leetcode.com/problems/set-intersection-size-at-least-two/', difficulty: 'Hard', pattern: 'greedy-hard' },
          { id: 'g42', title: 'Minimum Number of Taps to Open to Water a Garden', url: 'https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/', difficulty: 'Hard', pattern: 'greedy-hard' },
          { id: 'g43', title: 'Eliminate Maximum Number of Monsters', url: 'https://leetcode.com/problems/eliminate-maximum-number-of-monsters/', difficulty: 'Medium', pattern: 'greedy-hard' },
          { id: 'g44', title: 'Maximum Units on a Truck', url: 'https://leetcode.com/problems/maximum-units-on-a-truck/', difficulty: 'Easy', pattern: 'greedy-hard' },
          { id: 'g45', title: 'Reduce Array Size to The Half', url: 'https://leetcode.com/problems/reduce-array-size-to-the-half/', difficulty: 'Medium', pattern: 'greedy-hard' },
        ]
      },
    ]
  },
];

// Helper to get all problems as a flat array
export const getAllProblems = (): Problem[] => {
  const problems: Problem[] = [];
  dsaTopics.forEach(topic => {
    topic.patterns.forEach(pattern => {
      problems.push(...pattern.problems);
    });
  });
  return problems;
};

// Get total count
export const getTotalProblemsCount = (): number => {
  return getAllProblems().length;
};

// Alias for compatibility
export const getTotalProblemCount = getTotalProblemsCount;

// Get count by difficulty
export const getCountByDifficulty = (): { easy: number; medium: number; hard: number } => {
  const allProblems = getAllProblems();
  return {
    easy: allProblems.filter(p => p.difficulty === 'Easy').length,
    medium: allProblems.filter(p => p.difficulty === 'Medium').length,
    hard: allProblems.filter(p => p.difficulty === 'Hard').length,
  };
};
