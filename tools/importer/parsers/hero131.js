/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the hero block root
  let heroRoot = element.querySelector('.jupiter22-c-hero');
  if (!heroRoot) {
    heroRoot = element;
  }

  // --- HEADER ROW ---
  const headerRow = ['Hero (hero131)'];

  // --- BACKGROUND IMAGE ROW ---
  // Find the decorative pattern (SVG gradient)
  let backgroundEl = heroRoot.querySelector('.jupiter22-pattern');
  // Defensive: If not found, try to find any SVG inside heroRoot
  if (!backgroundEl) {
    backgroundEl = heroRoot.querySelector('svg');
  }
  // If found, wrap in a div for clarity
  let backgroundCell;
  if (backgroundEl) {
    const bgDiv = document.createElement('div');
    bgDiv.append(backgroundEl);
    backgroundCell = bgDiv;
  } else {
    backgroundCell = '';
  }

  // --- CONTENT ROW ---
  // Find the text container
  const textContainer = heroRoot.querySelector('.jupiter22-c-header-catalyst__text');
  const contentParts = [];
  if (textContainer) {
    // Title (h1)
    const title = textContainer.querySelector('h1');
    if (title) contentParts.push(title);
    // Subheading (h2)
    const subheading = textContainer.querySelector('h2');
    if (subheading) contentParts.push(subheading);
    // Paragraph (optional)
    const paragraph = textContainer.querySelector('.jupiter22-c-text-passage');
    if (paragraph && paragraph.textContent.trim()) {
      contentParts.push(paragraph);
    }
    // CTA (optional) - look for a link
    const cta = textContainer.querySelector('a');
    if (cta) contentParts.push(cta);
  }
  // Defensive: If nothing found, fallback to heroRoot headings
  if (contentParts.length === 0) {
    const fallbackTitle = heroRoot.querySelector('h1');
    if (fallbackTitle) contentParts.push(fallbackTitle);
    const fallbackSubheading = heroRoot.querySelector('h2');
    if (fallbackSubheading) contentParts.push(fallbackSubheading);
  }
  const contentCell = contentParts.length ? contentParts : '';

  // --- BUILD TABLE ---
  const cells = [
    headerRow,
    [backgroundCell],
    [contentCell],
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
