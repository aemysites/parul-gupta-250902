/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the hero block root
  const hero = element.querySelector('.jupiter22-c-hero');
  if (!hero) return;

  // --- Row 2: Background Image ---
  let imageCell = '';
  const bgImgDiv = hero.querySelector('.jupiter22-c-hero__background-image');
  if (bgImgDiv) {
    // Use the <img> inside <picture>
    const img = bgImgDiv.querySelector('img');
    if (img) {
      imageCell = img;
    }
  }

  // --- Row 3: Headings and Text ---
  const textContent = hero.querySelector('.jupiter22-c-hero__text-content');
  let textCell = '';
  if (textContent) {
    // Gather heading, subheading, and passage
    const parts = [];
    const h1 = textContent.querySelector('h1');
    if (h1) parts.push(h1);
    const h2 = textContent.querySelector('h2');
    if (h2) parts.push(h2);
    // Optional paragraph or CTA
    const passage = textContent.querySelector('.jupiter22-c-text-passage');
    if (passage && passage.textContent.trim()) {
      parts.push(passage);
    }
    textCell = parts;
  }

  // --- Table Construction ---
  const cells = [
    ['Hero (hero173)'],
    [imageCell],
    [textCell],
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
