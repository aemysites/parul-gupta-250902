/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure we have the expected structure
  if (!element || !element.querySelectorAll) return;

  // Header row for the block table
  const headerRow = ['Cards (cards18)'];
  const rows = [headerRow];

  // Get all direct <li> children (each is a card)
  const items = element.querySelectorAll(':scope > li');

  items.forEach((li) => {
    // Image cell: find the image inside the card
    let imgCell = null;
    const imgWrapper = li.querySelector('.jupiter22-c-article-list__item_img');
    if (imgWrapper) {
      const img = imgWrapper.querySelector('img');
      if (img) imgCell = img;
    }

    // Text cell: build a container for all text content
    const contentDiv = li.querySelector('.jupiter22-c-article-list__item_content');
    const textCellParts = [];
    if (contentDiv) {
      // Title (as heading)
      const titleLink = contentDiv.querySelector('.jupiter22-c-article-list__item_title_wrapper');
      if (titleLink) {
        // Use <strong> for heading style, wrap link
        const heading = document.createElement('strong');
        heading.appendChild(titleLink);
        textCellParts.push(heading);
      }
      // Date and publisher
      const stamps = contentDiv.querySelector('.jupiter22-c-article-list__item_stamps');
      if (stamps) {
        textCellParts.push(stamps);
      }
    }

    // Defensive: fallback if no image/text
    if (!imgCell) imgCell = document.createTextNode('');
    if (textCellParts.length === 0) textCellParts.push(document.createTextNode(''));

    rows.push([imgCell, textCellParts]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
