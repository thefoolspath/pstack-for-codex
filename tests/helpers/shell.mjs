import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const windows = process.platform === "win32";
const bash = process.env.PSTACK_TEST_BASH ?? (windows
  ? ["C:/Program Files/Git/bin/bash.exe", "C:/Program Files (x86)/Git/bin/bash.exe"].find(existsSync)
  : "/bin/bash");

export function shellScript(script, args, options = {}) {
  if (!bash) throw new Error("Git Bash is required for shell-script tests on Windows; set PSTACK_TEST_BASH.");
  const env = { ...process.env, ...options.env };
  // MSYS must preserve the deliberately empty PATH in the missing-Bun test.
  if (windows) env.MSYS2_PATH_TYPE = "inherit";
  const quote = value => "'" + value.replaceAll("'", "'\\''") + "'";
  const words = [script, ...args].map(value => /^[A-Za-z]:\\/.test(value) ? value.replaceAll("\\", "/") : value);
  return spawnSync(bash, ["--noprofile", "--norc", "-s"], {
    ...options, env, encoding: "utf8", input: `exec ${words.map(quote).join(" ")}\n`,
  });
}

export function shellOutput(script, args, options = {}) {
  const result = shellScript(script, args, options);
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr || `Shell script failed with status ${result.status}`);
  return result.stdout;
}
