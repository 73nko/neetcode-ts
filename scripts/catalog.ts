/**
 * NeetCode 150 catalog loader. Single source of truth for what problems exist,
 * what order they go in, and how NC slugs map to LeetCode.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const CATALOG_PATH = path.join(ROOT, "data", "neetcode-150.json");

export interface CatalogEntry {
  order: number;
  category: string;
  categorySlug: string;
  ncSlug: string;
  lcSlug: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard" | string;
}

let cached: CatalogEntry[] | null = null;

export function loadCatalog(): CatalogEntry[] {
  if (cached) return cached;
  const raw = fs.readFileSync(CATALOG_PATH, "utf8");
  cached = JSON.parse(raw) as CatalogEntry[];
  return cached;
}

export function normalize(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['"`(),]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Find a problem by NC slug, LC slug, or fuzzy title match. Returns null if
 * nothing matches with reasonable confidence.
 */
export function findEntry(query: string): CatalogEntry | null {
  const catalog = loadCatalog();
  const q = normalize(query);

  // 1. Exact NC slug
  const byNc = catalog.find((e) => e.ncSlug === q);
  if (byNc) return byNc;

  // 2. Exact LC slug
  const byLc = catalog.find((e) => e.lcSlug === q);
  if (byLc) return byLc;

  // 3. Title slug (normalized title)
  const byTitle = catalog.find((e) => normalize(e.title) === q);
  if (byTitle) return byTitle;

  // 4. Prefix match on NC slug (let user type "two-int" for "two-integer-sum")
  const prefix = catalog.filter((e) => e.ncSlug.startsWith(q));
  if (prefix.length === 1) return prefix[0]!;

  return null;
}

export function suggestSimilar(query: string, limit = 5): CatalogEntry[] {
  const catalog = loadCatalog();
  const q = normalize(query);
  return catalog
    .filter((e) => e.ncSlug.includes(q) || e.lcSlug.includes(q) || normalize(e.title).includes(q))
    .slice(0, limit);
}

export const ROOT_DIR = ROOT;
export const PROBLEMS_DIR = path.join(ROOT, "problems");
export const TEMPLATES_DIR = path.join(ROOT, "templates");
