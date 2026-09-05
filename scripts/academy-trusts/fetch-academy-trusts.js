#!/usr/bin/env node
/**
 * Fetch the full list of academy trusts from the Department for Education's
 * "Get Information About Schools" (GIAS) register — the authoritative source.
 *
 * Academy trusts are an England-only legal structure. Scotland, Wales and
 * Northern Ireland have no equivalent, so "all academy trusts in the UK" is
 * in practice "all academy trusts in England".
 *
 * Usage:
 *   node scripts/academy-trusts/fetch-academy-trusts.js [options]
 *
 * Options:
 *   --out <dir>         Output directory (default: ./out)
 *   --include-closed    Include closed/dissolved trusts (default: open only)
 *   --include-umbrella  Also include "Umbrella trust" groups
 *   --with-counts       Also download the schools extract and count the
 *                       academies currently open under each trust (~50MB)
 *   --json              Additionally write academy-trusts.json
 *
 * No dependencies. Requires Node 18+ (global fetch).
 */

const fs = require('fs');
const path = require('path');

const GIAS_BASE = 'https://ea-edubase-api-prod.azurewebsites.net/edubase/downloads/public';
const GROUPS_URL = `${GIAS_BASE}/allgroupsdata.csv`;

// ---------------------------------------------------------------- arguments

function parseArgs(argv) {
  const opts = {
    out: path.join(process.cwd(), 'out'),
    includeClosed: false,
    includeUmbrella: false,
    withCounts: false,
    json: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--out') opts.out = argv[++i];
    else if (arg === '--include-closed') opts.includeClosed = true;
    else if (arg === '--include-umbrella') opts.includeUmbrella = true;
    else if (arg === '--with-counts') opts.withCounts = true;
    else if (arg === '--json') opts.json = true;
    else if (arg === '--help' || arg === '-h') {
      console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0]);
      process.exit(0);
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }
  return opts;
}

// ---------------------------------------------------------------- CSV utils

/**
 * GIAS publishes Windows-1252 encoded CSV, so decoding as UTF-8 mangles
 * apostrophes and accented characters in trust names.
 */
async function fetchCsv(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'academy-trust-list/1.0' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return new TextDecoder('windows-1252').decode(buf);
}

/** Minimal RFC 4180 parser: handles quoted fields, embedded commas/newlines. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field); field = '';
    } else if (ch === '\r') {
      // ignore; \n closes the row
    } else if (ch === '\n') {
      row.push(field); field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else {
      field += ch;
    }
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }

  const header = rows.shift().map((h) => h.replace(/^﻿/, '').trim());
  return rows.map((r) => {
    const obj = {};
    header.forEach((h, idx) => { obj[h] = (r[idx] ?? '').trim(); });
    return obj;
  });
}

function toCsv(rows, columns) {
  const esc = (v) => {
    const s = v == null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [columns.join(',')];
  for (const row of rows) lines.push(columns.map((c) => esc(row[c])).join(','));
  return lines.join('\n') + '\n';
}

/** GIAS column names have drifted over the years; match on a loose key. */
function pick(row, ...candidates) {
  for (const c of candidates) {
    if (row[c] !== undefined) return row[c];
  }
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const wanted = candidates.map(norm);
  for (const key of Object.keys(row)) {
    if (wanted.includes(norm(key))) return row[key];
  }
  return '';
}

// ------------------------------------------------------------ academy counts

/**
 * The schools extract is published under a date-stamped filename. Walk back a
 * few days until one resolves, since it is regenerated overnight.
 */
