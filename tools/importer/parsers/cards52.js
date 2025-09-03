/* global WebImporter */
export default function parse(element, { document }) {
  // Only process the cards block
  if (!element.classList.contains('case-study-cards--default')) return;

  const headerRow = ['Cards (cards52)'];
  const rows = [];

  // Find all card wrappers
  const wrappers = element.querySelectorAll('.jupiter22-case-study-card-wrapper');
  wrappers.forEach(wrapper => {
    const media = wrapper.querySelector('.jupiter22-case-study-media img');
    const article = wrapper.querySelector('.jupiter22-case-study-article section');
    if (!media || !article) return;

    // Compose text cell: title, description, CTA
    const textCell = [];
    const title = article.querySelector('.jupiter22-case-study-card__title');
    if (title) textCell.push(title);
    const desc = article.querySelector('.jupiter22-c-text-passage');
    if (desc) textCell.push(desc);
    const cta = article.querySelector('.jupiter22-case-study-card__link');
    if (cta) textCell.push(cta);

    // Defensive: ensure at least one text content
    if (textCell.length === 0) return;

    rows.push([media, textCell]);
  });

  if (rows.length === 0) return;

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block table
  element.parentNode.replaceChild(table, element);
}
