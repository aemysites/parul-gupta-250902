/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid container (2 columns)
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get the two column regions
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // Left column: heading + text
  const leftCol = regions[0];
  // Right column: heading + list of cards
  const rightCol = regions[1];

  // Compose the table rows
  const headerRow = ['Columns (columns122)'];
  const contentRow = [leftCol, rightCol];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
