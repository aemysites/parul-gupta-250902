/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container with columns
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get all immediate column regions
  const regions = Array.from(grid.querySelectorAll(':scope > .layout__region'));
  if (!regions.length) return;

  // For each region, find the card body (the actual content)
  const cellsRow = regions.map(region => {
    // Defensive: Find the card body
    const cardBody = region.querySelector('.jupiter22-c-info-card__body');
    // If not found, fallback to the whole region
    return cardBody || region;
  });

  // Header row as specified
  const headerRow = ['Columns (columns134)'];

  // Compose table rows
  const cells = [headerRow, cellsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
