/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from the HTML structure
  function extractCards(element) {
    const cards = [];
    // Each card is represented by a pair of .jupiter22-case-study-media and .jupiter22-case-study-article
    const mediaEls = Array.from(element.querySelectorAll('.jupiter22-case-study-media'));
    const articleEls = Array.from(element.querySelectorAll('.jupiter22-case-study-article'));
    // Defensive: Only pair up to the minimum count
    const count = Math.min(mediaEls.length, articleEls.length);
    for (let i = 0; i < count; i++) {
      const media = mediaEls[i];
      const article = articleEls[i];
      // First cell: image (always present)
      let img = media.querySelector('img');
      if (!img) continue;
      // Second cell: text content
      // We'll collect: icon (svg), title (h3), description (p), CTA (a)
      const section = article.querySelector('section.jupiter22-case-study-card_content');
      if (!section) continue;
      const cellContent = document.createElement('div');
      // Icon (optional)
      const icon = section.querySelector('.jupiter22-c-icon');
      if (icon) cellContent.appendChild(icon.cloneNode(true));
      // Title (h3)
      const title = section.querySelector('.jupiter22-case-study-card__title');
      if (title) cellContent.appendChild(title.cloneNode(true));
      // Description (p)
      const descWrap = section.querySelector('.jupiter22-case-study-card__text');
      if (descWrap) {
        const p = descWrap.querySelector('p');
        if (p) cellContent.appendChild(p.cloneNode(true));
      }
      // CTA (a)
      const cta = section.querySelector('a.jupiter22-case-study-card__link');
      if (cta) cellContent.appendChild(cta.cloneNode(true));
      // Add row: [img, cellContent]
      cards.push([img.cloneNode(true), cellContent]);
    }
    return cards;
  }

  // Find the card wrapper block
  const cardWrapper = element.querySelector('.case-study-cards--default');
  if (!cardWrapper) return;
  // Extract cards
  const cardRows = extractCards(cardWrapper);
  // Table header
  const headerRow = ['Cards (cards57)'];
  // Compose table
  const cells = [headerRow, ...cardRows];
  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element
  element.replaceWith(block);
}
