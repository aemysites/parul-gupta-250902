/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container (2 columns)
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get the immediate column regions
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // Left column: text passage
  const leftCol = regions[0];
  // Right column: text passage + table
  const rightCol = regions[1];

  // For left column, grab all children (usually just one div)
  const leftContent = Array.from(leftCol.children);

  // For right column, grab all children (usually just one div)
  const rightContent = Array.from(rightCol.children);

  // Compose the second row cells: left and right
  const row = [leftContent, rightContent];

  // Table header row
  const headerRow = ['Columns (columns42)'];

  // Build the table
  const cells = [headerRow, row];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
