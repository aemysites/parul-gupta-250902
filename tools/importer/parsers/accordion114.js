/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the accordion block
  const accordion = element.querySelector('.jupiter22-c-accordion');
  if (!accordion) return;

  // Table header row as required
  const headerRow = ['Accordion (accordion114)'];
  const rows = [headerRow];

  // Find all accordion panels
  const panels = accordion.querySelectorAll('.jupiter22-c-accordion-panel');
  panels.forEach((panel) => {
    // Title cell: get the h3 inside the button
    let titleEl = panel.querySelector('.jupiter22-c-accordion-header__title');
    // Defensive: fallback to button text if h3 missing
    if (!titleEl) {
      const btnText = panel.querySelector('.jupiter22-c-accordion-header__button-text');
      titleEl = btnText ? btnText.cloneNode(true) : document.createElement('span');
    }

    // Content cell: get the body-inner div
    let contentEl = panel.querySelector('.jupiter22-c-accordion-panel__body-inner');
    // Defensive: fallback to panel body if missing
    if (!contentEl) {
      contentEl = panel.querySelector('.jupiter22-c-accordion-panel__body') || document.createElement('div');
    }

    rows.push([titleEl, contentEl]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original accordion element with the block
  accordion.replaceWith(block);
}
