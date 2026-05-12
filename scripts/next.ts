/**
 * `pnpm next` - suggests the next unsolved problem in NeetCode 150 order.
 *
 * Definition of "unsolved": no folder yet, OR the folder exists but the test
 * file still has at least one `it.todo` call.
 *
 * Use `--category=<name>` to scope to one category. Use `--difficulty=<E|M|H>`
 * to filter by difficulty.
 */

import fs from "node:fs";
import path from "node:path";
import { loadCatalog, PROBLEMS_DIR, type CatalogEntry } from "./catalog.js";

function isSolved(entry: CatalogEntry): boolean {
  const testPath = path.join(PROBLEMS_DIR, entry.categorySlug, entry.ncSlug, "solution.test.ts");
  if (!fs.existsSync(testPath)) return false;
  const src = fs.readFileSync(testPath, "utf8");
  return !/it\.todo\(/.test(src);
}

function main(): void {
  const argCat = process.argv.find((a) => a.startsWith("--category="))?.split("=")[1];
  const argDiff = process.argv.find((a) => a.startsWith("--difficulty="))?.split("=")[1]?.toUpperCase();

  const catalog = loadCatalog();
  const filtered = catalog.filter((e) => {
    if (argCat && !e.category.toLowerCase().includes(argCat.toLowerCase())) return false;
    if (argDiff && e.difficulty[0]?.toUpperCase() !== argDiff[0]) return false;
    return true;
  });

  const next = filtered.find((e) => !isSolved(e));
  if (!next) {
    console.log("Nothing left to solve under that filter. Either you're done or your filter is too narrow.");
    return;
  }

  const ncUrl = `https://neetcode.io/problems/${next.ncSlug}?list=neetcode150`;
  const lcUrl = `https://leetcode.com/problems/${next.lcSlug}/`;

  console.log(`Next up: [${next.order}/150] ${next.title}`);
  console.log(`  Difficulty: ${next.difficulty}`);
  console.log(`  Category:   ${next.category}`);
  console.log(`  NeetCode:   ${ncUrl}`);
  console.log(`  LeetCode:   ${lcUrl}`);
  console.log(`\nStart with:\n  pnpm new ${next.ncSlug}`);
}

main();
