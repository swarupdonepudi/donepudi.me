// The publisher's one escaping rule, shared by the renderer and the highlighter: every word a post holds is
// text, never markup.

export function escape(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
