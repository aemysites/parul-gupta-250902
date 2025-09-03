/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card root element
  function extractCard(cardRoot) {
    // Find the image (mandatory)
    const img = cardRoot.querySelector('img');

    // Find the card content container
    const content = cardRoot.querySelector('.jupiter22-c-info-card-small-horizontal__content');
    let textContent = null;
    if (content) {
      // Find the link (call-to-action)
      const link = content.querySelector('.jupiter22-c-info-card__links a');
      if (link) {
        // We'll use the link as the main text content (since title/desc are empty)
        textContent = link;
      } else {
        // Fallback: use the content div itself
        textContent = content;
      }
    } else {
      // Fallback: use the card root
      textContent = cardRoot;
    }
    return [img, textContent];
  }

  // Find all card roots (direct children of grid)
  // The cards are inside .nsdq-l-grid > .layout__region
  const grid = element.querySelector('.nsdq-l-grid');
  let cardRegions = [];
  if (grid) {
    cardRegions = Array.from(grid.querySelectorAll(':scope > .layout__region'));
  } else {
    // fallback: try to find card containers directly
    cardRegions = Array.from(element.querySelectorAll('.jupiter22-c-info-card-small-horizontal'));
  }

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards146)']);

  // Each card region contains a card
  cardRegions.forEach(region => {
    // The card is the first .jupiter22-c-info-card-small-horizontal inside the region
    const card = region.querySelector('.jupiter22-c-info-card-small-horizontal') || region;
    const [img, textContent] = extractCard(card);
    rows.push([img, textContent]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
