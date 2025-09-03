/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getImmediateChild(parent, selector) {
    return Array.from(parent.children).find(el => el.matches(selector));
  }

  // 1. Find the two main columns (left and right)
  // The grid container is the first .nsdq-l-grid inside the element
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // 2. Left column: the quote block (with image, quote, attribution)
  const leftCol = regions[0];
  // 3. Right column: the promo block
  const rightCol = regions[1];

  // 4. Compose the table rows
  const headerRow = ['Columns (columns94)'];
  const contentRow = [leftCol, rightCol];

  // 5. Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 6. Replace the original element
  element.replaceWith(table);
}
