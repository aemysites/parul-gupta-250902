/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel container
  const carousel = element.querySelector('.jupiter22-series-video-player__list-carousel');
  if (!carousel) return;

  // Find all card/button items
  const cardButtons = Array.from(carousel.querySelectorAll(':scope > .jupiter22-series-video-player__button-item'));
  if (!cardButtons.length) return;

  // Prepare table rows
  const rows = [];
  // Header row as per block requirements
  rows.push(['Cards (cards1)']);

  cardButtons.forEach((btn) => {
    // --- IMAGE/ICON CELL ---
    let imageCell = null;
    const figure = btn.querySelector('figure.jupiter22-series-video-player__image');
    if (figure) {
      imageCell = figure.cloneNode(true);
    } else {
      const img = btn.querySelector('img');
      if (img) imageCell = img.cloneNode(true);
    }

    // --- TEXT CELL ---
    const textCellContent = [];
    // Title (with icon SVG)
    const titleSpan = btn.querySelector('.jupiter22-series-video-player__sidebar-title');
    if (titleSpan) {
      // Clone the title span and remove the SVG icon for cleaner output
      const titleClone = titleSpan.cloneNode(true);
      // Remove SVG icon if present
      const icon = titleClone.querySelector('.jupiter22-series-video-player__media-icon');
      if (icon) icon.remove();
      // Wrap in <strong> for heading effect
      const strong = document.createElement('strong');
      strong.innerHTML = titleClone.innerHTML.trim();
      textCellContent.push(strong);
    }
    // Date (from metadata)
    const meta = btn.querySelector('.jupiter22-c-metadata li');
    if (meta) {
      const dateDiv = document.createElement('div');
      dateDiv.textContent = meta.textContent.trim();
      dateDiv.style.fontSize = '12px';
      dateDiv.style.color = '#888';
      textCellContent.push(dateDiv);
    }
    // Compose text cell
    let textCell;
    if (textCellContent.length === 1) {
      textCell = textCellContent[0];
    } else if (textCellContent.length > 1) {
      const wrapper = document.createElement('div');
      textCellContent.forEach((el) => wrapper.appendChild(el));
      textCell = wrapper;
    } else {
      textCell = '';
    }

    // Add the row: [image/icon, text cell]
    rows.push([imageCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
