// ============================================================================
// THE REGATTA — LAUNCH CATALOG v1 (operator seed — provenance copy, verbatim)
// Conventions: rights ship 'PENDING'; locators '[verify-at-acquisition]';
// publicityStatus on human-figure pieces; Cup/club marks per the
// historical-document doctrine; the named photography firm's archive is
// sign-off-or-shelve — the 1930 wing runs on anonymous press record.
// ============================================================================

export const regattaCatalog = [
  {
    slug: 'flying-cloud-lithograph',
    title: 'The Clipper Ship Flying Cloud (lithograph)',
    sail: { era: 'clipper', vessel: 'Flying Cloud', publicityStatus: 'clear', markStatus: 'dead' },
    story: {
      what: 'The fastest thing afloat under a full press of canvas — the clipper as the republic’s cathedral, printed for its parlors.',
      why: 'She ran to San Francisco in under ninety days twice; the lithograph is how a landlocked nation attended the race.',
      notice: 'The sea drawn TALLER than truth — speed, exaggerated honestly.',
      meaning: 'Commerce, when it was beautiful.',
    },
    collections: ['clippers'],
    source: { institution: 'Library of Congress / period lithographs', locator: '[verify-at-acquisition]' },
    rights: { status: 'PENDING', basis: 'PD-pre1931', clearedBy: '[registry]', clearedAt: '[pending]' },
    personalization: { eligible: false },
  },
  {
    slug: 'clipper-card-race-to-the-gold',
    title: 'A Clipper Sailing Card (California trade)',
    sail: { era: 'clipper', publicityStatus: 'clear', markStatus: 'dead' },
    story: {
      what: 'The sailing announcement as a small chromolith masterpiece — cargo space sold with a racehorse’s portrait.',
      why: 'The clipper cards are American advertising’s first jewel format; the gold rush, in miniature.',
      notice: 'The departure promised "on or about" — the sea’s fine print.',
      meaning: 'Every boom prints its own colors.',
    },
    collections: ['clippers'],
    source: { institution: 'period sailing cards via archives / house originals', locator: '[verify-at-acquisition]' },
    rights: { status: 'PENDING', basis: 'PD-pre1931', clearedBy: '[registry]', clearedAt: '[pending]' },
    personalization: { eligible: true, modes: ['title-swap'], slots: ['dedication'] },
  },
  {
    slug: 'schooner-of-1851-lithograph',
    title: 'The Schooner of 1851 (period lithograph)',
    sail: { era: 'victorian-cup', vessel: 'the 1851 schooner', publicityStatus: 'clear', markStatus: 'live' }, // Cup/club marks — historical-document doctrine
    story: {
      what: 'The low black schooner that crossed an ocean and beat a fleet — the boat the world’s oldest sporting trophy is named for.',
      why: 'One race off Cowes in 1851, and a century and a half of consequence; the lithographs carried the shock home.',
      notice: 'The raked masts the British protested and then copied.',
      meaning: 'Upsets travel by sail too.',
    },
    collections: ['first-cup'],
    source: { institution: 'period lithographs via family framework', locator: '[verify-at-acquisition]' },
    rights: { status: 'PENDING', basis: 'PD-pre1931', clearedBy: '[registry]', clearedAt: '[pending]' },
    personalization: { eligible: false },
  },
  {
    slug: 'victorian-cup-race-lithograph',
    title: 'The Cup Defended (Victorian race lithograph)',
    sail: { era: 'victorian-cup', publicityStatus: 'clear', markStatus: 'live' },
    story: {
      what: 'Defender and challenger rail-down in a crowded roadstead — the Victorian Cup as the print firms sold it to the parlor.',
      why: 'The Cup’s early defenses were mass spectacles; the lithographs are the era’s broadcast.',
      notice: 'The spectator fleet drawn as dense as the contenders — the audience, afloat.',
      meaning: 'A trophy is only as great as its crowd.',
    },
    collections: ['first-cup'],
    source: { institution: 'period lithographs via Library of Congress / archives', locator: '[verify-at-acquisition]' },
    rights: { status: 'PENDING', basis: 'PD-pre1931', clearedBy: '[registry]', clearedAt: '[pending]' },
    personalization: { eligible: false },
  },
  {
    slug: 'lane-luminist-harbor',
    title: 'Harbor at Evening (Fitz Henry Lane)',
    sail: { era: 'clipper', publicityStatus: 'clear' },
    story: {
      what: 'Glass water, held breath, the last light on furled canvas — Lane’s luminism at anchor.',
      why: 'The American marine at its most transcendent: not the race, the stillness after.',
      notice: 'The reflections truer than the vessels — the harbor doubled, and improved.',
      meaning: 'Every sailor’s favorite hour is the one at rest.',
    },
    collections: ['luminists'],
    source: { institution: 'open museum programs via family framework', locator: '[verify-at-acquisition]' },
    rights: { status: 'PENDING', basis: 'PD-pre1931', clearedBy: '[registry]', clearedAt: '[pending]' },
    personalization: { eligible: false },
  },
  {
    slug: 'jacobsen-ship-portrait',
    title: 'A Ship Portrait (Antonio Jacobsen)',
    sail: { era: 'edwardian', publicityStatus: 'clear' },
    story: {
      what: 'The vessel broadside in a running sea, colors flying — the harbor-portrait formula that owners lined up for.',
      why: 'Jacobsen painted thousands of them from a New Jersey parlor; the most prolific marine painter who ever worked, and the fleet’s family photographer.',
      notice: 'The flags always legible — the portrait’s whole point was the name.',
      meaning: 'Every ship deserved a sitting.',
    },
    collections: ['ship-portraits'],
    source: { institution: 'open museum programs / period holdings via family framework', locator: '[verify-at-acquisition]' },
    rights: { status: 'PENDING', basis: 'PD-pre1931', clearedBy: '[registry]', clearedAt: '[pending]' },
    personalization: { eligible: true, modes: ['title-swap'], slots: ['dedication'] }, // the boat-name plate funnel
  },
  {
    slug: 'edwardian-big-class-photograph',
    title: 'The Big Class at the Line (Edwardian photograph)',
    sail: { era: 'edwardian', publicityStatus: 'clear', markStatus: 'live' },
    story: {
      what: 'The great cutters crossing in company, canvas stacked to the clouds — the Edwardian season in anonymous press record.',
      why: 'The era when kings raced kings; the anonymous record publishes clean while the named archive stays sign-off-or-shelve.',
      notice: 'The crews at the rail like punctuation — commas holding a sentence of sail.',
      meaning: 'Grace, at industrial scale.',
    },
    collections: ['edwardian-racers'],
    source: { institution: 'anonymous period press photography via archives', locator: '[verify-at-acquisition]' },
    rights: { status: 'PENDING', basis: 'PD-pre1931', clearedBy: '[registry]', clearedAt: '[pending]' },
    personalization: { eligible: false },
  },
  {
    slug: 'first-j-class-summer-1930',
    title: 'The First J-Class Summer — 1930 (press record)',
    sail: { era: 'j-class-1930', publicityStatus: 'clear', markStatus: 'live' },
    story: {
      what: 'The great new cutters at the line, September 1930 — the Cup’s towering modern era opening off Newport, in the season’s own press plates.',
      why: 'Published 1930, public domain in the US as of January 2026 — the portfolio’s newest unlock afloat, sold as the history it is.',
      notice: 'The crews strung along booms longer than town lots — scale, casually stated.',
      meaning: 'Every golden age had a first gun.',
    },
    collections: ['1930-season'],
    source: { institution: 'anonymous 1930 press publications, per-piece verified', locator: '[verify-at-acquisition]' },
    rights: { status: 'PENDING', basis: 'PD-pre1931', clearedBy: '[registry]', clearedAt: '[pending]' },
    personalization: { eligible: false },
  },
  {
    slug: 'newport-1930-harbor-scene',
    title: 'Newport Harbor, Cup Summer 1930 (press record)',
    sail: { era: 'j-class-1930', publicityStatus: 'clear' },
    story: {
      what: 'The anchorage packed for the defense — launches, spectators, and the giants at their moorings, the season the Depression came to watch sailing.',
      why: 'The 1930 record’s quieter half: the harbor as society page, freshly cleared.',
      notice: 'The economy nowhere in frame — the summer’s deliberate amnesia.',
      meaning: 'Spectacle is a harbor at capacity.',
    },
    collections: ['1930-season'],
    source: { institution: 'anonymous 1930 press publications, per-piece verified', locator: '[verify-at-acquisition]' },
    rights: { status: 'PENDING', basis: 'PD-pre1931', clearedBy: '[registry]', clearedAt: '[pending]' },
    personalization: { eligible: false },
  },
  {
    slug: 'signal-flag-chart-plate',
    title: 'The Signal Flags (period chart plate)',
    sail: { era: 'victorian-cup', publicityStatus: 'clear' },
    story: {
      what: 'The alphabet in bunting — the international code as a period chart plate, the sea’s own typography.',
      why: 'The design system every burgee descends from — and the visual grammar THE BURGEE commission draws on, which the PDP says out loud.',
      notice: 'Meaning per flag printed beneath — a language you can hoist.',
      meaning: 'The sea spells slowly, and means it.',
    },
    collections: ['first-cup'],
    source: { institution: 'period signal charts via archives', locator: '[verify-at-acquisition]' },
    rights: { status: 'PENDING', basis: 'PD-pre1931', clearedBy: '[registry]', clearedAt: '[pending]' },
    personalization: { eligible: true, modes: ['title-swap'], slots: ['dedication', 'date-place'] }, // the commission funnel
  },
] as const;

export const regattaBackfill = [
  { title: 'Further clipper lithographs and sailing cards', collection: 'clippers' },
  { title: 'Further Victorian Cup defenses in period print', collection: 'first-cup' },
  { title: 'THE BURGEE — gallery exemplar signal (commission funnel)', collection: 'first-cup' },
  // SIGN-OFF-OR-SHELVE: the celebrated marine-photography firm's named archive (actively licensed).
  // REVIEW LANE: Jazz Age magnate figures with active estates.
  // WATCH LIST:
  { title: 'The J-class decade, 1931 onward', collection: '1930-season', unlocks: 'annually from January 2027' },
] as const;
