/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the first image from each column region
  function getColumnImage(region) {
    const img = region.querySelector('img');
    return img || '';
  }

  // Find all immediate column regions
  const regions = Array.from(element.querySelectorAll(':scope .layout__region'));

  // For each region, collect the image (if present)
  const columns = regions.map(region => getColumnImage(region));

  // Table header as specified
  const headerRow = ['Columns (columns7)'];
  // Table body: one row, each cell is a column image (or empty if missing)
  const bodyRow = columns;

  const cells = [headerRow, bodyRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
