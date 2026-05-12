# neetcode-ts

TypeScript playground for grinding the **NeetCode 150** with one folder per problem and one command to scaffold each.

Slugs and ordering follow NeetCode (not LeetCode). The problem content is fetched from LeetCode under the hood via the catalog mapping in `data/neetcode-150.json`.

## Quick start

```bash
pnpm install        # first time only; approve esbuild builds if prompted

pnpm next           # what to solve next, in NC order
pnpm new two-integer-sum   # scaffold a problem
pnpm test two-integer-sum  # run its tests
pnpm solve two-integer-sum # same as test, semantic alias
pnpm progress       # see what is solved/in-progress/not-started
```

All slugs are NeetCode's renamed ones (`two-integer-sum`, `is-anagram`, `duplicate-integer`, etc.). The script also accepts LeetCode slugs (`two-sum`, `valid-anagram`) and partial prefixes (`two-int`) as input shortcuts.

## What `pnpm new <slug>` does

1. Looks up the slug in `data/neetcode-150.json`. Derives the category, the LeetCode slug, and the NeetCode slug.
2. Creates `problems/<categorySlug>/<nc-slug>/` and stamps three files from `templates/`:
   - `README.md` with NeetCode/LeetCode links and space for your notes
   - `solution.ts` with a generic `solve` stub and a default export
   - `solution.test.ts` with a single `it.todo` waiting for your assertions

No content is fetched. Read the problem on NeetCode (or LeetCode) using the link in the generated README. That friction is intentional - if a script summarises the problem for you in your IDE, you skip the "actually read it" step that does most of the learning.

## Folder layout

```
neetcode-ts/
  package.json
  data/
    neetcode-150.json     # the catalog (single source of truth)
  scripts/
    catalog.ts            # loader + slug resolver
    new.ts                # pnpm new
    solve.ts              # pnpm solve
    list.ts               # pnpm progress
    next.ts               # pnpm next
  templates/
    README.template.md
    solution.template.ts
    solution.test.template.ts
  problems/
    01-arrays-hashing/
      two-integer-sum/
        README.md
        solution.ts
        solution.test.ts
      is-anagram/
        ...
    02-two-pointers/
      ...
```

## Workflow per problem

1. `pnpm next` -> see what's next in NC order.
2. `pnpm new <slug>` -> open the new folder. Click the NeetCode link in the README. Read the problem there.
3. Replace the `solve(...)` stub in `solution.ts` with the real function signature from the problem.
4. In `solution.test.ts`, replace the `it.todo` with one or more `it()` blocks: `expect(solve(...)).toEqual(...)`. Start with the example cases, then add edge cases.
5. Implement. Run `pnpm test <slug>` until green.
6. Fill in the "Notes after solving" section in `README.md`. One sentence about the pattern. Future-you will thank you.

## Why no `pnpm submit` to NeetCode

NeetCode does not expose a submission API. Their practice section embeds LeetCode-style judges client-side. The only real submission target is LeetCode, which:

- Requires your `LEETCODE_SESSION` cookie to authenticate.
- Is technically against ToS for non-browser submissions.
- Breaks every time they touch their internal API.

The pragmatic substitute is what you have: a local test suite pre-seeded from LeetCode's own example cases. Pass those plus your own edge cases (empty input, single element, max constraints) and you are functionally validated. If you want the ranking, click the link in the per-problem README and submit there.

## Filters and tricks

```bash
pnpm next --category=arrays            # next unsolved in Arrays & Hashing
pnpm next --difficulty=Easy            # next easy
pnpm progress --category=trees         # progress in Trees only
pnpm progress --all                    # also show not-started problems
```

## Discipline notes

This repo is a tool, not the work. If you find yourself "improving the generator" instead of solving problems, stop.

Plan calls for 35 hours on algorithms across Q1 to Q4 (target: 25 problems in Q1). The repo should disappear into the background.

Target cadence: 1 problem per 60 to 90 minutes including writeup.
