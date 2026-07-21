# THE REGATTA — Build Spec (SiteForge)

**Reference DNA:** louisvuitton.com — structure only, never identity. Sticky hairline header
with centered wordmark; full-bleed editorial hero; horizontal collection rails with peek;
alternating editorial chapters; oversized restrained type; near-zero radius; dense quiet footer.

**Job:** sell museum-grade prints of the age of sail at high AOV. One conversion goal per
page: PDP → "Add to the Folio" (enquiry-based acquisition).

## Conviction declaration

CONVICTION: **The chart table at dawn** — every surface is chart paper or varnish-dark
water; every rule is a hairline plotted line; brass is spent like position fixes; signal-flag
color appears only as small functional signals, never decoration.

- Carrier techniques: **editorial-in-utility (8)** + **tactile texture (3)** (paper grain,
  hairline chart rules, mono chart annotations). Deliberately excluded: **WebGL atmosphere (2)**
  — the artworks carry the atmosphere; a shader would compete with Lane.
- Verification: every visual decision traces to chart-table or dawn-harbor language; QA flags
  anything from another conviction (no glassmorphism, no gradients-as-decoration, no neon).

## Palette (roles → hexes)

| role | hex | use |
|---|---|---|
| ground | `#F7F3EA` | chart paper |
| ink | `#14232E` | varnish-dark navy |
| night | `#081820` | dawn-harbor chapters (dark sections) |
| night-ink | `#E9E2D2` | text on night |
| accent | `#A07C3F` | brass — CTAs, fixes, prices |
| signal | `#A93226` / `#1F4E79` | signal-flag red/blue, tiny functional accents only |

Type: **Fraunces** (display, opsz) / **Hanken Grotesk** (text) / **IBM Plex Mono** (chart
annotations, labels, prices). Scale 1.25.

## Sections (index — "The Start Line")

1. CH. I — DAWN HARBOR: night hero, full-bleed masterwork, scroll-linked Ken Burns, wordmark low-left
2. CH. II — THE GUN: the 1930 unlock feature ("just opened January 2026")
3. CH. III — THE WEATHER MARK: seven collection rails (horizontal scroll, LV-style peek)
4. Featured pieces grid (column-stagger entrance)
5. THE BURGEE commission block (chart-plate ornament, honesty rule)
6. Craft teaser ("Canvas and Stone") · About/doctrine · footer

Signature element: **the signal-hoist progress rail** — a fixed rail of signal-flag glyphs
that hoist with document scroll.

## Motion (≥3, both classes — routes through motion discipline)

REVEAL: #2 scroll-triggered reveal · #5 staggered grid entrance · #12 line wipe (chart rules).
TRANSFORM: #1 hero parallax · #6 scroll-linked Ken Burns (hero artwork) · #8 signal-hoist
progress rail (scrubbed by document scroll). transform/opacity only; IO + rAF, CSS
scroll-timeline where supported; `prefers-reduced-motion` → still page, full content.

## Visual assets

The artworks ARE the imagery — verified public-domain museum images (LOC / Met / NGA /
Rijksmuseum / Wikimedia Commons), hotlinked from institutional CDNs, per-piece verified 200 +
image/*. Burgee ornament: Claude-authored original SVG (generated per visitor input — the
Armorial honesty rule). No stock, no placeholders.

## Doctrine gates (acceptance)

- Rights ship `PENDING`, basis `PD-pre1931`, locators verify-at-acquisition; 1930 wing
  anonymous press record only; **no Beken of Cowes / Rosenfeld named-archive material**
  (sign-off-or-shelve).
- `publicityStatus` on 100% of human-figure pieces; Jazz Age magnates with active estates → `review`.
- Marks: Cup/club marks inside artworks only (historical-document doctrine); denylist
  everywhere else incl. Burgee input lint (no real club names/burgees enterable).
- Watch list wired: J-class 1931+ unlocks annually from January 2027.
- Burgee honesty rule renders on-page.
- Quality floor: responsive to 360px, visible focus states, reduced-motion parity, deep-zoom
  on every PDP, LCP ≤ 2.5s (hero preloaded, everything below lazy), CLS ≤ 0.02 (aspect-ratio
  boxes on all images).

## Commerce

Ladder (two-track, rev 2026-07-20): aspirational atelier POD (Prodigi/Printful, priced at
2× the Painted Whiskers giclée card) — Tender 12×16″ **$98** · Cutter 18×24″ **$198** ·
Sloop 24×36″ **$358**; bespoke local master printer & framer — Saloon 30×40″ **$5,400** ·
Clubhouse 45×60″ **$9,800**. THE FLEET (three matched, Saloon scale) **$13,500**. THE CLUBHOUSE
trade program (clubs, marinas, coastal hotels). THE BURGEE commission from **$1,400**, free
preview. Acquisition by enquiry (Folio → enquiry), no payment rails at launch.
