/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the main grid containing the two columns
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get the two main regions (columns)
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // First column: Feature card (image + text + link)
  const featureCard = regions[0].querySelector('.jupiter22-c-feature-card-vertical__container');
  // Second column: Newsletter signup form
  const formBlock = regions[1].querySelector('.jupiter22-c-marketo-form-block__compact');

  // Defensive: ensure both columns exist
  if (!featureCard || !formBlock) return;

  // Table header row
  const headerRow = ['Columns (columns81)'];

  // Table content row: two columns
  const contentRow = [featureCard, formBlock];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
