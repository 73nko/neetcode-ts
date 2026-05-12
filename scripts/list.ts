/**
 * `pnpm progress` - shows your NeetCode 150 progress, grouped by category.
 *
 * For every catalog entry, checks if problems/<cat>/<slug>/solution.test.ts
 * exists and counts its remaining `it.todo` calls. A problem is "solved" if
 * the folder exists AND has zero todos left.
 *
 * Wired to `pnpm progress` (not `pnpm list`) because `list` collides with
 * pnpm's built-in dependency lister.
 */

import fs from "node:fs";
import path from "node:path";
import { loadCatalog, PROBLEMS_DIR, type CatalogEntry } from "./catalog.js";

interface Status {
  entry: CatalogEntry;
  state: "solved" | "in-progress" | "not-started";
  todos: number;
}

function statusFor(entry: CatalogEntry): Status {
  const testPath = path.join(PROBLEMS_DIR, entry.categorySlug, entry.ncSlug, "solution.test.ts");
  if (!fs.existsSync(testPath)) {
    return { entry, state: "not-started", todos: 0 };
  }
  const src = fs.readFileSync(testPath, "utf8");
  const todos = (src.match(/it\.todo\(/g) ?? []).length;
  return { entry, state: todos === 0 ? "solved" : "in-progress", todos };
}

function symbol(state: Status["state"]): string {
  switch (state) {
    case "solved":
      return "[x]";
    case "in-progress":
      return "[~]";
    case "not-started":
      return "[ ]";
  }
}

function diffColor(d: string): string {
  switch (d) {
    case "Easy":
      return "E";
    case "Medium":
      return "M";
    case "Hard":
      return "H";
    default:
      return "?";
  }
}

function main(): void {
  const catalog = loadCatalog();
  const statuses = catalog.map(statusFor);

  const byCategory = new Map<string, Status[]>();
  for (const s of statuses) {
    const list = byCategory.get(s.entry.category) ?? [];
    list.push(s);
    byCategory.set(s.entry.category, list);
  }

  const showAll = process.argv.includes("--all");
  const onlyCategory = process.argv.find((a) => a.startsWith("--category="))?.split("=")[1];

  let totalSolved = 0;
  let totalStarted = 0;

  for (const [category, items] of byCategory) {
    if (onlyCategory && !category.toLowerCase().includes(onlyCategory.toLowerCase())) continue;

    const solvedInCat = items.filter((i) => i.state === "solved").length;
    const startedInCat = items.filter((i) => i.state !== "not-started").length;
    totalSolved += solvedInCat;
    totalStarted += startedInCat;

    if (!showAll && startedInCat === 0) continue;

    console.log(`\n${category}  ${solvedInCat}/${items.length}`);
    for (const s of items) {
      if (!showAll && s.state === "not-started") continue;
      const extras = s.state === "in-progress" ? ` (${s.todos} todo)` : "";
      console.log(`  ${symbol(s.state)} ${diffColor(s.entry.difficulty)} ${s.entry.ncSlug}${extras}`);
    }
  }

  console.log(`\n${totalSolved}/150 solved, ${totalStarted}/150 started.`);
  if (!showAll) {
    console.log("Tip: `pnpm progress --all` shows every problem in the catalog.");
  }
}

main();
