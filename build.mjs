// THE REGATTA — static site generator. Zero deps. `node build.mjs` → docs/
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'docs';
const catalog = JSON.parse(readFileSync('data/catalog.json', 'utf8'));

const COLLECTIONS = {
  'clippers': { title: 'The Clippers', tag: 'CH. 01', sub: 'Commerce as glamour — the den’s oldest ocean.', desc: 'The great American clipper lithographs: Flying Cloud and her rivals, printed for the parlors of a landlocked nation that attended the race by chromolithography.' },
  'first-cup': { title: 'The First Cup', tag: 'CH. 02', sub: 'The 1851 schooner and the Cup’s Victorian decades.', desc: 'One race off Cowes in 1851, and a century and a half of consequence — the Cup’s first era in period lithography. Event and club marks appear inside the artworks only, per the historical-document doctrine.' },
  'luminists': { title: 'The Luminists', tag: 'CH. 03', sub: 'Light on water as the entire subject.', desc: 'Lane’s glassy harbors and the American luminists: not the race, the stillness after.' },
  'ship-portraits': { title: 'The Ship Portraits', tag: 'CH. 04', sub: 'The vessel as sitter.', desc: 'Jacobsen’s harbor-portrait industry and the pierhead painters — the fleet’s family photographers, one broadside sitting at a time.' },
  'edwardian-racers': { title: 'The Edwardian Racers', tag: 'CH. 05', sub: 'Grace, at industrial scale.', desc: 'The big-class era in period photography and print — the seasons when kings raced kings, in the anonymous press record.' },
  '1930-season': { title: 'The 1930 Season', tag: 'CH. 06 · JUST OPENED', sub: 'The first J-class summer — cleared January 2026.', desc: 'The Cup’s towering modern era opening off Newport, in the season’s own press plates. Published 1930, public domain in the US as of January 2026 — the portfolio’s newest unlock afloat.' },
  'worlds-waters': { title: 'The World’s Waters', tag: 'CH. 07', sub: 'The masterworks, worldwide.', desc: 'Van de Velde’s calms, Turner’s weather, Aivazovsky’s ninth waves, Hokusai’s troughs — the global apex of marine art, from the museums’ open programs.' },
};
const ERAS = { 'golden-age': 'Golden Age', 'clipper': 'Clipper Era', 'victorian-cup': 'Victorian Cup', 'edwardian': 'Edwardian', 'j-class-1930': 'J-Class 1930' };
const TIERS = [
  ['Cabin', '18 × 24 in', '$1,200'],
  ['Saloon', '30 × 40 in', '$2,900'],
  ['Clubhouse', '45 × 60 in', '$6,800'],
];

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// International code flags R·E·G·A·T·T·A, simplified glyphs for the hoist rail
const FLAGS = [
  '<svg viewBox="0 0 14 10"><rect width="14" height="10" fill="#A93226"/><rect x="5.5" width="3" height="10" fill="#E9C46A"/><rect y="3.5" width="14" height="3" fill="#E9C46A"/></svg>',
  '<svg viewBox="0 0 14 10"><rect width="14" height="5" fill="#1F4E79"/><rect y="5" width="14" height="5" fill="#A93226"/></svg>',
  '<svg viewBox="0 0 14 10"><g><rect width="14" height="10" fill="#E9C46A"/><rect x="2.3" width="2.3" height="10" fill="#1F4E79"/><rect x="7" width="2.3" height="10" fill="#1F4E79"/><rect x="11.7" width="2.3" height="10" fill="#1F4E79"/></g></svg>',
  '<svg viewBox="0 0 14 10"><path d="M0,0 H14 L10,5 L14,10 H0 Z" fill="#F7F3EA"/><path d="M0,0 H7 V10 H0 Z" fill="#F7F3EA"/><path d="M7,0 H14 L10,5 L14,10 H7 Z" fill="#1F4E79"/></svg>',
  '<svg viewBox="0 0 14 10"><rect width="4.6" height="10" fill="#A93226"/><rect x="4.6" width="4.6" height="10" fill="#F7F3EA"/><rect x="9.2" width="4.8" height="10" fill="#1F4E79"/></svg>',
  '<svg viewBox="0 0 14 10"><rect width="4.6" height="10" fill="#A93226"/><rect x="4.6" width="4.6" height="10" fill="#F7F3EA"/><rect x="9.2" width="4.8" height="10" fill="#1F4E79"/></svg>',
  '<svg viewBox="0 0 14 10"><path d="M0,0 H14 L10,5 L14,10 H0 Z" fill="#F7F3EA"/><path d="M7,0 H14 L10,5 L14,10 H7 Z" fill="#1F4E79"/></svg>',
];

