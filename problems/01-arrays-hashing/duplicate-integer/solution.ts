/**
 * Contains Duplicate
 * Difficulty: Easy
 * NeetCode:  https://neetcode.io/problems/duplicate-integer?list=neetcode150
 * LeetCode:  https://leetcode.com/problems/contains-duplicate/
 * Category:  Arrays & Hashing (1/150)
 *
 * Approach (fill in once you have one):
 * - Brute force: O(?) time, O(?) space
 * - Optimized:   O(?) time, O(?) space
 */

// Replace the signature below with the one from NeetCode/LeetCode.
// The default export is what the test file imports as `solve`.
export function containsDuplicate(nums: number[]): boolean {
  if (nums.length <= 1) return false;
  const seen = new Set<number>();
  for (const n of nums) {
    if (seen.has(n)) {
      return true;
    }
    seen.add(n);
  }
  return false;
}

export default containsDuplicate;
