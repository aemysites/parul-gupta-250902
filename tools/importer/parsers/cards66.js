/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to build the text content cell for each card
  function buildTextCell(contentDiv) {
    const fragment = document.createDocumentFragment();
    // Category (as uppercase small heading)
    const category = contentDiv.querySelector('.jupiter22-c-article-list__item_category');
    if (category) {
      const cat = document.createElement('div');
      cat.style.textTransform = 'uppercase';
      cat.style.fontSize = '12px';
      cat.textContent = category.textContent.trim();
      fragment.appendChild(cat);
    }
    // Title (as heading, linked)
    const titleLink = contentDiv.querySelector('.jupiter22-c-article-list__item_title_wrapper');
    if (titleLink) {
      const h = document.createElement('strong');
      const a = document.createElement('a');
      a.href = titleLink.href;
      // Use the span inside for the title text
      const spanTitle = titleLink.querySelector('.jupiter22-c-article-list__item_title');
      if (spanTitle) {
        a.textContent = spanTitle.textContent.trim();
      } else {
        a.textContent = titleLink.textContent.trim();
      }
      h.appendChild(a);
      fragment.appendChild(h);
    }
    // Timeline and publisher (meta)
    const stamps = contentDiv.querySelector('.jupiter22-c-article-list__item_stamps');
    if (stamps) {
      const meta = document.createElement('div');
      // Timeline
      const timeline = stamps.querySelector('.jupiter22-c-article-list__item_timeline');
      if (timeline) {
        meta.appendChild(document.createTextNode(timeline.textContent.trim()));
      }
      // Publisher
      const publisher = stamps.querySelector('.jupiter22-c-article-list__item_publisher');
      if (publisher) {
        meta.appendChild(document.createTextNode(' — ' + publisher.textContent.trim()));
      }
      fragment.appendChild(meta);
    }
    return fragment;
  }

  // Find the article list
  const articleList = element.querySelector('.jupiter22-c-article-list__list');
  if (!articleList) return;

  const rows = [];
  // Header row: use a single cell, but after table creation, set colspan=2
  const headerRow = ['Cards (cards66)'];
  rows.push(headerRow);

  // For each article/card
  articleList.querySelectorAll(':scope > li.jupiter22-c-article-list__item').forEach((li) => {
    // Image cell (MANDATORY: only add row if image is present)
    let imgCell = null;
    const imgDiv = li.querySelector('.jupiter22-c-article-list__item_img');
    if (imgDiv) {
      const img = imgDiv.querySelector('img');
      if (img) {
        imgCell = img;
      }
    }
    // Text cell
    const contentDiv = li.querySelector('.jupiter22-c-article-list__item_content');
    let textCell = '';
    if (contentDiv) {
      textCell = buildTextCell(contentDiv);
    }
    // Only add row if image is present (MANDATORY for this variant)
    if (imgCell) {
      rows.push([imgCell, textCell]);
    }
  });

  // Replace the original element with the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Fix the header row to have colspan=2
  const firstRow = table.querySelector('tr');
  if (firstRow && firstRow.children.length === 1) {
    firstRow.children[0].setAttribute('colspan', '2');
  }
  element.replaceWith(table);
}
