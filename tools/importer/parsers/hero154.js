/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Hero (hero154)'];

  // --- Extract background image ---
  // Find the hero block
  const hero = element.querySelector('.jupiter22-c-hero');
  let bgImgEl = null;
  if (hero) {
    const bgImgContainer = hero.querySelector('.jupiter22-c-hero__background-image');
    if (bgImgContainer) {
      // Prefer the <img> inside <picture>
      const img = bgImgContainer.querySelector('img');
      if (img) {
        bgImgEl = img;
      } else {
        // fallback: include the whole picture if present
        const picture = bgImgContainer.querySelector('picture');
        if (picture) {
          bgImgEl = picture;
        }
      }
    }
  }

  // --- Extract content: heading, subheading, paragraph, CTA ---
  let contentEls = [];
  if (hero) {
    const container = hero.querySelector('.jupiter22-c-hero__container');
    if (container) {
      const textContent = container.querySelector('.jupiter22-c-hero__text-content');
      if (textContent) {
        // Heading (h1 or h2)
        const h1 = textContent.querySelector('h1');
        const h2 = textContent.querySelector('h2');
        if (h1 && h1.textContent.trim()) {
          contentEls.push(h1);
        }
        if (h2 && h2.textContent.trim()) {
          contentEls.push(h2);
        }
        // Paragraph
        const passage = textContent.querySelector('.jupiter22-c-text-passage');
        if (passage) {
          contentEls.push(passage);
        }
        // CTA button (link)
        const buttonGroup = textContent.querySelector('.jupiter22-c-hero__button-group');
        if (buttonGroup) {
          // Only include the first button (if multiple)
          const cta = buttonGroup.querySelector('a');
          if (cta) {
            contentEls.push(cta);
          }
        }
      }
    }
  }

  // Defensive fallback: if nothing found, try to get any h1/h2/p/a in hero
  if (contentEls.length === 0 && hero) {
    const fallbackEls = hero.querySelectorAll('h1, h2, p, a');
    contentEls = Array.from(fallbackEls);
  }

  // --- Build table rows ---
  const rows = [
    headerRow,
    [bgImgEl ? bgImgEl : ''],
    [contentEls.length ? contentEls : ''],
  ];

  // --- Create and replace ---
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
