/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row as required
  const headerRow = ['Columns (columns170)'];

  // Get all direct card children (columns)
  const cards = Array.from(element.querySelectorAll(':scope > .jupiter22-c-card'));

  // Defensive: if no cards found, do nothing
  if (!cards.length) return;

  // For each card, extract the icon and title (as in screenshot)
  const columns = cards.map(card => {
    // The card content is inside .jupiter22-c-info-card
    const infoCard = card.querySelector('.jupiter22-c-info-card');
    if (!infoCard) return '';

    // Get the icon (svg)
    const iconDiv = infoCard.querySelector('.jupiter22-c-info-card__icon');
    // Get the title (h3)
    const title = infoCard.querySelector('.jupiter22-c-info-card__title');

    // Defensive: if missing icon or title, fallback to card
    if (!iconDiv || !title) return card;

    // Create a wrapper div for column content
    const colDiv = document.createElement('div');
    colDiv.appendChild(iconDiv);
    colDiv.appendChild(title);
    return colDiv;
  });

  // Table rows: header and one row with all columns
  const tableRows = [
    headerRow,
    columns
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
