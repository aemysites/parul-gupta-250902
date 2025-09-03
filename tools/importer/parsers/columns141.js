/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main 2-column grid
  const grid = element.querySelector('.nsdq-l-grid--2up-66-33.nsdq-l-grid');
  if (!grid) return;

  // Get the two column regions
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // Left column: heading + text
  const leftCol = regions[0];
  // Right column: number cards
  const rightCol = regions[1];

  // Compose left cell: all content in leftCol
  // We'll combine the section heading and the text passage
  const leftContent = [];
  // Section heading (h3)
  const sectionHeading = leftCol.querySelector('.jupiter22-c-section-heading');
  if (sectionHeading) leftContent.push(sectionHeading);
  // Text passage (h4 + p)
  const textPassage = leftCol.querySelector('.jupiter22-c-text-passage');
  if (textPassage) leftContent.push(textPassage);

  // Compose right cell: all number cards
  // We'll collect all the number cards in the rightCol
  const rightContent = [];
  // Find all number cards (each is a .jupiter22-c-number-card)
  const numberCards = rightCol.querySelectorAll('.jupiter22-c-number-card');
  numberCards.forEach(card => {
    rightContent.push(card);
  });

  // Table header row
  const headerRow = ['Columns (columns141)'];
  // Table content row: left and right columns
  const contentRow = [leftContent, rightContent];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
