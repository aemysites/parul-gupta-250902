/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the slides container (columns)
  const slidesContainer = element.querySelector('.glide__slides');
  if (!slidesContainer) return;

  // Get all immediate child slides (columns)
  const slideElements = Array.from(slidesContainer.children).filter(
    (el) => el.classList.contains('jupiter22-c-card')
  );
  if (slideElements.length === 0) return;

  // Each slide is a column. Extract the card body for each column.
  const columns = slideElements.map((slide) => {
    // Defensive: Find the card body
    const cardBody = slide.querySelector('.jupiter22-c-info-card__body');
    // If not found, fallback to slide itself
    return cardBody || slide;
  });

  // Build the table rows
  const headerRow = ['Columns (columns61)'];
  const contentRow = columns;

  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
