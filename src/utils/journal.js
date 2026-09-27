// Helpers shared by the home page itinerary and the Field Journal index.

export const formatDate = (date, month = 'long') =>
  date.toLocaleDateString('en-US', { year: 'numeric', month, day: 'numeric', timeZone: 'UTC' });

export const stopNumber = (n) => String(n).padStart(2, '0');

// First prose paragraph of an entry's MDX body, stripped of Markdown and
// cut to roughly `max` characters on a word boundary.
export function excerpt(body, max = 150) {
  const para = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !/^(import |export |<|#)/.test(p));
  if (!para) return '';
  const text = para
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ');
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(' ', max))}…`;
}
