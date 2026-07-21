# THE REGATTA

Museum-grade prints of the age of sail, at leisure and at speed — the clipper lithographs,
the Cup's first century, the luminist marines, the ship portraits, closing at the newly
unlocked 1930 J-class season. One commission: THE BURGEE.

Static site, zero dependencies.

```bash
node merge.mjs   # data/sweep/*.json → data/catalog.json (dedupe + doctrine lint)
node build.mjs   # data/catalog.json → docs/ (GitHub Pages root)
```

- `BUILD-SPEC.md` — the SiteForge build spec and conviction declaration.
- `data/sweep/` — per-wing sourcing sweeps (verified public-domain works with live image URLs).
- `data/catalog.json` — the merged launch catalog.
- `docs/` — the built site (GitHub Pages serves this folder).

## Doctrine (short form)

Rights: pre-1931 gate, `PD-pre1931`, locators verified at acquisition; 1930 wing cleared
January 2026; J-class 1931+ on the watch list (annually from January 2027). Marks:
Cup/club marks inside period artworks only (historical-document doctrine); denylisted
everywhere else including the Burgee form. Publicity: status on every human-figure piece;
Jazz Age estates → review. Named marine-photography archives (Beken, Rosenfeld):
sign-off-or-shelve — the merge lint drops them.
