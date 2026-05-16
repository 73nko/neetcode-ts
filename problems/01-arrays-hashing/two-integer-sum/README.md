# Two Sum

- **Difficulty:** Easy
- **Category:** Arrays & Hashing (3/150)
- **NeetCode:** https://neetcode.io/problems/two-integer-sum?list=neetcode150
- **LeetCode:** https://leetcode.com/problems/two-sum/
- **Generated:** 2026-05-16

---

## My approach

<!--
Brain-dump BEFORE you code. Force yourself to write this BEFORE looking at the optimal solution.

1. What is the brute force?
2. What is being repeated/recomputed?
3. What data structure removes that repetition?
4. Time / space complexity of brute force vs. optimized.
-->

The brute force approach would be loop over all the numbers and check against all the others
for the correct target.

We are repeating the lookup of the complement for every number in the array, which is clearly suboptimal.
A hash map records each value's index in O(1), turning the inner search into an O(1) lookup

Complexity of the brute force is O(n^2) while the optimized option is O(n) time and O(n) space.

## Notes after solving

<!--
- What pattern was this? (Two pointers / sliding window / hash map / monotonic stack / etc.)
- What would I miss if I saw this in 3 months?
- One sentence I would tell my future self.
-->

Pattern: hash map for complement lookup..
I'm learning to identify patterns and complexities.

Do not try to start with the optimal solution, Jumping straight to the optimal solution wastes time.
Start with the first obvious solution, then optimise by applying patterns you already know.
