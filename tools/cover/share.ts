// A post's link-preview picture (1200×627 JPEG, site/blog/images/<file>.share.jpg), drawn from share.html with the
// post's title and rendered by the Mac's own Chrome, headless; ImageMagick writes the JPEG. Run by hand when a post
// wants a preview picture other than the site's default, then commit the JPEG:
//   node tools/cover/share.ts content/blog/<file>.md
// The post names its picture with `featured_image: "/blog/images/<file>.cover.png"`, as the older posts do.

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import { escape } from "../publish/escape.ts";
import { frontmatter } from "../publish/content.ts";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const root = fileURLToPath(new URL("../..", import.meta.url));
const source = process.argv[2];
if (!source) throw new Error("usage: node tools/cover/share.ts content/blog/<file>.md");
const { meta } = frontmatter(readFileSync(join(root, source), "utf8"));
const name = basename(source, ".md");
const html = readFileSync(join(root, "tools/cover/share.html"), "utf8")
  .replaceAll("{{fonts}}", `file://${join(root, "site/fonts")}`)
  .replace("{{title}}", escape(meta.title ?? ""))
  .replace("{{kicker}}", escape(meta.share_kicker ?? "donepudi.me"));
const dir = mkdtempSync(join(tmpdir(), "share-"));
writeFileSync(join(dir, "share.html"), html);
const png = join(dir, "share.png");
execFileSync(CHROME, ["--headless=new", "--hide-scrollbars", "--force-device-scale-factor=1", "--window-size=1200,627", `--screenshot=${png}`, `--user-data-dir=${join(dir, "profile")}`, `file://${join(dir, "share.html")}`], { stdio: "ignore" });
const out = join(root, "site/blog/images", `${name}.share.jpg`);
execFileSync("magick", [png, "-strip", "-quality", "88", out]);
console.log(`wrote ${out}`);
