/* global WebImporter */
export default function parse(element, { document }) {
  // Find the 2 main columns in the grid
  const grid = element.querySelector('.nsdq-l-grid--2up, .nsdq-l-grid');
  let leftCol = null;
  let rightCol = null;
  if (grid) {
    const regions = grid.querySelectorAll(':scope > .layout__region');
    if (regions.length >= 2) {
      leftCol = regions[0];
      rightCol = regions[1];
    }
  }
  // Fallback: if not found, try to get first two divs inside grid
  if ((!leftCol || !rightCol) && grid) {
    const divs = grid.querySelectorAll(':scope > div');
    if (divs.length >= 2) {
      leftCol = divs[0];
      rightCol = divs[1];
    }
  }
  // Defensive: if still not found, fallback to first two direct children
  if ((!leftCol || !rightCol)) {
    const divs = element.querySelectorAll(':scope > div');
    if (divs.length >= 2) {
      leftCol = divs[0];
      rightCol = divs[1];
    }
  }
  // Compose the table rows
  const headerRow = ['Columns (columns198)'];
  const contentRow = [
    leftCol ? leftCol : '',
    rightCol ? rightCol : ''
  ];
  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  // Replace the original element
  element.replaceWith(table);
}
