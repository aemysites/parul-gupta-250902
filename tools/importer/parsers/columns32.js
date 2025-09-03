/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the two main columns
  const mediaDiv = element.querySelector('.jupiter22-featured-list_media');
  const textSection = element.querySelector('.jupiter22-featured-list_text');

  // Defensive: fallback if not found
  if (!mediaDiv || !textSection) return;

  // The image is the first img in mediaDiv
  const img = mediaDiv.querySelector('img');

  // The purple rectangle is a decorative SVG in .jupiter22-pattern, which is a sibling of the image
  // We'll include both the image and the SVG as a group in the right column
  const pattern = mediaDiv.querySelector('.jupiter22-pattern');
  // Compose the right column content
  const rightColContent = [];
  if (img) rightColContent.push(img);
  if (pattern) rightColContent.push(pattern);

  // The left column is the entire textSection (contains the list)
  // This will preserve the structure and icons
  const leftColContent = textSection;

  // Build the table
  const headerRow = ['Columns (columns32)'];
  const contentRow = [leftColContent, rightColContent];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
