/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid for the two columns
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get the two main column regions
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // First column: left content (heading, subheading, text)
  const leftCol = document.createElement('div');
  // Append all children of the first region to preserve structure
  Array.from(regions[0].children).forEach(child => leftCol.appendChild(child));

  // Second column: right card (profile)
  const rightCol = document.createElement('div');
  // Only include the card, not the grid wrapper
  const card = regions[1].querySelector('.jupiter22-c-card');
  if (card) {
    rightCol.appendChild(card);
  }

  // Build the table rows
  const headerRow = ['Columns (columns165)'];
  const contentRow = [leftCol, rightCol];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
