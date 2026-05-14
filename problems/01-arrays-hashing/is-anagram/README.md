# Valid Anagram

- **Difficulty:** Easy
- **Category:** Arrays & Hashing (2/150)
- **NeetCode:** https://neetcode.io/problems/is-anagram?list=neetcode150
- **LeetCode:** https://leetcode.com/problems/valid-anagram/
- **Generated:** 2026-05-14

---

## My approach

<!--
Brain-dump BEFORE you code. Force yourself to write this BEFORE looking at the optimal solution.

1. What is the brute force?
2. What is being repeated/recomputed?
3. What data structure removes that repetition?
4. Time / space complexity of brute force vs. optimized.
-->

Three approaches:

- Brute force: O(n²) time, O(n) space (for each char in s, find and remove from t)
- Sort and compare: O(n log n) time, O(n) space, trivially short
- Frequency counter (hash map or Array[26]): O(n) time, O(1) space if alphabet is fixed

The frequency counter is the asymptotically optimal solution and the canonical pattern for this category. Sort-and-compare is a one-liner I'd reach for in production code where readability matters more than constant factors.## Notes after solving

<!--
- What pattern was this? (Two pointers / sliding window / hash map / monotonic stack / etc.)
- What would I miss if I saw this in 3 months?
- One sentence I would tell my future self.
-->

I gess HashMap is the canonical first lesson in the arrays & hashing pattern, but I prefer
the sorting approach. It is simpler and more intuitive.
