/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the carousel container
  const carousel = element.querySelector('.jupiter22-series-video-player__list-carousel');
  if (!carousel) return;

  // Table header row
  const headerRow = ['Cards (cards167)'];
  const rows = [headerRow];

  // Get all card buttons (each is a card)
  const cardEls = carousel.querySelectorAll(':scope > button.jupiter22-series-video-player__button-item');

  cardEls.forEach((cardEl) => {
    // --- IMAGE CELL ---
    // Find the image inside the card
    let imgEl = cardEl.querySelector('figure img');
    // Defensive: fallback if not found
    if (!imgEl) {
      imgEl = cardEl.querySelector('img');
    }
    // Use the figure if possible for semantics
    let imageCell;
    const figureEl = cardEl.querySelector('figure');
    if (figureEl) {
      imageCell = figureEl.cloneNode(true);
    } else if (imgEl) {
      imageCell = imgEl.cloneNode(true);
    } else {
      imageCell = document.createTextNode('');
    }

    // --- TEXT CELL ---
    // Compose text cell: topic, title, date
    const infoEl = cardEl.querySelector('.jupiter22-series-video-player__button-info');
    const textCellContent = [];

    // Topic (optional)
    const topicEl = infoEl && infoEl.querySelector('.jupiter22-series-video-player__topic');
    if (topicEl && topicEl.textContent.trim()) {
      const topicSpan = document.createElement('span');
      topicSpan.textContent = topicEl.textContent.trim();
      textCellContent.push(topicSpan);
    }

    // Title (mandatory)
    const titleEl = infoEl && infoEl.querySelector('.jupiter22-series-video-player__sidebar-title');
    if (titleEl) {
      // Remove icon SVG if present
      const titleClone = titleEl.cloneNode(true);
      // Remove any icon divs
      const iconDivs = titleClone.querySelectorAll('.jupiter22-c-icon');
      iconDivs.forEach((iconDiv) => iconDiv.remove());
      // Use textContent for heading
      const heading = document.createElement('strong');
      heading.textContent = titleClone.textContent.trim();
      textCellContent.push(heading);
    }

    // Date (optional)
    const metaEl = infoEl && infoEl.querySelector('.jupiter22-c-metadata ul li');
    if (metaEl) {
      const dateSpan = document.createElement('span');
      dateSpan.textContent = metaEl.textContent.trim();
      textCellContent.push(dateSpan);
    }

    // --- FLEXIBILITY: Add all remaining text from cardEl (not already included) ---
    // This ensures we don't miss any text content
    // We'll grab all text nodes from cardEl, filter out those already in textCellContent
    // and add them if not duplicate
    const allText = cardEl.textContent.split('\n').map(t => t.trim()).filter(Boolean);
    const alreadyIncluded = textCellContent.map(el => el.textContent);
    allText.forEach(t => {
      if (!alreadyIncluded.includes(t)) {
        const extraSpan = document.createElement('span');
        extraSpan.textContent = t;
        textCellContent.push(extraSpan);
      }
    });

    // Compose row: [image, text]
    rows.push([imageCell, textCellContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