async function fetchSchoolsExtract() {
  const stamp = (d) =>
    `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
  const today = new Date();
  for (let back = 0; back < 7; back++) {
    const d = new Date(today.getTime() - back * 86400000);
    const url = `${GIAS_BASE}/edubasealldata${stamp(d)}.csv`;
    try {
      process.stderr.write(`  trying ${url}\n`);
      return parseCsv(await fetchCsv(url));
    } catch (err) {
      if (back === 6) throw err;
    }
  }
}

function countAcademiesByTrust(schools) {
  const counts = new Map();
  for (const s of schools) {
    const trustUid = pick(s, 'Trusts (code)');
    if (!trustUid) continue;
    const status = pick(s, 'EstablishmentStatus (name)');
    if (status && !/^open/i.test(status)) continue;
    counts.set(trustUid, (counts.get(trustUid) || 0) + 1);
  }
  return counts;
}

// ------------------------------------------------------------------- main

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  process.stderr.write(`Downloading GIAS group register…\n  ${GROUPS_URL}\n`);
  const groups = parseCsv(await fetchCsv(GROUPS_URL));
  process.stderr.write(`  ${groups.length} groups of all types\n`);

  const isTrust = (typeName) => {
    const t = typeName.toLowerCase();
    if (t.includes('academy trust')) return true; // multi-, single-, secure single-
    if (opts.includeUmbrella && t.includes('umbrella trust')) return true;
    return false;
  };

  let trusts = groups.filter((g) => isTrust(pick(g, 'Group Type (name)', 'GroupType (name)')));

  if (!opts.includeClosed) {
    trusts = trusts.filter((g) => {
      const status = pick(g, 'Group Status (name)', 'GroupStatus (name)');
      return !status || /open/i.test(status);
    });
  }

  let counts = null;
  if (opts.withCounts) {
    process.stderr.write('Downloading GIAS schools extract for academy counts…\n');
    counts = countAcademiesByTrust(await fetchSchoolsExtract());
  }

  const rows = trusts.map((g) => {
    const uid = pick(g, 'Group UID', 'GroupUID');
    return {
      group_uid: uid,
      trust_name: pick(g, 'Group Name', 'GroupName'),
      trust_type: pick(g, 'Group Type (name)', 'GroupType (name)'),
      status: pick(g, 'Group Status (name)', 'GroupStatus (name)'),
      companies_house_number: pick(g, 'Companies House Number', 'CompaniesHouseNumber'),
      ukprn: pick(g, 'UKPRN'),
      opened: pick(g, 'Incorporated on (open date)', 'Open date'),
      closed: pick(g, 'Closed Date', 'Closed date'),
      address_line_1: pick(g, 'Group Contact Street', 'Street'),
      address_line_2: pick(g, 'Group Contact Locality', 'Locality'),
      address_line_3: pick(g, 'Group Contact Address3', 'Address3'),
      town: pick(g, 'Group Contact Town', 'Town'),
      county: pick(g, 'Group Contact County', 'County'),
      postcode: pick(g, 'Group Contact Postcode', 'Postcode'),
      head_of_group: [
        pick(g, 'Head of Group Title', 'HeadOfGroup Title'),
        pick(g, 'Head of Group First Name', 'HeadOfGroup First Name'),
        pick(g, 'Head of Group Last Name', 'HeadOfGroup Last Name'),
      ].filter(Boolean).join(' '),
      open_academies: counts ? (counts.get(uid) || 0) : '',
    };
  });

  rows.sort((a, b) => a.trust_name.localeCompare(b.trust_name, 'en-GB'));

  fs.mkdirSync(opts.out, { recursive: true });
  const columns = Object.keys(rows[0] || { group_uid: '' });
  const csvPath = path.join(opts.out, 'academy-trusts.csv');
  fs.writeFileSync(csvPath, toCsv(rows, columns), 'utf8');

  if (opts.json) {
    fs.writeFileSync(path.join(opts.out, 'academy-trusts.json'), JSON.stringify(rows, null, 2), 'utf8');
  }

  const byType = rows.reduce((acc, r) => {
    acc[r.trust_type] = (acc[r.trust_type] || 0) + 1;
    return acc;
  }, {});

  console.log(`\nWrote ${rows.length} trusts to ${csvPath}`);
  for (const [type, n] of Object.entries(byType).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${type}: ${n}`);
  }
  if (counts) {
    const total = rows.reduce((sum, r) => sum + (r.open_academies || 0), 0);
    console.log(`  open academies covered: ${total}`);
  }
}

main().catch((err) => {
  console.error(`\nFailed: ${err.message}`);
  if (/fetch failed|EAI_AGAIN|ENOTFOUND|403|407/.test(err.message)) {
    console.error(
      'If you are behind a proxy, the GIAS hosts must be reachable:\n' +
      '  ea-edubase-api-prod.azurewebsites.net\n' +
      '  www.get-information-schools.service.gov.uk'
    );
  }
  process.exit(1);
});
