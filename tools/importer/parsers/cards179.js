/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCard(cardEl) {
    // Get image (first img in card)
    const imgFigure = cardEl.querySelector('figure');
    let imgEl = null;
    if (imgFigure) {
      imgEl = imgFigure.querySelector('img');
    }

    // Get all content from card body (not just title/desc/link)
    const body = cardEl.querySelector('.jupiter22-c-content-card__body');
    let textCell = [];
    if (body) {
      // Collect all children of body (preserving structure)
      textCell = Array.from(body.childNodes).filter((node) => {
        // Only include elements and non-empty text nodes
        return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
      });
    }

    return [imgEl, textCell];
  }

  // Find all cards in the grid
  const cards = Array.from(element.querySelectorAll('.jupiter22-c-content-card'));

  // Compose table rows
  const headerRow = ['Cards (cards179)'];
  const rows = cards.map(extractCard);

  // Build table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with table
  element.replaceWith(table);
}
