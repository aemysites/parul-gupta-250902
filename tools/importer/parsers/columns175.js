/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the main grid (2 columns)
  const grid = element.querySelector('.nsdq-l-grid--2up');
  if (!grid) return;
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // LEFT COLUMN: Heading, description, button
  const leftRegion = regions[0];
  // Find heading block
  const headingBlock = leftRegion.querySelector('.jupiter22-c-section-heading');
  // Find button block
  const buttonBlock = leftRegion.querySelector('.button-primary');
  // Compose left cell content
  const leftCellContent = [];
  if (headingBlock) leftCellContent.push(headingBlock);
  if (buttonBlock) leftCellContent.push(buttonBlock.closest('.jupiter22-c-text-passage') || buttonBlock);

  // RIGHT COLUMN: Image gallery
  const rightRegion = regions[1];
  // Find image in gallery
  let imageCellContent = [];
  const gallery = rightRegion.querySelector('.jupiter22-c-media-gallery');
  if (gallery) {
    const img = gallery.querySelector('img');
    if (img) imageCellContent.push(img);
  }

  // Table header
  const headerRow = ['Columns (columns175)'];
  // Table content row: left and right columns
  const contentRow = [leftCellContent, imageCellContent];

  // Create block table
  const block = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  // Replace original element
  element.replaceWith(block);
}
