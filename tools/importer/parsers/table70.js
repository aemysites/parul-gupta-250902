/* global WebImporter */
export default function parse(element, { document }) {
  // Find the currencies table block
  const barChartTable = element.querySelector('.jupiter22-c-bar-chart-table__container');
  if (!barChartTable) return;

  // Get the actual data table
  const dataTable = barChartTable.querySelector('.jupiter22-c-bar-chart-table__table');
  if (!dataTable) return;

  // Get all data rows
  const tbody = dataTable.querySelector('tbody');
  let dataRows = [];
  if (tbody) {
    dataRows = Array.from(tbody.querySelectorAll('tr')).map(tr => {
      const tds = Array.from(tr.children);
      let symbol = '';
      let company = '';
      let percent = '';
      // More flexible: get all text content from the first cell
      if (tds[0]) {
        symbol = tds[0].textContent.trim();
      }
      // Get percent from the third cell
      if (tds[2]) {
        percent = tds[2].textContent.trim();
      }
      return [symbol, percent];
    });
  }

  // Compose table rows
  const cells = [];
  // Block header (single column only)
  cells.push(['Table (table70)']);
  // Data rows
  dataRows.forEach(row => {
    cells.push([row.join(' | ')]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
