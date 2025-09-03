/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion root (the <dl> element)
  const accordion = element.querySelector('dl.jupiter22-c-accordion');
  if (!accordion) return;

  // Prepare the header row as required
  const headerRow = ['Accordion (accordion58)'];
  const rows = [headerRow];

  // Get all accordion panels
  const panels = accordion.querySelectorAll(':scope > .jupiter22-c-accordion-panel');

  panels.forEach(panel => {
    // Title cell: get the <h3> inside the button
    let titleText = '';
    const headerBtn = panel.querySelector('.jupiter22-c-accordion-header__button');
    if (headerBtn) {
      const h3 = headerBtn.querySelector('h3');
      if (h3) {
        titleText = h3.textContent.trim();
      }
    }

    // Content cell: get the content div inside the panel body
    let contentCell = '';
    const bodyInner = panel.querySelector('.jupiter22-c-accordion-panel__body-inner');
    if (bodyInner) {
      // Use the entire inner content as the cell (preserves paragraphs, links, etc)
      contentCell = bodyInner;
    }

    // Defensive: fallback to empty string if missing
    rows.push([
      titleText || '',
      contentCell || ''
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original accordion with the table
  accordion.replaceWith(table);
}
