/* global WebImporter */
export default function parse(element, { document }) {
  // Get all accordion panels (each is a div)
  const panels = Array.from(element.querySelectorAll(':scope > div'));

  // Table header row as required
  const headerRow = ['Accordion (accordion90)'];

  // Build rows for each accordion item
  const rows = panels.map(panel => {
    // Title cell: get the h3 node (reference, not text)
    let titleCell = '';
    const headerButton = panel.querySelector('.jupiter22-c-accordion-header__button');
    if (headerButton) {
      const h3 = headerButton.querySelector('h3');
      if (h3) {
        titleCell = h3;
      }
    }

    // Content cell: get the content node (reference, not text)
    let contentCell = '';
    const body = panel.querySelector('.jupiter22-c-accordion-panel__body');
    if (body) {
      const inner = body.querySelector('.jupiter22-c-accordion-panel__body-inner');
      if (inner) {
        // Use the inner content node directly
        contentCell = inner;
      } else {
        contentCell = body;
      }
    }

    // Always return array of [title, content] (may be empty string if missing)
    return [titleCell || '', contentCell || ''];
  });

  // Compose table data
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(block);
}
