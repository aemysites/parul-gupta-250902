/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children by selector
  function getImmediateChildByClass(parent, className) {
    return Array.from(parent.children).find(child => child.classList.contains(className));
  }

  // 1. Find the 2 main columns: left (cards grid), right (image)
  // The structure is: ...<div class="nsdq-l-grid--2up-66-33 ..."> <div class="layout__region ..."> ... </div> <div class="layout__region ... layout-right-rail"> ... </div>
  const grid2up = element.querySelector('.nsdq-l-grid--2up-66-33');
  if (!grid2up) return;
  const leftRegion = grid2up.querySelector('.layout__region:not(.layout-right-rail)');
  const rightRegion = grid2up.querySelector('.layout__region.layout-right-rail');
  if (!leftRegion || !rightRegion) return;

  // 2. Left: get the cards grid (the 3x2 grid of cards)
  // It's the first .component_block_container inside leftRegion
  const cardsGrid = leftRegion.querySelector('.component_block_container');
  // Defensive: fallback to leftRegion if not found
  const leftContent = cardsGrid || leftRegion;

  // 3. Right: get the image (the .jupiter22-c-media-gallery img)
  const img = rightRegion.querySelector('img');
  // Defensive: fallback to rightRegion if not found
  const rightContent = img || rightRegion;

  // 4. Build the table rows
  const headerRow = ['Columns (columns75)'];
  const contentRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
