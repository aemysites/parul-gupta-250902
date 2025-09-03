/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main feature card
  const featureCard = element.querySelector('.jupiter22-feature-card');
  if (!featureCard) return;
  const panels = featureCard.querySelectorAll(':scope > .jupiter22-feature-card__panel');
  if (panels.length < 2) return;

  // Left column: image and any visible text (e.g., 'Puro Standard')
  const leftPanel = panels[0];
  const leftImg = leftPanel.querySelector('img');
  // Try to get the visible title text
  let leftTitle = '';
  const titleContainer = leftPanel.querySelector('.jupiter22-feature-card-media__title-container');
  if (titleContainer) {
    // Get all text content from title and subtitle
    leftTitle = Array.from(titleContainer.children)
      .map((el) => el.textContent.trim())
      .filter(Boolean)
      .join(' ');
  }
  // Compose left cell: image + title (if present)
  const leftCell = document.createElement('div');
  if (leftImg) leftCell.appendChild(leftImg.cloneNode(true));
  if (leftTitle) {
    const titleEl = document.createElement('div');
    titleEl.textContent = leftTitle;
    leftCell.appendChild(titleEl);
  }

  // Right column: all main content (subtitle, paragraphs, list, CTA)
  const rightPanel = panels[1];
  const article = rightPanel.querySelector('article');
  const cta = rightPanel.querySelector('a.jupiter22-feature-card__link');
  // Compose right cell: include all text content from article and CTA
  const rightCell = document.createElement('div');
  if (article) {
    // Clone all children (subtitle, paragraphs, ul)
    Array.from(article.children).forEach((child) => {
      rightCell.appendChild(child.cloneNode(true));
    });
  }
  if (cta) rightCell.appendChild(cta.cloneNode(true));

  // Build the table rows
  const headerRow = ['Columns (columns67)'];
  const contentRow = [leftCell, rightCell];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
