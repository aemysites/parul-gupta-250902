/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from background-image style
  function createImageFromBackground(div) {
    const style = div.getAttribute('style') || '';
    const match = style.match(/background-image:\s*url\(['"]?([^'")]+)['"]?\)/);
    if (match && match[1]) {
      const img = document.createElement('img');
      img.src = match[1];
      img.alt = '';
      return img;
    }
    return null;
  }

  // Get all cards
  const cards = Array.from(element.querySelectorAll('.jupiter22-c-headline-card'));
  const rows = [];
  const headerRow = ['Cards (cards19)'];
  rows.push(headerRow);

  cards.forEach(card => {
    // Image cell
    let imgCell = null;
    const mediaDiv = card.querySelector('.jupiter22-c-headline-card__media');
    if (mediaDiv) {
      imgCell = createImageFromBackground(mediaDiv);
    }

    // Text cell
    const textContainer = card.querySelector('.jupiter22-c-headline-card__text-container');
    const textCellContent = [];

    // Eyebrow (optional)
    const eyebrow = textContainer.querySelector('.jupiter22-c-headline-card__eyebrow');
    if (eyebrow && eyebrow.textContent.trim()) {
      const eyebrowDiv = document.createElement('div');
      eyebrowDiv.textContent = eyebrow.textContent.trim();
      eyebrowDiv.style.fontSize = '0.8em';
      eyebrowDiv.style.fontWeight = 'bold';
      textCellContent.push(eyebrowDiv);
    }

    // Headline (mandatory)
    const headline = textContainer.querySelector('.jupiter22-c-headline-card__headline');
    if (headline) {
      // Use the <a> inside headline if present
      const headlineLink = headline.querySelector('a');
      if (headlineLink) {
        const h3 = document.createElement('h3');
        h3.appendChild(headlineLink.cloneNode(true));
        textCellContent.push(h3);
      } else {
        textCellContent.push(headline.cloneNode(true));
      }
    }

    // Metadata (author or logo)
    const metadata = textContainer.querySelector('.jupiter22-c-metadata');
    if (metadata) {
      // Usually a <ul><li>...</li></ul>
      const li = metadata.querySelector('li');
      if (li) {
        // If li contains an image, use it; else, use text
        const logoImg = li.querySelector('img');
        if (logoImg) {
          textCellContent.push(logoImg.cloneNode(true));
        } else if (li.textContent.trim()) {
          const authorDiv = document.createElement('div');
          authorDiv.textContent = li.textContent.trim();
          textCellContent.push(authorDiv);
        }
      }
    }

    rows.push([
      imgCell,
      textCellContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
