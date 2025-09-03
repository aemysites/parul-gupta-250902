/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the accordion container
  const accordion = element.querySelector('.jupiter22-c-accordion');
  if (!accordion) return;

  // Prepare header row as required
  const headerRow = ['Accordion (accordion199)'];
  const rows = [headerRow];

  // Find all accordion panels (each is a section)
  const panels = accordion.querySelectorAll('.jupiter22-c-accordion-panel');

  panels.forEach(panel => {
    // Title cell: find the h3 inside the button
    let title = '';
    const button = panel.querySelector('.jupiter22-c-accordion-header__button');
    if (button) {
      const h3 = button.querySelector('h3');
      if (h3) {
        title = h3.textContent.trim();
      } else {
        // Fallback: use button text
        title = button.textContent.trim();
      }
    }

    // Content cell: find the panel body
    let contentCell;
    const body = panel.querySelector('.jupiter22-c-accordion-panel__body');
    if (body) {
      // Defensive: find the inner content
      const inner = body.querySelector('.jupiter22-c-accordion-panel__body-inner');
      if (inner) {
        // Reference the inner content directly
        contentCell = inner;
      } else {
        contentCell = body;
      }
    } else {
      contentCell = document.createElement('div');
    }

    // Push row: [title, content]
    rows.push([title, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original accordion element with the table
  accordion.replaceWith(table);
}
