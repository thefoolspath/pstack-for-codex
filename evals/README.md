# Release evaluation evidence

This directory is the release ledger for `pstack-for-codex` version `0.4.0`, derived from upstream pstack `0.15.25` at `f713f14203cd6420cec13cd7c55c32d598dbab68`. The immutable upstream file inventory is [`../upstream.lock.json`](../upstream.lock.json); [`cases/coverage.yaml`](cases/coverage.yaml) maps all 54 upstream skills and all 23 upstream playbooks, while [`cases/representative.yaml`](cases/representative.yaml) covers direct, indirect, incomplete-input, negative-trigger, unsupported-capability, setup, hook, and connector boundaries.

## Recorded environment

| Evidence | Verdict |
|---|---|
| Codex | `codex-cli 0.162.0-alpha.17.2` observed during the 2026-10-16 Windows installed smoke; the smoke records the executing CLI string again in TAP output. |
| Models | No model inventory was exposed by the exercised plugin CLI. Actual model names and effort pairs are therefore **unverified/inherited**, not claimed. Setup tests cover supplied observable-model fixtures and unsupported pairs. |
| Permissions | Offline verification used the host's observable local process permissions. No live connector permission or model-generated write was exercised. Installed smoke uses only a temporary `CODEX_HOME` and temporary marketplace. |
| Offline tests | `npm run verify:offline` checks the baseline, static plugin, lifecycle, tooling, Benny fake adapters, and documentation without installing into a Codex profile. `npm run verify` remains an alias for this offline-only target. |
| Installed behavior | `npm run test:installed` requires the `codex` CLI, adds the local marketplace, installs the plugin into a fresh temporary Codex profile, validates the installed skill files, runs setup/teardown and hook boundary checks, and proves that the exact installed path is removed. Runtime skill-index discovery and model dispatch were not exercised. |
| Windows | 42 focused tests cover profile setup, hook concurrency, release routing, plan validation, and Bash helpers. POSIX state permissions and executable forge fixtures require the Linux suite; Windows is not claimed to pass that suite. |
| 0.4.0 release checks | On 2026-10-16, Linux `npm run verify:offline` passed 99 Node tests, 70 Bun tests, both strict TypeScript checks, and compatibility validation. The Windows isolated installed-profile smoke also passed on the final package. |
| Benny canaries | `not-run`: both automation descriptors remain `PAUSED`. Read-only, test-channel triage, repro-only, bounded-fix, concurrent-race, and ambiguous-write canaries require operator-owned real adapters before activation. |

## Release disposition

All 55 registered skills are explicit-only. All 54 upstream skills and 23 playbooks have positive offline-contract outcomes and applicable authority, capability, and negative-trigger boundaries. Connector- and trust-dependent live activation is deferred, with the automation tasks paused. Polling latency, hook trust, connector availability, model diversity, and Bun availability remain declared limitations; none is presented as verified when it was not observable.

Run `npm test` (or `npm run verify:release`) for the mandatory release gate. It runs offline verification followed by the installed-profile smoke and fails closed when the `codex` prerequisite is unavailable. A release is blocked by any failed test, missing coverage row, stale compatibility report, residual temporary profile/cache, unpaused Benny descriptor, or an unverified live-activation claim.
