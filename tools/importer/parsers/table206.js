/* global WebImporter */
export default function parse(element, { document }) {
  // Find the table
  const table = element.querySelector('table');
  if (!table) return;

  // Get all data rows from tbody
  const tbody = table.querySelector('tbody');
  if (!tbody) return;
  const rows = Array.from(tbody.querySelectorAll('tr'));

  // Build the block table cells array
  const cells = [];
  // First row: block name
  cells.push(['Table (table206)']);

  // Data rows: only include columns with actual content (no empty columns)
  rows.forEach(row => {
    const tds = Array.from(row.querySelectorAll('td'));
    // Remove empty cells from the end of the row
    let lastNonEmpty = tds.length - 1;
    while (lastNonEmpty >= 0 && tds[lastNonEmpty].textContent.trim() === '') {
      lastNonEmpty--;
    }
    if (lastNonEmpty >= 0) {
      const rowData = tds.slice(0, lastNonEmpty + 1).map(td => td.textContent.trim());
      cells.push(rowData);
    }
  });

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
