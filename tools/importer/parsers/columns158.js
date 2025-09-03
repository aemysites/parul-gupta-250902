/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid container (2 columns)
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get the two column regions
  const regions = Array.from(grid.children).filter(child => child.classList.contains('layout__region'));
  if (regions.length < 2) return;

  // Each region contains two section headings: h2 (title) and h3 (desc)
  function getColumnContent(region) {
    // Get all direct children divs (section headings)
    const sections = Array.from(region.children).filter(el => el.tagName === 'DIV');
    if (sections.length < 2) return region; // fallback: whole region
    // Get the h2 and h3 elements
    const h2 = sections[0].querySelector('h2');
    const h3 = sections[1].querySelector('h3');
    // Defensive: If missing, fallback to region
    if (!h2 || !h3) return region;
    // Compose a fragment with both
    const frag = document.createElement('div');
    frag.appendChild(h2);
    frag.appendChild(h3);
    return frag;
  }

  // Build the table rows
  const headerRow = ['Columns (columns158)'];
  const contentRow = regions.map(getColumnContent);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(block);
}
