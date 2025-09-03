/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container with the cards
  const grid = element.querySelector('.component_block_container');
  if (!grid) return;

  // Get all card elements (each card is a grid item)
  const cards = Array.from(grid.children).filter(card => card.classList.contains('jupiter22-c-card'));

  // Table header
  const headerRow = ['Cards (cards103)'];
  const rows = [headerRow];

  // For each card, extract image and text content
  cards.forEach(card => {
    // Defensive: Find info card body
    const infoCard = card.querySelector('.jupiter22-c-info-card');
    if (!infoCard) return;

    // --- IMAGE CELL ---
    let imgEl = null;
    const figure = infoCard.querySelector('header figure');
    if (figure) {
      imgEl = figure.querySelector('img');
    }
    // If no image, skip this card
    if (!imgEl) return;

    // --- TEXT CELL ---
    const textCellContent = [];
    // Title (h3)
    const title = infoCard.querySelector('.jupiter22-c-info-card__title');
    if (title) textCellContent.push(title);
    // Description (p)
    const desc = infoCard.querySelector('.jupiter22-c-text-passage p');
    if (desc) textCellContent.push(desc);
    // CTA link
    const link = infoCard.querySelector('.jupiter22-c-info-card__link');
    if (link) textCellContent.push(link);

    // Add row: [image, text content]
    rows.push([
      imgEl,
      textCellContent
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
