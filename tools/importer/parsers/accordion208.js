/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the accordion container (dl) inside the element
  const accordion = element.querySelector('dl.jupiter22-c-accordion');
  if (!accordion) return;

  // Prepare the header row as required
  const headerRow = ['Accordion (accordion208)'];
  const rows = [headerRow];

  // Find all accordion panels (each panel is a div with header and body)
  const panels = accordion.querySelectorAll(':scope > div.jupiter22-c-accordion-panel');

  panels.forEach(panel => {
    // Title cell: get the button text (usually inside h3)
    let titleCell = '';
    const button = panel.querySelector('.jupiter22-c-accordion-header__button');
    if (button) {
      const title = button.querySelector('.jupiter22-c-accordion-header__title');
      if (title) {
        titleCell = title;
      } else {
        // fallback: use button text
        titleCell = button.textContent.trim();
      }
    }

    // Content cell: get the panel body content
    let contentCell = '';
    const body = panel.querySelector('.jupiter22-c-accordion-panel__body');
    if (body) {
      // The actual content is usually inside a nested .body-inner
      const inner = body.querySelector('.jupiter22-c-accordion-panel__body-inner');
      if (inner) {
        contentCell = inner;
      } else {
        contentCell = body;
      }
    }

    // Add the row if both cells are present
    if (titleCell && contentCell) {
      rows.push([titleCell, contentCell]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
