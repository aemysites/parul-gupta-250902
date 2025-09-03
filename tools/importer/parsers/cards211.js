/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the correct header row
  const headerRow = ['Cards (cards211)'];
  const rows = [headerRow];

  // Find all cards in the block
  const cards = element.querySelectorAll('.jupiter22-c-content-card');

  cards.forEach((card) => {
    // First cell: image/icon
    let img = card.querySelector('img');
    let imgEl = img ? img.cloneNode(true) : '';

    // Second cell: text content (title, description, CTA)
    const textDiv = document.createElement('div');
    // Title (only the first h3 inside the card body, not accordion)
    const body = card.querySelector('.jupiter22-c-content-card__body');
    if (body) {
      const title = body.querySelector('.jupiter22-c-content-card__title');
      if (title) {
        textDiv.appendChild(title.cloneNode(true));
      }
      // Description (all paragraphs inside the card body only)
      body.querySelectorAll('.jupiter22-c-text-passage p').forEach((p) => {
        textDiv.appendChild(p.cloneNode(true));
      });
      // CTA (all links in links container inside body only)
      body.querySelectorAll('.jupiter22-c-content-card__links a').forEach((cta) => {
        const ctaDiv = document.createElement('div');
        ctaDiv.appendChild(cta.cloneNode(true));
        textDiv.appendChild(ctaDiv);
      });
    }
    rows.push([imgEl, textDiv]);
  });

  // Always replace the element with the table, even if only header exists
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
