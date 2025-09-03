/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: ensure we have at least 4 columns, fill with empty if not
  while (columns.length < 4) columns.push(document.createElement('div'));

  // Table header as per block guidelines
  const headerRow = ['Columns (columns30)'];
  const tableRows = [headerRow, columns];

  // Create the columns block table, referencing the actual elements
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element with the block
  element.replaceWith(block);
}
