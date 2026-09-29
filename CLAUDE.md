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

## Current state (as of 2026-09-28)

- The scaffold, routing, schema and map all work.
- Field Journal: 9 entries with real prose, written as travelogue and site
  description. Photos are still `<PhotoPlaceholder>` slots.
- Epidemics constitution pages exist (`src/content/corpus/constitution-1.md`
  … `constitution-4.md`). Jones's translation is filled in (extracted by
  script, not yet checked against the printed Loeb). **Constitution 1 is
  annotated** (see "Author's annotations"): highlighting, key, synopsis, no
  title, and a Commentary placeholder ending "Bearing on *Airs, Waters,
  Places*". Constitutions 2–4 are not annotated yet: synopses and
  commentary are still placeholders (their `title` placeholders were
  dropped). The Epidemics index, like the AWP index, flags any page without
  a `highlightKey` as "[WIP]". See "Epidemics constitution pages" below.
- AWP pages exist for Airs (ch. 3–6), Waters (7–9) and Seasons (10–11), in
  `airs.md`, `waters.md` and `seasons.md`, filled in the same way. **Airs
  and Seasons are annotated** (see "Author's annotations" below): the
  author's highlighting and key, the author's synopsis, no title, and only a
  Candidate claims placeholder in the body. Waters is not annotated yet and
  still has the older placeholder sections, but no `title` placeholder. The
  AWP index flags any page without a `highlightKey` as "[WIP]", so the flag
  goes away by itself once a page is annotated.
- The author plans to annotate Waters and Constitutions 2–4 the same way.
  The claim list and the comparison itself haven't been started.
- Home page: framing text (hero, the two "strands" cards for texts and
  places, the "fieldwork is context, not evidence" note) was drafted by
  Claude from this file and has not yet been reviewed by the author. The
  itinerary excerpts are pulled automatically from the journal entries.
- The Argument (`src/pages/the-argument.mdx`) is scaffolded around the
  chosen direction: title, working-question box, table of contents, and one
  section per part of "What the finished project looks like" below. Every
  section body, including the Summary (which replaces the old home-page
  abstract), is still a placeholder.
- Almost everything else is `[PLACEHOLDER: ...]`: inscriptions,
  bibliography, About, section intros on the index pages, and site-dossier
  sections other than `<PersonalObservations>`.
- Map: no site links to a Hippocratic passage (`relatedHippocraticPassages`
  is empty everywhere). The old Kos → `epidemics-1` and Epidauros → `awp-1`
  links pointed at scaffold placeholders and were removed, because neither
  text is about those sites.

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
- **Fetching the text:** `python scripts/extract-jones.py epidemics BOOK.SECTION`
  (e.g. `1.2`) prints a constitution's chapters as YAML `passages:`, with
  Jones's footnotes and headings removed, plus the Loeb page range. Perseus's
  own XML endpoint blocks scripted requests, so the script reads from GitHub.
  The page ranges in the citations come from the TEI page breaks and are
  followed by a `[PLACEHOLDER: verify page range…]` until the author checks
  them.
- **Page structure:** chapters go in the `passages` field and render with
  `#ch-N` anchors. The unannotated pages still carry the original
  placeholder body: a Synopsis with fixed headings (Place; Seasons and
  weather; Diseases that followed; Who was affected; Causal and generalizing
  language; Surprises and exceptions) and a Commentary ending "Bearing on
  *Airs, Waters, Places*". When the author annotates a constitution,
  convert it to the annotated layout (see "Author's annotations"). The
  author chose the body for annotated constitutions (Constitution 1 is the
  model): drop the fixed Synopsis headings and keep "## Commentary" (a
  placeholder) with its "### Bearing on *Airs, Waters, Places*" subsection.
- Case-history pages go in the same collection with `kind: case`.

## AWP pages

- **Edition:** Jones's Loeb translation, English only: `Aer.` in Perseus
  `1999.01.0251`, and `tlg0627.tlg002.perseus-eng4.xml` on GitHub (CC BY-SA 4.0).
  AWP has no books; its chapters (1–24) are the XML's top-level sections.
