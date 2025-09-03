/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block root
  const hero = element.querySelector('.jupiter22-c-hero');
  if (!hero) return;

  // --- Row 2: Background Image (optional) ---
  let bgImgCell = '';
  const bgImgWrapper = hero.querySelector('.jupiter22-c-hero__background-image');
  if (bgImgWrapper) {
    const picture = bgImgWrapper.querySelector('picture');
    if (picture) {
      bgImgCell = picture;
    } else {
      const img = bgImgWrapper.querySelector('img');
      if (img) bgImgCell = img;
    }
  }

  // --- Row 3: Content (title, subtitle, text, CTA) ---
  const contentCell = document.createElement('div');
  const textContent = hero.querySelector('.jupiter22-c-hero__text-content');
  if (textContent) {
    // Title (h1)
    const h1 = textContent.querySelector('h1');
    if (h1 && h1.textContent.trim()) contentCell.appendChild(h1);
    // Subtitle (h2)
    const h2 = textContent.querySelector('h2');
    if (h2) contentCell.appendChild(h2);
    // Paragraph(s)
    const passage = textContent.querySelector('.jupiter22-c-text-passage');
    if (passage) {
      Array.from(passage.children).forEach(child => contentCell.appendChild(child));
    }
    // CTA (not present in this example, but future-proof)
    const cta = textContent.querySelector('a');
    if (cta) contentCell.appendChild(cta);
  }

  // Build the table rows
  const headerRow = ['Hero (hero148)'];
  const rows = [
    headerRow,
    [bgImgCell],
    [contentCell]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
