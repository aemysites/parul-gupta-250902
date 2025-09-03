/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero container
  const heroContainer = element.querySelector('.jupiter22-c-hero__container');
  if (!heroContainer) return;

  // Left column: text content
  const textContent = heroContainer.querySelector('.jupiter22-c-hero__text-content');
  if (!textContent) return;

  // Right column: image (picture)
  const mediaContainer = heroContainer.querySelector('.jupiter22-c-hero__media-container');
  let imageCell = '';
  if (mediaContainer) {
    const picture = mediaContainer.querySelector('picture');
    if (picture) {
      // Reference the existing <picture> element (not clone)
      imageCell = picture;
    }
  }

  // Build the table rows
  const headerRow = ['Columns (columns98)'];
  const contentRow = [textContent, imageCell];

  // Only proceed if both columns are present
  if (!textContent || !imageCell) return;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
