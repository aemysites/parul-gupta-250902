/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the cards
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Find all card containers (each .jupiter22-c-info-card-small-horizontal)
  const cards = Array.from(grid.querySelectorAll('.jupiter22-c-info-card-small-horizontal'));

  // Build the table rows
  const headerRow = ['Cards (cards145)']; // Header row must have exactly one column
  const rows = [headerRow];

  cards.forEach(cardRoot => {
    // Find the image (first img inside the card)
    const img = cardRoot.querySelector('img');
    // Find the link (CTA) and its text
    const link = cardRoot.querySelector('.jupiter22-c-info-card__links a');
    let textContent = [];
    if (link) {
      textContent.push(link);
    }
    // Only add row if both image and text/link exist
    if (img && textContent.length) {
      rows.push([img, textContent]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
