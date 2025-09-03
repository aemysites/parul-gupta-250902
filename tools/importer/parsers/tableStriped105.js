/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main skeleton table inside the block
  const table = element.querySelector('.jupiter22-c-skeleton.jupiter22-c-skeleton--table-loader');
  if (!table) return;

  // Get all data rows from tbody
  const tbody = table.querySelector('tbody');
  let dataRows = [];
  if (tbody) {
    const trs = tbody.querySelectorAll('tr');
    trs.forEach(tr => {
      const tds = tr.querySelectorAll('td');
      let row = [];
      // Only include non-empty cells
      tds.forEach(td => {
        // Collect all text and links in cell, preserving order
        let cellContent = [];
        td.childNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'A') {
            cellContent.push(node);
          } else if (node.nodeType === Node.TEXT_NODE) {
            const txt = node.textContent;
            if (txt && txt.trim()) cellContent.push(txt.trim());
          }
        });
        // If cellContent is empty, fallback to td.textContent
        if (cellContent.length === 0) {
          const txt = td.textContent;
          if (txt && txt.trim()) cellContent.push(txt.trim());
        }
        // Only add cell if it has content
        if (cellContent.length === 1) {
          if (cellContent[0] !== '') row.push(cellContent[0]);
        } else if (cellContent.length > 1) {
          row.push(cellContent);
        }
        // If cell is empty, skip it (do not push '')
      });
      // Only add row if it has at least one non-empty cell
      if (row.length > 0) {
        dataRows.push(row);
      }
    });
  }

  // Compose the block table
  // First row: block name only
  const headerRow = ['Table (striped, tableStriped105)'];
  // Next: all data rows
  const cells = [headerRow, ...dataRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
