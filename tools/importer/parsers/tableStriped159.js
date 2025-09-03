/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main crypto table block
  const chartTableBlock = element.querySelector('.jupiter22-c-bar-chart-table');
  if (!chartTableBlock) return;

  // Find the heading ("Cryptocurrencies")
  let heading = chartTableBlock.previousElementSibling;
  let headingText = '';
  if (heading) {
    const h2 = heading.querySelector('h2');
    if (h2) headingText = h2.textContent.trim();
  }

  // Find the date
  const dateSpan = chartTableBlock.querySelector('.jupiter22-c-bar-chart-table__date');
  let dateText = '';
  if (dateSpan) {
    dateText = dateSpan.textContent.trim();
  }

  // Find the actual table
  const table = chartTableBlock.querySelector('.jupiter22-c-bar-chart-table__table');
  if (!table) return;

  // Extract table rows and columns as text
  const rows = [];

  // First, add heading and date as a row (if present)
  if (headingText || dateText) {
    const info = [];
    if (headingText) info.push(headingText);
    if (dateText) info.push(dateText);
    rows.push(info);
  }

  // Extract header row from table
  const theadRow = table.querySelector('thead tr');
  if (theadRow) {
    const headerCells = Array.from(theadRow.children).map(cell => cell.textContent.trim());
    rows.push(headerCells);
  }

  // Extract body rows
  const tbodyRows = table.querySelectorAll('tbody tr');
  tbodyRows.forEach(tr => {
    const row = [];
    tr.querySelectorAll('td').forEach(td => {
      // If cell contains symbol/company, combine them
      const symbolContainer = td.querySelector('.jupiter22-c-bar-chart-table__symbol-container');
      if (symbolContainer) {
        const symbol = symbolContainer.querySelector('.jupiter22-c-bar-chart-table__symbol');
        const company = symbolContainer.querySelector('.jupiter22-c-bar-chart-table__company-name');
        let cellText = '';
        if (symbol) cellText += symbol.textContent.trim();
        if (company) cellText += '\n' + company.textContent.trim();
        row.push(cellText);
      } else {
        row.push(td.textContent.trim());
      }
    });
    rows.push(row);
  });

  // Extract footer row labels if present
  const tfootRow = table.querySelector('tfoot tr');
  if (tfootRow) {
    const footerCells = Array.from(tfootRow.children).map(cell => cell.textContent.trim());
    rows.push(footerCells);
  }

  // Compose the block table
  const headerRow = ['Table (striped, tableStriped159)'];
  const cells = [headerRow, ...rows.map(r => [r])];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
