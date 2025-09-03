/* global WebImporter */
export default function parse(element, { document }) {
  // Find the card wrapper
  const cardWrapper = element.querySelector('.case-study-cards--default');
  if (!cardWrapper) return;

  // Find all media and article pairs
  const medias = cardWrapper.querySelectorAll('.jupiter22-case-study-media');
  const articles = cardWrapper.querySelectorAll('.jupiter22-case-study-article');

  // Defensive: ensure pairs
  const numCards = Math.min(medias.length, articles.length);

  // Table header
  const headerRow = ['Cards (cards126)'];
  const rows = [headerRow];

  for (let i = 0; i < numCards; i++) {
    const media = medias[i];
    const article = articles[i];

    // Find the main card image (first img in media)
    const img = media.querySelector('img');
    const imgCell = img ? img : document.createElement('div');

    // Compose the text cell
    // Find all icons (svg) in the article
    const icons = Array.from(article.querySelectorAll('.jupiter22-c-icon svg, .jupiter22-case-study-card-variant__icon svg'));
    // Find all text passages (all .jupiter22-case-study-card__text)
    const textPassages = Array.from(article.querySelectorAll('.jupiter22-case-study-card__text'));
    const cellContent = [];
    // Add icons first
    icons.forEach(icon => cellContent.push(icon));
    // Add all text passages (including all paragraphs)
    textPassages.forEach(tp => {
      // If it's a div with a p inside, use the div
      cellContent.push(tp);
    });

    rows.push([imgCell, cellContent]);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
