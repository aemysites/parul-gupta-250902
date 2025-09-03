/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;
  const gridItems = Array.from(grid.querySelectorAll('.nsdq-l-grid__item'));
  if (gridItems.length === 0) return;

  // Header row must match block name exactly
  const headerRow = ['Columns (columns177)'];

  // Each column cell: preserve all content and semantic meaning
  const columnsRow = gridItems.map((item) => {
    // Use the direct child of grid item for content
    // If only one child div, use that; else use the grid item itself
    let content = item;
    const directDivs = item.querySelectorAll(':scope > div');
    if (directDivs.length === 1) {
      content = directDivs[0];
    }
    // Return reference to the actual DOM node (not clone)
    return content;
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
