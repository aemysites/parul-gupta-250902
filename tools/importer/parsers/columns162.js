/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the two columns
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get the two immediate column regions
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // Each region contains a div > div > passage, so grab the passage content
  const colCells = Array.from(regions).map(region => {
    // Find the passage block inside each region
    const passage = region.querySelector('.jupiter22-c-text-passage');
    // Defensive: fallback to region if passage not found
    return passage || region;
  });

  // Build the table rows
  const headerRow = ['Columns (columns162)'];
  const contentRow = colCells;

  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
