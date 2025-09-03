/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image (first <img> inside the card)
  function getCardImage(card) {
    // Find the first <img> inside the card
    const img = card.querySelector('img');
    return img || null;
  }

  // Helper to extract the text content (topic badge, title, description, cta)
  function getCardText(card) {
    const textContainer = card.querySelector('.jupiter22-c-news-card__text');
    if (!textContainer) return document.createElement('div');

    // We'll collect all relevant elements in order
    const content = [];

    // Topic badge
    const badge = textContainer.querySelector('.jupiter22-c-badge');
    if (badge) {
      // Use the badge's text link (the second <a> inside the badge)
      const badgeLink = badge.querySelectorAll('a')[1];
      if (badgeLink) {
        // Make a <span> for the badge
        const badgeSpan = document.createElement('span');
        badgeSpan.textContent = badgeLink.textContent.trim();
        badgeSpan.style.fontWeight = 'bold';
        badgeSpan.style.display = 'inline-block';
        badgeSpan.style.marginBottom = '8px';
        content.push(badgeSpan, document.createElement('br'));
      }
    }

    // Title (headline)
    const headline = textContainer.querySelector('.jupiter22-c-news-card__headline');
    if (headline) {
      // Use the <a> inside the headline as the title
      const titleLink = headline.querySelector('a');
      if (titleLink) {
        // Use <strong> for title
        const strong = document.createElement('strong');
        strong.textContent = titleLink.textContent.trim();
        content.push(strong, document.createElement('br'));
      }
    }

    // Description (copy)
    const desc = textContainer.querySelector('.jupiter22-c-news-card__copy');
    if (desc) {
      content.push(desc.cloneNode(true));
    }

    // CTA: If the headline link exists, add it as a CTA at the bottom (if not already used as title)
    // But since we use the link text as the title, and the link is not visually a CTA, we skip explicit CTA
    // If needed, can add the link at the end

    return content;
  }

  // Find all cards
  const cards = element.querySelectorAll('.jupiter22-c-news-card');
  const rows = [];
  // Header row as required
  const headerRow = ['Cards (cards100)'];
  rows.push(headerRow);

  // For each card, extract image and text content
  cards.forEach(card => {
    const img = getCardImage(card);
    const textContent = getCardText(card);
    // Defensive: If no image, use empty cell
    rows.push([
      img ? img : '',
      textContent.length ? textContent : ''
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
