import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://jacobwu2000.github.io',
  integrations: [react(), mdx()],
  // The Hippocratic Corpus index pages were folded into /sources.
  redirects: {
    '/sources/hippocratic-corpus': '/sources#awp',
    '/sources/hippocratic-corpus/airs-waters-places': '/sources#awp',
    '/sources/hippocratic-corpus/epidemics': '/sources#epidemics',
  },
});
