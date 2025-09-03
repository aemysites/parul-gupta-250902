/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all immediate card elements
  const cardsContainer = element.querySelector('.jupiter22-journey-cards-container');
  if (!cardsContainer) return;
  const cardEls = Array.from(cardsContainer.children).filter(card => card.classList.contains('jupiter22-journey-card'));

  // Prepare the header row
  const headerRow = ['Cards (cards181)'];
  const rows = [headerRow];

  cardEls.forEach(card => {
    // Image cell
    let imgCell = null;
    const figure = card.querySelector('.jupiter22-journey-card__image');
    if (figure) {
      const img = figure.querySelector('img');
      if (img) {
        imgCell = img;
      }
    }
    // Defensive fallback: if no image, leave cell empty
    if (!imgCell) imgCell = '';

    // Text cell
    const body = card.querySelector('.jupiter22-journey-card__body');
    const textParts = [];
    if (body) {
      // Subtitle (small heading)
      const subtitle = body.querySelector('.jupiter22-journey-card__subtitle');
      if (subtitle) textParts.push(subtitle);
      // Title (main heading)
      const title = body.querySelector('.jupiter22-journey-card__title');
      if (title) textParts.push(title);
      // Description (paragraphs and lists)
      const passage = body.querySelector('.jupiter22-c-text-passage');
      if (passage) textParts.push(passage);
    }
    // Defensive fallback: if no text, leave cell empty
    const textCell = textParts.length ? textParts : '';

    rows.push([imgCell, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
