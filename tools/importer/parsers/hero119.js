/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the hero image (background)
  function getHeroImageEl(el) {
    // Look for <picture> or <img> inside hero background
    const bgImgContainer = el.querySelector('.jupiter22-c-hero__background-image');
    if (bgImgContainer) {
      // Prefer <img> inside <picture>
      const img = bgImgContainer.querySelector('img');
      if (img) return img;
      // Fallback: any <img> inside
      const anyImg = bgImgContainer.querySelector('img');
      if (anyImg) return anyImg;
    }
    // Fallback: any <img> in hero
    const fallbackImg = el.querySelector('img');
    if (fallbackImg) return fallbackImg;
    return null;
  }

  // Helper to get hero text content (title, subtitle, paragraph)
  function getHeroTextContent(el) {
    const textContainer = el.querySelector('.jupiter22-c-hero__text-content');
    if (!textContainer) return null;
    // Collect all children (h1, h2, div, etc)
    const children = Array.from(textContainer.children);
    // For robustness, include the entire text block
    return children;
  }

  // Find the actual hero block element
  let heroEl = element.querySelector('.jupiter22-c-hero');
  if (!heroEl) {
    // Defensive: maybe element itself is the hero
    if (element.classList.contains('jupiter22-c-hero')) {
      heroEl = element;
    } else {
      // Try to find it deeper
      heroEl = element.querySelector('[class*="hero"]');
    }
  }
  if (!heroEl) return;

  // Header row
  const headerRow = ['Hero (hero119)'];

  // Row 2: background image (optional)
  const heroImg = getHeroImageEl(heroEl);
  const imageRow = [heroImg ? heroImg : ''];

  // Row 3: text content (title, subtitle, paragraph)
  const textContent = getHeroTextContent(heroEl);
  const textRow = [textContent ? textContent : ''];

  // Build table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
