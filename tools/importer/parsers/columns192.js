/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children of a node by selector
  function getImmediateChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // --- COLUMN 1: Main Feature (left side) ---
  // Find the left column region
  const grid = element.querySelector('.nsdq-l-grid');
  const regions = getImmediateChildren(grid, 'div');
  const leftRegion = regions[0];

  // Find the main image (feature)
  let mainImg;
  const galleryBodies = leftRegion.querySelectorAll('.jupiter22-c-media-gallery__body');
  for (const body of galleryBodies) {
    mainImg = body.querySelector('img');
    if (mainImg) break;
  }

  // Find the section heading (title + description)
  const sectionHeading = leftRegion.querySelector('.jupiter22-c-section-heading');

  // Compose left column cell
  const leftColumnContent = [];
  if (mainImg) leftColumnContent.push(mainImg);
  if (sectionHeading) leftColumnContent.push(sectionHeading);

  // --- COLUMN 2: News List (right side) ---
  const rightRegion = regions[1];

  // Find all headline cards
  const headlineCards = rightRegion.querySelectorAll('.jupiter22-c-headline-card');
  // Compose right column cell
  const rightColumnContent = [];
  headlineCards.forEach(card => {
    rightColumnContent.push(card);
    // Find the next sibling .jupiter22-c-text-passage (spacer)
    let next = card.nextElementSibling;
    if (next && next.classList.contains('jupiter22-c-text-passage')) {
      rightColumnContent.push(next);
    }
  });

  // --- TABLE STRUCTURE ---
  const headerRow = ['Columns (columns192)'];
  const contentRow = [leftColumnContent, rightColumnContent];
  const cells = [headerRow, contentRow];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
