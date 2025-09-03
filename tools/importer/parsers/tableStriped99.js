/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main table block for Gainers/Decliners
  const mainTableBlock = element.querySelector('.jupiter22-mini-asset-class-tables__table');
  if (!mainTableBlock) return;

  // Find the wrapper containing both Gainers and Decliners
  const miniTablesWrapper = mainTableBlock.closest('.jupiter22-mini-asset-class-tables__mini-tables-wrapper');
  if (!miniTablesWrapper) return;

  // Find all mini-table wrappers (Gainers and Decliners)
  const sectionWrappers = Array.from(miniTablesWrapper.querySelectorAll('.jupiter22-mini-asset-class-tables__mini-table-wrapper'));
  if (sectionWrappers.length === 0) return;

  // Compose a single block cell with all content (header, timestamp, table) for each section
  const contentDiv = document.createElement('div');
  sectionWrappers.forEach(sectionWrapper => {
    const header = sectionWrapper.querySelector('.jupiter22-mini-asset-class-tables__mini-table-header');
    const timestamp = sectionWrapper.querySelector('.jupiter22-mini-asset-class-tables__mini-table-timestamp');
    const table = sectionWrapper.querySelector('table.jupiter22-c-symbol-table__table');
    if (header) contentDiv.appendChild(header.cloneNode(true));
    if (timestamp) contentDiv.appendChild(timestamp.cloneNode(true));
    if (table) contentDiv.appendChild(table.cloneNode(true));
  });

  // Compose the block table with the required header row
  const headerRow = ['Table (striped, tableStriped99)'];
  const cells = [headerRow, [contentDiv]];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
