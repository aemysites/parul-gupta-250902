/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid for the columns layout
  const grid = element.querySelector('.nsdq-l-grid--2up-66-33');
  if (!grid) return;

  // Get the left and right column regions
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // Left column: contains the video block
  let leftContent = null;
  const leftRegion = regions[0];
  // Find the media gallery block
  const mediaGallery = leftRegion.querySelector('.block-media-gallery');
  if (mediaGallery) {
    leftContent = mediaGallery;
  } else {
    // fallback: use the whole left region
    leftContent = leftRegion;
  }

  // Right column: contains the card info
  let rightContent = null;
  const rightRegion = regions[1];
  const infoCard = rightRegion.querySelector('.jupiter22-c-info-card');
  if (infoCard) {
    rightContent = infoCard;
  } else {
    // fallback: use the whole right region
    rightContent = rightRegion;
  }

  // Table header
  const headerRow = ['Columns (columns84)'];
  // Table content row: left and right columns
  const contentRow = [leftContent, rightContent];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
