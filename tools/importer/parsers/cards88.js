/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the card image (figure > img)
  function getCardImage(button) {
    const figure = button.querySelector('.jupiter22-series-video-player__image');
    if (figure) {
      const img = figure.querySelector('img');
      if (img) return img;
    }
    return null;
  }

  // Helper to extract the card text content (topic, title, date)
  function getCardText(button) {
    const info = button.querySelector('.jupiter22-series-video-player__button-info');
    if (!info) return '';
    const frag = document.createElement('div');

    // Topic (as small heading)
    const topic = info.querySelector('.jupiter22-series-video-player__topic');
    if (topic) {
      const topicSpan = document.createElement('div');
      topicSpan.style.fontSize = '0.85em';
      topicSpan.style.letterSpacing = '0.05em';
      topicSpan.style.fontWeight = 'bold';
      topicSpan.textContent = topic.textContent.trim();
      frag.appendChild(topicSpan);
    }

    // Title (with icon, as strong or h3)
    const titleSpan = info.querySelector('.jupiter22-series-video-player__sidebar-title');
    if (titleSpan) {
      // Remove the icon svg for cleaner text, but keep if desired
      const titleClone = titleSpan.cloneNode(true);
      const icon = titleClone.querySelector('.jupiter22-c-icon');
      if (icon) icon.remove();
      const h3 = document.createElement('strong');
      h3.textContent = titleClone.textContent.trim();
      frag.appendChild(h3);
    }

    // Date (metadata)
    const meta = info.querySelector('.jupiter22-c-metadata li');
    if (meta) {
      const dateDiv = document.createElement('div');
      dateDiv.style.fontSize = '0.85em';
      dateDiv.style.marginTop = '0.25em';
      dateDiv.textContent = meta.textContent.trim();
      frag.appendChild(dateDiv);
    }

    return frag;
  }

  // Find all card buttons
  const cards = Array.from(element.querySelectorAll('.jupiter22-series-video-player__button-item'));

  // Build the table rows
  const rows = [];
  const headerRow = ['Cards (cards88)'];
  rows.push(headerRow);

  cards.forEach((button) => {
    const img = getCardImage(button);
    const text = getCardText(button);
    rows.push([
      img || '',
      text || '',
    ]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
