/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card root
  function extractCardContent(card) {
    // Defensive: find the info card body
    const body = card.querySelector('.jupiter22-c-info-card__body');
    if (!body) return null;

    // Find the text passage (contains h5 and p)
    const passage = body.querySelector('.jupiter22-c-text-passage');
    if (!passage) return null;

    // Clone the passage to avoid moving it from the original DOM
    const passageClone = passage.cloneNode(true);

    // Find CTA link if present
    const links = body.querySelector('.jupiter22-c-info-card__links');
    let cta = null;
    if (links) {
      // Only one link per card expected
      const link = links.querySelector('a');
      if (link) {
        cta = link;
      }
    }

    // Compose cell content: heading, description, CTA (if present)
    const cellContent = [];
    // Heading (h5)
    const h5 = passageClone.querySelector('h5');
    if (h5) cellContent.push(h5);
    // Description (p)
    const p = passageClone.querySelector('p');
    if (p) cellContent.push(p);
    // CTA (link)
    if (cta) cellContent.push(cta);

    return cellContent;
  }

  // Find the grid containing the cards
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Find all card containers (each card is inside .layout__region)
  const cardRegions = grid.querySelectorAll('.layout__region');

  // Build rows: header first
  const rows = [
    ['Cards (cardsNoImages85)']
  ];

  // For each card, extract content and add as a row
  cardRegions.forEach(region => {
    // Defensive: find the card root
    const card = region.querySelector('.jupiter22-c-info-card');
    if (!card) return;
    const content = extractCardContent(card);
    if (content && content.length > 0) {
      rows.push([content]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
