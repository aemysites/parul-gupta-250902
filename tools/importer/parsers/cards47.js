/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from grid
  function extractCards(grid) {
    const cards = [];
    // Defensive: get all immediate grid items
    const regions = grid.querySelectorAll(':scope > .layout__region');
    regions.forEach(region => {
      // Find the card container (may be nested)
      let card = region.querySelector('.jupiter22-c-card, .jupiter22-c-info-card');
      if (!card) card = region;
      // Find info-card body (if present)
      let infoCardBody = card.querySelector('.jupiter22-c-info-card__body') || card;
      // Compose text cell
      const textParts = [];
      // Title: use h5 (since that's the visible heading)
      let title = infoCardBody.querySelector('h5');
      if (title && title.textContent.trim()) {
        const titleElem = document.createElement('strong');
        titleElem.textContent = title.textContent.trim();
        textParts.push(titleElem);
      }
      // Description (all paragraphs)
      const passage = infoCardBody.querySelector('.jupiter22-c-text-passage');
      if (passage) {
        passage.querySelectorAll('p').forEach(p => {
          if (p.textContent.trim()) {
            textParts.push(p.cloneNode(true));
          }
        });
      }
      // CTA link (if present)
      const links = infoCardBody.querySelector('.jupiter22-c-info-card__links');
      if (links) {
        const link = links.querySelector('a');
        if (link) {
          textParts.push(link.cloneNode(true));
        }
      }
      // Defensive: if no text, fallback to region text
      if (textParts.length === 0) {
        textParts.push(document.createTextNode(region.textContent.trim()));
      }
      // Compose row: [empty image/icon cell, text cell]
      cards.push([
        '',
        textParts.length === 1 ? textParts[0] : textParts
      ]);
    });
    return cards;
  }

  // Find the grid container inside the block
  let grid = element.querySelector('.nsdq-l-grid');
  if (!grid) {
    grid = element.querySelector('[class*="l-grid"]');
  }
  if (!grid) return;

  // Build table rows
  const headerRow = ['Cards (cards47)'];
  const cardRows = extractCards(grid);
  if (cardRows.length === 0) return;

  // Each row should have two columns: image/icon (empty), text
  const tableCells = [headerRow, ...cardRows];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
