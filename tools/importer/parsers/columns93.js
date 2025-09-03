/* global WebImporter */
export default function parse(element, { document }) {
  // Find the media gallery grid containing the images
  const galleryBody = element.querySelector('.jupiter22-c-media-gallery__body');
  if (!galleryBody) return;
  const grid = galleryBody.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get all immediate grid items (each contains an image)
  const gridItems = Array.from(grid.children).filter(child => child.classList.contains('nsdq-l-grid__item'));

  // Each image becomes a column in the second row
  const images = gridItems.map(item => {
    const img = item.querySelector('img');
    // Reference the existing <img> element directly
    return img ? img : document.createTextNode('');
  });

  // Build the table rows
  const headerRow = ['Columns (columns93)'];
  const columnsRow = images;

  const cells = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
