/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the promo section containing the hero content
  const promoSection = element.querySelector('section.jupiter22-c-well-nasdaq-promo');
  if (!promoSection) return;

  // --- HEADER ROW ---
  const headerRow = ['Hero (hero121)'];

  // --- IMAGE ROW ---
  // Extract background image URL from data-bg or style
  let bgUrl = promoSection.getAttribute('data-bg');
  if (!bgUrl) {
    const style = promoSection.getAttribute('style');
    if (style) {
      const match = style.match(/background-image:\s*url\(['"]?(.*?)['"]?\)/);
      if (match && match[1]) {
        bgUrl = match[1];
      }
    }
  }
  let imageRow = [''];
  if (bgUrl) {
    const img = document.createElement('img');
    img.src = bgUrl;
    img.alt = '';
    imageRow = [img];
  }

  // --- CONTENT ROW ---
  // Find the content container
  const content = promoSection.querySelector('.jupiter22-c-nasdaq-promo__content');
  if (!content) return;

  // Collect heading, subheading, paragraph, CTA
  const contentFragments = [];

  // Eyebrow/subheading (h4)
  const eyebrow = content.querySelector('.jupiter22-c-nasdaq-promo__eyebrow');
  if (eyebrow) contentFragments.push(eyebrow);

  // Main heading (h2)
  const heading = content.querySelector('.jupiter22-c-nasdaq-promo__title');
  if (heading) contentFragments.push(heading);

  // Paragraph
  const paragraph = content.querySelector('p');
  if (paragraph) contentFragments.push(paragraph);

  // CTA link
  const cta = content.querySelector('a');
  if (cta) contentFragments.push(cta);

  const contentRow = [contentFragments];

  // --- BUILD TABLE ---
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(table);
}
