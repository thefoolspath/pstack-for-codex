# Refresh pstack for Codex to upstream 0.15.25

## Source and delivery

The user's fork is `thefoolspath/pstack-for-codex`. Its Codex implementation starts from Aqua's `3d2770d`. Lauren Tan's pstack in `cursor/plugins` defines the source behavior.

- Previous source: 0.15.15 at `ccb5507cec1546dc88135c1139c811e6c59115ba`.
- Updated source: 0.15.25 at `f713f14203cd6420cec13cd7c55c32d598dbab68`.
- Codex package: 0.4.0, with 55 explicit-only skills and 23 playbooks.
- Source inventory: 169 files. The refresh contains 88 changes and five additions, each recorded in the compatibility ledger. The generic upstream manifest maps to the existing Codex manifest.

## Behavior carried forward

- Add `in-your-own-words`, `ketchup`, and `sharpen`, including explicit-only Codex metadata and coverage records.
- Update How, Why, Interrogate, Arena, principles, and supporting references. Resolve models through observable Codex capabilities and inherit when they cannot be validated.
- Update verification cadence, root-owned stack topology, and merge confirmation against trunk. Keep lifecycle and external writes within the user's authority, and keep stalled-agent replacement bounded.
- Walk PR base chains through GitHub or Origin without requiring Graphite. Paginate review threads and distinguish the Code Review Gate's action-required state from a failed build.
- Parse nested Markdown fences correctly. Add an explicit base option to the worktree audit while preserving paths containing spaces and unknown task-use status.
- Keep supported task history, explicit reflection, attribution, and paused Benny automations. Raw source, private host stores, and upstream model slugs are not installed.

## Windows validation findings

The existing test runner assumed a POSIX shell and `/tmp`. The runner now enumerates tests with Node; shell fixtures use Git Bash on Windows. Executable shell scripts and the generated compatibility report retain LF across checkouts. An existing concurrent hook test exposed transient Windows replacement failures. Atomic writes now retry those transient failures with a bounded delay and clean up temporary files, without deleting the destination first.

The isolated installation smoke passed on Windows with Codex CLI `0.162.0-alpha.17.2`. Its 42 focused supporting tests passed. Runtime model dispatch, live connectors, and trusted-hook activation in a new chat are outside this smoke.

The complete offline suite must also pass in Linux because Benny's owner-only state tests and the fake forge executables depend on POSIX behavior. These tests remain enforced rather than skipped on Windows.

The final Linux `npm run verify:offline` passed on the staged candidate: 99 Node tests, 70 Bun tests, strict TypeScript checks for both runtime tools, and the compatibility report check. The final Windows installed-profile smoke passed again after the line-ending fixes.

## Provenance checks

`import-upstream.mjs --verify-lock --dry-run` verified all 169 source files against the temporary exact-commit checkout. Compatibility validation against that checkout and `git diff --cached --check` passed. The upstream source checkout is temporary; only the derived Codex changes are delivered.
