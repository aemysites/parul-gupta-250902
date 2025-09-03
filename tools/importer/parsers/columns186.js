/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the main grid container (2 columns)
  const grid = element.querySelector('.nsdq-l-grid--2up.nsdq-l-grid');
  if (!grid) return;

  // Get the two main regions (left and right columns)
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // Left column: Resources accordion
  const leftCol = regions[0];
  // Right column: Subscribe form block
  const rightCol = regions[1];

  // Compose the table rows
  const headerRow = ['Columns (columns186)'];
  const contentRow = [leftCol, rightCol];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
