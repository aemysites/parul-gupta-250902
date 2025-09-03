/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid containing the two columns
  const grid = element.querySelector('.nsdq-l-grid--2up');
  if (!grid) return;

  // Get immediate grid items (columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: main feature section
  const leftCol = columns[0];
  // Right column: card group
  const rightCol = columns[1];

  // --- Left column content ---
  // Find the feature section
  const featureSection = leftCol.querySelector('.jupiter22-c-catalyst-feature');
  let leftContent = null;
  if (featureSection) {
    // Use the whole feature section for resilience
    leftContent = featureSection;
  } else {
    // Fallback: use all children
    leftContent = document.createElement('div');
    Array.from(leftCol.childNodes).forEach((node) => leftContent.appendChild(node.cloneNode(true)));
  }

  // --- Right column content ---
  // Find the card group
  let rightContent = null;
  const cardGroup = rightCol.querySelector('.jupiter22-c-catalyst-card-group');
  if (cardGroup) {
    rightContent = cardGroup;
  } else {
    // Fallback: use all children
    rightContent = document.createElement('div');
    Array.from(rightCol.childNodes).forEach((node) => rightContent.appendChild(node.cloneNode(true)));
  }

  // --- Table construction ---
  const headerRow = ['Columns (columns182)'];
  const contentRow = [leftContent, rightContent];

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
