/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the two main column regions
  const regions = element.querySelectorAll(':scope > div > div > div > div');
  // Fallback: if not found, try a more general selector
  let leftRegion, rightRegion;
  if (regions.length >= 2) {
    leftRegion = regions[0];
    rightRegion = regions[1];
  } else {
    // fallback: try to find grid items
    const gridItems = element.querySelectorAll('.nsdq-l-grid__item');
    leftRegion = gridItems[0];
    rightRegion = gridItems[1];
  }

  // --- LEFT COLUMN ---
  // Find the quote block
  let leftContent = leftRegion;
  // Defensive: if leftRegion contains the quote block, use it
  const quoteBlock = leftRegion.querySelector('.jupiter22-c-quote');
  if (quoteBlock) {
    leftContent = quoteBlock;
  }

  // --- RIGHT COLUMN ---
  // Find the image inside rightRegion
  let rightContent;
  const img = rightRegion.querySelector('img');
  if (img) {
    rightContent = img;
  } else {
    // fallback: use the whole right region
    rightContent = rightRegion;
  }

  // --- TABLE CONSTRUCTION ---
  const headerRow = ['Columns (columns193)'];
  const contentRow = [leftContent, rightContent];
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
