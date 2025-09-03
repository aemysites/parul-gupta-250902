/* global WebImporter */
export default function parse(element, { document }) {
  // Find the section heading for 'Spotlight on Indexes'
  const spotlightHeading = Array.from(element.querySelectorAll('.jupiter22-c-section-heading .jupiter22-c-section-heading__headline'))
    .find(h => h.textContent.trim() === 'Spotlight on Indexes');

  if (!spotlightHeading) return;

  // Find the card container (horizontal card)
  const cardContainer = spotlightHeading.closest('.jupiter22-c-section-heading').nextElementSibling;
  if (!cardContainer || !cardContainer.classList.contains('jupiter22-c-news-card')) return;

  // Get image (first cell)
  let imageCell = null;
  const mediaParent = cardContainer.querySelector('.jupiter22-c-news-card__media--parent');
  if (mediaParent) {
    const img = mediaParent.querySelector('img');
    if (img) imageCell = img.cloneNode(true);
  }

  // Get text content (second cell)
  const textBlock = cardContainer.querySelector('.jupiter22-c-news-card__text');
  let textCellContent = [];
  if (textBlock) {
    // Badge (tag)
    const badge = textBlock.querySelector('.jupiter22-c-quote-tag');
    if (badge) textCellContent.push(badge.cloneNode(true));
    // Headline (as heading)
    const headline = textBlock.querySelector('.jupiter22-c-news-card__headline');
    if (headline) textCellContent.push(headline.cloneNode(true));
    // Metadata (date, author)
    const meta = textBlock.querySelector('.jupiter22-c-metadata');
    if (meta) textCellContent.push(meta.cloneNode(true));
  }

  // Defensive: If any text content is missing, fallback to all text inside text block
  if (textCellContent.length === 0 && textBlock) {
    textCellContent = [document.createTextNode(textBlock.textContent.trim())];
  }

  // Compose table rows
  const headerRow = ['Cards (cards48)'];
  const cardRow = [imageCell, textCellContent];
  const cells = [headerRow, cardRow];

  // Create block table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
