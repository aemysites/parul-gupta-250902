/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate dropdown containers (each is a column)
  const columnContainers = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: handle empty state
  if (columnContainers.length === 0) return;

  // Table header row as per block guidelines
  const headerRow = ['Columns (columns207)'];

  // Table content row: each cell is a reference to the original column container
  const contentRow = columnContainers;

  // Compose table data
  const tableRows = [headerRow, contentRow];

  // Create the block table using DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
