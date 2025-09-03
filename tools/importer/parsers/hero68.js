/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the hero block root
  const hero = element.querySelector('.jupiter22-c-hero');
  if (!hero) return;

  // --- Row 2: Background Image (optional) ---
  let bgImgCell = '';
  // Find the <picture> containing the image
  const bgImgContainer = hero.querySelector('.jupiter22-c-hero__background-image picture');
  if (bgImgContainer) {
    const img = bgImgContainer.querySelector('img');
    if (img) bgImgCell = img;
  }

  // --- Row 3: Content (title, subtitle, CTA) ---
  const textContent = hero.querySelector('.jupiter22-c-hero__text-content');
  let contentCell = [];
  if (textContent) {
    // Title (h1)
    const title = textContent.querySelector('h1');
    if (title) contentCell.push(title);
    // Subtitle (h2)
    const subtitle = textContent.querySelector('h2');
    if (subtitle) contentCell.push(subtitle);
    // CTA (button/link)
    const buttonGroup = hero.querySelector('.jupiter22-c-hero__button-group');
    if (buttonGroup) {
      const cta = buttonGroup.querySelector('a');
      if (cta) contentCell.push(cta);
    }
  }

  // Table rows
  const headerRow = ['Hero (hero68)'];
  const imgRow = [bgImgCell || ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  const cells = [headerRow, imgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
