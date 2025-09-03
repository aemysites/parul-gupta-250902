/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid containing two columns
  const grid = element.querySelector('.nsdq-l-grid--2up') || element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get the two column regions
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // First column: Heading and description
  // Find the section heading block inside first region
  let leftContent;
  const leftRegion = regions[0];
  const headingBlock = leftRegion.querySelector('.jupiter22-c-section-heading');
  if (headingBlock) {
    leftContent = headingBlock;
  } else {
    // Fallback: use all children of leftRegion
    leftContent = document.createElement('div');
    Array.from(leftRegion.children).forEach(child => leftContent.appendChild(child));
  }

  // Second column: List of cards/links
  const rightRegion = regions[1];
  // Find the card group
  let rightContent;
  const cardGroup = rightRegion.querySelector('.jupiter22-c-catalyst-card-group');
  if (cardGroup) {
    rightContent = cardGroup;
  } else {
    // Fallback: use all children of rightRegion
    rightContent = document.createElement('div');
    Array.from(rightRegion.children).forEach(child => rightContent.appendChild(child));
  }

  // Table header row
  const headerRow = ['Columns (columns197)'];
  // Table content row: two columns
  const contentRow = [leftContent, rightContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
