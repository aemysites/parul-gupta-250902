/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from card
  function getImage(card) {
    const imgWrap = card.querySelector('.jupiter22-c-quote__image');
    if (imgWrap) {
      // Use the <picture> element if present, else fallback to img
      const picture = imgWrap.querySelector('picture');
      if (picture) return picture;
      const img = imgWrap.querySelector('img');
      if (img) return img;
    }
    return null;
  }

  // Helper to extract text content from card
  function getTextContent(card) {
    const body = card.querySelector('figure.jupiter22-c-quote__body');
    if (!body) return document.createElement('div');
    const parts = [];

    // Blockquote (quote text)
    const blockquote = body.querySelector('blockquote.jupiter22-c-quote__quote');
    if (blockquote) {
      // Remove icon if present
      const icon = blockquote.querySelector('.jupiter22-c-quote__icon');
      if (icon) icon.remove();
      // Get the quote paragraph
      const quoteP = blockquote.querySelector('p');
      if (quoteP) parts.push(quoteP);
    }

    // Attribution (name, title, location)
    const figcaption = body.querySelector('figcaption.jupiter22-c-quote__quote-footer');
    if (figcaption) {
      const attribution = figcaption.querySelector('.jupiter22-c-quote__attribution');
      if (attribution) parts.push(attribution);
      // CTA link
      const cta = figcaption.querySelector('a.nsdq-c-text-link');
      if (cta) parts.push(cta);
    }

    // Wrap all parts in a div for structure
    const textDiv = document.createElement('div');
    parts.forEach(part => textDiv.appendChild(part));
    return textDiv;
  }

  // Find all card items
  const cardItems = Array.from(element.querySelectorAll(':scope > .glide__slides > .nsdq-l-grid__item'));

  // Table header
  const headerRow = ['Cards (cards21)'];
  const rows = [headerRow];

  // For each card, build a row [image, text content]
  cardItems.forEach(cardItem => {
    const card = cardItem.querySelector('.jupiter22-c-quote');
    if (!card) return;
    const image = getImage(card);
    const textContent = getTextContent(card);
    rows.push([image, textContent]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
