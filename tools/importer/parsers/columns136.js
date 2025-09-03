/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main horizontal card block
  const card = element.querySelector('.jupiter22-c-info-card-small-horizontal');
  if (!card) return;

  // Find the image (left column)
  const img = card.querySelector('img');

  // Find the content (right column)
  const content = card.querySelector('.jupiter22-c-info-card-small-horizontal__content');

  // Defensive: If either column is missing, abort
  if (!img || !content) return;

  // Table header row
  const headerRow = ['Columns (columns136)'];

  // Table content row: two columns (image, content)
  const contentRow = [img, content];

  // Build the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
