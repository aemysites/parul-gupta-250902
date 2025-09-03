/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.querySelectorAll) return;

  // Table header row
  const headerRow = ['Cards (cards56)'];
  const rows = [headerRow];

  // Get all card buttons (each is a card)
  const cardEls = element.querySelectorAll('.jupiter22-series-video-player__button-item');

  cardEls.forEach((cardEl) => {
    // --- IMAGE CELL ---
    let imgEl = cardEl.querySelector('figure img');
    let imageCell = imgEl || '';

    // --- TEXT CELL ---
    // Compose text cell content as a single block (for flexibility and to ensure all text is included)
    const textCell = document.createElement('div');

    // Topic (optional)
    const topicSpan = cardEl.querySelector('.jupiter22-series-video-player__topic');
    if (topicSpan && topicSpan.textContent.trim()) {
      const topicDiv = document.createElement('div');
      topicDiv.textContent = topicSpan.textContent.trim();
      topicDiv.style.fontWeight = 'bold';
      topicDiv.style.textTransform = 'uppercase';
      topicDiv.style.fontSize = '0.8em';
      textCell.appendChild(topicDiv);
    }

    // Title (mandatory)
    const titleSpan = cardEl.querySelector('.jupiter22-series-video-player__sidebar-title');
    if (titleSpan) {
      const titleClone = titleSpan.cloneNode(true);
      // Remove icons and SVGs
      titleClone.querySelectorAll('.jupiter22-c-icon, svg').forEach((el) => el.remove());
      // Wrap in strong for heading style
      const heading = document.createElement('strong');
      heading.innerHTML = titleClone.innerHTML.trim();
      textCell.appendChild(heading);
    }

    // Date (optional)
    const metaDiv = cardEl.querySelector('.jupiter22-c-metadata');
    if (metaDiv) {
      const dateLi = metaDiv.querySelector('ul li');
      if (dateLi && dateLi.textContent.trim()) {
        const dateDiv = document.createElement('div');
        dateDiv.textContent = dateLi.textContent.trim();
        dateDiv.style.fontSize = '0.8em';
        dateDiv.style.color = '#888';
        textCell.appendChild(dateDiv);
      }
    }

    // Compose row: [image, text]
    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
