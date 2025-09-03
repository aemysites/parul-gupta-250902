/* global WebImporter */
export default function parse(element, { document }) {
  // Find the image in the columns block
  const img = element.querySelector('img');

  // Build the table header as required
  const headerRow = ['Columns (columns129)'];
  // Build the content row: image element or empty string
  const contentRow = [img ? img : ''];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
