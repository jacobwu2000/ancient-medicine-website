# CLAUDE.md — Ancient Medicine & Healing site

Reference for future sessions: what this site is for, what the research
project is (and isn't), and how to work on it. Technical structure, stack and
"where to edit" rules are in [README.md](README.md). Read that too; this file
doesn't repeat it.

## What the site is

A digital-humanities research notebook (Astro + MDX + a React/Leaflet map)
documenting one month of summer 2026 fieldwork at Asclepieia and related
healing sites in Greece, read alongside the Hippocratic Corpus and the
epigraphic record of dream healing.

- **Fieldwork is finished.** The trip ran 12 July – 2 August 2026: Paideia's
  *Living Greek in Greece* program, then independent visits to Messene →
  Epidauros → Argos → Corinth → Crete → Kos → Trikala/Trikka → Athens.
- **Framing:** "a working research notebook rather than a finished argument."
  The site title is *Word and Ritual in Greek Sanctuaries*. The map has two
  lenses: `hippocratic` (environmental-empirical medicine) and `cult-healing`
  (incubation / iamata).
- **Author:** an undergraduate working alone, with intermediate Ancient Greek.
  The site has to show (1) real proof of fieldwork and (2) research that is
  small but real and defensible.

## Current state (as of 2026-09-27)

- The scaffold, routing, schema and map all work.
- Field Journal: 9 entries with real prose, written as travelogue and site
  description. Photos are still `<PhotoPlaceholder>` slots.
- Epidemics constitution pages exist (`src/content/corpus/constitution-1.md`
  … `constitution-4.md`). Jones's translation is filled in (extracted by
  script, not yet checked against the printed Loeb). Titles, synopses and
  commentary are still placeholders. See "Epidemics constitution pages" below.
- Almost everything else is `[PLACEHOLDER: ...]`: corpus entries (AWP §1–2),
  inscriptions, bibliography, The Argument, About, the home abstract, and
  site-dossier sections other than `<PersonalObservations>`.

## Epidemics constitution pages

- **Edition:** W. H. S. Jones's Loeb translation (*Hippocrates* Vol. I, 1923),
  English only. Don't use the Adams translation, which is Perseus's default
  (`1999.01.0248`). Jones is `1999.01.0251` on Perseus and
  `tlg0627.tlg006.perseus-eng4.xml` in GitHub `PerseusDL/canonical-greekLit`.
  That XML is licensed CC BY-SA 4.0, and each page's citation says so.
- **Labeling:** Constitutions are numbered 1–4 across both books; this is the
  site's own shorthand. Chapter numbers are Jones's, exactly as in the Perseus
  XML:

  | Page | Reference | Jones heading | TEI section | Loeb pp. (from TEI, unverified) |
  |---|---|---|---|---|
  | Constitution 1 | Epid. I 1–3 | First Constitution | 1.1 | 147–153 |
  | Constitution 2 | Epid. I 4–12 | Second Constitution | 1.2 | 153–165 |
  | Constitution 3 | Epid. I 13–26 | Third Constitution | 1.3 | 165–185 |
  | Constitution 4 | Epid. III 2–16 | Constitution | 3.2 | 239–257 |

  In Book III, section 1 is the 12 cases, so the constitution starts at ch. 2.
  Its ch. 16 is a methodological remark, kept because Jones places it in the
  section. The Perseus reader's URL labels are the reverse of the XML's
  ("chapter" = constitution, "section" = Jones chapter).
- **Fetching the text:** `python scripts/extract-constitution.py BOOK SECTION`
  prints a constitution's chapters as YAML `passages:`, with Jones's footnotes
  and headings removed, plus the Loeb page range. Perseus's own XML endpoint
  blocks scripted requests, so the script reads from GitHub.
