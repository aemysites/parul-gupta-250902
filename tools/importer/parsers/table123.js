/* global WebImporter */
export default function parse(element, { document }) {
  // Find the table containing the membership data
  const skeletonWrapper = element.querySelector('.jupiter22-c-skeleton__wrapper');
  if (!skeletonWrapper) return;
  const table = skeletonWrapper.querySelector('table');
  if (!table) return;

  // Find thead and tbody
  const thead = table.querySelector('thead');
  const tbody = table.querySelector('tbody');
  if (!thead || !tbody) return;

  // Block header row (must be a single cell)
  const headerRow = ['Table (table123)'];

  // Compose data rows: skip the column header row
  const dataRows = [];
  tbody.querySelectorAll('tr').forEach((tr) => {
    const cells = [];
    tr.querySelectorAll('td').forEach((td) => {
      // Only include cells that have meaningful content
      const text = td.textContent.trim();
      if (text) {
        const cellDiv = document.createElement('div');
        Array.from(td.childNodes).forEach((node) => cellDiv.appendChild(node.cloneNode(true)));
        cells.push(cellDiv);
      }
    });
    // Only add rows that have at least one non-empty cell
    if (cells.length > 0) {
      dataRows.push(cells);
    }
  });

  // Build the cells array for createTable
  // First row: block name, then data rows
  const cells = [
    headerRow,
    ...dataRows
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
