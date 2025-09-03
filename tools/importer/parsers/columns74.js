/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main container for the columns
  const grid = element.querySelector('.nsdq-u-grid-50-25-25, .nsdq-u-grid-container');
  if (!grid) return;

  // Get the three column regions in order
  const regions = Array.from(grid.querySelectorAll(':scope > .layout__region'));
  if (regions.length < 3) return;

  // Table header row
  const headerRow = ['Columns (columns74)'];
  // Table content row: each region is a column
  const contentRow = [regions[0], regions[1], regions[2]];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
