# planton.ai

Everything applied to Planton production (`planton.ai`), organization `swarup-donepudi`. Applying the rows in order, from this folder, rebuilds it.

```bash
O="--instance planton.ai --org swarup-donepudi"   # zsh: pass as ${=O}
```

| # | File or step | Proof |
|---|---|---|
| 0 | **[owner]** The Cloudflare account `swarupdonepudi` and its account API token `planton-swarupdonepudi` (`../../vendors/cloudflare/README.md`) | Planton's Verify signs in (row 3) |
| 1 | `Organization.swarup-donepudi.yaml` (with `--instance planton.ai` only) | `planton get organization swarup-donepudi --instance planton.ai` |
| 2 | `Environment.prod.yaml`, `Config.Org.Variable.cloudflare-swarupdonepudi-account-id.yaml`, `Config.Org.Secret.cloudflare-swarupdonepudi-account-api-token.yaml` (then its value from the clipboard, as its header shows) | `planton secret get cloudflare-swarupdonepudi-account-api-token $O` shows a version |
| 3 | `Connection.CloudflareProviderConnection.cloudflare-swarupdonepudi-account.yaml`, `Connection.ProviderConnectionAuthorization.cloudflare-swarupdonepudi-account.yaml`, `Connection.DefaultProviderConnection.cloudflare-default.yaml` | `planton connect cloudflare verify cloudflare-swarupdonepudi-account $O` signs in |
| 4 | `Infra.prod.CloudflareDnsZone.donepudi-me.yaml` | `status.outputs.nameservers` are the pair GoDaddy delegates to (row 6) |
| 5 | `Infra.prod.CloudflareZoneSettings.donepudi-me.yaml`, the six `Infra.prod.CloudflareDnsRecord.donepudi-me-*.yaml` (apex, www, swarup, hey, mx, google-verification), `Infra.prod.CloudflareRuleset.donepudi-me-redirects.yaml` | `planton diff -f <file> $O` exits 0 for each |
| 6 | **[owner]** At GoDaddy, the name servers set to row 4's pair (`../../vendors/godaddy/README.md`) | `dig +norec NS donepudi.me @a.gtld-servers.net` names the pair |
| 7 | `Infra.prod.CloudflareD1Database.donepudi-me.yaml`, `Infra.prod.CloudflareTurnstileWidget.donepudi-me-talk.yaml` | `status.outputs.databaseId` is the id in `../../../wrangler.jsonc`; the site key is in `../../../site/talk-send.js` |
| 8 | **[owner]** R2 and Zero Trust Free switched on in the account | Rows 9 and 10 apply |
| 9 | `Infra.prod.CloudflareR2Bucket.donepudi-me-pages.yaml`, `Infra.prod.CloudflareZeroTrustOrganization.donepudi.yaml` | The team domain is `donepudi.cloudflareaccess.com` |
| 10 | `Config.Org.Secret.inbox-owner-email.yaml` and `Config.Org.Secret.threads-evaluation-key.yaml` (values through stdin, also copied to the GitHub environment `production`), `Infra.prod.CloudflareZeroTrustAccessIdentityProvider.one-time-pin.yaml`, `Infra.prod.CloudflareZeroTrustAccessServiceToken.donepudi-me-inbox-sync.yaml`, the owner and sync `Infra.prod.CloudflareZeroTrustAccessPolicy.*.yaml`, `Infra.prod.CloudflareZeroTrustAccessApplication.donepudi-me-threads.yaml` | The application's audience tag and the token's client id are in `../../../wrangler.jsonc` |
| 11 | After the first deploy: `Infra.prod.CloudflareZeroTrustAccessPolicy.donepudi-me-threads-members.yaml`, then row 10's application again with it at precedence 3 | An invited address signs in and sees only its thread |
