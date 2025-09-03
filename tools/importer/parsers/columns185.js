/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns185)'];

  // --- COLUMN 1: Left side image ---
  // Find the image element
  let imgEl = element.querySelector('img');

  // --- COLUMN 2: Main card content ---
  // Get the main card section
  const mainCard = element.querySelector('.jupiter22-card-cluster-group-vertical_main-card');
  let mainCardContent = '';
  if (mainCard) {
    // Collect all visible text content in order
    const wrapper = document.createElement('div');
    // Eyebrow (h4)
    const eyebrow = mainCard.querySelector('h4');
    if (eyebrow) wrapper.appendChild(eyebrow.cloneNode(true));
    // Heading (h2)
    const heading = mainCard.querySelector('h2');
    if (heading) wrapper.appendChild(heading.cloneNode(true));
    // Quote (p)
    const quoteDiv = mainCard.querySelector('.jupiter22-c-text-passage p');
    if (quoteDiv) wrapper.appendChild(quoteDiv.cloneNode(true));
    // Link
    const link = mainCard.querySelector('a');
    if (link) wrapper.appendChild(link.cloneNode(true));
    mainCardContent = wrapper;
  }

  // --- COLUMN 3: Solution cards ---
  // Get all solution cards
  let solutionCardEls = Array.from(element.querySelectorAll('.jupiter22-c-solution-card'));
  // Defensive: If not found, try all .cluster-card
  if (solutionCardEls.length === 0) {
    solutionCardEls = Array.from(element.querySelectorAll('.cluster-card'));
  }

  // Compose the second row
  const secondRow = [];

  // 1. Left image column
  if (imgEl) {
    secondRow.push(imgEl.cloneNode(true));
  } else {
    secondRow.push('');
  }

  // 2. Middle column: main card content
  if (mainCardContent) {
    secondRow.push(mainCardContent);
  } else {
    secondRow.push('');
  }

  // 3 & 4. Solution cards columns
  for (let i = 0; i < 2; i++) {
    if (solutionCardEls[i]) {
      // Only include the text content (title + description) from each card
      const card = solutionCardEls[i];
      const cardWrapper = document.createElement('div');
      // Title
      const title = card.querySelector('h3');
      if (title) cardWrapper.appendChild(title.cloneNode(true));
      // Description
      const desc = card.querySelector('.jupiter22-c-text-passage p');
      if (desc) cardWrapper.appendChild(desc.cloneNode(true));
      // Link (if present)
      const link = card.querySelector('a');
      if (link) {
        // Only append if it has text
        cardWrapper.appendChild(link.cloneNode(true));
      }
      secondRow.push(cardWrapper);
    } else {
      secondRow.push('');
    }
  }

  // Compose table cells
  const cells = [headerRow, secondRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
