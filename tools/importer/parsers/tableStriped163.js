/* global WebImporter */
export default function parse(element, { document }) {
  // Find the stock splits block
  const stockSplitsBlock = element.querySelector('.jupiter22-stock-splits');
  if (!stockSplitsBlock) return;

  // Find the table container
  const tableDataContainer = stockSplitsBlock.querySelector('.jupiter22-stock-splits__data');
  let tableEl = null;
  if (tableDataContainer) {
    // Try to find a table inside the container
    tableEl = tableDataContainer.querySelector('table');
    // If not found, look for a custom element that might render a table
    if (!tableEl) {
      const nsdqTable = tableDataContainer.querySelector('nsdq-table');
      if (nsdqTable && nsdqTable.shadowRoot) {
        tableEl = nsdqTable.shadowRoot.querySelector('table');
      }
    }
  }

  // Defensive: If no table found, abort
  if (!tableEl) return;

  // Build the block table
  const cells = [];
  // Header row: block name (per guidelines)
  cells.push(['Table (striped, tableStriped163)']);
  // Second row: table element as a single cell
  cells.push([tableEl.cloneNode(true)]);

  // Replace the original element with the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
