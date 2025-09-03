/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the main card content for each column
  function extractCardContent(card) {
    const fragment = document.createElement('div');
    // Icon (img or svg)
    const header = card.querySelector('.jupiter22-c-content-card__header');
    if (header) {
      const icon = header.querySelector('.jupiter22-c-content-card__icon');
      if (icon) {
        const img = icon.querySelector('img');
        if (img) fragment.appendChild(img.cloneNode(true));
        else {
          const svg = icon.querySelector('svg');
          if (svg) fragment.appendChild(svg.cloneNode(true));
        }
      }
    }
    // Title
    const title = card.querySelector('.jupiter22-c-content-card__title');
    if (title) fragment.appendChild(title.cloneNode(true));
    // Description (all p tags inside .jupiter22-c-text-passage)
    const descs = card.querySelectorAll('.jupiter22-c-text-passage p');
    descs.forEach(p => fragment.appendChild(p.cloneNode(true)));
    // Link(s)
    const links = card.querySelectorAll('.jupiter22-c-content-card__links a');
    links.forEach(link => {
      fragment.appendChild(link.cloneNode(true));
    });
    return fragment;
  }

  // Find the two columns
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // For each region, find the card and extract its content
  const cellsRow = [];
  regions.forEach(region => {
    const card = region.querySelector('.jupiter22-c-content-card');
    if (card) {
      cellsRow.push(extractCardContent(card));
    } else {
      cellsRow.push(''); // fallback empty cell
    }
  });

  // Build table
  const headerRow = ['Columns (columns91)'];
  const cells = [headerRow, cellsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(block);
}
