/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the card content as a single element
  function extractCardContent(card) {
    const fragment = document.createElement('div');

    // Heading (h3)
    const heading = card.querySelector('h3');
    if (heading) {
      fragment.appendChild(heading.cloneNode(true));
    }

    // Description (location)
    const descDiv = card.querySelector('.jupiter22-c-text-passage');
    if (descDiv) {
      // Append all text content from descDiv (not just <p>)
      Array.from(descDiv.childNodes).forEach(node => {
        fragment.appendChild(node.cloneNode(true));
      });
    }

    // CTA (link)
    const linkDiv = card.querySelector('.jupiter22-journey-card__link');
    if (linkDiv) {
      Array.from(linkDiv.childNodes).forEach(node => {
        fragment.appendChild(node.cloneNode(true));
      });
    }

    return fragment;
  }

  // Find the slides container
  const slidesContainer = element.querySelector('.glide__slides');
  if (!slidesContainer) return;

  // Find all card elements, but only keep the first occurrence of each unique card (by heading text)
  const cards = Array.from(slidesContainer.querySelectorAll('.jupiter22-journey-card-vertical'));
  const seenHeadings = new Set();
  const uniqueCards = [];
  cards.forEach(card => {
    const heading = card.querySelector('h3');
    if (heading) {
      const headingText = heading.textContent.trim();
      if (!seenHeadings.has(headingText)) {
        seenHeadings.add(headingText);
        uniqueCards.push(card);
      }
    }
  });

  // Build table rows
  const headerRow = ['Cards (cardsNoImages210)'];
  const rows = [headerRow];

  uniqueCards.forEach(card => {
    const cellContent = extractCardContent(card);
    rows.push([cellContent]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
