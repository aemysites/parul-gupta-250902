/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image element from a card
  function getCardImage(card) {
    // Try to find an <img> inside the card
    const img = card.querySelector('img');
    if (img) return img;
    // Try to find a <picture> (for the 3rd card)
    const picture = card.querySelector('picture');
    if (picture) return picture;
    // If the card is a link wrapping an image (3rd card)
    const linkImg = card.querySelector('a img');
    if (linkImg) return linkImg;
    return null;
  }

  // Helper to extract the text content (title, description, CTA) from a card
  function getCardText(card) {
    // For the first two cards (Studio A/B)
    const body = card.querySelector('.jupiter22-c-info-card__body');
    if (body) {
      // Title
      const title = body.querySelector('h3');
      // Description
      const desc = body.querySelector('.jupiter22-c-text-passage');
      // CTA
      const cta = body.querySelector('.jupiter22-c-info-card__links');
      // Compose content
      const content = [];
      if (title) content.push(title);
      if (desc) content.push(desc);
      if (cta) content.push(cta);
      return content;
    }
    // For the 3rd card (3D Tour): just use the anchor as the CTA
    const anchor = card.querySelector('a');
    if (anchor) {
      // Try to get the anchor's text as a heading (simulate a CTA button)
      // The image is in the first cell, so just use the anchor for the CTA
      return [anchor];
    }
    return [];
  }

  // Find all cards (each .layout__region is a card column)
  const cardRegions = element.querySelectorAll(':scope .layout__region');
  const rows = [];
  // Header row
  rows.push(['Cards (cards176)']);

  cardRegions.forEach(region => {
    // There are two types of cards: info cards and the 3D tour card
    // Try to find the info card structure
    let card = region.querySelector('.jupiter22-c-info-card');
    if (!card) {
      // If not found, the region itself may be the card (for the 3rd card)
      card = region;
    }
    // First cell: image or picture
    const image = getCardImage(card);
    // Second cell: text content (title, desc, CTA)
    const textContent = getCardText(card);
    // Defensive: ensure at least something in each cell
    rows.push([
      image || '',
      textContent.length > 0 ? textContent : ''
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
