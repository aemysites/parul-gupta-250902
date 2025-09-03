/* global WebImporter */
export default function parse(element, { document }) {
  const cardSelector = '.jupiter22-c-card';
  const cards = Array.from(element.querySelectorAll(cardSelector));
  if (!cards.length) return;

  // Only keep unique cards by their text content (title + description)
  const seen = new Set();
  const uniqueCards = cards.filter(card => {
    const title = card.querySelector('.jupiter22-c-info-card__title')?.textContent.trim() || '';
    const desc = card.querySelector('.jupiter22-c-info-card__body p')?.textContent.trim() || '';
    const key = `${title}|${desc}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const headerRow = ['Cards (cards6)'];
  const rows = [headerRow];

  uniqueCards.forEach((card) => {
    // Image cell
    let imgEl = card.querySelector('img');
    let imageCell = imgEl || '';

    // Text cell: include all content from card body
    const body = card.querySelector('.jupiter22-c-info-card__body');
    let textCell;
    if (body) {
      textCell = body.cloneNode(true);
    } else {
      textCell = '';
    }

    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
