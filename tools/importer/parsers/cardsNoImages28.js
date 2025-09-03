/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the container of cards
  let cardsContainer = element;
  if (cardsContainer.classList.contains('glide__track')) {
    cardsContainer = cardsContainer.querySelector('.glide__slides');
  }
  if (!cardsContainer) return;

  // Only select direct children that are NOT clones
  const cardElements = Array.from(cardsContainer.children).filter(
    (child) => child.classList.contains('jupiter22-c-card') && !child.classList.contains('glide__slide--clone')
  );

  const headerRow = ['Cards (cardsNoImages28)'];
  const rows = [headerRow];

  cardElements.forEach((card) => {
    const infoCard = card.querySelector('.jupiter22-c-info-card');
    if (!infoCard) return;
    const body = infoCard.querySelector('.jupiter22-c-info-card__body');
    if (!body) return;

    const cellContent = [];

    const subtitle = body.querySelector('.jupiter22-c-info-card__subtitle');
    if (subtitle && subtitle.textContent.trim()) {
      cellContent.push(subtitle.cloneNode(true));
    }

    const title = body.querySelector('.jupiter22-c-info-card__title');
    if (title && title.textContent.trim()) {
      cellContent.push(title.cloneNode(true));
    }

    const passage = body.querySelector('.jupiter22-c-text-passage--sm');
    if (passage) {
      const h5 = passage.querySelector('h5');
      if (h5 && h5.textContent.trim()) {
        cellContent.push(h5.cloneNode(true));
      }
    }

    const links = body.querySelector('.jupiter22-c-info-card__links');
    if (links) {
      const link = links.querySelector('a');
      if (link) {
        cellContent.push(link.cloneNode(true));
      }
    }

    if (cellContent.length > 0) {
      rows.push([cellContent]);
    }
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
