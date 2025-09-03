/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the two main panels (columns)
  const panels = element.querySelectorAll(':scope > .jupiter22-feature-card__panel');
  if (!panels || panels.length < 2) return;

  // First column: image
  const imagePanel = panels[0];
  let imageContent = null;
  // Find the image (should be inside .jupiter22-feature-card-media)
  const media = imagePanel.querySelector('.jupiter22-feature-card-media');
  if (media) {
    imageContent = media;
  } else {
    imageContent = imagePanel;
  }

  // Second column: text content (icon, heading, text, button)
  const contentPanel = panels[1];
  let contentContent = null;
  // Find the main article content
  const article = contentPanel.querySelector('.jupiter22-feature-card-article');
  if (article) {
    // We'll include the whole article block, which contains icon, heading, text, and button
    contentContent = article;
  } else {
    contentContent = contentPanel;
  }

  // Build the table rows
  const headerRow = ['Columns (columns202)'];
  const contentRow = [imageContent, contentContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
