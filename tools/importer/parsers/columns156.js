/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main 2-column grid
  const grid = element.querySelector('.nsdq-l-grid--2up, .nsdq-l-grid');
  if (!grid) return;

  // Get the two main column regions
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // Left column: find the section heading block
  let leftCol = regions[0];
  // Remove empty paragraphs or whitespace-only text nodes
  // Find the main heading block (with h3 and description)
  const headingBlock = leftCol.querySelector('.jupiter22-c-section-heading');
  // Defensive: if not found, fallback to the whole leftCol
  const leftContent = headingBlock || leftCol;

  // Right column: the card group
  let rightCol = regions[1];
  // Find the card group container
  const cardGroup = rightCol.querySelector('.jupiter22-c-catalyst-card-group');
  // Defensive: if not found, fallback to the whole rightCol
  const rightContent = cardGroup || rightCol;

  // Build the table rows
  const headerRow = ['Columns (columns156)'];
  const contentRow = [leftContent, rightContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
