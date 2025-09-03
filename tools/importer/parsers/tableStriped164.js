/* global WebImporter */
export default function parse(element, { document }) {
  // Only select actual data tables, not skeleton loaders
  const symbolTables = Array.from(element.querySelectorAll('table.jupiter22-c-symbol-table__table'))
    .filter(tbl => tbl.querySelectorAll('tbody tr').length > 0 && tbl.querySelectorAll('thead th').length > 0);

  // Helper to extract all rows from a symbol table, skipping thead header row
  function extractRowsFromTable(tbl) {
    const rows = [];
    // Get body rows only (skip thead)
    const bodyRows = Array.from(tbl.querySelectorAll('tbody tr'));
    bodyRows.forEach(tr => {
      const cells = Array.from(tr.querySelectorAll('td')).map(td => {
        // If cell contains a symbol/company div, extract both
        const symbolDiv = td.querySelector('.jupiter22-c-symbol-table__symbol-container');
        if (symbolDiv) {
          return Array.from(symbolDiv.childNodes).map(n => n.textContent.trim()).filter(Boolean).join(' ');
        }
        return td.textContent.trim();
      });
      if (cells.length > 0) rows.push(cells);
    });
    return rows;
  }

  // For each table, create a separate block table with the required header row
  symbolTables.forEach(tbl => {
    const allRows = extractRowsFromTable(tbl);
    // Defensive: If no rows found, fallback to empty cell
    const tableRows = allRows.length > 0 ? allRows : [['No tabular data found.']];
    const headerRow = ['Table (striped, tableStriped164)'];
    const cells = [headerRow, ...tableRows];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    tbl.replaceWith(block);
  });

  // Remove the original element if it is now empty
  if (element.childNodes.length === 0) {
    element.remove();
  }
}
