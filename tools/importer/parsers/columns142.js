/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid container (2 columns)
  const grid = element.querySelector('.nsdq-l-grid--2up-66-33.nsdq-l-grid');
  if (!grid) return;

  // Get the two column regions
  const regions = grid.querySelectorAll(':scope > .layout__region.nsdq-l-grid__item');
  if (regions.length < 2) return;

  // Left column: heading + text
  const leftCol = regions[0];
  // Right column: number cards
  const rightCol = regions[1];

  // Compose the table rows
  const headerRow = ['Columns (columns142)'];
  const contentRow = [leftCol, rightCol];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block
  element.replaceWith(block);
}
