/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card element
  function extractCard(card) {
    // Find the logo image (if present)
    let img = card.querySelector('.jupiter22-c-metadata img');
    let firstCell = '';
    if (img) {
      firstCell = img.cloneNode(true);
    }

    // Text container
    const textContainer = card.querySelector('.jupiter22-c-headline-card__text-container');
    let textCellContent = [];
    if (textContainer) {
      // Headline (title)
      const headline = textContainer.querySelector('.jupiter22-c-headline-card__headline');
      if (headline) {
        const headlineLink = headline.querySelector('a');
        if (headlineLink) {
          const h3 = document.createElement('h3');
          h3.appendChild(headlineLink.cloneNode(true));
          textCellContent.push(h3);
        } else {
          const h3 = document.createElement('h3');
          h3.textContent = headline.textContent.trim();
          textCellContent.push(h3);
        }
      }
      // Metadata (date)
      const metadata = textContainer.querySelector('.jupiter22-c-metadata');
      if (metadata) {
        // Only add the date (first li)
        const dateLi = metadata.querySelector('li');
        if (dateLi) {
          const dateDiv = document.createElement('div');
          dateDiv.textContent = dateLi.textContent.trim();
          textCellContent.push(dateDiv);
        }
      }
    }
    // Defensive: if nothing found, fallback to card text
    if (textCellContent.length === 0) {
      textCellContent.push(document.createTextNode(card.textContent.trim()));
    }
    return [firstCell, textCellContent];
  }

  // Find all cards in the block
  let cards = [];
  const grid = element.querySelector('.nsdq-l-grid');
  if (grid) {
    cards = Array.from(grid.querySelectorAll('.layout__region.nsdq-l-grid__item'));
  } else {
    cards = Array.from(element.querySelectorAll('.jupiter22-c-headline-card'));
  }

  // Compose table rows
  const rows = [];
  const headerRow = ['Cards (cards23)'];
  rows.push(headerRow);
  cards.forEach(region => {
    const card = region.querySelector('.jupiter22-c-headline-card');
    if (card) {
      const cardRow = extractCard(card);
      rows.push(cardRow);
    }
  });

  // Create block table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
