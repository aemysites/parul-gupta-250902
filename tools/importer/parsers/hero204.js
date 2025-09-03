/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extract background image URL from inline style
  function getBgUrl(style) {
    if (!style) return null;
    const match = style.match(/url\(([^)]+)\)/);
    return match ? match[1].replace(/['"]/g, '') : null;
  }

  // 1. Header row
  const headerRow = ['Hero (hero204)'];

  // 2. Background image row
  let bgImgUrl = null;
  let bgImgEl = null;
  // Find hero block
  const hero = element.querySelector('.jupiter22-c-hero');
  if (hero) {
    bgImgUrl = getBgUrl(hero.getAttribute('style'));
    if (bgImgUrl) {
      bgImgEl = document.createElement('img');
      bgImgEl.src = bgImgUrl;
      bgImgEl.alt = '';
      // Optionally, add width/height if known
    }
  }
  const bgImgRow = [bgImgEl ? bgImgEl : ''];

  // 3. Content row
  let contentEls = [];
  if (hero) {
    // Title (h2)
    const title = hero.querySelector('h2');
    if (title) contentEls.push(title);
    // Subheading (paragraph)
    const passage = hero.querySelector('.jupiter22-c-text-passage p');
    if (passage) contentEls.push(passage);
    // CTA (button link)
    const btn = hero.querySelector('.jupiter22-c-button');
    if (btn) contentEls.push(btn);
  }
  const contentRow = [contentEls];

  // 4. Assemble table
  const cells = [headerRow, bgImgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace element
  element.replaceWith(block);
}
