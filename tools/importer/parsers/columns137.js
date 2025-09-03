/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children with a selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(`:scope > ${selector}`));
  }

  // Get the 3 column regions
  const regions = Array.from(element.querySelectorAll(':scope .nsdq-l-grid__item'));
  if (regions.length < 3) return; // Defensive: expect 3 columns

  // For each region, build the cell content
  const cellsRow = regions.map(region => {
    const parts = [];

    // 1. Image (chevron)
    const img = region.querySelector('img');
    if (img) parts.push(img);

    // 2. Text passage (title + description)
    const textPassage = region.querySelector('.jupiter22-c-text-passage');
    if (textPassage) parts.push(textPassage);

    // 3. Section heading (eyebrow)
    const sectionHeading = region.querySelector('.jupiter22-c-section-heading');
    if (sectionHeading) parts.push(sectionHeading);

    // 4. Accordion (list of services/links)
    const accordion = region.querySelector('.jupiter22-c-accordion');
    if (accordion) parts.push(accordion);

    // Return all parts as a single cell (array of elements)
    return parts;
  });

  // Table header row
  const headerRow = ['Columns (columns137)'];

  // Table cells row (one row, 3 columns)
  const tableRows = [headerRow, cellsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
