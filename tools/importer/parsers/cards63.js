/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Find the grid containing the cards
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get all card items
  const cardItems = getDirectChildren(grid, '.nsdq-l-grid__item');

  // Prepare table rows
  const rows = [];
  // Header row as per block spec
  rows.push(['Cards (cards63)']);

  cardItems.forEach(card => {
    // Find the quote block
    const quote = card.querySelector('.jupiter22-c-quote');
    if (!quote) return;

    // --- IMAGE CELL ---
    // Find the image (inside picture)
    let imgEl = null;
    const imgWrap = quote.querySelector('.jupiter22-c-quote__image');
    if (imgWrap) {
      imgEl = imgWrap.querySelector('img');
    }

    // --- TEXT CELL ---
    // Get the blockquote (quote text)
    let quoteText = null;
    const blockquote = quote.querySelector('blockquote');
    if (blockquote) {
      quoteText = blockquote;
    }

    // Get the attribution (name, title, company)
    let attribution = null;
    const attributionDiv = quote.querySelector('.jupiter22-c-quote__attribution');
    if (attributionDiv) {
      attribution = attributionDiv;
    }

    // Get the CTA link (if any)
    let ctaLink = null;
    const cta = quote.querySelector('a.jupiter22-c-quote__link--attribution');
    if (cta) {
      // Remove any SVG icons from the link for cleanliness
      const svg = cta.querySelector('svg');
      if (svg) svg.remove();
      ctaLink = cta;
    }

    // Compose the text cell contents
    const textCellContent = [];
    if (quoteText) textCellContent.push(quoteText);
    if (attribution) textCellContent.push(document.createElement('br'), attribution);
    if (ctaLink) textCellContent.push(document.createElement('br'), ctaLink);

    // Add the row: [image, text content]
    rows.push([
      imgEl || '',
      textCellContent
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
