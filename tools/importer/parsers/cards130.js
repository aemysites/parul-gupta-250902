/* global WebImporter */
export default function parse(element, { document }) {
  // Find the left column containing the cards
  const leftCol = element.querySelector('.nsdq-l-grid__item');
  if (!leftCol) return;
  const cardEls = Array.from(leftCol.querySelectorAll('.jupiter22-c-news-card'));
  if (!cardEls.length) return;

  // Table header must match block name exactly
  const headerRow = ['Cards (cards130)'];

  // Build table rows for each card
  const rows = cardEls.map(card => {
    // Image cell: use the actual <img> element (reference, not clone)
    const img = card.querySelector('img');
    const imageCell = img || '';

    // Text cell: preserve all text content and structure
    const frag = document.createDocumentFragment();

    // Instead of picking only specific elements, include all text content from the card
    // Get the main text container
    const textContainer = card.querySelector('.jupiter22-c-news-card__text');
    if (textContainer) {
      // Clone the text container to preserve structure and all text
      frag.appendChild(textContainer.cloneNode(true));
    }

    return [imageCell, frag];
  });

  // Compose the table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
