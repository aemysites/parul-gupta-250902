/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the card content block
  function extractCardContent(cardRoot) {
    // Defensive: find the card body
    const cardBody = cardRoot.querySelector('.jupiter22-c-info-card__body');
    if (!cardBody) return null;

    // We'll collect the heading, description, and CTA if present
    const parts = [];

    // Subtitle (optional, usually the small heading)
    const subtitle = cardBody.querySelector('.jupiter22-c-info-card__subtitle');
    if (subtitle) parts.push(subtitle);

    // Title (main heading)
    const title = cardBody.querySelector('.jupiter22-c-info-card__title');
    if (title) parts.push(title);

    // Description (paragraph)
    const desc = cardBody.querySelector('.jupiter22-c-text-passage');
    if (desc) parts.push(desc);

    // CTA (link)
    const cta = cardBody.querySelector('.jupiter22-c-info-card__link');
    if (cta) parts.push(cta);

    // Wrap in a div for structure
    const wrapper = document.createElement('div');
    parts.forEach((el) => {
      if (el) wrapper.appendChild(el);
    });
    return wrapper;
  }

  // Find all card roots (should be two in this block)
  // Defensive: find all elements with class 'jupiter22-c-info-card-small-horizontal'
  const cardRoots = element.querySelectorAll('.jupiter22-c-info-card-small-horizontal');

  // Build the table rows
  const headerRow = ['Cards (cardsNoImages184)'];
  const rows = [headerRow];

  cardRoots.forEach((cardRoot) => {
    const cardContent = extractCardContent(cardRoot);
    if (cardContent) {
      rows.push([cardContent]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(table);
}
