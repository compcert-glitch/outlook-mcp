# Academy trust list scraper

Builds a complete list of academy trusts from the Department for Education's
[Get Information About Schools](https://www.get-information-schools.service.gov.uk/)
(GIAS) register — the statutory register, updated nightly, and the source that
everything else (Companies House cross-references, FBIT, commercial lists) is
derived from.

> Academy trusts are an England-only structure. Scotland, Wales and Northern
> Ireland have no equivalent, so "all academy trusts in the UK" means all
> academy trusts in England.

## Usage

```bash
node scripts/academy-trusts/fetch-academy-trusts.js --out ./out
```

| Option | Effect |
| --- | --- |
| `--out <dir>` | Output directory (default `./out`) |
| `--include-closed` | Include closed/dissolved trusts (default: open only) |
| `--include-umbrella` | Also include `Umbrella trust` groups |
| `--with-counts` | Download the schools extract (~50 MB) and count open academies per trust |
| `--json` | Also write `academy-trusts.json` |

Output columns: `group_uid`, `trust_name`, `trust_type`, `status`,
`companies_house_number`, `ukprn`, `opened`, `closed`, address lines, `town`,
`county`, `postcode`, `head_of_group`, `open_academies`.

`group_uid` is the GIAS group identifier and the stable join key — use it
against the GIAS schools extract to get each trust's academies.
`companies_house_number` joins to Companies House for filed accounts and
director records.

No dependencies; Node 18+ (uses global `fetch`).

## Network requirements

The script downloads directly from GIAS. These hosts must be reachable:

- `ea-edubase-api-prod.azurewebsites.net` (the CSV downloads)
- `www.get-information-schools.service.gov.uk` (the register front end)

Both are blocked by the Claude Code web sandbox's default egress policy, so
run this on a normal machine, or allow those hosts in the environment's
network policy first.

## Sources

- Group register (all trusts, federations, sponsors):
  `https://ea-edubase-api-prod.azurewebsites.net/edubase/downloads/public/allgroupsdata.csv`
- Schools extract (per-school, includes `Trusts (code)`):
  `https://ea-edubase-api-prod.azurewebsites.net/edubase/downloads/public/edubasealldata<YYYYMMDD>.csv`

GIAS data is published under the Open Government Licence v3.0.
