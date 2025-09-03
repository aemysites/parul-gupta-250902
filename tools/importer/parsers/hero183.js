/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate child by class
  function findChildByClass(parent, className) {
    return Array.from(parent.children).find(child => child.classList.contains(className));
  }

  // 1. Header row
  const headerRow = ['Hero (hero183)'];

  // 2. Image row: find the main image (first <img> in the card)
  let imageRow;
  const img = element.querySelector('img');
  if (img) {
    imageRow = [img];
  } else {
    imageRow = ['']; // fallback if no image
  }

  // 3. Content row: gather heading, subheading, paragraph, list, and links
  // Find the content container
  let contentContainer = element.querySelector('.jupiter22-c-info-card-small-horizontal__content');
  if (!contentContainer) {
    // fallback: try to find the card body
    contentContainer = element;
  }

  // Find the info card body (contains headings, text, links)
  let cardBody = contentContainer.querySelector('.jupiter22-c-info-card__body');
  if (!cardBody) {
    cardBody = contentContainer;
  }

  // Gather elements: subtitle, title, text, links
  const contentParts = [];

  // Subtitle (smaller heading)
  const subtitle = cardBody.querySelector('.jupiter22-c-info-card__subtitle');
  if (subtitle) contentParts.push(subtitle);

  // Title (main heading)
  const title = cardBody.querySelector('.jupiter22-c-info-card__title');
  if (title) contentParts.push(title);

  // Text passage (paragraphs and list)
  const textPassage = cardBody.querySelector('.jupiter22-c-text-passage');
  if (textPassage) contentParts.push(textPassage);

  // Links (call-to-action)
  const linksContainer = cardBody.querySelector('.jupiter22-c-info-card__links');
  if (linksContainer) {
    // Place all links as-is
    contentParts.push(...Array.from(linksContainer.children));
  }

  const contentRow = [contentParts];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