function layout({ title, desc, body, root, night = false, jsonld = null, active = '' }) {
  const nav = [['gallery/', 'Gallery'], ['the-burgee/', 'The Burgee'], ['craft/', 'Craft'], ['about/', 'About']]
    .map(([h, t]) => `<a href="${root}${h}"${active === t ? ' aria-current="page"' : ''}>${t}</a>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..600&family=Hanken+Grotesk:wght@300..600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}assets/site.css">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(FLAGS[0])}">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>
<body${night ? '' : ' class="light-hdr"'}>
<header class="hdr"><div class="bar">
  <nav class="primary" aria-label="Primary">${nav}</nav>
  <a class="wordmark" href="${root}">THE REGATTA</a>
  <nav aria-label="Folio"><a href="${root}checkout/">The Folio <span id="folio-count"></span></a></nav>
</div></header>
<main>
${body}
</main>
<div class="hoist" aria-hidden="true"><div class="track"><div class="fix"></div></div>${FLAGS.join('')}</div>
<div class="toast" role="status" aria-live="polite"></div>
<footer><div class="wrap">
  <div class="cols">
    <div><h4>The Regatta</h4><p style="max-width:34ch;font-size:.92rem;opacity:.85">Museum-grade prints of the age of sail, at leisure and at speed. The sea has always kept a society page.</p></div>
    <div><h4>Collections</h4><ul>${Object.entries(COLLECTIONS).map(([s, c]) => `<li><a href="${root}collections/${s}/">${c.title}</a></li>`).join('')}</ul></div>
    <div><h4>The House</h4><ul><li><a href="${root}the-burgee/">The Burgee — commission</a></li><li><a href="${root}craft/">Canvas and Stone</a></li><li><a href="${root}about/">About &amp; doctrine</a></li><li><a href="${root}checkout/">The Folio</a></li></ul></div>
    <div><h4>Programs</h4><ul><li>The Fleet — three matched pieces</li><li>The Clubhouse — trade tier</li><li>Gifting: the launch, the first command, the crossing</li></ul></div>
  </div>
  <div class="fine"><span>© 2026 The Regatta. All artworks pre-1931; rights researched per piece and verified at acquisition.</span><span>Historic Cup and club marks appear inside period artworks only, as historical documents.</span></div>
</div></footer>
<script src="${root}assets/site.js" defer></script>
</body></html>`;
}

const money = p => p; // prices are strings by design

function pieceCard(p, root, eager = false) {
  return `<a class="card" href="${root}piece/${p.slug}/" data-collection="${p.collection}" data-era="${p.era}" data-medium="${esc(p.medium || '')}" data-search="${esc(((p.title || '') + ' ' + (p.artist || '') + ' ' + (p.vessel || '') + ' ' + (p.water || '')).toLowerCase())}">
  <div class="ph"><img src="${esc(p.imageUrl)}" alt="${esc(p.title)} — ${esc(p.artist || '')}" loading="${eager ? 'eager' : 'lazy'}"></div>
  <div class="meta"><span class="mono">${esc(COLLECTIONS[p.collection]?.title || p.collection)} · ${esc(p.date || '')}</span>
  <h3>${esc(p.title)}</h3><p class="sub">${esc(p.artist || '')}</p></div></a>`;
}

/* ---------- index ---------- */
function indexPage() {
  const root = '';
  const hero = catalog.find(p => p.hero) || catalog.find(p => p.collection === 'luminists') || catalog[0];
  const wing1930 = catalog.filter(p => p.collection === '1930-season').slice(0, 4);
  const featured = Object.keys(COLLECTIONS).map(s => catalog.find(p => p.collection === s && p.slug !== hero.slug)).filter(Boolean).slice(0, 8);
  const rails = Object.entries(COLLECTIONS).map(([slug, c]) => {
    const pieces = catalog.filter(p => p.collection === slug).slice(0, 8);
    if (!pieces.length) return '';
    return `<div class="reveal" style="margin-top:4rem">
      <div class="wrap sec-head"><h2 style="font-size:clamp(1.6rem,3vw,2.4rem)">${c.title}</h2>
      <a class="mono" style="color:var(--brass)" href="${root}collections/${slug}/">View the collection →</a></div>
      <div class="rail">${pieces.map(p => pieceCard(p, root)).join('')}</div></div>`;
  }).join('');

  const body = `
<div class="hero"><div class="art plx" style="--plx:-4vh"><img src="${esc(hero.imageUrl)}" alt="${esc(hero.title)}" fetchpriority="high"></div>
  <div class="wrap">
    <span class="kicker mono">Ch. I — Dawn Harbor</span>
    <h1>THE REGATTA</h1>
    <p class="tag">Museum-grade prints of the age of sail, at leisure and at speed. The sea has always kept a society page.</p>
    <a class="btn solid" href="${root}gallery/">Enter the gallery</a>
    <a class="btn" style="margin-left:.6rem" href="${root}collections/1930-season/">The 1930 unlock</a>
  </div>
</div>

<section class="night">
  <div class="wrap">
    <span class="kicker mono">Ch. II — The Gun · Just opened</span>
    <div class="sec-head"><h2>The first J-class summer, 1930</h2></div>
    <hr class="rule">
    <p class="reveal" style="max-width:62ch;margin-bottom:2.5rem">Published 1930, public domain in the United States as of January 2026 — the Cup’s towering modern era opens off Newport in the season’s own press plates, sold as the history it is. The rest of the J-class decade stands on the watch list, unlocking annually from January 2027.</p>
    <div class="grid stagger">${wing1930.map(p => pieceCard(p, root)).join('')}</div>
    <p class="reveal" style="margin-top:2.5rem"><a class="btn" href="${root}collections/1930-season/">Enter the 1930 wing</a></p>
  </div>
</section>

<section>
  <div class="wrap"><span class="kicker mono" style="color:var(--brass)">Ch. III — The Weather Mark</span>
  <div class="sec-head"><h2>The collections, along the beat</h2><span class="mono">${catalog.length} pieces · seven wings</span></div><hr class="rule"></div>
  ${rails}
</section>

<section class="night">
  <div class="wrap">
    <div class="sec-head"><h2>Signals of the house</h2><a class="mono" style="color:var(--brass-bright)" href="${root}gallery/">All pieces →</a></div>
    <hr class="rule">
    <div class="grid stagger">${featured.map(p => pieceCard(p, root)).join('')}</div>
  </div>
</section>

<section>
  <div class="wrap" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:3rem">
    <div class="reveal">
      <span class="kicker mono" style="color:var(--brass)">The Commission</span>
      <h2 style="font-size:clamp(1.8rem,3.5vw,2.8rem);margin-bottom:1rem">THE BURGEE</h2>
      <p style="max-width:48ch">Your private signal, designed as an original and rendered in period chart-plate style — burgee and optional boat-name plate. Free preview; the sea spells slowly, and means it.</p>
      <p style="margin-top:1.5rem"><a class="btn solid" href="${root}the-burgee/">Design your signal</a></p>
    </div>
    <div class="reveal">
      <span class="kicker mono" style="color:var(--brass)">The Craft</span>
      <h2 style="font-size:clamp(1.8rem,3.5vw,2.8rem);margin-bottom:1rem">Canvas and Stone</h2>
      <p style="max-width:48ch">Marine lithography, luminism, and how speed was drawn before it was photographed — the house’s essay on the making of these images.</p>
      <p style="margin-top:1.5rem"><a class="btn" href="${root}craft/">Read the essay</a></p>
    </div>
  </div>
</section>`;
  return layout({
    title: 'The Regatta — Museum-Grade Prints of the Age of Sail', root, night: true, active: '',
    desc: 'Clipper lithographs, the Cup’s first century, luminist marines, ship portraits, and the newly unlocked 1930 J-class season. Museum-grade prints, rights-researched.',
    body, jsonld: { '@context': 'https://schema.org', '@type': 'Organization', name: 'The Regatta', description: 'Museum-grade prints of the age of sail.' }
  });
}

/* ---------- gallery ---------- */
function galleryPage() {
  const root = '../';
  const mediums = [...new Set(catalog.map(p => p.medium).filter(Boolean))].sort();
  const body = `
<section style="padding-top:9rem">
  <div class="wrap">
    <div class="sec-head"><h2>The Gallery</h2><span class="mono">Every wing, one wall</span></div><hr class="rule">
    <div class="filters">
      <select id="f-collection" aria-label="Collection"><option value="">All collections</option>${Object.entries(COLLECTIONS).map(([s, c]) => `<option value="${s}">${c.title}</option>`).join('')}</select>
      <select id="f-era" aria-label="Era"><option value="">All eras</option>${Object.entries(ERAS).map(([s, t]) => `<option value="${s}">${t}</option>`).join('')}</select>
      <select id="f-medium" aria-label="Medium"><option value="">All media</option>${mediums.map(m => `<option value="${esc(m)}">${esc(m)}</option>`).join('')}</select>
      <input id="f-q" type="search" placeholder="Vessel, artist, water…" aria-label="Search">
      <span class="mono count" id="f-count">${catalog.length} pieces</span>
    </div>
    <div class="grid" id="gallery-grid">${catalog.map(p => pieceCard(p, root)).join('')}</div>
  </div>
</section>`;
  return layout({ title: 'Gallery — The Regatta', desc: 'Browse every piece: clippers, the first Cup, luminists, ship portraits, Edwardian racers, the 1930 season, and the world’s waters.', body, root, active: 'Gallery' });
}

/* ---------- collection pages ---------- */
function collectionPage(slug) {
  const root = '../../';
  const c = COLLECTIONS[slug];
  const pieces = catalog.filter(p => p.collection === slug);
  const watch = slug === '1930-season' ? `
    <div class="plate reveal" style="margin-top:3.5rem;max-width:640px">
      <span class="mono" style="color:var(--brass)">Watch list</span>
      <p style="margin-top:.6rem">The J-class decade, 1931 onward — Rainbow, Endeavour, Ranger — unlocks annually from January 2027 under the family’s pre-publication rule. The wing is wired; the wall waits.</p>
    </div>` : '';
  const doctrine = slug === '1930-season' ? `<p class="reveal" style="max-width:62ch;opacity:.8;font-size:.92rem;margin-top:1rem">This wing runs on the anonymous press record. The celebrated marine-photography firms’ named archives are actively licensed — their work is sign-off-or-shelve, and the house shelves it.</p>` : '';
  const body = `
<section style="padding-top:9rem">
  <div class="wrap">
    <span class="kicker mono" style="color:var(--brass)">${esc(c.tag)}</span>
    <div class="sec-head"><h2>${c.title}</h2><span class="mono">${pieces.length} pieces</span></div>
    <hr class="rule">
    <p class="reveal" style="max-width:62ch;margin-bottom:1rem">${c.desc}</p>${doctrine}
    <div class="grid stagger" style="margin-top:3rem">${pieces.map(p => pieceCard(p, root)).join('')}</div>
    ${watch}
  </div>
</section>`;
  return layout({ title: `${c.title} — The Regatta`, desc: c.desc, body, root });
}

/* ---------- piece pages ---------- */
function piecePage(p) {
  const root = '../../';
  const c = COLLECTIONS[p.collection];
  const related = catalog.filter(x => x.collection === p.collection && x.slug !== p.slug).slice(0, 4);
  const badges = [
    `<span class="badge">Rights: PD-pre1931 · verified at acquisition</span>`,
    p.publicityStatus === 'review' ? `<span class="badge review">Publicity: estate review</span>` : `<span class="badge">Publicity: clear</span>`,
    p.markStatus === 'live' ? `<span class="badge">Cup &amp; club marks — historical document</span>` : '',
    p.figure ? `<span class="badge">Figure: ${esc(p.figure)}</span>` : '',
  ].filter(Boolean).join('');
  const story = p.story || {};
  const body = `
<section style="padding-top:8.5rem">
  <div class="wrap">
    <p class="mono" style="margin-bottom:1.6rem;color:var(--brass)"><a href="${root}gallery/">Gallery</a> / <a href="${root}collections/${p.collection}/">${esc(c?.title || p.collection)}</a></p>
    <div class="pdp-hero">
      <div>
        <div class="pdp-art" role="button" tabindex="0" aria-label="Open deep zoom">
          <img src="${esc(p.imageUrl)}" alt="${esc(p.title)} — ${esc(p.artist || '')}" fetchpriority="high">
          <span class="zoom-hint">Deep zoom — the ${esc(p.medium && p.medium.includes('photo') ? 'halftone' : p.medium && p.medium.includes('litho') ? 'crayon' : 'glaze')}</span>
        </div>
        <div class="plate"><dl>
          <dt>Artist / firm</dt><dd>${esc(p.artist || 'Unattributed, per period record')}</dd>
          <dt>Date</dt><dd>${esc(p.date || '')}</dd>
          ${p.vessel ? `<dt>Vessel</dt><dd>${esc(p.vessel)}</dd>` : ''}
          ${p.water ? `<dt>The water</dt><dd>${esc(p.water)}</dd>` : ''}
          <dt>Medium</dt><dd>${esc(p.medium || '')}</dd>
          <dt>Source</dt><dd>${esc(p.institution || '')}${p.locator ? ` — <a style="text-decoration:underline;text-underline-offset:3px" href="${esc(p.locator)}" rel="noopener">record</a>` : ''}</dd>
        </dl>
        <div class="badges">${badges}</div></div>
      </div>
      <div>
        <span class="kicker mono" style="color:var(--brass)">${esc(c?.title || '')} · ${esc(ERAS[p.era] || p.era)}</span>
        <h1 style="font-size:clamp(1.9rem,3.6vw,3rem);margin:.4rem 0 1.6rem">${esc(p.title)}</h1>
        <div class="story">
          ${story.what ? `<p><span class="lbl">WHAT</span>${esc(story.what)}</p>` : ''}
          ${story.why ? `<p><span class="lbl">WHY</span>${esc(story.why)}</p>` : ''}
          ${story.notice ? `<p><span class="lbl">NOTICE</span>${esc(story.notice)}</p>` : ''}
          ${story.meaning ? `<p class="meaning">“${esc(story.meaning)}”</p>` : ''}
        </div>
        <hr class="rule">
        <div class="ladder" role="group" aria-label="Print sizes">
          ${TIERS.map(([n, sz, pr], i) => `<div class="tier" role="button" tabindex="0" aria-pressed="${i === 1}" data-tier="${n}" data-price="${pr}"><span><strong>${n}</strong> · ${sz} · museum giclée, archival rag</span><span class="price">${pr}</span></div>`).join('')}
        </div>
        <button class="btn solid" data-add-folio="${p.slug}" data-title="${esc(p.title)}">Enter it in the folio</button>
        <p style="font-size:.85rem;opacity:.7;margin-top:1rem">Acquisition is by enquiry. Oversized statement marines ship first-class, framed to order. <strong>THE FLEET</strong> — three matched pieces from one wing — $7,500.</p>
        <p style="font-size:.85rem;opacity:.7;margin-top:.6rem">Gifting: the launch, the first command, the crossing.${p.personalization?.eligible ? ' This piece takes a dedication plate — title-swap personalization at commission.' : ''}</p>
      </div>
    </div>
    ${related.length ? `<div style="margin-top:5rem"><div class="sec-head"><h2 style="font-size:1.8rem">Same water</h2></div><div class="grid stagger">${related.map(x => pieceCard(x, root)).join('')}</div></div>` : ''}
  </div>
</section>
<div class="zoomer" aria-label="Deep zoom" role="dialog"><button class="close">Close</button><img src="${esc(p.imageUrl)}" alt=""></div>`;
  return layout({
    title: `${p.title} — The Regatta`, desc: (story.what || p.title).slice(0, 155), body, root,
    jsonld: {
      '@context': 'https://schema.org', '@type': 'VisualArtwork', name: p.title, creator: p.artist,
      dateCreated: p.date, artMedium: p.medium, image: p.imageUrl,
      offers: { '@type': 'AggregateOffer', priceCurrency: 'USD', lowPrice: '1200', highPrice: '6800' }
    }
  });
}

/* ---------- burgee ---------- */
function burgeePage() {
  const root = '../';
  const body = `
<section style="padding-top:9rem">
  <div class="wrap">
    <span class="kicker mono" style="color:var(--brass)">The Commission · Free preview</span>
    <div class="sec-head"><h2>THE BURGEE</h2><span class="mono">From $1,400 · chart-plate rendering</span></div>
    <hr class="rule">
    <p class="reveal" style="max-width:62ch;margin-bottom:2.5rem">The family’s private signal, designed as an original: your burgee and optional boat-name plate rendered in period chart-plate style, alongside the international code the whole tradition descends from. “THE REYES PRIVATE SIGNAL · FIRST HOISTED 2026.”</p>
    <div class="burgee-lab">
      <form id="burgee-form" onsubmit="return false">
        <label>Signal name or boat name<input id="b-name" maxlength="40" placeholder="MERIDIAN"></label>
        <p class="lint-error" id="b-lint">That is a real club’s name or mark — the house doesn’t render those. Private signals only.</p>
        <label>Field<select id="b-col1"><option value="#1F4E79">Signal blue</option><option value="#A93226">Signal red</option><option value="#E9C46A">Signal yellow</option><option value="#F7F3EA">White</option><option value="#14232E">Varnish dark</option></select></label>
        <label>Division<select id="b-col2"><option value="#F7F3EA">White</option><option value="#A93226">Signal red</option><option value="#1F4E79">Signal blue</option><option value="#E9C46A">Signal yellow</option><option value="#14232E">Varnish dark</option></select></label>
        <label>Shape<select id="b-shape"><option value="pennant">Pennant</option><option value="swallowtail">Swallowtail</option><option value="rect">Rectangular</option></select></label>
        <label>Pattern<select id="b-div"><option value="per-pale">Per pale</option><option value="per-fess">Per fess</option><option value="cross">Cross</option><option value="saltire">Saltire</option><option value="bordure">Bordure</option><option value="plain">Plain field</option></select></label>
        <div style="display:flex;gap:.7rem;flex-wrap:wrap;margin-top:.5rem">
          <a class="btn" id="b-download" download>Download the free preview</a>
          <button class="btn solid" data-add-folio="the-burgee-commission" data-title="THE BURGEE — private signal commission">Commission it — $1,400</button>
        </div>
      </form>
      <div><div class="burgee-stage" id="burgee-svg" aria-live="polite"></div>
      <div class="honesty" style="margin-top:1.4rem"><strong>The honesty rule.</strong> Private signals are a real tradition, and real clubs keep real registries. Ours are original decorative designs, not club registrations — and we say so, on the plate and here. If you hold a registered signal, supply it and the house will render yours. No real club burgees or names can be entered; the form checks.</div></div>
    </div>
  </div>
</section>`;
  return layout({ title: 'The Burgee — a private signal, commissioned — The Regatta', desc: 'Design your private signal in period chart-plate style. Original decorative designs, never club registrations — free preview, commission from $1,400.', body, root, active: 'The Burgee' });
}

/* ---------- craft ---------- */
function craftPage() {
  const root = '../';
  const litho = catalog.find(p => (p.medium || '').includes('litho'));
  const lum = catalog.find(p => p.collection === 'luminists');
  const photo = catalog.find(p => (p.medium || '').includes('photo'));
  const fig = (p, cap) => p ? `<figure class="reveal" style="margin:2.5rem 0"><div style="aspect-ratio:16/9;overflow:hidden;background:var(--ink)"><img src="${esc(p.imageUrl)}" alt="${esc(p.title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover"></div><figcaption class="mono" style="margin-top:.6rem;opacity:.7">${esc(p.title)} — ${cap}</figcaption></figure>` : '';
  const body = `
<section style="padding-top:9rem">
  <div class="wrap" style="max-width:820px">
    <span class="kicker mono" style="color:var(--brass)">The Craft</span>
    <h1 style="font-size:clamp(2.2rem,5vw,4rem);margin-bottom:2rem">Canvas and Stone</h1>
    <hr class="rule">
    <div class="story" style="font-size:1.1rem">
      <h2 style="font-size:1.6rem;margin:2.5rem 0 1rem">The stone: marine lithography</h2>
      <p>Before the wire photo, the nation attended its races by lithograph. A draughtsman worked the image into limestone with a greased crayon; a printer pulled it; colorists — often rooms of them — laid the sea in by hand. The clipper cards and the Cup prints were news, advertisement, and art in one sheet, and the crayon’s grain is still in every plate. Our deep zoom shows it.</p>
      ${fig(litho, 'the crayon’s grain')}
      <h2 style="font-size:1.6rem;margin:2.5rem 0 1rem">The canvas: luminism</h2>
      <p>Lane and the luminists painted the hour the harbor holds its breath — glazes laid thin over thin until the light seems to come from behind the canvas. It is the opposite of the race: sail furled, water glass, the day accounted for. The glaze survives reproduction better than almost any painterly effect, which is why these prints carry.</p>
      ${fig(lum, 'the glaze, holding light')}
      <h2 style="font-size:1.6rem;margin:2.5rem 0 1rem">The plate: how speed was photographed</h2>
      <p>By the Edwardian seasons the press boats went out with cameras, and the big cutters were finally caught rather than imagined. The halftone screen turned silver prints into newspaper plates — a mesh of dots that, at our print scale, reads like weather. The 1930 wing is made of exactly this record: the season’s own anonymous press plates, published 1930, public domain as of January 2026.</p>
      ${fig(photo, 'the press halftone')}
      <h2 style="font-size:1.6rem;margin:2.5rem 0 1rem">Restoration doctrine</h2>
      <p>The house cleans the record, never rewrites it. Dust, scratch, and scan artifacts are removed; tone is corrected to the period process; nothing is added, sharpened into invention, or “enhanced” past what the stone, canvas, or plate held. Speed drawn taller than truth stays taller than truth — that exaggeration is the artifact.</p>
      <p style="margin-top:2rem"><a class="btn solid" href="${root}gallery/">Enter the gallery</a></p>
    </div>
  </div>
</section>`;
  return layout({ title: 'Canvas and Stone — the craft — The Regatta', desc: 'Marine lithography, luminism, and how speed was drawn before it was photographed — the making of the house’s images, and the restoration doctrine.', body, root, active: 'Craft' });
}

/* ---------- about ---------- */
function aboutPage() {
  const root = '../';
  const body = `
<section style="padding-top:9rem">
  <div class="wrap" style="max-width:820px">
    <span class="kicker mono" style="color:var(--brass)">The House</span>
    <h1 style="font-size:clamp(2.2rem,5vw,4rem);margin-bottom:2rem">About The Regatta</h1>
    <hr class="rule">
    <div class="story" style="font-size:1.05rem">
      <p>The Regatta sells museum-grade prints of the age of sail at leisure and at speed — the clipper lithographs, the Cup’s first century, the luminist marines, the ship portraits — closing at the newly unlocked 1930 season. Every piece names its vessel, its builder or firm where known, and the water. One commission: THE BURGEE.</p>
      <h2 style="font-size:1.5rem;margin:2.2rem 0 .8rem">The doctrine</h2>
      <p><strong>Rights.</strong> Everything on these walls was created or published before 1931 and is public domain in the United States; the 1930 season cleared in January 2026 under that rule. Each piece carries its source institution and locator, verified at acquisition. The rest of the J-class decade unlocks annually from January 2027 — the watch list is wired.</p>
      <p><strong>Marks.</strong> The historic Cup’s name and the great clubs’ burgees are held marks. They appear here only inside period artworks, as the historical documents they are — never as branding, and never in the Burgee commission, which the form itself refuses.</p>
      <p><strong>People.</strong> Victorian and Edwardian yachtsmen publish clean. Jazz Age figures with active estates carry a review flag, and the house honors it before any use beyond the historical record.</p>
      <p><strong>The named archives.</strong> The celebrated marine-photography firms’ archives are actively licensed. Their named work is sign-off-or-shelve; the house shelves it, and the 1930 wing runs on the anonymous press record instead.</p>
      <h2 style="font-size:1.5rem;margin:2.2rem 0 .8rem">The family</h2>
      <p>The Regatta is a wing of the family portfolio — smaller than The Paddock, higher on the AOV. Next door: Cartographer’s Dream (the chart), Painted Earth (your home water as a period chart), The Links (the other blazer).</p>
      <p style="margin-top:2rem"><a class="btn solid" href="${root}gallery/">Enter the gallery</a></p>
    </div>
  </div>
</section>`;
  return layout({ title: 'About & doctrine — The Regatta', desc: 'The house, the rights doctrine, the marks doctrine, and the family — museum-grade prints of the age of sail.', body, root, active: 'About' });
}

/* ---------- checkout / folio ---------- */
function checkoutPage() {
  const root = '../';
  const body = `
<section style="padding-top:9rem;min-height:70vh">
  <div class="wrap" style="max-width:820px">
    <div class="sec-head"><h2>The Folio</h2><span class="mono">Acquisition by enquiry</span></div>
    <hr class="rule">
    <div id="folio-list" class="ladder"></div>
    <p style="margin:2rem 0"><a class="btn solid" id="enquire" href="mailto:acquisitions@theregatta.gallery">Send the enquiry</a></p>
    <p style="font-size:.9rem;opacity:.7;max-width:56ch">The house replies within two tides with framing options, shipping (oversized statement marines travel first-class), and — for THE CLUBHOUSE trade tier — the program terms for yacht clubs, marinas, and coastal hotels.</p>
  </div>
</section>`;
  return layout({ title: 'The Folio — The Regatta', desc: 'Your selected pieces, ready for acquisition enquiry.', body, root });
}

/* ---------- emit ---------- */
rmSync(OUT, { recursive: true, force: true });
const put = (p, html) => { mkdirSync(join(OUT, p), { recursive: true }); writeFileSync(join(OUT, p, 'index.html'), html); };
mkdirSync(join(OUT, 'assets'), { recursive: true });
copyFileSync('assets/site.css', join(OUT, 'assets/site.css'));
copyFileSync('assets/site.js', join(OUT, 'assets/site.js'));
writeFileSync(join(OUT, '.nojekyll'), '');
writeFileSync(join(OUT, 'index.html'), indexPage());
put('gallery', galleryPage());
for (const slug of Object.keys(COLLECTIONS)) put(`collections/${slug}`, collectionPage(slug));
for (const p of catalog) put(`piece/${p.slug}`, piecePage(p));
put('the-burgee', burgeePage());
put('craft', craftPage());
put('about', aboutPage());
put('checkout', checkoutPage());
console.log(`Built ${catalog.length} pieces → ${OUT}/`);
