/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the background image (from <img> inside <picture>)
  function getBackgroundImage() {
    const bgImgContainer = element.querySelector('.jupiter22-c-hero__background-image');
    if (!bgImgContainer) return '';
    const picture = bgImgContainer.querySelector('picture');
    if (!picture) return '';
    const img = picture.querySelector('img');
    return img || '';
  }

  // Helper to get the text content (title, subtitle, buttons)
  function getTextContent() {
    const textContent = element.querySelector('.jupiter22-c-hero__text-content');
    if (!textContent) return '';
    const parts = [];
    // Title (h1)
    const title = textContent.querySelector('.jupiter22-c-hero__title');
    if (title) parts.push(title);
    // Subtitle (h2)
    const subtitle = textContent.querySelector('.jupiter22-c-hero__subtitle');
    if (subtitle) parts.push(subtitle);
    // Paragraph (optional, not present in this HTML)
    const passage = textContent.querySelector('.jupiter22-c-hero__text-passage');
    if (passage && passage.textContent.trim()) parts.push(passage);
    // Buttons (call-to-action)
    const buttonGroup = textContent.querySelector('.jupiter22-c-hero__button-group');
    if (buttonGroup) {
      // Only include direct <a> children as buttons
      const links = buttonGroup.querySelectorAll('a');
      links.forEach(link => parts.push(link));
    }
    // If nothing found, return empty string
    if (parts.length === 0) return '';
    // Wrap all parts in a fragment
    const frag = document.createDocumentFragment();
    parts.forEach(part => frag.appendChild(part));
    return frag;
  }

  // Build table rows
  const headerRow = ['Hero (hero189)'];

  // Row 2: background image
  const bgImg = getBackgroundImage();
  const imageRow = [bgImg];

  // Row 3: text content (title, subtitle, buttons)
  const textFrag = getTextContent();
  const textRow = [textFrag];

  // Compose table
  const cells = [headerRow, imageRow, textRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
