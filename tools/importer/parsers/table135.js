/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the skeleton table containing the actual data
  const skeletonWrapper = element.querySelector('.jupiter22-c-skeleton__wrapper');
  if (!skeletonWrapper) return;
  const table = skeletonWrapper.querySelector('table');
  if (!table) return;

  // Get all data rows (ignore thead, only tbody > tr)
  const tbody = table.querySelector('tbody');
  if (!tbody) return;
  const dataRows = Array.from(tbody.querySelectorAll('tr'));

  // Build the table rows for the block
  const rows = [];
  // Block header row (per spec)
  rows.push(['Table (table135)']);

  // For each data row, extract the cells
  dataRows.forEach((tr) => {
    const cells = Array.from(tr.querySelectorAll('td'));
    // Defensive: expect 2 columns: date and subject
    if (cells.length >= 2) {
      // Use the actual <a> element for the subject cell
      const dateCell = cells[0];
      const subjectCell = cells[1];
      // Place the date text and the <a> element directly
      const dateText = dateCell.textContent.trim();
      const subjectLink = subjectCell.querySelector('a');
      // Defensive: if no link, fallback to text
      rows.push([
        dateText,
        subjectLink ? subjectLink : subjectCell.textContent.trim()
      ]);
    }
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
