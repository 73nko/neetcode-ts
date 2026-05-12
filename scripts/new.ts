/**
 * `pnpm new <nc-slug>` - scaffolds problems/<categorySlug>/<nc-slug>/ with:
 *   - README.md       (catalog metadata + links + space for your notes)
 *   - solution.ts     (generic stub, default-export `solve`)
 *   - solution.test.ts (vitest with one it.todo waiting for your assertions)
 *
 * No external fetch. Open the NeetCode or LeetCode link in the README, read
 * the problem there (that's the point of practicing), then fill in
 * solution.ts and solution.test.ts.
 *
 * Accepts NC slugs (e.g. "two-integer-sum"), LC slugs ("two-sum"), or partial
 * prefixes ("two-int"). If nothing matches, suggests similar slugs.
 */

import fs from "node:fs";
import path from "node:path";
import {
  findEntry,
  suggestSimilar,
  PROBLEMS_DIR,
  TEMPLATES_DIR,
  ROOT_DIR,
} from "./catalog.js";

function readTemplate(name: string): string {
  return fs.readFileSync(path.join(TEMPLATES_DIR, name), "utf8");
}

function applyTemplate(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/__([A-Z_]+)__/g, (_m, key: string) => {
    return key in vars ? vars[key] ?? "" : `__${key}__`;
  });
}

function main(): void {
  const arg = process.argv[2];
  if (!arg) {
    console.error("Usage: pnpm new <nc-slug>");
    console.error("Example: pnpm new two-integer-sum");
    console.error("Tip: also accepts LeetCode slugs (e.g. 'two-sum') or partial NC slugs.");
    process.exit(1);
  }

  const entry = findEntry(arg);
  if (!entry) {
    console.error(`No problem matches "${arg}" in the NeetCode 150 catalog.`);
    const suggestions = suggestSimilar(arg);
    if (suggestions.length > 0) {
      console.error("\nDid you mean one of these?");
      for (const s of suggestions) {
        console.error(`  - ${s.ncSlug}  (${s.title}, ${s.category})`);
      }
    }
    process.exit(1);
  }

  const dest = path.join(PROBLEMS_DIR, entry.categorySlug, entry.ncSlug);
  if (fs.existsSync(dest)) {
    console.error(`Folder already exists: ${path.relative(ROOT_DIR, dest)}`);
    process.exit(1);
  }

  const ncUrl = `https://neetcode.io/problems/${entry.ncSlug}?list=neetcode150`;
  const lcUrl = `https://leetcode.com/problems/${entry.lcSlug}/`;

  const vars: Record<string, string> = {
    SLUG: entry.ncSlug,
    TITLE: entry.title,
    DIFFICULTY: entry.difficulty,
    NC_URL: ncUrl,
    LC_URL: lcUrl,
    CATEGORY: entry.category,
    ORDER: String(entry.order),
    GENERATED_AT: new Date().toISOString().slice(0, 10),
  };

  fs.mkdirSync(dest, { recursive: true });

  fs.writeFileSync(
    path.join(dest, "README.md"),
    applyTemplate(readTemplate("README.template.md"), vars),
  );
  fs.writeFileSync(
    path.join(dest, "solution.ts"),
    applyTemplate(readTemplate("solution.template.ts"), vars),
  );
  fs.writeFileSync(
    path.join(dest, "solution.test.ts"),
    applyTemplate(readTemplate("solution.test.template.ts"), vars),
  );

  console.log(`[${entry.order}/150] ${entry.title} (${entry.difficulty}, ${entry.category})`);
  console.log(`Created ${path.relative(ROOT_DIR, dest)}/`);
  console.log("  - README.md");
  console.log("  - solution.ts");
  console.log("  - solution.test.ts");
  console.log(`\nRead the problem:\n  ${ncUrl}\n\nThen:\n  pnpm test ${entry.ncSlug}\n`);
}

main();
