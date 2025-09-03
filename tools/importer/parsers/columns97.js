/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid containing the two columns
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get the two main regions (left and right columns)
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // Left column: Latest News block
  const leftRegion = regions[0];
  // Right column: Media Contacts block
  const rightRegion = regions[1];

  // For left column, include the heading and the article list
  // Defensive: Find heading and article list
  const leftHeading = leftRegion.querySelector('.jupiter22-c-section-heading');
  const leftArticleList = leftRegion.querySelector('.jupiter22-c-article-list');
  // Optionally include pagination if present
  const leftPagination = leftRegion.querySelector('.pagination');
  // Compose left column content
  const leftColumnContent = [];
  if (leftHeading) leftColumnContent.push(leftHeading);
  if (leftArticleList) leftColumnContent.push(leftArticleList);
  if (leftPagination) leftColumnContent.push(leftPagination);

  // For right column, include heading and contacts
  const rightHeading = rightRegion.querySelector('.jupiter22-c-section-heading');
  // The contacts are inside a div with .jupiter22-c-text-passage
  const rightContacts = rightRegion.querySelector('.jupiter22-c-text-passage');
  const rightColumnContent = [];
  if (rightHeading) rightColumnContent.push(rightHeading);
  if (rightContacts) rightColumnContent.push(rightContacts);

  // Table header row
  const headerRow = ['Columns (columns97)'];
  // Table content row: two columns
  const contentRow = [leftColumnContent, rightColumnContent];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