- **Pages** (`kind: chapter-group`), each named for its topic:

  | Page | Chapters | Loeb pp. (from TEI, unverified) |
  |---|---|---|
  | Airs (`airs.md`) | 3–6 | 73–83 |
  | Waters (`waters.md`) | 7–9 | 83–99 |
  | Seasons (`seasons.md`) | 10–11 | 99–105 |

  Ch. 10–11 are called Seasons, not Places. In Jones they are about the
  seasons, and ch. 12 opens "So much for the changes of the seasons" before
  turning to Asia and Europe, the treatise's actual "places" material. These
  chapters are the main point of comparison with the constitutions. Ch. 1–2
  (introduction) and 12–24 are not covered yet.
- **Fetching the text:** `python scripts/extract-jones.py awp FIRST-LAST`
  (e.g. `3-6`).
- **Page structure:** unannotated pages (Waters) still carry the
  original placeholder body: a Synopsis with fixed headings (Conditions
  described; Predicted effects; Who is affected; Causal and generalizing
  language; Candidate claims) and a Commentary ending "Bearing on the
  *Epidemics* constitutions". Annotated pages (Airs, Seasons) use the layout in
  "Author's annotations". The body keeps only **Candidate claims**
  (condition → predicted tendency, firm or loose), which feeds the claim
  list.

## Author's annotations

