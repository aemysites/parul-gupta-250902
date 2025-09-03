/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract topic rows (each topic = one row)
  function extractTopicRows() {
    const topicRows = [];
    // Find all topic blocks (Fixed Income, Central Banks, etc)
    const topicBlocks = element.querySelectorAll('.jupiter22-c-article-topic');
    topicBlocks.forEach((topicBlock) => {
      // Get all article items for this topic
      const items = Array.from(topicBlock.querySelectorAll('.jupiter22-c-article-topic-list__item'));
      // For each item, extract the content (image, title, meta)
      const cells = items.map((item) => {
        const cellContent = document.createElement('div');
        // Image
        const img = item.querySelector('.jupiter22-c-article-topic-list__item_img img');
        if (img) cellContent.appendChild(img.cloneNode(true));
        // Category (text)
        const cat = item.querySelector('.jupiter22-c-article-topic-list__item_category');
        if (cat) cellContent.appendChild(cat.cloneNode(true));
        // Title (as link)
        const title = item.querySelector('.jupiter22-c-article-topic-list__item_title');
        if (title) cellContent.appendChild(title.cloneNode(true));
        // Stamps (date, publisher)
        const stamps = item.querySelector('.jupiter22-c-article-topic-list__item_stamps');
        if (stamps) cellContent.appendChild(stamps.cloneNode(true));
        return cellContent;
      });
      if (cells.length > 0) {
        topicRows.push(cells);
      }
    });
    return topicRows;
  }

  // Compose the table rows
  const headerRow = ['Columns (columns132)'];
  const rows = [];

  // 1. Most Viewed in Fixed Income table (left column)
  const mostViewedHeading = element.querySelector('.jupiter22-c-section-heading__headline');
  const mostViewedTable = element.querySelector('.jupiter22-c-symbol-table__table');
  if (mostViewedHeading && mostViewedTable) {
    // Compose a cell with heading and table content (not the table element itself)
    const leftCellContent = document.createElement('div');
    leftCellContent.appendChild(mostViewedHeading.cloneNode(true));
    // Extract thead and tbody rows as plain elements (not as a table)
    const thead = mostViewedTable.querySelector('thead');
    const tbody = mostViewedTable.querySelector('tbody');
    if (thead) leftCellContent.appendChild(thead.cloneNode(true));
    if (tbody) leftCellContent.appendChild(tbody.cloneNode(true));
    rows.push([leftCellContent]);
  }

  // 2. Topic rows (each topic = one row of articles)
  const topicRows = extractTopicRows();
  topicRows.forEach((row) => {
    rows.push(row);
  });

  // Create the block table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
