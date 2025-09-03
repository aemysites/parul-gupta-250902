/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Find the main card/media cluster
  const mainCluster = grid.querySelector('.jupiter22-card-cluster-group-vertical');
  if (!mainCluster) return;

  // 1st column: image
  let imgCell = null;
  const media = mainCluster.querySelector('.jupiter22-card-cluster-group-vertical-media img');
  if (media) {
    imgCell = media.cloneNode(true);
  }

  // 2nd column: heading + text (include all text content)
  let headingCell = document.createElement('div');
  {
    // Heading
    const heading = mainCluster.querySelector('.jupiter22-card-cluster-group-vertical_main-card_heading');
    if (heading) headingCell.appendChild(heading.cloneNode(true));
    // Text passage (may be empty, but include it)
    const text = mainCluster.querySelector('.jupiter22-c-text-passage');
    if (text) headingCell.appendChild(text.cloneNode(true));
    // Also include any eyebrow heading (if present)
    const eyebrow = mainCluster.querySelector('.jupiter22-card-cluster-group-vertical__eyebrow');
    if (eyebrow && eyebrow.textContent.trim()) headingCell.appendChild(eyebrow.cloneNode(true));
  }

  // 3rd and 4th columns: solution cards (all visible solution cards)
  const solutionCards = mainCluster.querySelectorAll('.jupiter22-card-cluster-solution-cards .jupiter22-c-solution-card');
  let solutionCardEls = Array.from(solutionCards);
  if (solutionCardEls.length === 0) {
    // fallback: inside accordion
    const accordionCards = mainCluster.querySelectorAll('.jupiter22-c-accordion-panel__body-inner .jupiter22-c-solution-card');
    solutionCardEls = Array.from(accordionCards);
  }

  // If there are more than 2 solution cards, include all (to ensure all text is included)
  const transportCells = solutionCardEls.map(card => {
    const cell = document.createElement('div');
    // Title
    const title = card.querySelector('.jupiter22-c-solution-card__title');
    if (title) cell.appendChild(title.cloneNode(true));
    // Also include any text passage (if present)
    const text = card.querySelector('.jupiter22-c-text-passage');
    if (text) cell.appendChild(text.cloneNode(true));
    return cell;
  });

  // Build table rows
  const headerRow = ['Columns (columns2)'];
  const row = [imgCell, headingCell, ...transportCells];

  const cells = [headerRow, row];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
