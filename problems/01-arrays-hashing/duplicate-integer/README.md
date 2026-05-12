# Contains Duplicate

- **Difficulty:** Easy
- **Category:** Arrays & Hashing (1/150)
- **NeetCode:** https://neetcode.io/problems/duplicate-integer?list=neetcode150
- **LeetCode:** https://leetcode.com/problems/contains-duplicate/
- **Generated:** 2026-05-12

---

## My approach

<!--
Brain-dump BEFORE you code. Force yourself to write this BEFORE looking at the optimal solution.

1. What is the brute force?
2. What is being repeated/recomputed?
3. What data structure removes that repetition?
4. Time / space complexity of brute force vs. optimized.
-->

The brute force approach is to iterate over the array and check if the current element is equal to any of the previous elements. This is O(n^2) time and O(n) space.

The optimized approach is to use a hash map to store the elements that have been seen. This is O(n) time and O(n) space.

/\*\*

- Contains Duplicate
- Difficulty: Easy
- NeetCode: https://neetcode.io/problems/duplicate-integer?list=neetcode150
- LeetCode: https://leetcode.com/problems/contains-duplicate/
- Category: Arrays & Hashing (1/150)
-
- Approach (fill in once you have one):
- - Brute force: O(?) time, O(?) space
- - Optimized: O(?) time, O(?) space
    \*/

## Notes after solving

- What pattern was this? (Two pointers / sliding window / hash map / monotonic stack / etc.)
- What would I miss if I saw this in 3 months?
- One sentence I would tell my future self.
  -->

```

Pattern: hash set for membership checks. Trades O(n) space for O(1) lookups.
Equivalent one-liner: new Set(nums).size < nums.length. Same O(n)/O(n) complexity but does not short-circuit,
so the explicit loop is constant-factor faster when duplicates appear early. Explicit version also generalises
to "find which duplicate" / "find first duplicate" variants.
First problem of the NC150 run. Hash set as 'seen' is the canonical first lesson in the arrays & hashing pattern.
This was easy. But the path is long and tough.
```
