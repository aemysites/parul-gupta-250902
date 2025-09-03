/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid containing the cards
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get all card regions (each card)
  const cardRegions = grid.querySelectorAll(':scope > .layout__region');
  if (!cardRegions.length) return;

  // Table header row
  const headerRow = ['Cards (cardsNoImages124)'];
  const rows = [headerRow];

  // For each card, extract heading and description
  cardRegions.forEach(region => {
    // Defensive: Find the card content wrapper
    const card = region.querySelector('.jupiter22-c-callout-card');
    if (!card) return;
    const textWrapper = card.querySelector('.jupiter22-c-callout-card__text-wrapper');
    if (!textWrapper) return;

    // Find heading and description
    const heading = textWrapper.querySelector('.jupiter22-c-callout-card__title');
    const description = textWrapper.querySelector('.jupiter22-c-callout-card__description');

    // Compose cell content
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (description) cellContent.push(description);

    // Add row for this card
    rows.push([cellContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
