/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card element
  function extractCard(card) {
    // Image (first cell)
    let img = card.querySelector('img');
    // Defensive: if not found, leave cell empty
    let imageCell = img ? img : '';

    // Text content (second cell)
    const body = card.querySelector('.jupiter22-c-info-card__body');
    let textCellContent = [];
    if (body) {
      // Title
      const title = body.querySelector('.jupiter22-c-info-card__title');
      if (title) {
        // Use heading as-is
        textCellContent.push(title);
      }
      // Description (first p inside .jupiter22-c-text-passage)
      const desc = body.querySelector('.jupiter22-c-text-passage p');
      if (desc) {
        textCellContent.push(desc);
      }
      // CTA link (first a inside .jupiter22-c-info-card__links)
      const cta = body.querySelector('.jupiter22-c-info-card__links a');
      if (cta) {
        textCellContent.push(cta);
      }
    }
    // Defensive: if nothing found, leave cell empty
    let textCell = textCellContent.length ? textCellContent : '';

    return [imageCell, textCell];
  }

  // Find the container with all cards
  const cardsContainer = element.querySelector('.component_block_container');
  if (!cardsContainer) return;

  // Get all card elements
  const cardElements = Array.from(cardsContainer.querySelectorAll('.jupiter22-c-card'));

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards24)']);
  // Card rows
  cardElements.forEach(card => {
    rows.push(extractCard(card));
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
