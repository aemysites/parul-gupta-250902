/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block guidelines
  const headerRow = ['Hero (hero144)'];

  // --- Background image row ---
  // This hero does not have an <img> or obvious background image in the HTML.
  // The background is likely set via CSS, so we leave this cell empty.
  const backgroundRow = [''];

  // --- Content row ---
  // Find the main content container (contains heading and paragraph)
  // Instead of targeting only h3, target all heading and paragraph content
  const contentArr = [];

  // Find the section heading block
  const sectionHeading = element.querySelector('.jupiter22-c-section-heading');
  if (sectionHeading) {
    // Get all heading elements inside sectionHeading
    const headings = sectionHeading.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(h => contentArr.push(h));
  }

  // Find all paragraphs in the hero block (outside and inside sectionHeading)
  const textPassages = element.querySelectorAll('.jupiter22-c-text-passage p');
  textPassages.forEach(p => contentArr.push(p));

  // Fallback: if nothing found, include all text from the element
  if (contentArr.length === 0) {
    contentArr.push(document.createTextNode(element.textContent.trim()));
  }

  const contentRow = [contentArr];

  // Compose the table
  const cells = [
    headerRow,
    backgroundRow,
    contentRow,
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