- **Page structure:** chapters go in the `passages` field and render with
  `#ch-N` anchors. The body has a Synopsis with fixed headings (Place;
  Seasons and weather; Diseases that followed; Who was affected; Causal and
  generalizing language; Surprises and exceptions) and a Commentary that ends
  with "Bearing on *Airs, Waters, Places*". Each synopsis point should cite
  a chapter (`[5](#ch-5)`). Any synopsis Claude drafts must be labeled as a
  draft for the author to verify.
- Case-history pages go in the same collection with `kind: case`.

## Research project: history and chosen direction

### What was dropped
The original plan ("Research Workflow: Case Histories, Constitutions, and
Environmental Theory in Epidemics I & III / Airs, Waters, Places") asked
whether Epidemics case histories are *evidence for* or *illustrations of*
AWP's environmental theory. It called for coding 15–18 cases plus all the
constitutions in a spreadsheet, extracting an AWP claim list, tallying
correspondences, and adding a Prognostic comparandum. It was judged too large
for one person, and it is shaped like a paper, not a website companion.
**Don't bring back the full coding/spreadsheet workflow.**

### Options considered
1. *Site-anchored micro-study* (test AWP against observed wind/water at the
   visited sites). **Rejected.** No such observations were recorded during the
   trip, and the visited sites are not where the Epidemics I/III texts are set
   (as far as the author knows those are mostly Thasos, Abdera and Larisa;
   verify against the Loeb).
2. *AWP as a field checklist.* **Rejected** for the same reason: it needed to
   be done on site, in real time.
3. *Iamata vs. case histories, a genre comparison.* **Optional secondary
   thread** (see below).
4. *Constitutions only, with cases as illustration.* **Chosen as the core.**

### Core question (working)
> Read closely against *Airs, Waters, Places*, do the constitutions
> (*katastaseis*) of Epidemics I and III look like AWP's environmental theory
> *applied* to one place over time, or like the raw observation that such a
> theory could have been built from? And how do a few case histories sit
> inside the constitutions they belong to?

This keeps the original "evidence for vs. illustration of" question but asks
it of the constitutions, which are few enough to cover in full. It is a close
reading, not a coded dataset. The answer is a hedged judgment ("leans toward
X"), not a verdict.

A likely line of analysis (a lead to test, not a conclusion): the
constitutions track *changing weather at one place over several seasons*,
while most of AWP compares *fixed features of different places* (orientation
to winds, water sources, terrain). So the real overlap may sit mainly in
AWP's discussion of seasons and irregular weather (check which chapters in
the Loeb). Where the two frameworks do and don't meet is itself a finding.

### Scope
- **All the Epidemics I/III constitutions** (about 4), read in full in the
  Loeb (Jones). For each one, note: place, the sequence of seasons and
  weather, the diseases that followed, who was affected, any causal or
  generalizing language ("such constitutions...", "most", "especially"), and
  anything the author flags as surprising.
- **An AWP claim list of about 8–12 claims**, written as *condition →
  predicted tendency* in AWP's own comparative language. Mark each as a firm
  causal claim or a looser correlation. Prioritize the claims about seasons
  and weather, because those are the ones the constitutions can actually be
  compared with.
- **3–4 case histories** used as illustrations, not coded. Pick ones clearly
  tied to a constitution (same place and period) that either fit its picture
  or cut against it (for example, an unexpected death).
- **Comparison, qualitative only:** for each constitution, which AWP claims
  it matches, contradicts, or has nothing to say about, with quoted phrases.
  No tallies or statistics.
- **Optional, light:** the Loeb introduction's remark that the case histories
  resemble *Prognostic*'s method more than the constitutions do. Engage it in
  a paragraph and don't build a separate dataset.
- Greek is limited to spot-checking a handful of key terms (e.g.
  *katastasis*, the wind and season terms) via Perseus/LSJ. All extraction
  is done from English translations.

### Optional secondary thread: cult healing
If time allows, contrast one constitution/case with 2–3 Epidauros iamata
(IG IV² 1, 121–124; LiDonnici's edition) on what each treats as the cause of
illness and what counts as proof: environment and regimen vs. the god. This
ties the textual core to the site's "Word and Ritual" framing and to the
`cult-healing` map layer. It stays short and must not grow into a second
project.

### Where fieldwork fits
The fieldwork provides **context and setting**. It is not data for the
constitutions argument, and the site should say so plainly rather than
overclaim. Its roles:
- **Kos:** the traditional home of the Hippocratic tradition. The Asclepieion
  terraces and the plane tree show how the physicians' tradition and cult
  healing shared one place.
- **The Asclepieia (Epidauros, Athens, Messene, Corinth, Argos, Trikka):** the
  "other" model of healing that the Hippocratic environmental approach sits
  alongside.
- **NAM Athens:** medical instruments, the material side of the physicians'
  practice.
- Photos and `<PersonalObservations>` count as proof of fieldwork.
  Observations written up after the trip should be labeled as retrospective.

The places the constitutions describe (Thasos etc.) were not visited. They
could still go on the map as `hippocratic`-layer, text-only sites, if the
map/dossier gets a clear "not visited" marker. That needs a small schema and
component change, so discuss it before doing it.

### What the finished project looks like on the site
- **The Argument:** the question, method (sample and reading rules), findings
  constitution by constitution, a hedged judgment on evidence vs.
  illustration, and limitations (small corpus, translation-based,
  retrospective diagnosis avoided).
- **Hippocratic Corpus → Epidemics:** one page per constitution, plus pages
  for the 3–4 illustrative cases. Each has its translation (with source
  cited), commentary, and links to the AWP claims it bears on.
- **Hippocratic Corpus → AWP:** pages for the chapters the claim list draws
  on. The claim list itself could be a single page or table.
- **Site dossiers and Journal:** real photos and personal observations that
  keep the fieldwork visible.
- **Bibliography:** real citations.
- A side-by-side comparison page (constitution vs. AWP claims) is a likely
  addition.

### Key sources
- Loeb *Hippocrates* Vol. I (W. H. S. Jones): Epid. I & III, AWP, Prognostic,
  plus the introduction (cite its Prognostic comment directly).
- V. Nutton, "The Epidemics: organising information on communal diseases," in
  Nutton & Totelin (2020). The most load-bearing source for the
  constitutions.
- J. Z. Wee, "Case History as Minority Report in the Hippocratic
  *Epidemics* 1" (2016): on how the cases relate to the constitutions.
- J. Jouanna, *Hippocrates* (1999): AWP dating and context.
- R. Thomas, *Herodotus in Context* (2000), ch. 3: AWP as tendency-based, not
  strictly deterministic.
- M. Grmek, *Diseases in the Ancient Greek World* (1989): caution on
  retrospective diagnosis.
- For the optional iamata thread: L. R. LiDonnici, *The Epidaurian Miracle
  Inscriptions* (1995); E. J. and L. Edelstein, *Asclepius* (1945).

## Rules for Claude when working on this repo

- **Never fabricate scholarly content.** That means Greek text, translations,
  inscription numbers, citations, page references, dates, or field
  observations. If a real value isn't available, leave the `[PLACEHOLDER: ...]`
  in place or ask. Mark anything drawn from general knowledge that the author
  should check against a source.
- Keep the `[PLACEHOLDER: ...]` convention for unfinished content so gaps
  stay easy to grep for.
- Keep the author's own voice in Field Journal and `<PersonalObservations>`
  prose: first person, informal. Edit lightly and don't rewrite it into
  academic register.
- Claims should be hedged and sized to the sample. "The evidence leans
  toward X" is the target, not a definitive verdict.
- Don't expand scope back toward the original workflow: no full-corpus
  extraction, no statistics, no attempts to settle disputed disease
  identifications.
- Information architecture: journal entries link *out* to Sources via
  `relatedSources`, and Sources pages never link back in. Site
  geo/cross-reference data lives only in `src/data/sites.json`.
