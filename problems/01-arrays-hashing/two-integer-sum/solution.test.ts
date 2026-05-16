import { describe, it, expect } from "vitest";
import twoSum from "./solution";

/**
 * Tests for: Two Sum
 *
 * Copy the examples from NeetCode/LeetCode here. One `it()` per case. Add
 * your own edge cases (empty input, single element, max constraints) once
 * the official examples pass.
 *
 * If the function returns an array where order does not matter,
 * sort both sides or use `expect.arrayContaining(...)`.
 */
describe("two-integer-sum", () => {
  it("Should return a correct response", () => {
    const nums = [3, 4, 5, 6];
    const target = 7;
    const expectedOutput = [0, 1];
    expect(twoSum(nums, target)).toEqual(expectedOutput);
  });

  it("Sould return response", () => {
    const nums = [4, 5, 6];
    const target = 10;

    const expectedOutput = [0, 2];

    expect(twoSum(nums, target)).toEqual(expectedOutput);
  });

  it("Should return correct response order", () => {
    const nums = [6, 5, 4];
    const target = 10;

    const expectedOutput = [0, 2];

    expect(twoSum(nums, target)).toEqual(expectedOutput);
  });

  it("Duplicate index", () => {
    const nums = [3, 3];
    const target = 6;

    const expectedOutput = [0, 1];

    expect(twoSum(nums, target)).toEqual(expectedOutput);
  });
});
