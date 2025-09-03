/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get the main grid for columns
  const grid = element.querySelector('.nsdq-l-grid--2up-66-33');
  if (!grid) return;

  // Get the two main column regions
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // --- LEFT COLUMN ---
  const leftRegion = regions[0];
  // Get the image (first img in left region)
  const img = leftRegion.querySelector('img');

  // Get the heading block (contains link and description)
  const headingBlock = leftRegion.querySelector('.jupiter22-c-section-heading');
  let leftColumnContent = [];
  if (img) leftColumnContent.push(img);
  if (headingBlock) leftColumnContent.push(headingBlock);

  // --- RIGHT COLUMN ---
  const rightRegion = regions[1];
  // Get all headline cards (each is a story block)
  const headlineCards = rightRegion.querySelectorAll('.jupiter22-c-headline-card');
  let rightColumnContent = [];
  headlineCards.forEach(card => {
    rightColumnContent.push(card);
    // Optionally, add the following text-passage if present (for spacing)
    const next = card.nextElementSibling;
    if (next && next.querySelector('.jupiter22-c-text-passage')) {
      rightColumnContent.push(next);
    }
  });

  // Table header
  const headerRow = ['Columns (columns138)'];
  // Table content row: left and right columns
  const contentRow = [leftColumnContent, rightColumnContent];

  // Create block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
