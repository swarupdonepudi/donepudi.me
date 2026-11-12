// @ts-check
// A post's page, made better by script and whole without it: the Copy buttons on code and prompts, the long
// prompt folded to its first lines until "Show the whole prompt", and the "In this post" list marking the
// section being read. Every button ships hidden in the page and is shown here, so a reader without script
// never meets one that does nothing. State lives in data attributes, never in classes or inline style.

/** Copies the text of the code or prompt the button belongs to, and says so on the button for a moment. */
function wireCopy() {
  for (const button of document.querySelectorAll('[data-copy]')) {
    if (!(button instanceof HTMLButtonElement)) continue;
    const holder = button.closest('.code, .prompt');
    const code = holder?.querySelector('pre code');
    if (!code || !navigator.clipboard) continue;
    const label = button.textContent ?? 'Copy';
    button.hidden = false;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent ?? '');
        button.textContent = 'Copied';
        button.dataset.done = '';
      } catch {
        button.textContent = 'Press ⌘C to copy';
      }
      setTimeout(() => {
        button.textContent = label;
        delete button.dataset.done;
      }, 1800);
    });
  }
}

/** Folds each prompt to its first lines, with a button that unfolds it. */
function wirePrompts() {
  for (const prompt of document.querySelectorAll('[data-prompt]')) {
    if (!(prompt instanceof HTMLElement)) continue;
    const more = prompt.querySelector('[data-expand]');
    if (!(more instanceof HTMLButtonElement)) continue;
    prompt.dataset.folded = '';
    more.hidden = false;
    more.addEventListener('click', () => {
      const folded = 'folded' in prompt.dataset;
      if (folded) delete prompt.dataset.folded;
      else prompt.dataset.folded = '';
      more.textContent = folded ? 'Fold the prompt' : 'Show the whole prompt';
      more.setAttribute('aria-expanded', String(folded));
    });
    more.setAttribute('aria-expanded', 'false');
  }
}

/** Marks the "In this post" link of the section being read: the last heading above the top third of the screen. */
function wireContents() {
  const links = [...document.querySelectorAll('.toc a[href^="#"]')].filter((a) => a instanceof HTMLAnchorElement);
  const pairs = links.map((a) => [document.getElementById(decodeURIComponent(a.hash.slice(1))), a]).filter(([el]) => el !== null);
  if (pairs.length === 0) return;
  let queued = false;
  const mark = () => {
    queued = false;
    const line = window.innerHeight / 3;
    let current = null;
    for (const [el, a] of pairs) if (el && el.getBoundingClientRect().top <= line) current = a;
    for (const a of links) {
      if (a === current) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    }
  };
  addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(mark);
  }, { passive: true });
  mark();
}

wireCopy();
wirePrompts();
wireContents();
