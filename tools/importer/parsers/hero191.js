/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the correct header row
  const headerRow = ['Hero (hero191)'];

  // Find background image (optional)
  let backgroundImageEl = '';
  const bgDiv = element.querySelector('.nsdq-c-band__background');
  if (bgDiv) {
    // Check for inline background-image style
    const bgStyle = bgDiv.getAttribute('style');
    if (bgStyle && bgStyle.includes('background-image')) {
      const match = bgStyle.match(/url\(['"]?(.*?)['"]?\)/);
      if (match && match[1]) {
        const img = document.createElement('img');
        img.src = match[1];
        backgroundImageEl = img;
      }
    }
    // If there's a child img, use it
    const imgChild = bgDiv.querySelector('img');
    if (imgChild) {
      backgroundImageEl = imgChild;
    }
  }

  // Find main content region
  const leftRegion = element.querySelector('.nsdq-l-grid__item');
  let contentParts = [];
  if (leftRegion) {
    // Get all heading and text content
    const headingBlock = leftRegion.querySelector('.jupiter22-c-section-heading');
    if (headingBlock) {
      // Get all children of headingBlock (not just h3/h2/h1)
      Array.from(headingBlock.children).forEach(child => {
        if (child.tagName.match(/^H[1-6]$/) || child.classList.contains('jupiter22-c-section-heading__headline')) {
          contentParts.push(child);
        }
      });
    }
    // Get all paragraphs and links in the text passage
    const passage = leftRegion.querySelector('.jupiter22-c-text-passage');
    if (passage) {
      Array.from(passage.children).forEach(child => {
        if (child.tagName === 'P' || child.tagName === 'A') {
          contentParts.push(child);
        }
        // Also add links inside paragraphs
        if (child.tagName === 'P') {
          const links = child.querySelectorAll('a');
          links.forEach(link => contentParts.push(link));
        }
      });
    }
  }

  // If nothing found, fallback to all text content
  if (contentParts.length === 0) {
    contentParts.push(element.textContent.trim());
  }

  // Compose table rows
  const imageRow = [backgroundImageEl ? backgroundImageEl : ''];
  const contentRow = [contentParts];
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
