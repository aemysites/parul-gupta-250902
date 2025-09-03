/* global WebImporter */
export default function parse(element, { document }) {
  // Get all filter containers (columns)
  const filterContainers = element.querySelectorAll(':scope > .jupiter22-c-form-filter__container');

  if (!filterContainers.length) return;

  // The first four are the columns for the first row
  const columnsRow = Array.from(filterContainers).slice(0, 4);

  // Check if there is a 'Sort' dropdown (5th container)
  let rows = [];
  const headerRow = ['Columns (columns69)'];
  rows.push(headerRow);
  rows.push(columnsRow);

  if (filterContainers.length > 4) {
    // Only add a new row if there is content for more columns (avoid unnecessary empty columns)
    const sortContainer = filterContainers[4];
    if (sortContainer) {
      rows.push([sortContainer]);
    }
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
