import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

const base = '/ancient-medicine-website';

// Prefixes root-relative links in Markdown/MDX content ("[x](/map)") with
// `base`, so content files keep plain site paths.
function rehypeBaseLinks() {
  const walk = (node) => {
    const href = node.properties?.href;
    if (node.tagName === 'a' && typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
      node.properties.href = base + href;
    }
    node.children?.forEach(walk);
  };
  return walk;
}

export default defineConfig({
  site: 'https://jacobwu2000.github.io',
  base,
  markdown: { rehypePlugins: [rehypeBaseLinks] },
  integrations: [react(), mdx()],
});
