// The publisher's entry point (`npm run publish`): writes every file tools/publish/content.ts makes from
// content/ into site/. With --check it writes nothing and exits non-zero naming each file that differs, so a
// commit whose site/ is stale against content/ fails the check (test/publish.test.ts runs the same comparison).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "./content.ts";

const root = fileURLToPath(new URL("../..", import.meta.url));
const check = process.argv.includes("--check");
const stale: string[] = [];
for (const [path, text] of build(root)) {
  const file = join(root, "site", path);
  const current = existsSync(file) ? readFileSync(file, "utf8") : null;
  if (current === text) continue;
  if (check) stale.push(path);
  else {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, text);
    console.log(`wrote site/${path}`);
  }
}
if (check && stale.length > 0) {
  for (const path of stale) console.log(`::error::site/${path} is stale against content/; run npm run publish`);
  process.exitCode = 1;
}
