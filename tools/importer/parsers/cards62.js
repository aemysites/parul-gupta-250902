/* global WebImporter */
export default function parse(element, { document }) {
  // Find the 2-up grid containing the cards
  const grid = element.querySelector('.nsdq-l-grid--2up');
  if (!grid) return;
  const cardRegions = Array.from(grid.children);

  const rows = [];
  // Use the correct block header row
  const headerRow = ['Cards (cards62)'];
  rows.push(headerRow);

  cardRegions.forEach(region => {
    // Find image (first .jupiter22-c-media-gallery img)
    const img = region.querySelector('.jupiter22-c-media-gallery img');
    // Find text content (first .jupiter22-c-text-passage)
    const text = region.querySelector('.jupiter22-c-text-passage');

    // Only add row if both image and text exist
    if (img && text) {
      // Reference the actual elements, not clones
      rows.push([img, text]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
