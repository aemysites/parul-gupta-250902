/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the article list block
  const articleList = element.querySelector('.jupiter22-c-article-list');
  if (!articleList) return;

  // Table header
  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];

  // Find all article items
  const items = articleList.querySelectorAll('ul.jupiter22-c-article-list__list > li.jupiter22-c-article-list__item');
  items.forEach((item) => {
    // Only include cards with an image (image is mandatory for this variant)
    const imgWrap = item.querySelector('.jupiter22-c-article-list__item_img img');
    if (!imgWrap) return;

    // Image cell
    const imgCell = imgWrap;

    // Text cell
    const content = item.querySelector('.jupiter22-c-article-list__item_content');
    if (!content) return;
    const textCellParts = [];

    // Category (as small heading)
    const category = content.querySelector('.jupiter22-c-article-list__item_category');
    if (category) {
      const catElem = document.createElement('div');
      catElem.style.fontSize = '12px';
      catElem.style.fontWeight = 'bold';
      catElem.textContent = category.textContent;
      textCellParts.push(catElem);
    }

    // Title (as heading, wrapped in link)
    const titleLink = content.querySelector('.jupiter22-c-article-list__item_title_wrapper');
    if (titleLink) {
      const titleSpan = titleLink.querySelector('.jupiter22-c-article-list__item_title');
      if (titleSpan) {
        const h = document.createElement('h3');
        const a = document.createElement('a');
        a.href = titleLink.href;
        a.textContent = titleSpan.textContent;
        h.appendChild(a);
        textCellParts.push(h);
      }
    }

    // Timeline and publisher
    const stamps = content.querySelector('.jupiter22-c-article-list__item_stamps');
    if (stamps) {
      // Compose timeline and publisher as a single line
      const timeline = stamps.querySelector('.jupiter22-c-article-list__item_timeline');
      const publisher = stamps.querySelector('.jupiter22-c-article-list__item_publisher');
      if (timeline && publisher) {
        const metaDiv = document.createElement('div');
        metaDiv.style.fontSize = '12px';
        metaDiv.style.color = '#666';
        metaDiv.textContent = `${timeline.textContent} · ${publisher.textContent}`;
        textCellParts.push(metaDiv);
      }
    }

    // Add any extra text content from the card (flexible parsing)
    // Get all direct child nodes of content not already handled
    Array.from(content.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (
          !node.classList.contains('jupiter22-c-article-list__item_category') &&
          !node.classList.contains('jupiter22-c-article-list__item_title_wrapper') &&
          !node.classList.contains('jupiter22-c-article-list__item_stamps')
        ) {
          // Add any extra element (e.g., description, if present)
          textCellParts.push(node.cloneNode(true));
        }
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        // Add any stray text
        textCellParts.push(document.createTextNode(node.textContent.trim()));
      }
    });

    // Compose row (no empty columns)
    rows.push([
      imgCell,
      textCellParts
    ]);
  });

  // CTA row (See More)
  const cta = element.querySelector('.jupiter22-c-text-passage .button-secondary');
  if (cta) {
    rows.push(['', [cta]]);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
