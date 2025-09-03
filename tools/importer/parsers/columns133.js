/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid container
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Find the featured list block (left column)
  const featuredList = grid.querySelector('.jupiter22-featured-list');
  if (!featuredList) return;

  // Left column: the list of features (ul)
  const listSection = featuredList.querySelector('section.jupiter22-featured-list_text');
  // Defensive: fallback to the whole featuredList if section not found
  const leftCol = listSection || featuredList;

  // Right column: image and pattern
  const mediaDiv = featuredList.querySelector('.jupiter22-featured-list_media');
  let rightColContent = [];
  if (mediaDiv) {
    // Get the main image
    const img = mediaDiv.querySelector('img');
    if (img) rightColContent.push(img);
    // Get the pattern SVG (decorative)
    const patternDiv = mediaDiv.querySelector('.jupiter22-pattern');
    if (patternDiv) rightColContent.push(patternDiv);
  }

  // Table header
  const headerRow = ['Columns (columns133)'];
  // Table content row: left and right columns
  const contentRow = [leftCol, rightColContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
