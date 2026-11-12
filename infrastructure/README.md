# Infrastructure

What donepudi.me runs on. Every Cloudflare resource except the Worker is a Planton manifest in [`planton/planton.ai/`](planton/planton.ai/), in organization `swarup-donepudi` on planton.ai. The Worker is deployed from this repository with wrangler (`wrangler.jsonc`), because Planton can't upload a repository's static files to a Worker.

- [`AGENTS.md`](AGENTS.md): the laws every change here follows.
- [`planton/planton.ai/README.md`](planton/planton.ai/README.md): the apply order, with a proof per row.
- [`vendors/`](vendors/): what only a vendor's dashboard holds.
