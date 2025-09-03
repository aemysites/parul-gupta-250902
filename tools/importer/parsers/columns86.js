/* global WebImporter */
export default function parse(element, { document }) {
  // Find the 2 main column regions
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // Left column: heading + text
  const leftRegion = regions[0];
  // Collect heading and all text content
  const heading = leftRegion.querySelector('.jupiter22-c-section-heading__headline');
  const textPassage = leftRegion.querySelector('.jupiter22-c-text-passage');
  const leftCell = document.createElement('div');
  if (heading) leftCell.appendChild(heading.cloneNode(true));
  if (textPassage) {
    Array.from(textPassage.childNodes).forEach(node => {
      leftCell.appendChild(node.cloneNode(true));
    });
  }

  // Right column: image
  const rightRegion = regions[1];
  const imageEl = rightRegion.querySelector('img');
  const rightCell = document.createElement('div');
  if (imageEl) rightCell.appendChild(imageEl.cloneNode(true));

  // Table header
  const headerRow = ['Columns (columns86)'];
  // Table content row: left | right
  const contentRow = [leftCell, rightCell];

  // Create block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
