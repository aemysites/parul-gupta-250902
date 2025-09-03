/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // Find the two columns (left and right)
  // The columns are the direct children of the .nsdq-l-grid--2up grid
  const grid = element.querySelector('.nsdq-l-grid--2up');
  if (!grid) return;
  const columns = getDirectChildren(grid, '.layout__region');
  if (columns.length < 2) return;

  // For each column, gather all content (including heading, card, accordion)
  const columnCells = columns.map(col => {
    // We'll collect all relevant children in order
    // (heading, intro, card, accordion)
    const colContent = [];
    // Section heading (eg. Early Stage, Mid Stage)
    const heading = col.querySelector('.jupiter22-c-section-heading');
    if (heading) colContent.push(heading);
    // Intro (eg. #1 workOS)
    const intro = col.querySelector('.jupiter22-c-text-passage');
    if (intro) {
      // Remove <hr> if present
      const introClone = intro.cloneNode(true);
      introClone.querySelectorAll('hr').forEach(hr => hr.remove());
      colContent.push(introClone);
    }
    // Card (main card for #1)
    const card = col.querySelector('.jupiter22-c-card');
    if (card) colContent.push(card);
    // Accordion (rest of the list)
    const accordion = col.querySelector('.jupiter22-c-accordion');
    if (accordion) colContent.push(accordion);
    // Wrap all in a div for structure
    const wrapper = document.createElement('div');
    colContent.forEach(node => wrapper.appendChild(node));
    return wrapper;
  });

  // Table structure: header row, then one row with two columns (the two columns)
  const headerRow = ['Columns (columns149)'];
  const contentRow = columnCells;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
