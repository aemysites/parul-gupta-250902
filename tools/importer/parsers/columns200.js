/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid containing the columns
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get all immediate column regions
  const regions = Array.from(grid.querySelectorAll(':scope > .layout__region'));
  if (regions.length === 0) return;

  // Each region contains the content for a column
  // We'll use the whole region as the column cell for resilience
  const columnsRow = regions.map(region => region);

  // Table structure: header row, then columns row
  const headerRow = ['Columns (columns200)'];
  const tableRows = [headerRow, columnsRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
