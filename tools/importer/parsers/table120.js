/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Table (table120)'];
  const cells = [headerRow];

  // Helper: Extracts all visible text from a table row (tr)
  function extractRowText(tr) {
    return Array.from(tr.children).map(td => td.textContent.trim()).filter(Boolean);
  }

  // IPO Calendar block
  const mainBlock = element.querySelector('.jupiter22-ma-calendar');
  if (mainBlock) {
    // Find the 'Upcoming' section table
    const upcomingSection = mainBlock.querySelector('.jupiter22-ipo-calendar__upcoming');
    if (upcomingSection) {
      const tableBlock = upcomingSection.querySelector('.jupiter22-c-symbol-table table');
      if (tableBlock) {
        // Extract header row
        const thead = tableBlock.querySelector('thead');
        if (thead) {
          const headerCells = extractRowText(thead.querySelector('tr'));
          if (headerCells.length) cells.push(headerCells);
        }
        // Extract body rows
        const tbody = tableBlock.querySelector('tbody');
        if (tbody) {
          Array.from(tbody.querySelectorAll('tr')).forEach(tr => {
            const rowCells = extractRowText(tr);
            if (rowCells.length) cells.push(rowCells);
          });
        }
      }
    }
  }

  // Other Calendars: Dividends, Earnings, Economic, Stock Splits
  const otherSections = Array.from(document.querySelectorAll('.jupiter22-market-events-detail'));
  otherSections.forEach(section => {
    // Find the symbol table in this section
    const symbolTable = section.querySelector('.jupiter22-c-symbol-table table');
    if (symbolTable) {
      // Section heading row
      const heading = section.querySelector('.jupiter22-market-events-detail__title');
      if (heading) cells.push([heading.textContent.trim()]);
      // Timestamp row
      const timestamp = section.querySelector('.jupiter22-market-events-detail__timestamp');
      if (timestamp) cells.push([timestamp.textContent.trim()]);
      // Table header
      const thead = symbolTable.querySelector('thead');
      if (thead) {
        const headerCells = extractRowText(thead.querySelector('tr'));
        if (headerCells.length) cells.push(headerCells);
      }
      // Table body
      const tbody = symbolTable.querySelector('tbody');
      if (tbody) {
        Array.from(tbody.querySelectorAll('tr')).forEach(tr => {
          const rowCells = extractRowText(tr);
          if (rowCells.length) cells.push(rowCells);
        });
      }
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
