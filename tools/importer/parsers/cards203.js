/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from card element
  function extractCard(cardEl) {
    // Image (mandatory)
    const img = cardEl.querySelector('.jupiter22-c-info-card__image img');
    // Text content (subtitle, title, description, CTA)
    const body = cardEl.querySelector('.jupiter22-c-info-card__body');
    const subtitle = body && body.querySelector('.jupiter22-c-info-card__subtitle');
    const title = body && body.querySelector('.jupiter22-c-info-card__title');
    // Description: first <p> inside .jupiter22-c-text-passage
    let description = null;
    const passage = body && body.querySelector('.jupiter22-c-text-passage');
    if (passage) {
      description = passage.querySelector('p');
    }
    // CTA: first link inside .jupiter22-c-info-card__links
    let cta = null;
    const links = body && body.querySelector('.jupiter22-c-info-card__links');
    if (links) {
      cta = links.querySelector('a');
    }
    // Compose text cell
    const textCell = [];
    if (subtitle) textCell.push(subtitle);
    if (title) textCell.push(title);
    if (description && description.textContent.trim()) textCell.push(description);
    if (cta) textCell.push(cta);
    return [img, textCell];
  }

  // Find all card elements in the block
  const cards = Array.from(element.querySelectorAll('.jupiter22-c-card'));
  const rows = cards.map(card => extractCard(card));

  // Table header
  const headerRow = ['Cards (cards203)'];
  const cells = [headerRow, ...rows];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
