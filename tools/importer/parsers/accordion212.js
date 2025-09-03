/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (2 columns)
  const grid = element.querySelector('.nsdq-l-grid--2up, .nsdq-l-grid');
  if (!grid) return;
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 1) return;

  // Left column: heading, intro, accordion
  const leftRegion = regions[0];
  // Find accordion
  const accordion = leftRegion.querySelector('.jupiter22-c-accordion');
  if (!accordion) return;

  // Build header row
  const headerRow = ['Accordion (accordion212)'];
  const rows = [headerRow];

  // For each accordion panel, extract title and content
  const panels = accordion.querySelectorAll(':scope > .jupiter22-c-accordion-panel');
  panels.forEach(panel => {
    // Title cell: find the button text (h3)
    let title = '';
    const titleEl = panel.querySelector('.jupiter22-c-accordion-header__title');
    if (titleEl) {
      title = titleEl.textContent.trim();
    }
    // Content cell: get all content from the panel body
    let contentCell = '';
    const body = panel.querySelector('.jupiter22-c-accordion-panel__body');
    if (body) {
      // Clone the body inner content to preserve markup
      const inner = body.querySelector('.jupiter22-c-accordion-panel__body-inner');
      if (inner) {
        // Create a fragment and append all children of inner
        const frag = document.createElement('div');
        Array.from(inner.childNodes).forEach(node => {
          frag.appendChild(node.cloneNode(true));
        });
        contentCell = frag;
      } else {
        // fallback: clone the body itself
        contentCell = body.cloneNode(true);
      }
    }
    rows.push([title, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
