/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCard(card) {
    // Image: find first <img> inside the card
    const img = card.querySelector('img');

    // Text content: subtitle, title, description, CTA
    const subtitle = card.querySelector('.jupiter22-c-info-card__subtitle');
    const title = card.querySelector('.jupiter22-c-info-card__title');
    const desc = card.querySelector('.jupiter22-c-text-passage');
    const cta = card.querySelector('.jupiter22-c-info-card__links a');

    // Compose text cell: subtitle, title, description, CTA (in order)
    const textCell = document.createElement('div');
    if (subtitle) textCell.appendChild(subtitle.cloneNode(true));
    if (title) textCell.appendChild(title.cloneNode(true));
    if (desc) {
      // If desc has children, clone all; else, clone itself
      if (desc.children.length > 0) {
        Array.from(desc.children).forEach(child => textCell.appendChild(child.cloneNode(true)));
      } else {
        textCell.appendChild(desc.cloneNode(true));
      }
    }
    if (cta) textCell.appendChild(cta.cloneNode(true));

    return [img, textCell];
  }

  // Find all cards in the block
  const cards = element.querySelectorAll('.jupiter22-c-card');

  // Build table rows
  const rows = [];
  // Header row: must be exactly one column, per guidelines
  const headerRow = ['Cards (cards31)'];
  rows.push(headerRow);

  // Card rows
  cards.forEach(card => {
    rows.push(extractCard(card));
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Fix header row to span two columns
  const thead = table.querySelector('thead');
  if (thead) {
    const th = thead.querySelector('th');
    if (th) th.setAttribute('colspan', '2');
  }

  // Replace original element with the table
  element.replaceWith(table);
}
