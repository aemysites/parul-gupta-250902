/* global WebImporter */
export default function parse(element, { document }) {
  // Find the expert reference articles block
  const expertBlock = element.querySelector('.jupiter22-c-expert.jupiter22-expert-reference-articles-wrapper');
  if (!expertBlock) return;

  // Find the articles container
  const articlesContainer = expertBlock.querySelector('.jupiter22-expert-reference-articles');
  if (!articlesContainer) return;

  // Get all article elements
  const articleEls = Array.from(articlesContainer.querySelectorAll('.jupiter22-expert-reference-article'));

  // Build rows for each card
  const rows = articleEls.map(article => {
    // Find image
    let imgDiv = article.querySelector('.jupiter22-expert-reference-article-media');
    let imgUrl = imgDiv && imgDiv.style.backgroundImage
      ? imgDiv.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/)
      : null;
    let imgElem = null;
    if (imgUrl && imgUrl[1]) {
      imgElem = document.createElement('img');
      imgElem.src = imgUrl[1];
      imgElem.alt = '';
    }

    // Find title
    let titleDiv = article.querySelector('.jupiter22-expert-reference-article-title');
    let titleElem = null;
    if (titleDiv) {
      titleElem = document.createElement('h3');
      titleElem.textContent = titleDiv.textContent.trim();
    }

    // Find timestamp
    let timestampDiv = article.querySelector('.jupiter22-expert-reference-article-timestamp');
    let timestampElem = null;
    if (timestampDiv) {
      timestampElem = document.createElement('p');
      timestampElem.textContent = timestampDiv.textContent.trim();
    }

    // Find description (if any)
    let descElem = null;
    // Try to get more text from the article link (sometimes description is in the link text)
    let link = article.querySelector('a');
    if (link && link.textContent.trim() && (!titleElem || link.textContent.trim() !== titleElem.textContent)) {
      descElem = document.createElement('p');
      descElem.textContent = link.textContent.trim();
    }

    // Compose right cell
    const rightCell = [];
    if (titleElem) rightCell.push(titleElem);
    if (descElem) rightCell.push(descElem);
    if (timestampElem) rightCell.push(timestampElem);

    return [imgElem, rightCell];
  });

  // Table header
  const headerRow = ['Cards (cards161)'];
  const cells = [headerRow, ...rows];

  // Create and replace block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
