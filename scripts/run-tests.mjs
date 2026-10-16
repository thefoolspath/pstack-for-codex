#!/usr/bin/env node
import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const mode = process.argv[2];
if (mode !== "offline" && mode !== "installed") {
  throw new Error("Usage: node scripts/run-tests.mjs <offline|installed>");
}
const files = mode === "installed"
  ? ["tests/installed-plugin-smoke.test.mjs"]
  : readdirSync(new URL("../tests/", import.meta.url))
    .filter((name) => name.endsWith(".test.mjs") && name !== "installed-plugin-smoke.test.mjs")
    .sort().map((name) => `tests/${name}`);
const result = spawnSync(process.execPath, ["--test", ...files], {
  cwd: root,
  env: { ...process.env, PSTACK_RUN_INSTALLED_SMOKE: mode === "installed" ? "1" : "0" },
  stdio: "inherit",
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
