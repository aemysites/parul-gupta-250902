/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text content from each card region
  function extractCard(region) {
    // Defensive: find image (first img in region)
    const img = region.querySelector('img');
    // Defensive: find text passage (first .jupiter22-c-text-passage)
    const textPassage = region.querySelector('.jupiter22-c-text-passage');
    // If textPassage is missing, fallback to any div with heading or link
    let textContent = textPassage;
    if (!textContent) {
      textContent = region.querySelector('div');
    }
    return [img, textContent];
  }

  // Find all card regions
  const cardRegions = Array.from(element.querySelectorAll(':scope .layout__region'));

  // Build table rows
  const headerRow = ['Cards (cards171)'];
  const rows = cardRegions.map(extractCard);

  // Compose table data
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
