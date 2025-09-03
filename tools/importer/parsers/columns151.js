/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // The header row must match the block name exactly
  const headerRow = ['Columns (columns151)'];

  // For each column, collect the relevant content
  // Each column is a cell in the second row
  const contentRow = columns.map((col) => col);

  // Build the table
  const cells = [
    headerRow,
    contentRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
