/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCard(cardEl) {
    // Icon (SVG)
    const header = cardEl.querySelector('.jupiter22-c-content-card__header');
    let icon = null;
    if (header) {
      icon = header.querySelector('.jupiter22-c-content-card__icon');
    }

    // Text content
    const body = cardEl.querySelector('.jupiter22-c-content-card__body');
    const textContent = document.createElement('div');
    if (body) {
      // Title
      const title = body.querySelector('.jupiter22-c-content-card__title');
      if (title) textContent.appendChild(title.cloneNode(true));
      // Description
      const desc = body.querySelector('.jupiter22-c-text-passage');
      if (desc) textContent.appendChild(desc.cloneNode(true));
      // CTA link
      const links = body.querySelector('.jupiter22-c-content-card__links');
      if (links) {
        // Only include the first link (if present)
        const link = links.querySelector('a');
        if (link) textContent.appendChild(link.cloneNode(true));
      }
    }
    return [icon ? icon.cloneNode(true) : '', textContent.childNodes.length ? textContent : ''];
  }

  // Find all cards
  const cards = [];
  // Defensive: look for grid container, then for cards inside
  const grid = element.querySelector('.nsdq-l-grid');
  if (grid) {
    const cardEls = grid.querySelectorAll('.jupiter22-c-content-card');
    cardEls.forEach(cardEl => {
      cards.push(extractCard(cardEl));
    });
  }

  // Table header
  const headerRow = ['Cards (cards209)'];
  const rows = [headerRow, ...cards];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
