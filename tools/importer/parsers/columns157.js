/* global WebImporter */
export default function parse(element, { document }) {
  // Extract left column: title text
  let leftContent = '';
  const title = element.querySelector('.jupiter22-c-nav__title h3');
  if (title) {
    leftContent = title.textContent.trim();
  }

  // Extract right column: CTA link (as text only)
  let rightContent = '';
  const cta = element.querySelector('.jupiter22-c-nav__ctas a');
  if (cta) {
    rightContent = cta.textContent.trim();
  }

  // Header row: must be exactly one column
  const headerRow = ['Columns (columns157)'];
  // Content row: two columns
  const contentRow = [leftContent, rightContent];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
