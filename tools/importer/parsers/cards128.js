/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image, title, and description from a card element
  function extractCardData(card) {
    // Defensive: find the image
    let img = card.querySelector('img');
    // Defensive: find the title (h3)
    let title = card.querySelector('h3');
    // Defensive: find all paragraphs inside .jupiter22-c-text-passage
    let descs = Array.from(card.querySelectorAll('.jupiter22-c-text-passage p'));

    // Build the text cell content: title (bold) + all description paragraphs
    const textCell = document.createElement('div');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent;
      textCell.appendChild(strong);
    }
    if (descs.length > 0) {
      descs.forEach((desc, idx) => {
        if (title || idx > 0) textCell.appendChild(document.createElement('br'));
        textCell.appendChild(desc.cloneNode(true));
      });
    }
    return [img, textCell];
  }

  // Find all card elements (direct children of .glide__slides)
  let cards = [];
  const slides = element.querySelector('.glide__slides');
  if (slides) {
    cards = Array.from(slides.children).filter(child => child.classList.contains('jupiter22-c-card'));
  }
  // Remove duplicate/clone slides by filtering out those with 'glide__slide--clone' class
  cards = cards.filter(card => !card.classList.contains('glide__slide--clone'));

  // Build the table rows
  const rows = [
    ['Cards (cards128)'] // Header row as required
  ];

  // For each card, extract the image and text content
  cards.forEach(card => {
    const [img, textCell] = extractCardData(card);
    if (img && textCell.textContent.trim().length > 0) {
      rows.push([img, textCell]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
