/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid (2 columns)
  const layoutContainer = element.querySelector('.nsdq-l-layout-container');
  if (!layoutContainer) return;
  const grid = layoutContainer.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get the two column regions
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // --- Left Column ---
  // Instead of filtering, include all content from leftRegion
  const leftRegion = regions[0];
  // Use all children (including text nodes) for maximum flexibility
  const leftContent = Array.from(leftRegion.childNodes);

  // --- Right Column ---
  const rightRegion = regions[1];
  // Find the market status block
  const marketStatus = rightRegion.querySelector('.jupiter22-market-status');
  let rightContent;
  if (marketStatus) {
    // Find the visible slate (aria-show="true")
    const visibleSlate = marketStatus.querySelector('.jupiter22-market-status__slate[aria-show="true"]');
    if (visibleSlate) {
      // Include heading and visible slate
      const heading = marketStatus.querySelector('.jupiter22-market-status__heading');
      rightContent = [heading, visibleSlate];
    } else {
      rightContent = [marketStatus];
    }
  } else {
    rightContent = Array.from(rightRegion.childNodes);
  }

  // Table header
  const headerRow = ['Columns (columns5)'];
  // Table content row: left and right columns
  const contentRow = [leftContent, rightContent];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
