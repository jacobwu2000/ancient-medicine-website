# Ancient Medicine & Healing — project scaffold

Scholarly digital humanities site documenting summer fieldwork in Greece
(Epidauros, Kos, Trikka) on ancient medicine and healing, combined with
textual research on the Hippocratic Corpus (*Airs, Waters, Places*,
*Epidemics*) and epigraphic research on the Epidaurian iamata.

This is a **skeleton**: routing, navigation, data schema, content templates,
and a working interactive map prototype. All scholarly content — Greek text,
translations, commentary, citations — is `[PLACEHOLDER: ...]` text, to be
replaced with real research.

## Stack

Astro (content collections + static output) · React island for the map ·
Leaflet / react-leaflet · MDX · JSON data files. No CSS framework — the
design system is a single hand-written `src/styles.css`.

## Quick start

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## Structure

```
src/
  content/                  ← content collections (edit prose here)
    config.ts                 schema for both collections below
    corpus/                    Hippocratic Corpus sections (AWP + Epidemics)
    journal/                   Field Journal entries (9, covering the 2026
                                fieldwork trip end to end)

  data/                      ← structured data (edit here, not in components)
    sites.json                 canonical site geo/identity for the map,
                                incl. each site's Field Journal entry (`journal`)
    inscriptions.json          epigraphy catalogue — powers BOTH the
                                Epigraphy pages and the map popups
    bibliography.json          primary/secondary source list

  components/
    SiteMap.jsx                the interactive map (React + Leaflet island)
    RelatedSources.astro       "Related Sources" list on journal entries
    PhotoPlaceholder.astro     reserved, auto-numbered image slot ("Fig. N —
                                caption") — drop into any .mdx entry where a
                                photo should eventually go

  layouts/
    BaseLayout.astro           shell: head, grouped nav (current page
                                highlighted), footer
    ScholarlyLayout.astro      wraps BaseLayout mode="scholarly" (teal)
    JournalLayout.astro        wraps BaseLayout mode="journal" (terracotta)
    CorpusEntryLayout.astro    Greek/translation/commentary layout, shared
                                by AWP and Epidemics section pages

  pages/                     ← routing + thin data-fetching glue (avoid
                                touching unless you're changing behavior)
    index.astro                Home
    findings.mdx               Findings (long-form MDX)
    map.astro                  Interactive Map
    sources/
      index.astro                 Sources landing: lists every Hippocratic
                                   Corpus text page (AWP + Epidemics) directly
      hippocratic-corpus/          (no index pages; old index URLs redirect
                                    to /sources via astro.config.mjs)
        airs-waters-places/[slug].astro
        epidemics/[slug].astro
      epigraphy/{index,[id]}.astro
    field-journal/{index,[...slug]}.astro
    bibliography.astro
    about.astro

  utils/journal.js           date formatting + auto-excerpts for the
                                journal itinerary cards (home, journal index)

  styles.css                 ← the whole design system (palette, type, layout)
```

## Where to add real content vs. where not to touch code

**Add content here:**
- `src/content/corpus/*.md` — one file per Hippocratic Corpus section. Add a
  new section by copying an existing file and bumping `sectionNumber`/`order`.
  Short sections use `greekText` + `translation`; `greekText` is optional
  (the Greek column disappears without it). The Epidemics constitutions
  (`constitution-1.md`…`constitution-4.md`, Jones's translation) use
  `passages` instead: one item per Jones chapter, rendered with `#ch-N`
  anchors, and so do the AWP chapter groups (`airs.md`, `waters.md`,
  `seasons.md`). The labeling schemes are explained on the Sources page,
  which lists every corpus page. `scripts/extract-jones.py` prints Jones's chapters as
  ready-to-paste YAML from the Perseus TEI (needs Python 3.7+ and internet).
  Case-history pages go in the same collection with `kind: case`.
- `src/content/journal/*.mdx` — one Field Journal entry per file, filename
  `YYYY-MM-DD-slug.mdx` (`.mdx` so `<PhotoPlaceholder>` can be dropped in
  wherever a picture will eventually go). List cross-links to Sources pages
  in `relatedSources`. Not every stop has a corresponding Sources page (e.g.
  Crete) — leave `relatedSources: []` for those.
- `src/data/sites.json`, `src/data/inscriptions.json`,
  `src/data/bibliography.json` — structured records.
- `findings.mdx`, `about.astro`, `bibliography.astro` — page-level prose.
  Bibliography citations are plain text; `*italics*` and bare URLs are
  rendered as italics and links.

**Avoid editing unless changing behavior:** anything in `src/layouts/`,
`src/components/`, and the `[slug].astro` / `[id].astro` route files under
`src/pages/sources/**` and `src/pages/field-journal/` — these just fetch
content/data and hand it to a layout; the schema files above are the actual
editing surface.

## How to add a new site to the map

1. Add an entry to `src/data/sites.json`:
   ```json
   {
     "id": "newsite",
     "name": "New Site",
     "lat": 38.123,
     "lng": 23.456,
     "shortDescription": "[PLACEHOLDER: short summary]",
     "layers": ["cult-healing"],
     "relatedInscriptions": ["some-inscr-id"],
     "relatedHippocraticPassages": ["awp-1"],
     "journal": "/field-journal/YYYY-MM-DD-newsite"
   }
   ```
   `layers` accepts `"hippocratic"`, `"cult-healing"`, or both — this is what
   the map's layer toggle filters on.
   `journal` is the site's Field Journal entry; the map popup links to it.
2. Add any new inscription records to `src/data/inscriptions.json`
   (`siteId: "newsite"`).

No component code needs to change — `SiteMap.jsx` reads `sites.json`
directly.

## Design notes

- Typography: Source Serif 4 for body/headings and Greek text (tagged
  `lang="grc"`), Inter for UI chrome (nav, labels, captions).
- Palette: parchment background, ink text, teal accent for the scholarly
  apparatus, terracotta accent for the Field Journal — set via
  `body[data-mode]` in `styles.css`, driven by the `mode` prop on
  `BaseLayout`/`ScholarlyLayout`/`JournalLayout`. The accent shows as a
  stripe on top of the header and on the current nav item.
- The nav is grouped by the project's two strands: research (Findings,
  Sources, Bibliography) and fieldwork (Field Journal, Map).
- The home page explains the project as two strands (texts / places) and
  lists the journal entries as an itinerary; excerpts are pulled
  automatically from each entry's first paragraph.
- The map's layer toggle is a custom control bar above the map (not
  Leaflet's built-in corner control), since it's the site's core scholarly
  contribution and needs to stay visible.
