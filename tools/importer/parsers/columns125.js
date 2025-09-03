/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid (2 columns)
  const grid = element.querySelector('.nsdq-l-grid--2up') || element.querySelector('.nsdq-l-grid');
  if (!grid) return;
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // LEFT COLUMN: Gather all heading and text content, plus image if present
  const leftRegion = regions[0];
  const leftCellContent = [];

  // Section headings (all)
  leftRegion.querySelectorAll('.jupiter22-c-section-heading').forEach((heading) => {
    leftCellContent.push(heading);
  });

  // Any paragraphs or text passages
  leftRegion.querySelectorAll('.jupiter22-c-text-passage, p').forEach((para) => {
    leftCellContent.push(para);
  });

  // Any images in left column
  leftRegion.querySelectorAll('img').forEach((img) => {
    leftCellContent.push(img);
  });

  // RIGHT COLUMN: Gather all images and text content
  const rightRegion = regions[1];
  const rightCellContent = [];

  // All images in right column
  rightRegion.querySelectorAll('img').forEach((img) => {
    rightCellContent.push(img);
  });

  // Any headings or text passages in right column
  rightRegion.querySelectorAll('.jupiter22-c-section-heading, .jupiter22-c-text-passage, p').forEach((el) => {
    rightCellContent.push(el);
  });

  // Build table rows
  const headerRow = ['Columns (columns125)'];
  const contentRow = [leftCellContent, rightCellContent];

  // Create block table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace original element
  element.replaceWith(table);
}
