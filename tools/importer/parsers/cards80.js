/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a grid item
  function extractCard(cardElem) {
    // Find image
    const img = cardElem.querySelector('img');
    // Find title (h3)
    const title = cardElem.querySelector('.jupiter22-c-info-card__title');
    // Find description (p inside .jupiter22-c-text-passage)
    const desc = cardElem.querySelector('.jupiter22-c-text-passage p');

    // Compose text cell: title (strong), then description (as text)
    const textCell = document.createElement('div');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      textCell.appendChild(strong);
      textCell.appendChild(document.createElement('br'));
    }
    if (desc) {
      textCell.appendChild(document.createTextNode(desc.textContent.trim()));
    }
    return [img, textCell];
  }

  // Find all card regions (each card is a grid item)
  const cardRegions = Array.from(element.querySelectorAll('.layout__region'));

  // Build table rows
  const headerRow = ['Cards (cards80)'];
  const rows = cardRegions.map(region => {
    // Defensive: find the card container
    const cardElem = region.querySelector('.jupiter22-c-info-card');
    if (!cardElem) return null;
    return extractCard(cardElem);
  }).filter(Boolean);

  // Compose table data
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
