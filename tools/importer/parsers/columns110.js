/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main 2-column grid (should be direct child of a layout container)
  const grid = element.querySelector('.nsdq-l-grid--2up') || element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get the two columns (left: text, right: image)
  const columns = grid.querySelectorAll(':scope > .layout__region');
  if (columns.length < 2) return;

  // Left column: all content (heading, subheading, list)
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // For left column, grab all content (heading + passage)
  // We'll combine the section heading and the text passage
  const heading = leftCol.querySelector('.jupiter22-c-section-heading');
  const passage = leftCol.querySelector('.jupiter22-c-text-passage');
  // Compose left cell content
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (passage) leftCellContent.push(passage);

  // For right column, grab the image gallery (should only be one image)
  const gallery = rightCol.querySelector('.jupiter22-c-media-gallery');
  let rightCellContent = [];
  if (gallery) {
    // Try to find the image inside the gallery
    const img = gallery.querySelector('img');
    if (img) {
      rightCellContent = [img];
    } else {
      // fallback: use the gallery div itself
      rightCellContent = [gallery];
    }
  }

  // Build the table rows
  const headerRow = ['Columns (columns110)'];
  const contentRow = [leftCellContent, rightCellContent];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
