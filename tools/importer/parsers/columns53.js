/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main column regions
  const grid = element.querySelector('.nsdq-l-grid--2up.nsdq-l-grid');
  if (!grid) return;
  const regions = Array.from(grid.querySelectorAll('.layout__region'));
  if (regions.length < 2) return;

  // For each region, get the first .block-media-gallery
  const cells = regions.map(region => {
    const block = region.querySelector('.block-media-gallery');
    return block || '';
  });

  // Defensive: skip if any cell is empty
  if (cells.some(cell => !cell)) return;

  const headerRow = ['Columns (columns53)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cells,
  ], document);

  element.replaceWith(table);
}
