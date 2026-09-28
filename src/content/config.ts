import { defineCollection, z } from 'astro:content';

// Hippocratic Corpus — one entry per section/chapter, close-reading format.
// Greek text and translation live in frontmatter so the layout can render
// them in a fixed, consistent block regardless of collection (AWP vs Epidemics);
// the markdown body is reserved for prose commentary (and, on Epidemics
// constitution pages, the synopsis).
//
// Short passages use the single `translation` string. Long passages (the
// Epidemics constitutions) use `passages` instead: one item per chapter,
// numbered as in Jones's Loeb / the Perseus TEI, so the synopsis can cite
// and link to individual chapters (#ch-N).
const corpus = defineCollection({
  type: 'content',
  schema: z
    .object({
      work: z.enum(['awp', 'epidemics']),
      workTitle: z.string(),
      sectionNumber: z.string(),
      // Optional: without it the heading is just the label (e.g. "Airs").
      title: z.string().optional(),
      order: z.number(),
      // Epidemics: constitution vs. illustrative case history.
      // AWP: `chapter-group`, a run of chapters read together (e.g. Airs, 3–6).
      kind: z.enum(['constitution', 'case', 'chapter-group']).optional(),
      // Display label, e.g. "Constitution 1" (see epidemics/index.astro for
      // the labeling scheme). Falls back to "§sectionNumber" when absent.
      label: z.string().optional(),
      // Standard reference, e.g. "Epid. I 1–3".
      reference: z.string().optional(),
      // Short prose synopsis shown above the translation. Paragraphs
      // separated by a blank line; a single newline is a line break.
      synopsis: z.string().optional(),
      greekText: z.string().optional(),
      translation: z.string().optional(),
      passages: z
        .array(
          z.object({
            chapter: z.string(),
            // Paragraphs separated by a blank line.
            text: z.string(),
            // Author's highlighting/bolding, kept apart from `text` so the
            // translation stays exactly as extracted. Each `text` must occur
            // exactly once in its paragraph, or the build fails, unless
            // `occurrence` (1-based) says which of several matches is meant.
            marks: z
              .array(
                z.object({
                  text: z.string(),
                  category: z.string(),
                  occurrence: z.number().int().positive().optional(),
                })
              )
              .optional(),
          })
        )
        .optional(),
      // Key for the `marks` on this page's passages. `style: bold` renders
      // as bold text; `highlight` as a coloured highlight (.hl--<id>).
      // Consecutive entries sharing a `group` share one line of the key,
      // e.g. "Case A: conditionals and prognoses".
      highlightKey: z
        .array(
          z.object({
            id: z.string(),
            label: z.string(),
            group: z.string().optional(),
            style: z.enum(['bold', 'highlight']).default('highlight'),
          })
        )
        .optional(),
      citation: z.string().optional(),
      sourceUrl: z.string().url().optional(),
    })
    .refine((d) => d.translation || d.passages?.length, {
      message: 'Provide either `translation` or `passages`.',
    }),
});

// Site Archaeology dossiers. Geographic / cross-reference data (lat/lng,
// related inscriptions, related passages) stays in src/data/sites.json so
// it is not duplicated between the map and these text pages — this
// collection only holds the long-form dossier prose, keyed by siteId.
const site_archaeology = defineCollection({
  type: 'content',
  schema: z.object({
    siteId: z.string(),
    title: z.string(),
    order: z.number().optional().default(99),
  }),
});

// Field Journal — reverse-chronological travel narrative. Journal entries
// link OUT to Sources pages via relatedSources; Sources pages never link
// back in, per the project's information architecture.
const journal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    location: z.string().optional(),
    relatedSources: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        })
      )
      .default([]),
  }),
});

export const collections = { corpus, 'site-archaeology': site_archaeology, journal };
