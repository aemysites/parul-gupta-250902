/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with two columns
  const grid = element.querySelector('.nsdq-l-grid--2up, .nsdq-l-grid');
  if (!grid) return;

  // Get the column regions
  const regions = Array.from(grid.children).filter(child => child.classList.contains('layout__region'));
  if (regions.length < 2) return;

  // Helper to extract all main content from a region
  function extractFullContent(region) {
    // Get the content card body (title + description)
    const cardBody = region.querySelector('.jupiter22-c-content-card__body');
    if (!cardBody) return '';
    // Instead of cloning, extract all text content as a fragment
    const fragment = document.createDocumentFragment();
    // Get the title
    const title = cardBody.querySelector('.jupiter22-c-content-card__title');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      fragment.appendChild(h3);
    }
    // Get the description
    const desc = cardBody.querySelector('.jupiter22-c-text-passage');
    if (desc) {
      const p = desc.querySelector('p');
      if (p) {
        const pElem = document.createElement('p');
        pElem.textContent = p.textContent.trim();
        fragment.appendChild(pElem);
      }
    }
    return fragment;
  }

  // Build the header row
  const headerRow = ['Columns (columns4)'];

  // Build the content row with two columns, each containing full card body
  const contentRow = regions.map(region => extractFullContent(region));

  // Compose the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
