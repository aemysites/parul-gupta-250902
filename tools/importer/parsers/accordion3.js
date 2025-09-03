/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the accordion block (dl with accordion classes)
  const accordion = element.querySelector('dl.jupiter22-c-accordion');
  if (!accordion) return;

  // Table header row as required
  const headerRow = ['Accordion (accordion3)'];
  const rows = [headerRow];

  // Get all accordion panels (each is a div)
  const panels = accordion.querySelectorAll(':scope > div.jupiter22-c-accordion-panel');

  panels.forEach(panel => {
    // Title cell: Find the header text (h3 inside button)
    let titleCell = '';
    const header = panel.querySelector('dt');
    if (header) {
      const h3 = header.querySelector('h3');
      if (h3) {
        titleCell = h3;
      } else {
        // Fallback: Use button text
        const btnText = header.querySelector('.jupiter22-c-accordion-header__button-text');
        if (btnText) {
          titleCell = btnText;
        } else {
          titleCell = header;
        }
      }
    }

    // Content cell: Find the body content (dd > ...)
    let contentCell = '';
    const dd = panel.querySelector('dd');
    if (dd) {
      // Defensive: get the inner content
      const inner = dd.querySelector('.jupiter22-c-accordion-panel__body-inner');
      if (inner) {
        // Use the text passage block if present
        const passage = inner.querySelector('.jupiter22-c-text-passage');
        if (passage) {
          contentCell = passage;
        } else {
          contentCell = inner;
        }
      } else {
        contentCell = dd;
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
