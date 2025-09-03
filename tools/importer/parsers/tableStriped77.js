/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main statistics table
  const skeletonWrapper = element.querySelector('.jupiter22-c-skeleton__wrapper');
  if (!skeletonWrapper) return;
  const table = skeletonWrapper.querySelector('table');
  if (!table) return;

  // Get table head and body rows
  const thead = table.querySelector('thead');
  const tbody = table.querySelector('tbody');
  if (!thead || !tbody) return;

  // Block header row (per requirements)
  const headerRow = ['Table (striped, tableStriped77)'];

  // Extract column headers from thead
  const ths = thead.querySelectorAll('th');
  const columnHeaderRow = Array.from(ths).map(th => th.textContent.trim());

  // Extract all data rows from tbody
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const dataRows = rows.map(tr => {
    // For each cell, preserve links and icons as elements
    return Array.from(tr.querySelectorAll('td')).map(td => {
      // If cell contains both svg and link, keep both
      const cellChildren = Array.from(td.childNodes).filter(node => {
        // Remove whitespace-only text nodes
        return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
      });
      if (cellChildren.length === 1) {
        // Just text or a single element
        return cellChildren[0];
      } else if (cellChildren.length > 1) {
        // Multiple elements (e.g., svg + link)
        return cellChildren;
      } else {
        // Fallback: empty cell
        return '';
      }
    });
  });

  // Compose the table cells array
  const cells = [
    headerRow,
    columnHeaderRow,
    ...dataRows
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
