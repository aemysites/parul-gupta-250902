/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the 2 main columns in the grid
  const grid = element.querySelector('.nsdq-l-grid--2up.nsdq-l-grid');
  if (!grid) return;
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // Left column: Heading + list
  const leftRegion = regions[0];
  // Find heading (h3) and list (ul)
  const heading = leftRegion.querySelector('h3');
  const list = leftRegion.querySelector('ul');
  // Compose left cell content
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (list) leftCellContent.push(list);

  // Right column: Image
  const rightRegion = regions[1];
  // Defensive: Find the image inside right region
  const img = rightRegion.querySelector('img');
  const rightCellContent = img ? [img] : [];

  // Table header row
  const headerRow = ['Columns (columns49)'];
  // Table content row
  const contentRow = [leftCellContent, rightCellContent];

  // Create table block
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
