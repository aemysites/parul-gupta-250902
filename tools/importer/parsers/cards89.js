/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from the HTML structure
  function getCards(el) {
    const cards = [];
    // Find all media and article pairs
    const mediaEls = el.querySelectorAll('.jupiter22-case-study-media');
    const articleEls = el.querySelectorAll('.jupiter22-case-study-article');
    // Defensive: Only pair up to the shortest length
    const count = Math.min(mediaEls.length, articleEls.length);
    for (let i = 0; i < count; i++) {
      const media = mediaEls[i];
      const article = articleEls[i];
      // Get the image (first img in media)
      const img = media.querySelector('img');
      // Try to get the full quote text from the accordion if present
      let quoteText = '';
      const accordionBody = article.parentElement.querySelector('.jupiter22-c-accordion-panel__body-inner .jupiter22-case-study-card__text');
      if (accordionBody) {
        // Get all text content including name/title
        quoteText = accordionBody.textContent.trim();
      } else {
        // Fallback: get the h3 and name/role
        const title = article.querySelector('.jupiter22-case-study-card__title');
        const nameRole = article.querySelector('.jupiter22-case-study-card__text');
        if (title) quoteText += title.textContent.trim() + '\n';
        if (nameRole) quoteText += nameRole.textContent.trim();
        quoteText = quoteText.trim();
      }
      // Only add card if image and text are present
      if (img && quoteText) {
        cards.push([img, quoteText]);
      }
    }
    return cards;
  }

  // Find the main card container
  let cardContainer = element.querySelector('.case-study-cards--card-case-study-cards-3-up-careers');
  if (!cardContainer) {
    // Defensive fallback: try direct children
    cardContainer = element;
  }

  // Build the table rows
  const headerRow = ['Cards (cards89)'];
  const cardRows = getCards(cardContainer);
  const cells = [headerRow, ...cardRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
