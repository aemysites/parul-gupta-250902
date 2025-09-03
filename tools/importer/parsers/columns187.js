/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid (2 columns)
  const grid = element.querySelector('.nsdq-l-grid--2up.nsdq-l-grid');
  if (!grid) return;

  // Get the two regions (columns)
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // First column: Investment Criteria (heading + list)
  const leftCol = regions[0];
  // Second column: Pitch Submission Form
  const rightCol = regions[1];

  // Defensive: grab all content in each column
  // For left column, grab all children (heading + content)
  const leftContent = Array.from(leftCol.children);
  // For right column, grab the form block
  const rightContent = Array.from(rightCol.children);

  // Table header row
  const headerRow = ['Columns (columns187)'];
  // Table content row: two columns
  const contentRow = [leftContent, rightContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
