/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid (2 columns)
  const grid = element.querySelector('.nsdq-l-grid--2up-66-33') || element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get the two columns (left and right)
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // Left column: heading + paragraphs
  const leftCol = regions[0];
  // Right column: number cards
  const rightCol = regions[1];

  // Compose the table
  const headerRow = ['Columns (columns140)'];
  const contentRow = [leftCol, rightCol];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
