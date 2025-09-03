/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all top-level input blocks in order
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Find the four main columns: Category, Freetext, From Date, To Date
  // 1. Category dropdown
  const category = children.find(div => div.classList.contains('jupiter22-c-form-category__container'));
  // 2. Freetext input
  const freetext = children.find(div => div.classList.contains('jupiter22-c-form-input__container'));
  // 3. From Date picker
  const fromDate = children.find(div => div.id === 'from-date');
  // 4. To Date picker
  const toDate = children.find(div => div.id === 'to-date');

  // Defensive fallback: if any are missing, skip that column
  const columns = [];
  if (category) columns.push(category);
  if (freetext) columns.push(freetext);
  if (fromDate) columns.push(fromDate);
  if (toDate) columns.push(toDate);

  // Table header row
  const headerRow = ['Columns (columns79)'];
  // Table content row: each cell is a column block
  const contentRow = columns;

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
