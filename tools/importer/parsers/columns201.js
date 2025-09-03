/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all direct children with a given selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Find the grid container (should be 2 columns)
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get the two column containers
  const columns = getDirectChildren(grid, '.nsdq-l-grid__item');
  if (columns.length < 2) return;

  // For each column, get its accordion panels (as an array)
  const leftAccordions = Array.from(columns[0].querySelectorAll(':scope > dl > .jupiter22-c-accordion-panel'));
  const rightAccordions = Array.from(columns[1].querySelectorAll(':scope > dl > .jupiter22-c-accordion-panel'));

  // Determine the max number of rows (some columns may have more panels than the other)
  const maxRows = Math.max(leftAccordions.length, rightAccordions.length);

  // Build the table rows
  const headerRow = ['Columns (columns201)'];
  const rows = [headerRow];

  for (let i = 0; i < maxRows; i++) {
    const row = [];
    if (leftAccordions[i]) row.push(leftAccordions[i]);
    if (rightAccordions[i]) row.push(rightAccordions[i]);
    if (row.length > 0) rows.push(row);
  }

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
