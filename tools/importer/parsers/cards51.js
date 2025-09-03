/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from background-image style
  function extractImageFromStyle(div) {
    const style = div.getAttribute('style') || '';
    const match = style.match(/background-image:\s*url\(['"]?([^'")]+)['"]?\)/i);
    if (match && match[1]) {
      const img = document.createElement('img');
      img.src = match[1];
      img.alt = '';
      return img;
    }
    return null;
  }

  // Get all card elements
  const cards = element.querySelectorAll(':scope > .jupiter22-c-reference-video-playlist__headline-card');
  const rows = [];
  // Header row as per block spec
  rows.push(['Cards (cards51)']);

  cards.forEach(card => {
    // Image/Icon cell
    const mediaDiv = card.querySelector('.jupiter22-c-reference-video-playlist__media');
    let imageEl = null;
    if (mediaDiv) {
      imageEl = extractImageFromStyle(mediaDiv);
    }
    // Fallback: if no image, leave cell empty
    const imageCell = imageEl ? imageEl : '';

    // Text cell: include eyebrow, headline, metadata (date, logo)
    const textContainer = card.querySelector('.jupiter22-c-reference-video-playlist__text-container');
    const textCellContent = [];
    if (textContainer) {
      // Eyebrow (category)
      const eyebrow = textContainer.querySelector('.jupiter22-c-reference-video-playlist__eyebrow');
      if (eyebrow) {
        textCellContent.push(eyebrow);
      }
      // Headline (h3)
      const headline = textContainer.querySelector('.jupiter22-c-reference-video-playlist__headline');
      if (headline) {
        textCellContent.push(headline);
      }
      // Metadata (date, logo)
      const metadata = textContainer.querySelector('.jupiter22-c-metadata');
      if (metadata) {
        textCellContent.push(metadata);
      }
    }
    // Defensive: if no text, leave cell empty
    const textCell = textCellContent.length ? textCellContent : '';

    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
