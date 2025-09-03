/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cardsNoImages139)'];
  const rows = [headerRow];

  // Defensive: Find the grid container that holds all cards
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get all card containers (each card is a direct child of grid)
  const cardContainers = Array.from(grid.querySelectorAll(':scope > .layout__region, :scope > .nsdq-l-grid__item'));

  cardContainers.forEach((region) => {
    // Each region may contain one or more cards (but in this HTML, just one)
    // Find all card blocks inside this region
    const cards = Array.from(region.querySelectorAll('.jupiter22-c-info-card-small-horizontal'));
    cards.forEach((cardBlock) => {
      // Defensive: Find the card body
      const cardBody = cardBlock.querySelector('.jupiter22-c-info-card__body');
      if (!cardBody) return;

      // Gather heading (optional)
      const heading = cardBody.querySelector('.jupiter22-c-info-card__title');
      // Gather description (optional)
      const descriptionPassage = cardBody.querySelector('.jupiter22-c-text-passage');
      // Gather CTA link (optional)
      const ctaLink = cardBody.querySelector('.jupiter22-c-info-card__links a');

      // Compose cell content
      const cellContent = [];
      if (heading) cellContent.push(heading);
      if (descriptionPassage) cellContent.push(descriptionPassage);
      if (ctaLink) cellContent.push(ctaLink);

      // Only add row if there's meaningful content
      if (cellContent.length > 0) {
        rows.push([cellContent]);
      }
    });
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
