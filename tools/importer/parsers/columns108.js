/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main 2-column grid
  const grid = element.querySelector('.nsdq-l-grid--2up-66-33');
  if (!grid) return;
  const columns = grid.querySelectorAll(':scope > .nsdq-l-grid__item');
  if (columns.length < 2) return;

  // Left column: heading + video block
  const leftCol = columns[0];
  // Right column: card with episode info
  const rightCol = columns[1];

  // Compose left cell: section heading + media gallery
  const leftParts = [];
  const sectionHeading = leftCol.querySelector('.jupiter22-c-section-heading');
  if (sectionHeading) leftParts.push(sectionHeading);
  const mediaGallery = leftCol.querySelector('.jupiter22-c-media-gallery');
  if (mediaGallery) leftParts.push(mediaGallery);

  // Compose right cell: card body (title, subtitle, description, button)
  let rightContent = null;
  const contentCard = rightCol.querySelector('.jupiter22-c-content-card');
  if (contentCard) {
    rightContent = contentCard;
  } else {
    // fallback: just use the right column
    rightContent = rightCol;
  }

  // Build table rows
  const headerRow = ['Columns (columns108)'];
  const contentRow = [leftParts, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
