/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getImmediateChild(parent, selector) {
    return Array.from(parent.children).find((el) => el.matches(selector));
  }

  // --- COLUMN 1: Main Content (Left) ---
  // Find left grid region
  const leftGrid = element.querySelector('.nsdq-bento-layout__main--left');
  let leftContent = null;
  if (leftGrid) {
    // Find the grid containing the heading and text
    const leftGridInner = leftGrid.querySelector('.nsdq-bento-layout__main--left--grid');
    if (leftGridInner) {
      // Find the region with heading and passage
      const region = leftGridInner.querySelector('.layout__region');
      if (region) {
        leftContent = region;
      }
    }
  }

  // --- COLUMN 2: Instrument Search (Right) ---
  // Find right rail sticky aside
  const rightRail = element.querySelector('aside.nsdq-l-right-rail-sticky');
  let rightContent = null;
  if (rightRail) {
    // Find the market status desktop block
    const marketStatusDesktop = rightRail.querySelector('nsdq-market-status-desktop');
    if (marketStatusDesktop) {
      // Find the region with the search form
      const region = marketStatusDesktop.querySelector('.layout__region.right-rail-first');
      if (region) {
        rightContent = region;
      }
    }
  }

  // Defensive fallback: If not found, use empty div
  if (!leftContent) {
    leftContent = document.createElement('div');
  }
  if (!rightContent) {
    rightContent = document.createElement('div');
  }

  // --- Compose Table ---
  const headerRow = ['Columns (columns44)'];
  const contentRow = [leftContent, rightContent];
  const cells = [headerRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
