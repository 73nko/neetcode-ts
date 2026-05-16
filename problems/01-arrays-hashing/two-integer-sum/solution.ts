/**
 * Two Sum
 * Difficulty: Easy
 * NeetCode:  https://neetcode.io/problems/two-integer-sum?list=neetcode150
 * LeetCode:  https://leetcode.com/problems/two-sum/
 * Category:  Arrays & Hashing (3/150)
 *
 * Approach (fill in once you have one):
 * - Brute force: O(n^2) time, O(n) space
 * - Optimized:   O(n) time, O(n) space
 */

// Replace the signature below with the one from NeetCode/LeetCode.
// The default export is what the test file imports as `solve`.
export function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();

  for (const [i, n] of nums.entries()) {
    const complement = target - n;

    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }

    seen.set(n, i);
  }

  throw new Error("No solution found, contract violation");
}

export default twoSum;
