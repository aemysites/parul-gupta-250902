/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <dl> accordion block
  const accordion = element.querySelector('dl.jupiter22-c-accordion');
  if (!accordion) return;

  // Build the header row as specified
  const headerRow = ['Accordion (accordion127)'];
  const rows = [headerRow];

  // Each accordion item is a <div.jupiter22-c-accordion-panel>
  const panels = accordion.querySelectorAll(':scope > div.jupiter22-c-accordion-panel');
  panels.forEach((panel) => {
    // Title cell: find the <h3> inside the button
    const headerBtn = panel.querySelector('.jupiter22-c-accordion-header__button');
    let titleCell = '';
    if (headerBtn) {
      const h3 = headerBtn.querySelector('h3');
      if (h3) titleCell = h3;
      else titleCell = headerBtn; // fallback: use the button
    }

    // Content cell: find the body-inner div
    let contentCell = '';
    const bodyInner = panel.querySelector('.jupiter22-c-accordion-panel__body-inner');
    if (bodyInner) {
      contentCell = bodyInner;
    } else {
      // fallback: try the panel body
      const dd = panel.querySelector('dd');
      if (dd) contentCell = dd;
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
