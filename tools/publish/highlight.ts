// Code highlighting for the publisher, at build time only: Shiki reads each fenced block with VS Code's own
// grammars, and every token comes out as a span whose class names its kind (`tk-keyword`, `tk-string`, ...).
// No colour is written here and no style attribute reaches a page (the CSP refuses inline style): site/style.css
// colours each kind from its tokens, so the design tests hold every colour in one place. Shiki runs only inside
// `npm run publish` and the freshness check; nothing of it reaches the browser or the Worker.

import { createCssVariablesTheme, createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import json from "shiki/langs/json.mjs";
import jsonc from "shiki/langs/jsonc.mjs";
import shellscript from "shiki/langs/shellscript.mjs";
import typescript from "shiki/langs/typescript.mjs";
import javascript from "shiki/langs/javascript.mjs";
import yaml from "shiki/langs/yaml.mjs";
import { escape } from "./escape.ts";

const THEME = "site";
const highlighter = createHighlighterCoreSync({
  themes: [createCssVariablesTheme({ name: THEME, variablePrefix: "--shiki-" })],
  langs: [json, jsonc, shellscript, typescript, javascript, yaml],
  engine: createJavaScriptRegexEngine(),
});

/** The fence's language as Shiki knows it, and the label a reader sees; null for plain text. */
const LANGS: Record<string, { id: string; label: string }> = {
  json: { id: "json", label: "JSON" },
  jsonc: { id: "jsonc", label: "JSONC" },
  sh: { id: "shellscript", label: "Shell" },
  shell: { id: "shellscript", label: "Shell" },
  bash: { id: "shellscript", label: "Shell" },
  zsh: { id: "shellscript", label: "zsh" },
  ts: { id: "typescript", label: "TypeScript" },
  typescript: { id: "typescript", label: "TypeScript" },
  js: { id: "javascript", label: "JavaScript" },
  javascript: { id: "javascript", label: "JavaScript" },
  yaml: { id: "yaml", label: "YAML" },
  yml: { id: "yaml", label: "YAML" },
};

export function languageLabel(lang: string): string | null {
  return LANGS[lang.toLowerCase()]?.label ?? null;
}

export function isShell(lang: string): boolean {
  return LANGS[lang.toLowerCase()]?.id === "shellscript";
}

/** Each line of `code` as HTML: escaped text, its tokens wrapped in spans that name their kind. */
export function highlightLines(code: string, lang: string): string[] {
  const known = LANGS[lang.toLowerCase()];
  if (!known) return code.split("\n").map(escape);
  const lines = highlighter.codeToTokensBase(code, { lang: known.id, theme: THEME });
  return lines.map((tokens) =>
    tokens
      .map((token) => {
        const kind = /^var\(--shiki-token-([a-z-]+)\)$/.exec(token.color ?? "")?.[1];
        return kind ? `<span class="tk-${kind}">${escape(token.content)}</span>` : escape(token.content);
      })
      .join(""),
  );
}
