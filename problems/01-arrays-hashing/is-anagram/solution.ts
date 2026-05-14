/**
 * Valid Anagram
 * Difficulty: Easy
 * NeetCode:  https://neetcode.io/problems/is-anagram?list=neetcode150
 * LeetCode:  https://leetcode.com/problems/valid-anagram/
 * Category:  Arrays & Hashing (2/150)
 *
 * * Approach used: Sort and compare
 * - Sort:    O(n log n) time, O(n) space
 * - Compare: O(n) time
 * - Total:   O(n log n) time, O(n) space
 */

export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const counts = new Array(26).fill(0);

  const A = "a".charCodeAt(0);
  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - A]++;
    counts[t.charCodeAt(i) - A]--;
  }

  return counts.every((c) => c === 0);
}

export default isAnagram;
