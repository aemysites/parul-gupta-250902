/* global WebImporter */
export default function parse(element, { document }) {
  // Only select the main .glide__slides (not clones)
  const slides = element.querySelector('.glide__slides');
  let cards = [];
  if (slides) {
    cards = Array.from(slides.children).filter(card => card.classList.contains('jupiter22-c-card') && !card.classList.contains('glide__slide--clone'));
  }

  const headerRow = ['Cards (cards41)'];
  const rows = [headerRow];

  cards.forEach(card => {
    const infoCard = card.querySelector('.jupiter22-c-info-card');
    if (!infoCard) return;

    // Image cell
    let imageCell = '';
    const img = infoCard.querySelector('img');
    if (img) imageCell = img;

    // Text cell: collect all content blocks in order
    const textCellContent = [];
    // Title
    const title = infoCard.querySelector('.jupiter22-c-info-card__title');
    if (title) textCellContent.push(title);
    // Description (all paragraphs)
    const descs = infoCard.querySelectorAll('.jupiter22-c-text-passage p');
    descs.forEach(p => textCellContent.push(p));
    // CTA link
    const link = infoCard.querySelector('.jupiter22-c-info-card__links a');
    if (link) textCellContent.push(link);
    if (textCellContent.length === 0) textCellContent.push(document.createTextNode(''));

    rows.push([imageCell, textCellContent]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
