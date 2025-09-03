/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCard(cardEl) {
    // Get image (first img in card)
    const img = cardEl.querySelector('img');

    // Get card body
    const body = cardEl.querySelector('.jupiter22-c-content-card__body');
    let title = body && body.querySelector('.jupiter22-c-content-card__title');
    let desc = body && body.querySelector('.jupiter22-c-text-passage');
    let links = body && body.querySelector('.jupiter22-c-content-card__links');

    // Defensive: fallback to accordion if body missing
    if (!title || !desc || !links) {
      const accordionPanel = cardEl.querySelector('.jupiter22-c-accordion-panel__body-inner');
      if (accordionPanel) {
        if (!desc) desc = accordionPanel.querySelector('.jupiter22-c-text-passage');
        if (!links) links = accordionPanel.querySelector('.jupiter22-c-content-card__links');
        if (!title) title = cardEl.querySelector('.jupiter22-c-accordion-header__title');
      }
    }

    // Compose text cell: include all text content in a single div for flexibility
    const textCellDiv = document.createElement('div');
    if (title) textCellDiv.appendChild(title.cloneNode(true));
    if (desc) textCellDiv.appendChild(desc.cloneNode(true));
    if (links) textCellDiv.appendChild(links.cloneNode(true));

    // Fallback: if textCellDiv is empty, include all text from card
    if (!textCellDiv.textContent.trim()) {
      textCellDiv.textContent = cardEl.textContent.trim();
    }

    return [img, textCellDiv];
  }

  // Find all cards in the grid
  const cards = Array.from(element.querySelectorAll('.jupiter22-c-content-card'));

  // Build table rows
  const headerRow = ['Cards (cards178)'];
  const rows = cards.map(extractCard);

  const cells = [headerRow, ...rows];

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
