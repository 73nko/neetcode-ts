import { describe, it, expect } from "vitest";
import isAnagram from "./solution";

/**
 * Tests for: Valid Anagram
 *
 * Copy the examples from NeetCode/LeetCode here. One `it()` per case. Add
 * your own edge cases (empty input, single element, max constraints) once
 * the official examples pass.
 *
 * If the function returns an array where order does not matter,
 * sort both sides or use `expect.arrayContaining(...)`.
 */
describe("is-anagram", () => {
  it("should return true if the strings are anagrams", () => {
    expect(isAnagram("anagram", "nagaram")).toBe(true);
  });

  it("should return false if the strings are not anagrams", () => {
    expect(isAnagram("rat", "car")).toBe(false);
  });

  it("should return true if the strings are empty", () => {
    expect(isAnagram("", "")).toBe(true);
  });

  it("should return false if the first string is empty", () => {
    expect(isAnagram("", "a")).toBe(false);
  });

  it("should return false if the second string is empty", () => {
    expect(isAnagram("a", "")).toBe(false);
  });
});
