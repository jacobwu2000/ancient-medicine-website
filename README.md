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
    config.ts                 schema for all three collections below
    corpus/                    Hippocratic Corpus sections (AWP + Epidemics)
    site-archaeology/          per-site dossiers (Messene, Epidauros, Argos,
                                Corinth, Kos, Trikka, Athens)
    journal/                   Field Journal entries (9, covering the 2026
                                fieldwork trip end to end)

  data/                      ← structured data (edit here, not in components)
    sites.json                 canonical site geo/identity — powers BOTH the
                                map and the site-archaeology "quick facts"
    inscriptions.json          epigraphy catalogue — powers BOTH the
                                Epigraphy pages and the map popups
    bibliography.json          primary/secondary source list

  components/
    SiteMap.jsx                the interactive map (React + Leaflet island)
    PersonalObservations.astro wrapper used inside site-archaeology .mdx
    RelatedSources.astro       "Related Sources" list on journal entries
    PhotoPlaceholder.astro     reserved, auto-numbered image slot ("Fig. N —
                                caption") — drop into any .mdx entry where a
                                photo should eventually go

  layouts/
    BaseLayout.astro           shell: head, nav, footer, mode badge
    ScholarlyLayout.astro      wraps BaseLayout mode="scholarly" (teal)
    JournalLayout.astro        wraps BaseLayout mode="journal" (terracotta)
    CorpusEntryLayout.astro    Greek/translation/commentary layout, shared
                                by AWP and Epidemics section pages

  pages/                     ← routing + thin data-fetching glue (avoid
                                touching unless you're changing behavior)
    index.astro                Home
    the-argument.mdx           The Argument (long-form MDX)
    map.astro                  Interactive Map
    sources/
      index.astro                 Sources landing
      hippocratic-corpus/
        index.astro
        airs-waters-places/{index,[slug]}.astro
        epidemics/{index,[slug]}.astro
      epigraphy/{index,[id]}.astro
      site-archaeology/{index,[slug]}.astro
    field-journal/{index,[...slug]}.astro
    bibliography.astro
    about.astro

  styles.css                 ← the whole design system (palette, type, layout)
```

## Where to add real content vs. where not to touch code

**Add content here:**
- `src/content/corpus/*.md` — one file per Hippocratic Corpus section. Add a
  new section by copying an existing file and bumping `sectionNumber`/`order`.
- `src/content/site-archaeology/*.mdx` — one dossier per site. The
  `<PersonalObservations>` block is the only component reference needed;
  everything else is plain Markdown headings.
- `src/content/journal/*.mdx` — one Field Journal entry per file, filename
  `YYYY-MM-DD-slug.mdx` (`.mdx` so `<PhotoPlaceholder>` can be dropped in
  wherever a picture will eventually go). List cross-links to Sources pages
  in `relatedSources`. Not every stop has a corresponding Sources page (e.g.
  Crete) — leave `relatedSources: []` for those.
- `src/data/sites.json`, `src/data/inscriptions.json`,
  `src/data/bibliography.json` — structured records.
- `the-argument.mdx`, `about.astro`, `bibliography.astro` — page-level prose.

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
     "dossier": "/sources/site-archaeology/newsite"
   }
   ```
   `layers` accepts `"hippocratic"`, `"cult-healing"`, or both — this is what
   the map's layer toggle filters on.
2. Add `src/content/site-archaeology/newsite.mdx` (copy an existing dossier).
3. Add any new inscription records to `src/data/inscriptions.json`
   (`siteId: "newsite"`).

No component code needs to change — `SiteMap.jsx` and the site-archaeology
routes read `sites.json` directly.

## Design notes

- Typography: Source Serif 4 for body/headings and Greek text (tagged
  `lang="grc"`), Inter for UI chrome (nav, labels, captions).
- Palette: parchment background, ink text, teal accent for the scholarly
  apparatus, terracotta accent for the Field Journal — set via
  `body[data-mode]` in `styles.css`, driven by the `mode` prop on
  `BaseLayout`/`ScholarlyLayout`/`JournalLayout`.
- The map's layer toggle is a custom control bar above the map (not
  Leaflet's built-in corner control), since it's the site's core scholarly
  contribution and needs to stay visible.
