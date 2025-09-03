/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Header row for the block table
  const headerRow = ['Columns (columns101)'];

  // Find the two main column regions
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // Left column: contains two heading blocks and their text
  const leftRegion = regions[0];
  // We'll collect all content in leftRegion into a single fragment
  const leftContent = document.createElement('div');
  // Get all direct children (section headings and text blocks)
  const leftChildren = leftRegion.querySelectorAll(':scope > *');
  leftChildren.forEach((child) => {
    leftContent.appendChild(child);
  });

  // Right column: contains the promo block
  const rightRegion = regions[1];
  // The promo block is the section with class 'jupiter22-c-well-nasdaq-promo'
  const promoSection = rightRegion.querySelector('.jupiter22-c-well-nasdaq-promo');
  // Defensive: If not found, fallback to all content in rightRegion
  const rightContent = promoSection ? promoSection : rightRegion;

  // Build the table rows
  const cells = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
