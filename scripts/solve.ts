/**
 * `pnpm solve <nc-slug>` - runs the test suite for a single NeetCode problem.
 *
 * Looks up the slug in the catalog, finds the categorized folder, and runs
 * vitest scoped to that directory. Accepts NC slugs, LC slugs, or partial
 * prefixes.
 *
 * NOT a submission script. NeetCode has no API; LeetCode submission requires
 * your session cookie and is fragile. See the repo README for the honest
 * version of "validate against NeetCode".
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { findEntry, suggestSimilar, PROBLEMS_DIR, ROOT_DIR } from "./catalog.js";

function main(): void {
  const arg = process.argv[2];
  if (!arg) {
    console.error("Usage: pnpm solve <nc-slug>");
    process.exit(1);
  }

  const entry = findEntry(arg);
  if (!entry) {
    console.error(`No problem matches "${arg}" in the NeetCode 150 catalog.`);
    const suggestions = suggestSimilar(arg);
    if (suggestions.length > 0) {
      console.error("\nDid you mean one of these?");
      for (const s of suggestions) {
        console.error(`  - ${s.ncSlug}  (${s.title})`);
      }
    }
    process.exit(1);
  }

  const dir = path.join(PROBLEMS_DIR, entry.categorySlug, entry.ncSlug);
  if (!fs.existsSync(dir)) {
    console.error(`No folder found for ${entry.ncSlug}.`);
    console.error(`Run \`pnpm new ${entry.ncSlug}\` first.`);
    process.exit(1);
  }

  const relDir = path.relative(ROOT_DIR, dir);
  console.log(`Running tests in ${relDir}...\n`);

  const child = spawn(
    "npx",
    ["vitest", "run", relDir, "--reporter=verbose"],
    { stdio: "inherit", cwd: ROOT_DIR },
  );

  child.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}

main();
