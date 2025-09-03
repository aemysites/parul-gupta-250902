/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate dropdown containers (these are the columns)
  const columnContainers = element.querySelectorAll(':scope > div.jupiter22-c-dropdown-container');

  // If there are no columns, do nothing
  if (!columnContainers || columnContainers.length === 0) return;

  // For each dropdown container, get its dropdown-list-box (the visible dropdown)
  const columns = Array.from(columnContainers).map((container) => {
    // Each container should have a single dropdown-list-box div
    const dropdownBox = container.querySelector(':scope > div.dropdown-list-box');
    // If found, use the dropdownBox; else, fallback to container itself
    const colEl = dropdownBox || container;
    // Extract all text content from the dropdown (including label)
    // Try to get the selecttitle attribute from the nsdq-dropdown
    const nsdq = colEl.querySelector('nsdq-dropdown');
    let label = '';
    if (nsdq && nsdq.getAttribute('selecttitle')) {
      label = nsdq.getAttribute('selecttitle');
    }
    // Instead of just the label, include all text content from the dropdown
    let textContent = colEl.textContent.trim();
    // If textContent is empty, fallback to label
    if (!textContent && label) textContent = label;
    // Return the full text content (not just the label)
    return textContent;
  });

  // Table header row: must match block name exactly (single column)
  const headerRow = ['Columns (columns14)'];
  // Table second row: each dropdown as a column
  const columnsRow = columns;

  // Use DOMUtils to ensure correct header row structure (single cell)
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block
  element.replaceWith(block);
}
