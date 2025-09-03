/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the accordion container
  const accordion = element.querySelector('.jupiter22-c-accordion');
  if (!accordion) return;

  // Header row as required
  const headerRow = ['Accordion (accordion196)'];
  const rows = [headerRow];

  // Find all accordion panels (each is a row)
  const panels = accordion.querySelectorAll('.jupiter22-c-accordion-panel');
  panels.forEach(panel => {
    // Title cell: find the header title
    let titleCell = '';
    const header = panel.querySelector('.jupiter22-c-accordion-header__title');
    if (header) {
      titleCell = header.textContent.trim();
    } else {
      // fallback: try button text
      const btnText = panel.querySelector('.jupiter22-c-accordion-header__button-text');
      if (btnText) titleCell = btnText.textContent.trim();
    }

    // Content cell: find the body
    let contentCell = '';
    // Instead of just textContent, include the full body HTML as a fragment
    const bodyInner = panel.querySelector('.jupiter22-c-accordion-panel__body-inner');
    if (bodyInner) {
      // Use all child nodes for full fidelity
      const fragment = document.createElement('div');
      Array.from(bodyInner.childNodes).forEach(node => fragment.appendChild(node.cloneNode(true)));
      contentCell = fragment.childNodes.length === 1 ? fragment.firstChild : fragment;
    } else {
      // fallback: try panel body
      const dd = panel.querySelector('.jupiter22-c-accordion-panel__body');
      if (dd) {
        const fragment = document.createElement('div');
        Array.from(dd.childNodes).forEach(node => fragment.appendChild(node.cloneNode(true)));
        contentCell = fragment.childNodes.length === 1 ? fragment.firstChild : fragment;
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
