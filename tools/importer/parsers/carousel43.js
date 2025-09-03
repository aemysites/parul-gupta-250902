/* global WebImporter */
export default function parse(element, { document }) {
  // Always output the block header row
  const headerRow = ['Carousel (carousel43)'];
  const rows = [headerRow];

  // Find the active carousel panel
  const panel = element.querySelector('.watchlist-tabs__panel.is-active');
  if (!panel) {
    const block = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(block);
    return;
  }

  // Find the carousel slides list
  const slidesList = panel.querySelector('.watchlist__slides.glide__slides');
  if (!slidesList) {
    const block = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(block);
    return;
  }

  // Only <li> elements with class 'watchlist__slide' (not ads)
  const slides = Array.from(slidesList.querySelectorAll('li.watchlist__slide'));

  slides.forEach((slide) => {
    // First cell: image (mandatory, but fallback to empty if not present)
    let img = slide.querySelector('img');
    if (!img) img = '';
    // Second cell: collect all visible text content from the slide
    let textCell = '';
    const link = slide.querySelector('.watchlist__slide-link');
    if (link) {
      // Collect all text nodes and elements inside link
      let text = '';
      // Get all text content, including from nested elements
      text = link.innerText ? link.innerText.trim() : link.textContent.trim();
      if (text) {
        textCell = text;
      }
    }
    // Only add row if at least one cell has content
    if (img || textCell) {
      rows.push([img, textCell]);
    }
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
