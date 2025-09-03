/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from background-image style
  function extractBgImage(div) {
    if (!div) return null;
    const style = div.getAttribute('style') || '';
    const match = style.match(/background-image:\s*url\(['"]?([^'")]+)['"]?\)/i);
    if (match && match[1]) {
      const img = document.createElement('img');
      img.src = match[1];
      img.alt = '';
      return img;
    }
    return null;
  }

  // Find the grid containing the cards
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;
  const cardRegions = Array.from(grid.children);

  const rows = [];
  // Header row
  rows.push(['Cards (cards174)']);

  cardRegions.forEach(region => {
    // Find the headline card in the region
    const card = region.querySelector('.jupiter22-c-headline-card');
    if (!card) return;

    // --- IMAGE CELL ---
    // Try to get the image from the background-image div
    const mediaDiv = card.querySelector('.jupiter22-c-headline-card__media');
    const img = extractBgImage(mediaDiv);
    // Fallback: if not found, try to find an <img> inside the card
    let imageCell = img;
    if (!imageCell) {
      const fallbackImg = card.querySelector('img');
      if (fallbackImg) imageCell = fallbackImg;
    }
    // Defensive: if still not found, use empty string
    if (!imageCell) imageCell = '';

    // --- TEXT CELL ---
    // Compose the text cell: heading, tags, title, metadata
    const textParts = [];

    // Try to get the heading above the card ("Opening Bell", "Closing Bell")
    // It's in the previous sibling of the card, inside a .jupiter22-c-text-passage
    let heading = '';
    const passage = region.querySelector('.jupiter22-c-text-passage');
    if (passage) {
      // The heading is in an <em> inside an <h3>
      const em = passage.querySelector('em');
      if (em) {
        const h = document.createElement('h3');
        h.textContent = em.textContent.trim();
        heading = h;
      }
    }
    if (heading) textParts.push(heading);

    // Card tags (e.g. symbol tag)
    const tags = card.querySelector('.jupiter22-c-headline-card__tags');
    if (tags && tags.textContent.trim()) {
      textParts.push(tags);
    }

    // Card title (headline)
    const headline = card.querySelector('.jupiter22-c-headline-card__headline');
    if (headline) {
      // Remove the event icon image if present
      const icon = headline.querySelector('img');
      if (icon) icon.remove();
      textParts.push(headline);
    }

    // Card metadata (date/time)
    const metadata = card.querySelector('.jupiter22-c-metadata');
    if (metadata) textParts.push(metadata);

    // Compose the row
    rows.push([
      imageCell,
      textParts
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
