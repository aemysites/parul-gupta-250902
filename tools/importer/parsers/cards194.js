/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards194)'];
  const rows = [headerRow];

  // Defensive: find all card containers
  const cardElements = Array.from(element.querySelectorAll('.jupiter22-c-callout-card'));

  cardElements.forEach((card) => {
    // --- IMAGE/ICON CELL ---
    let iconCell = null;
    // Try to find an <img> first
    const img = card.querySelector('.jupiter22-c-callout-card__icon img');
    if (img) {
      iconCell = img;
    } else {
      // If no <img>, try to find an <svg>
      const svg = card.querySelector('.jupiter22-c-callout-card__icon svg');
      if (svg) {
        iconCell = svg;
      }
    }
    // Fallback: if neither found, leave cell empty
    if (!iconCell) {
      iconCell = document.createElement('span');
    }

    // --- TEXT CELL ---
    const textWrapper = card.querySelector('.jupiter22-c-callout-card__text-wrapper');
    const textCellContent = [];
    if (textWrapper) {
      // Title link
      const titleLink = textWrapper.querySelector('.jupiter22-c-callout-card__title');
      if (titleLink) {
        textCellContent.push(titleLink);
      }
      // Description
      const desc = textWrapper.querySelector('.jupiter22-c-callout-card__description');
      if (desc) {
        textCellContent.push(desc);
      }
    }
    // Defensive: if nothing found, add empty span
    if (textCellContent.length === 0) {
      textCellContent.push(document.createElement('span'));
    }

    rows.push([iconCell, textCellContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
