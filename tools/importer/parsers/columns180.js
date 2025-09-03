/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with the columns
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get all immediate column items
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // For each column, grab the content for the cell
  const columnCells = columns.map(col => {
    // Find the number card inside each column
    const card = col.querySelector('.jupiter22-c-number-card');
    if (!card) return '';
    // Extract number and label
    const number = card.querySelector('.jupiter22-c-number-card__number');
    const label = card.querySelector('.jupiter22-c-number-card__text');
    // Compose a fragment to preserve semantic structure
    const frag = document.createElement('div');
    if (number) {
      // Use strong for the number for emphasis
      const strong = document.createElement('strong');
      strong.textContent = number.textContent.trim();
      frag.appendChild(strong);
      frag.appendChild(document.createElement('br'));
    }
    if (label) {
      // Use span for the label, preserve line breaks if present
      const lines = label.textContent.split(/\n|<br\s*\/?/i);
      lines.forEach((line, idx) => {
        frag.appendChild(document.createTextNode(line.trim()));
        if (idx < lines.length - 1) frag.appendChild(document.createElement('br'));
      });
    }
    return frag;
  });

  // Build the table rows
  const headerRow = ['Columns (columns180)'];
  const contentRow = columnCells;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
