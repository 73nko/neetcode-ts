import { describe, it, expect } from "vitest";
import containsDuplicate from "./solution";

/**
 * Tests for: Contains Duplicate
 *
 * Copy the examples from NeetCode/LeetCode here. One `it()` per case. Add
 * your own edge cases (empty input, single element, max constraints) once
 * the official examples pass.
 *
 * If the function returns an array where order does not matter,
 * sort both sides or use `expect.arrayContaining(...)`.
 */
describe("duplicate-integer", () => {
  it("should return true if the array contains duplicate elements", () => {
    expect(containsDuplicate([1, 2, 3, 1])).toBe(true);
  });

  it("should return false if the array does not contain duplicate elements", () => {
    expect(containsDuplicate([1, 2, 3, 4])).toBe(false);
  });

  it("should return false if the array is empty", () => {
    expect(containsDuplicate([])).toBe(false);
  });

  it("should return false if there is only one element", () => {
    expect(containsDuplicate([1])).toBe(false);
  });

  it("should return true if there are two elements and they are equal", () => {
    expect(containsDuplicate([1, 1])).toBe(true);
  });
});
