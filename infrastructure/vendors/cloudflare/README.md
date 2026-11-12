# Cloudflare

What the Cloudflare dashboard holds for donepudi.me that Planton can't create.

## The account

`swarupdonepudi`, id `dd1f610d414c078599fa77a56930195b` (also `Config.Org.Variable.cloudflare-swarupdonepudi-account-id`), on the Free plan, held by the owner's own login.

## The account API token `planton-swarupdonepudi`

Planton's sign-in, stored only as the Planton secret `cloudflare-swarupdonepudi-account-api-token`. No expiry, all IP addresses.

- **Entire account:** Workers Scripts (Legacy) Edit, Account Settings Read, D1 Edit, Workers R2 Storage Edit, Turnstile Sites Edit, Access: Service Tokens Edit, Access: Organizations, Identity Providers, and Groups Edit, Access (Apps and Policies) Edit, Access: Apps Edit, Access: Policies Edit.
- **All domains:** DNS Edit, Zone Edit, Zone Settings Edit, Workers Routes Edit, Zone SSL & Certificates Edit, Dynamic URL Redirects Edit.

It lacks Account API Tokens Read, so Verify signs in but can't list what the token may do. **Re-mint:** Roll it in the dashboard, then set the new value from the clipboard with the command in the secret's file.

## The deploy token `github-donepudi-me-deployer`

The deploy job's key, stored only as `CLOUDFLARE_API_TOKEN` in the GitHub environment `production` (only `main` may use it): Workers Scripts (Legacy) Edit and D1 Edit on the account; Workers Routes Edit and Zone Read on all domains. No DNS rights.

## Set only in the dashboard

- **R2 and Zero Trust Free** are switched on by the owner (each asks for a card; both are $0 at this size).
- **Real User Monitoring off** (Speed → Real user monitoring → "Disable completely"). Otherwise a beacon script is injected that the CSP blocks.
