/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main skeleton table inside the element
  const table = element.querySelector('table.jupiter22-c-skeleton');
  if (!table) return;

  // Get the tbody rows (data rows)
  const tbody = table.querySelector('tbody');
  if (!tbody) return;
  const rows = Array.from(tbody.querySelectorAll('tr'));

  // Build the table cells array
  const cells = [];

  // Header row: always use block name
  cells.push(['Table (table26)']);

  // For each data row, extract the cell contents (not elements!) and push as a row
  rows.forEach((tr) => {
    const tds = Array.from(tr.querySelectorAll('td'));
    if (tds.length !== 4) return;
    // For the "Attachment" cell, keep both SVG and link together as an array
    // For the "Subject" cell, keep the link element
    // For the rest, use textContent
    const rowCells = [
      tds[0].textContent.trim(), // Date (CET)
      tds[1].textContent.trim(), // Category
      tds[2].querySelector('a') ? tds[2].querySelector('a') : tds[2].textContent.trim(), // Subject (link or text)
      [
        tds[3].querySelector('svg'),
        tds[3].querySelector('a')
      ].filter(Boolean) // Attachment (svg and link)
    ];
    cells.push(rowCells);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
