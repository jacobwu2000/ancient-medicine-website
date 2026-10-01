import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://jacobwu2000.github.io',
  integrations: [react(), mdx()],
  // Old URLs: the Hippocratic Corpus index pages were folded into /sources,
  // The Argument became Findings, the Site Archaeology dossiers were merged
  // into the Field Journal entries, Epigraphy moved out of Sources, and the
  // Arrival entry became the Field Journal's introduction.
  redirects: {
    '/sources/epigraphy': '/epigraphy',
    '/sources/epigraphy/[id]': '/epigraphy/[id]',
    '/field-journal/2026-07-12-arrival': '/field-journal',
    '/the-argument': '/findings',
    '/sources/site-archaeology': '/field-journal',
    '/sources/site-archaeology/messene': '/field-journal/2026-07-24-messene',
    '/sources/site-archaeology/epidauros': '/field-journal/2026-07-25-epidaurus',
    '/sources/site-archaeology/argos': '/field-journal/2026-07-26-argos',
    '/sources/site-archaeology/corinth': '/field-journal/2026-07-26-corinth',
    '/sources/site-archaeology/kos': '/field-journal/2026-07-29-kos',
    '/sources/site-archaeology/trikka': '/field-journal/2026-07-31-trikala',
    '/sources/site-archaeology/athens': '/field-journal/2026-08-02-athens',
    '/sources/hippocratic-corpus': '/sources#awp',
    '/sources/hippocratic-corpus/airs-waters-places': '/sources#awp',
    '/sources/hippocratic-corpus/epidemics': '/sources#epidemics',
  },
});
