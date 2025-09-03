/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from card
  function getCardImage(card) {
    // Find the <img> inside the card
    const img = card.querySelector('img');
    return img;
  }

  // Helper to extract text content from card
  function getCardText(card) {
    const textContainer = card.querySelector('.jupiter22-c-news-card__text');
    if (!textContainer) return document.createElement('div');
    // We'll collect headline, description, and metadata
    const parts = [];
    // Headline (as heading)
    const headline = textContainer.querySelector('.jupiter22-c-news-card__headline');
    if (headline) {
      // Use the <a> inside headline, but wrap in <strong> for semantic heading
      const headlineLink = headline.querySelector('a');
      if (headlineLink) {
        const h = document.createElement('strong');
        h.append(headlineLink);
        parts.push(h);
      }
    }
    // Description
    const desc = textContainer.querySelector('.jupiter22-c-news-card__copy');
    if (desc) {
      parts.push(desc);
    }
    // Metadata (logo)
    const meta = textContainer.querySelector('.jupiter22-c-metadata');
    if (meta) {
      parts.push(meta);
    }
    // Return as array
    return parts;
  }

  // Find all cards
  const cards = Array.from(element.querySelectorAll('.jupiter22-c-news-card'));

  // Build table rows
  const headerRow = ['Cards (cards155)'];
  const rows = [headerRow];

  cards.forEach(card => {
    // First cell: image
    const img = getCardImage(card);
    // Second cell: text content
    const textContent = getCardText(card);
    rows.push([
      img,
      textContent
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
