/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main accordion <dl> with panels
  const accordionDl = element.querySelector('dl.jupiter22-c-accordion');
  if (!accordionDl) return;

  // Find all panels inside this accordion
  const panels = accordionDl.querySelectorAll(':scope > div.jupiter22-c-accordion-panel');
  if (!panels.length) return;

  // Header row as required
  const headerRow = ['Accordion (accordion59)'];
  const rows = [headerRow];

  panels.forEach(panel => {
    // Title cell: find the <h3> inside the button
    const header = panel.querySelector('.jupiter22-c-accordion-header__title');
    // Content cell: find the body-inner div (contains all content)
    const bodyInner = panel.querySelector('.jupiter22-c-accordion-panel__body-inner');
    if (header && bodyInner) {
      rows.push([header.textContent.trim(), bodyInner]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
