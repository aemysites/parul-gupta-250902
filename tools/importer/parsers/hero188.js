/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block requirements
  const headerRow = ['Hero (hero188)'];

  // --- Background Image Row ---
  // This block has a dark background but no visible image, so leave cell empty
  const bgRow = [''];

  // --- Content Row ---
  // Find the card that contains the hero content
  let contentCell = '';
  try {
    // Defensive: find the info card body (contains all text and CTA)
    const infoCardBody = element.querySelector('.jupiter22-c-info-card__body');
    if (infoCardBody) {
      // We'll collect the heading, paragraph, and CTA link
      const contentParts = [];

      // Heading (h3)
      const heading = infoCardBody.querySelector('h3');
      if (heading) contentParts.push(heading);

      // Subheading/paragraph
      const passage = infoCardBody.querySelector('.jupiter22-c-text-passage');
      if (passage) contentParts.push(passage);

      // CTA link
      const cta = infoCardBody.querySelector('.jupiter22-c-info-card__link');
      if (cta) contentParts.push(cta);

      contentCell = contentParts;
    }
  } catch (e) {
    // fallback: leave contentCell empty
    contentCell = '';
  }

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgRow,
    [contentCell],
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
