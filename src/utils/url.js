// The site is served from a subpath on GitHub Pages
// (jacobwu2000.github.io/ancient-medicine-website/), set as `base` in
// astro.config.mjs. Internal links are written root-relative ("/map") and
// passed through url() so they get that prefix.

export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path) => (path.startsWith('/') && !path.startsWith('//') ? base + path : path);
