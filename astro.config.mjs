import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://jacobwu2000.github.io',
  integrations: [react(), mdx()],
});
