/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the 2 main columns inside the grid
  // The grid is the first .nsdq-l-grid inside the element
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;
  // Get the immediate children (should be 2 columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: the quote block (with attribution)
  const leftCol = columns[0];
  // Second column: the number card
  const rightCol = columns[1];

  // For resilience, grab the main content blocks inside each column
  // Left: find the .jupiter22-c-quote
  const quoteBlock = leftCol.querySelector('.jupiter22-c-quote');
  // Right: find the .jupiter22-c-number-card
  const numberCard = rightCol.querySelector('.jupiter22-c-number-card');

  // Fallback: if not found, use the column itself
  const leftContent = quoteBlock || leftCol;
  const rightContent = numberCard || rightCol;

  // Build the table rows
  const headerRow = ['Columns (columns117)'];
  const contentRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