The author highlights and bolds each page's text by category outside the
site, writes a short synopsis, and sends it as a PDF. Claude transfers
the annotations to the page. The current PDFs are named after the page
("Airs.docx.pdf", "Seasons.docx.pdf", "Constitution 1.docx.pdf", in the
author's Downloads); they replace the earlier "Ancient Medicine Project
(1)/(2).pdf". Airs (`airs.md`), Seasons (`seasons.md`) and Constitution 1
(`constitution-1.md`) are the models. Waters and Constitutions 2–4 will
presumably follow. The key can differ from page to page: Airs and
Constitution 1 are by body system, Seasons by weather "case".

- **Marks, not edited text.** Each passage keeps its extracted `text`
  untouched. The annotations go in that passage's `marks` list, one
  `{ category, text }` per highlighted or bolded span, with `text` copied
  exactly from the passage. The build fails if a mark's phrase isn't found
  exactly once in its paragraph, or if marks overlap. So re-check `marks`
  after re-extracting a text. If a highlighted phrase occurs more than once
  in its paragraph, add `occurrence: N` (1-based) rather than lengthening it
  past what the PDF marks (Seasons ch. 10, "If the summer prove dry").
- **Reading the PDF.** Don't transcribe from the page image: the author's PDFs
  are Google Docs exports, so the highlight rectangles, their colours and
  the text colours can be extracted exactly (e.g. with `pdfplumber`,
  installed into the scratchpad, not the project). Treat an unhighlighted
  space at a line wrap as part of the span; a gap at punctuation (", ", ". ")
  splits it into separate marks. Adjacent spans in different shades are
  separate marks too.
- **Key.** The page's `highlightKey` lists the categories in the PDF's order:
  `id`, the PDF's label, and `style` (`bold` or `highlight`). Where the
  PDF puts several swatches on one line (Seasons: "Case A: conditionals and
  prognoses"), give each entry the same `group` ("Case A") and the swatch's
  own word as `label`; the key then renders them on one line. Highlight
  colours are the `.hl--<id>` classes in `styles.css`, matched to the PDF.
  Airs's key: Conditions of the Air (bold); General Health Characteristics;
  Digestive & Dietary; Head, Brain & Nervous; Respiratory & Chest; Eye
  Conditions; Skin, Discharges & Other Bodily Afflictions; Reproductive
  Health. Constitution 1's key is the same except that its bold category is
  Season (`season`: the season names and phrases like "early in the
  spring"). Both use the same body-system `id`s and colours. Seasons's key: Cases A–F, each with conditionals (light shade,
  `case-x-cond`) and prognoses (darker shade, `case-x-prog`), in red,
  orange, yellow, green, blue, purple; then Dangerous Crisis Points
  (`crisis`). All colours in `styles.css` are the exact Google Docs hex
  values from the PDFs.
  A page with a different key needs any new `id`s added to `styles.css`:
  use the PDF's extracted colours, and ask the author only if they can't be
  read from the PDF. Don't invent a colour scheme.
- **Author's later corrections win over the PDF.** If the author asks for
  a mark to differ from their PDF, record it here and keep it on any
  re-transcription. (The one earlier case, Seasons ch. 10 "the summer cannot
  fail to be feverladen" as a Case B prognosis, is now in the current PDF
  itself, as one mark running on to "…ophthalmia and dysenteries".)
- **Shared categories.** Where a category means the same thing on an AWP
  page and a constitution, keep the same `id` and colour so the two can be
  read side by side.
- **Transcribe exactly what the PDF marks.** Don't add, extend, merge or
  "improve" highlights, and don't invent categories. If the PDF's text
  differs from Jones's (e.g. the author's "[epilepsy]" glosses after
  "sacred disease"), leave the gloss out of the mark and tell the author.
  Glosses belong in commentary, never inside the translation.
- **Synopsis.** The author's synopsis goes in the frontmatter `synopsis`
  field, word for word. It renders above the translation. Don't edit it
  into a different register, and don't replace it with a Claude draft.
  Paragraphs are separated by a blank line, and a single newline is a line
  break (used for Seasons's (A)–(F) list), so write prose paragraphs on one
  line rather than copying the PDF's wrapping. Text colour in the synopsis
  (Seasons colours its season names) can't be carried over; tell the
  author it was dropped.
- **Title.** Annotated pages drop the `title` placeholder. The heading is
  just the `label` (e.g. "Airs", no period). `title` is optional in the
  schema.
- **Body.** Delete the other placeholder sections and keep only the one
  that feeds the comparison: "Candidate claims" on AWP pages, "Commentary"
  with "Bearing on *Airs, Waters, Places*" on constitution pages.
- **Perseus links.** The layout adds a "Read on Perseus" link above each
  translation and, on AWP pages, a per-chapter Perseus link. All Perseus
  links open in a new tab. `sourceUrl` uses the URL-encoded form
  (`…Perseus%3Atext%3A1999.01.0251%3Atext%3DAer.%3Asection%3D3`;
  Constitution 1: `…%3Atext%3DEpid.%3Abook%3D1%3Achapter%3D1`).
  Per-chapter links for the Epidemics would need the reversed Perseus URL
  labels (see "Epidemics constitution pages").

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
   trip, and the visited sites are not where the Epidemics I/III texts are set.
   In Jones, Constitutions 1–3 all open "In Thasos"; Constitution 4's opening
   sentence names no place. Where the case histories are set (Thasos, Abdera,
   Larisa etc.) still needs checking in the Loeb.
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
AWP's discussion of seasons and irregular weather: ch. 10–11 in Jones (the
Seasons page). Where the two frameworks do and don't meet is itself a finding.

### Scope
- **All the Epidemics I/III constitutions** (4 in Jones's division), read in
  full in the Loeb (Jones). For each one, note: place, the sequence of seasons and
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
  on (so far Airs 3–6, Waters 7–9, Seasons 10–11), each annotated by the
  author (see "Author's annotations"). Each page's "Candidate claims"
  section collects claims for the list. The claim list itself could
  be a single page or table.
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
- Only link a map site to a Hippocratic passage (`relatedHippocraticPassages`)
  if the text actually concerns that place. Don't add links just to
  connect the fieldwork to the texts.
- Translations on corpus pages come from `scripts/extract-jones.py`, copied
  word for word from the Perseus TEI. Never type, paraphrase or "fix" them by
  hand. If the printed Loeb differs, the author makes that correction.
- Chapter labels follow the text, not the treatise's title. For example,
  AWP 10–11 is "Seasons" because that is what those chapters discuss. Check
  what a chapter range actually covers before naming a page.
- Git: commit or push only when asked. Don't add a `Co-Authored-By: Claude`
  line (or any other Claude attribution) to commit messages. Before
  committing, check `git status`/`git log`: the author sometimes commits from
  another session at the same time, and changes already staged can end up in
  their commit.
