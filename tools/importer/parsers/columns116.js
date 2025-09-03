/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container for the columns
  const grid = element.querySelector('.component_block_container');
  if (!grid) return;

  // Get all immediate column items
  const columnItems = Array.from(grid.querySelectorAll(':scope > .nsdq-l-grid__item'));
  if (!columnItems.length) return;

  // Table header row: must match block name exactly
  const headerRow = ['Columns (columns116)'];

  // Table content row: each cell is a reference to the original column DOM node
  const contentRow = columnItems.map((col) => col);

  // Build the table using DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
