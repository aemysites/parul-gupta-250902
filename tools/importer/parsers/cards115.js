/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Table header row as required
  const headerRow = ['Cards (cards115)'];
  const rows = [headerRow];

  // Find all direct card children (defensive for clones and variations)
  const cardSelector = '.jupiter22-journey-card';
  const cards = element.querySelectorAll(cardSelector);

  cards.forEach((card) => {
    // --- IMAGE CELL ---
    // Find the image inside the card
    let imgCell = null;
    const img = card.querySelector('figure img');
    if (img) {
      imgCell = img;
    } else {
      // Defensive: fallback to figure if no img
      const fig = card.querySelector('figure');
      imgCell = fig || document.createTextNode('');
    }

    // --- TEXT CELL ---
    // Compose text cell: subtitle, title, description, CTA
    const body = card.querySelector('.jupiter22-journey-card__body');
    const textCellContent = [];

    // Subtitle (optional)
    const subtitle = body && body.querySelector('.jupiter22-journey-card__subtitle');
    if (subtitle) textCellContent.push(subtitle);

    // Title (optional)
    const title = body && body.querySelector('.jupiter22-journey-card__title');
    if (title) textCellContent.push(title);

    // Description (optional)
    // Defensive: Some cards wrap text in a div, some just have p's
    let descContainer = body && body.querySelector('.jupiter22-c-text-passage');
    if (descContainer) {
      // If there's a div inside, use its children
      const innerDiv = descContainer.querySelector('div');
      if (innerDiv) {
        // Add all paragraphs except the last one if it's a link
        const ps = Array.from(innerDiv.querySelectorAll('p'));
        ps.forEach((p, idx) => {
          // If last p and contains only a link, skip for now (will add as CTA)
          if (idx === ps.length - 1 && p.querySelector('a')) return;
          textCellContent.push(p);
        });
        // CTA (if last p is a link)
        const lastP = ps[ps.length - 1];
        if (lastP && lastP.querySelector('a')) {
          textCellContent.push(lastP);
        }
      } else {
        // Otherwise, add all children (p's and links)
        Array.from(descContainer.childNodes).forEach((node) => {
          textCellContent.push(node);
        });
      }
    }

    // Defensive: If no description, just add body text
    if (textCellContent.length === 0 && body) {
      textCellContent.push(body);
    }

    // Compose row: [image, text]
    rows.push([
      imgCell,
      textCellContent
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
