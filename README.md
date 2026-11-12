# donepudi.me

Swarup Donepudi's home on the web: the public site at [donepudi.me](https://donepudi.me), and everything behind its door at hey.donepudi.me (threads, invited people, public threads, asks and the journal).

## How it works

- `site/` is plain HTML, one stylesheet and plain JavaScript modules, with no framework and no build step.
- One Cloudflare Worker serves `site/` on both hosts and runs code only for the paths in `wrangler.jsonc` (`src/`).
- D1 holds the threads and notes, R2 holds saved pages and pictures, Turnstile guards the note flow, and Cloudflare Access guards the private calls.
- Every Cloudflare resource except the Worker is a Planton manifest in `infrastructure/planton/planton.ai/`, applied in the order its README gives.
- `content/` holds the blog, Fastlane and talk sources in Markdown.

## Working on it

```bash
npm ci && npm ci --prefix deploy
npm run check          # type checks, wrangler's dry run, every test
npm run dev:signed-in  # the private side with made-up data, signed in as the owner
```

The rules every change follows are in [AGENTS.md](AGENTS.md).

## Credit

This site's code began as a copy of [whysosuresh.com](https://github.com/whysosuresh/whysosuresh.com) at commit `193b505`, by Suresh Attaluri, under the MIT License (see [LICENSE](LICENSE)). His later fixes can be pulled by diffing against that commit.
