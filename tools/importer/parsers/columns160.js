/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container for columns
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Get the left column region
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 1) return;

  // Left column: contains the topic heading and the list of articles
  const leftRegion = regions[0];
  const topicBlock = leftRegion.querySelector('.jupiter22-c-article-topic');
  if (!topicBlock) return;

  // Heading (e.g., "Currencies")
  const headingLink = topicBlock.querySelector('a');
  let headingElem = null;
  if (headingLink) {
    headingElem = headingLink;
  }

  // Article list
  const articleList = topicBlock.querySelector('ul');
  let articleItems = [];
  if (articleList) {
    articleItems = Array.from(articleList.children);
  }

  // Compose columns: first column is heading, then each article in its own column
  const columns = [];
  if (headingElem) columns.push([headingElem]);
  articleItems.forEach(item => {
    columns.push([item]);
  });

  // Only include columns with actual content
  const contentRow = columns.filter(col => col && col.length);

  const headerRow = ['Columns (columns160)'];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
