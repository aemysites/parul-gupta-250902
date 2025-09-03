/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards109)'];

  // Find the card (left side)
  const cardEl = element.querySelector('.jupiter22-c-info-card');
  let image = null;
  if (cardEl) {
    const imgEl = cardEl.querySelector('img');
    if (imgEl) {
      image = imgEl.cloneNode(true);
    }
  }

  // Text content (right side)
  const textContainer = element.querySelector('.layout-right-rail .jupiter22-c-section-heading__text');
  let textContent = null;
  if (textContainer) {
    // Gather all paragraphs into a single fragment
    const frag = document.createElement('div');
    Array.from(textContainer.children).forEach((child) => {
      frag.appendChild(child.cloneNode(true));
    });
    textContent = frag;
  }

  // Compose row
  const row = [image, textContent];
  const cells = [headerRow, row];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
