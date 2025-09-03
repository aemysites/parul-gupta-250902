/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract table rows for Most Advanced/Declined, merging symbol, % change, and company name into one row
  function extractBarChartRows(table) {
    const rows = [];
    if (!table) return rows;
    const trs = Array.from(table.querySelectorAll('tr'));
    // The first row is the header
    if (trs.length === 0) return rows;
    // Compose header row: Symbol, % Change, Company Name
    rows.push(['Symbol', '% Change', 'Company Name']);
    // Process pairs of rows: symbol row + name row
    for (let i = 1; i < trs.length; i++) {
      const tr = trs[i];
      const tds = tr.querySelectorAll('th,td');
      // If this is a symbol row (has more than 1 column)
      if (tds.length > 1) {
        let name = '';
        if (i + 1 < trs.length) {
          const nextTr = trs[i + 1];
          const nameTd = nextTr.querySelector('td');
          if (nameTd) name = nameTd.textContent.replace(/\s+/g, ' ').trim();
        }
        const symbol = tds[0].textContent.replace(/\s+/g, ' ').trim();
        const change = tds[1].textContent.replace(/\s+/g, ' ').trim();
        rows.push([symbol, change, name]);
        i++; // skip next row (already processed)
      }
    }
    return rows;
  }

  // Helper for Most Active tables (no row merging needed)
  function extractSymbolTableRows(table) {
    const rows = [];
    if (!table) return rows;
    const trs = table.querySelectorAll('tr');
    trs.forEach((tr, idx) => {
      const row = [];
      const tds = tr.querySelectorAll('th,td');
      tds.forEach((td) => {
        let txt = td.textContent.replace(/\s+/g, ' ').trim();
        // For symbol/company cell, merge both spans
        if (td.classList.contains('jupiter22-c-symbol-table__table-data-symbol')) {
          const symbolSpan = td.querySelector('.jupiter22-c-symbol-table__symbol');
          const companySpan = td.querySelector('.jupiter22-c-symbol-table__company-name');
          if (symbolSpan && companySpan) {
            txt = symbolSpan.textContent.replace(/\s+/g, ' ').trim() + ' ' + companySpan.textContent.replace(/\s+/g, ' ').trim();
          } else if (symbolSpan) {
            txt = symbolSpan.textContent.replace(/\s+/g, ' ').trim();
          }
        }
        // For change cell, merge price change and percentage change
        if (td.classList.contains('jupiter22-c-symbol-table__table-data-last-sale-change')) {
          const priceChange = td.querySelector('.jupiter22-c-symbol-table__last-sale-change');
          const percentChange = td.querySelector('.jupiter22-c-symbol-table__percentage-change');
          if (priceChange && percentChange) {
            txt = priceChange.textContent.replace(/\s+/g, ' ').trim() + ' ' + percentChange.textContent.replace(/\s+/g, ' ').trim();
          } else if (priceChange) {
            txt = priceChange.textContent.replace(/\s+/g, ' ').trim();
          }
        }
        row.push(txt);
      });
      // Remove trailing empty columns
      while (row.length && row[row.length - 1] === '') {
        row.pop();
      }
      if (row.length && row.some(cell => cell)) rows.push(row);
    });
    return rows;
  }

  // Helper to build a table block for a section
  function buildTableBlock(heading, timestamp, table, extractor) {
    const cells = [];
    const headerRow = ['Table (striped, tableStriped15)'];
    cells.push(headerRow);
    if (heading) cells.push([heading]);
    if (timestamp) cells.push([timestamp]);
    const tableRows = extractor(table);
    tableRows.forEach(r => cells.push(r));
    return WebImporter.DOMUtils.createTable(cells, document);
  }

  // Find the main block
  const mainBlock = element.querySelector('.nsdq-bento-layout__main') || element;

  // Collect all table sections
  const sections = [
    {
      table: mainBlock.querySelector('#mostadvanced .jupiter22-simple-bar-chart__table'),
      heading: mainBlock.querySelector('#mostadvanced .jupiter22-simple-bar-chart__title')?.textContent.trim(),
      timestamp: mainBlock.querySelector('#mostadvanced .jupiter22-simple-bar-chart-timestamp')?.textContent.trim(),
      extractor: extractBarChartRows,
    },
    {
      table: mainBlock.querySelector('#mostdeclined .jupiter22-simple-bar-chart__table'),
      heading: mainBlock.querySelector('#mostdeclined .jupiter22-simple-bar-chart__title')?.textContent.trim(),
      timestamp: mainBlock.querySelector('#mostdeclined .jupiter22-simple-bar-chart-timestamp')?.textContent.trim(),
      extractor: extractBarChartRows,
    },
    {
      table: mainBlock.querySelector('#stocksmost_active_share .jupiter22-c-symbol-table__table'),
      heading: mainBlock.querySelector('#stocksmost_active_share .jupiter22-mini-asset-class-tables__mini-table-header')?.textContent.trim(),
      timestamp: mainBlock.querySelector('#stocksmost_active_share .jupiter22-mini-asset-class-tables__mini-table-timestamp')?.textContent.trim(),
      extractor: extractSymbolTableRows,
    },
    {
      table: mainBlock.querySelector('#stocksmost_active_dollar .jupiter22-c-symbol-table__table'),
      heading: mainBlock.querySelector('#stocksmost_active_dollar .jupiter22-mini-asset-class-tables__mini-table-header')?.textContent.trim(),
      timestamp: mainBlock.querySelector('#stocksmost_active_dollar .jupiter22-mini-asset-class-tables__mini-table-timestamp')?.textContent.trim(),
      extractor: extractSymbolTableRows,
    },
  ];

  // Build and replace each block table in order
  let last = element;
  sections.forEach(({ table, heading, timestamp, extractor }, idx) => {
    if (table) {
      const block = buildTableBlock(heading, timestamp, table, extractor);
      if (idx === 0) {
        element.replaceWith(block);
        last = block;
      } else {
        last.after(block);
        last = block;
      }
    }
  });
}
