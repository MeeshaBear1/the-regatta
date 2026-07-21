// Merge data/sweep/*.json → data/catalog.json. Dedupes slugs/images, validates, orders wings.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const ORDER = ['clippers', 'first-cup', 'luminists', 'ship-portraits', 'edwardian-racers', '1930-season', 'worlds-waters'];
const files = readdirSync('data/sweep').filter(f => f.endsWith('.json'));
let all = [], dropped = [];
for (const f of files) {
  let arr;
  try { arr = JSON.parse(readFileSync(`data/sweep/${f}`, 'utf8')); }
  catch (e) { console.error(`PARSE FAIL ${f}: ${e.message}`); continue; }
  for (const p of arr) {
    if (!p.slug || !p.title || !p.imageUrl || !p.collection || !p.era) { dropped.push([f, p.slug || p.title, 'missing fields']); continue; }
    // doctrine lint: no named licensed archives
    const credit = `${p.artist || ''} ${p.institution || ''}`.toLowerCase();
    if (/beken|rosenfeld/.test(credit)) { dropped.push([f, p.slug, 'licensed named archive — sign-off-or-shelve']); continue; }
    if (p.figure && !p.publicityStatus) { dropped.push([f, p.slug, 'figure without publicityStatus']); continue; }
    p.publicityStatus = p.publicityStatus || 'clear';
    all.push(p);
  }
}
const seenSlug = new Set(), seenImg = new Set(), out = [];
for (const p of all) {
  if (seenSlug.has(p.slug) || seenImg.has(p.imageUrl)) { dropped.push(['dedupe', p.slug, 'duplicate']); continue; }
  seenSlug.add(p.slug); seenImg.add(p.imageUrl); out.push(p);
}
out.sort((a, b) => ORDER.indexOf(a.collection) - ORDER.indexOf(b.collection) || String(a.date).localeCompare(String(b.date)));
// hero: a dark dramatic marine reads best under the dawn-harbor scrim
const hero = out.find(p => /aivazovsky/i.test(p.artist || '')) || out.find(p => p.collection === 'luminists') || out[0];
if (hero) hero.hero = true;
writeFileSync('data/catalog.json', JSON.stringify(out, null, 2));
console.log(`Merged ${out.length} pieces from ${files.length} files. Dropped ${dropped.length}:`);
for (const d of dropped) console.log('  -', ...d);
const byC = {}; out.forEach(p => byC[p.collection] = (byC[p.collection] || 0) + 1);
console.log(byC);
