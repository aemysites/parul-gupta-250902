/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // There are 5 columns in the screenshot and HTML:
  // 1. Market dropdown
  // 2. Freetext input
  // 3. Category dropdown
  // 4. From Date picker
  // 5. To Date picker

  // Header row must be block name
  const headerRow = ['Columns (columns106)'];

  // Second row: each column's content
  // For each column, include the entire block (not just the input/dropdown)
  // This ensures resilience to HTML variations
  const contentRow = columns.map((col) => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
