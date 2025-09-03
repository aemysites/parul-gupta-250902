/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards8)'];
  const rows = [headerRow];

  // Find the grid containing the cards
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get all immediate card regions
  const cardRegions = grid.querySelectorAll(':scope > .layout__region');

  cardRegions.forEach(region => {
    // Find the quote card inside the region
    const card = region.querySelector('.jupiter22-c-quote');
    if (!card) return;

    // --- IMAGE CELL ---
    let imageCell = null;
    const imageWrap = card.querySelector('.jupiter22-c-quote__image');
    if (imageWrap) {
      // Use the <picture> element directly if present
      const picture = imageWrap.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        // Fallback: use the image itself
        const img = imageWrap.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // --- TEXT CELL ---
    const textCellContent = [];
    // Blockquote text
    const blockquote = card.querySelector('blockquote');
    if (blockquote) {
      // Remove icon if present
      const icon = blockquote.querySelector('.jupiter22-c-quote__icon');
      if (icon) icon.remove();
      // Add blockquote paragraph(s)
      blockquote.querySelectorAll('p').forEach(p => {
        textCellContent.push(p);
      });
    }
    // Attribution (name, title)
    const attribution = card.querySelector('.jupiter22-c-quote__attribution');
    if (attribution) {
      textCellContent.push(attribution);
    }
    // CTA link (if present)
    const ctaLink = card.querySelector('.jupiter22-c-quote__link--attribution');
    if (ctaLink) {
      textCellContent.push(ctaLink);
    }

    // Compose row: [image, text]
    rows.push([
      imageCell,
      textCellContent
    ]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(blockTable);
}
