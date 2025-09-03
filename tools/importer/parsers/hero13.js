/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the hero block
  function findHeroBlock(el) {
    return el.querySelector('.jupiter22-c-hero');
  }

  // Helper to extract the background image
  function extractBackgroundImage(heroEl) {
    const bgImageDiv = heroEl.querySelector('.jupiter22-c-hero__background-image');
    if (!bgImageDiv) return null;
    const picture = bgImageDiv.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) return img;
    }
    return null;
  }

  // Helper to extract text content (title, subtitle, passage)
  function extractTextContent(heroEl) {
    const textContentDiv = heroEl.querySelector('.jupiter22-c-hero__text-content');
    if (!textContentDiv) return null;
    const content = [];
    // Title (h1)
    const title = textContentDiv.querySelector('.jupiter22-c-hero__title');
    if (title && title.textContent.trim()) content.push(title);
    // Subtitle (h2)
    const subtitle = textContentDiv.querySelector('.jupiter22-c-hero__subtitle');
    if (subtitle && subtitle.textContent.trim()) content.push(subtitle);
    // Text passage (paragraph)
    const passageDiv = textContentDiv.querySelector('.jupiter22-c-hero__text-passage');
    if (passageDiv && passageDiv.textContent.trim()) {
      // If passageDiv contains paragraphs, add them
      const paragraphs = passageDiv.querySelectorAll('p');
      if (paragraphs.length) {
        paragraphs.forEach(p => content.push(p));
      } else {
        content.push(passageDiv);
      }
    }
    return content;
  }

  // Helper to extract CTA button
  function extractCTA(heroEl) {
    const textContentDiv = heroEl.querySelector('.jupiter22-c-hero__text-content');
    if (!textContentDiv) return null;
    const buttonGroup = textContentDiv.querySelector('.jupiter22-c-hero__button-group');
    if (buttonGroup) {
      // Find the first <a> inside button group
      const ctaLink = buttonGroup.querySelector('a[href]');
      if (ctaLink) return ctaLink;
    }
    return null;
  }

  // Main parsing logic
  const heroEl = findHeroBlock(element);
  if (!heroEl) return;

  // 1. Header row
  const headerRow = ['Hero (hero13)'];

  // 2. Background image row
  const bgImg = extractBackgroundImage(heroEl);
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row: title, subtitle, passage, CTA
  const textContent = extractTextContent(heroEl) || [];
  const cta = extractCTA(heroEl);
  const contentRow = [cta ? [...textContent, cta] : textContent.length ? textContent : ['']];

  // Compose table cells
  const cells = [headerRow, bgImgRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
