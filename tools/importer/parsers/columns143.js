/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container with columns
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get all immediate column regions
  const regions = Array.from(grid.querySelectorAll(':scope > .layout__region'));
  if (regions.length === 0) return;

  // Each region contains the content for a column
  const columns = regions.map(region => {
    // Find the main content wrapper inside the region
    const passage = region.querySelector('.jupiter22-c-text-passage');
    // Defensive: fallback to region if not found
    return passage || region;
  });

  // Table header row
  const headerRow = ['Columns (columns143)'];
  // Table content row: one cell per column
  const contentRow = columns;

  // Build the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
