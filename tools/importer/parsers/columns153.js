/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the two columns
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get the two column regions
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // First column: heading + text + link
  const leftCol = regions[0];
  // Second column: search form
  const rightCol = regions[1];

  // Compose cells for the second row
  const cellsRow = [leftCol, rightCol];

  // Table header
  const headerRow = ['Columns (columns153)'];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
