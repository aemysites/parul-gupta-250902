/* global WebImporter */
export default function parse(element, { document }) {
  const list = element.querySelector('.jupiter22-series-video-player__list');
  if (!list) return;

  // Table header row as per block spec
  const headerRow = ['Cards (cards112)'];
  // All rows: first row is header, rest are cards
  const rows = [headerRow];

  // Get all card buttons (each is a card)
  const buttons = list.querySelectorAll('.jupiter22-series-video-player__button-item');
  buttons.forEach((btn) => {
    // --- IMAGE CELL ---
    let img = btn.querySelector('figure img');
    if (!img) return;

    // --- TEXT CELL ---
    const topic = btn.querySelector('.jupiter22-series-video-player__topic');
    const titleSpan = btn.querySelector('.jupiter22-series-video-player__sidebar-title');
    if (!titleSpan) return;

    // Compose text cell with all text content
    const textCell = document.createElement('div');
    if (topic) {
      const topicDiv = document.createElement('div');
      topicDiv.textContent = topic.textContent.trim();
      topicDiv.style.fontSize = '12px'; // visually matches screenshot
      textCell.appendChild(topicDiv);
    }
    // Remove icon from title
    const titleClone = titleSpan.cloneNode(true);
    const icon = titleClone.querySelector('.jupiter22-c-icon');
    if (icon) icon.remove();
    // Title (strong)
    const strong = document.createElement('strong');
    strong.textContent = titleClone.textContent.trim();
    textCell.appendChild(strong);

    rows.push([img, [textCell]]);
  });

  // Manually create the table to ensure header row has only one column
  const table = document.createElement('table');
  rows.forEach((row, i) => {
    const tr = document.createElement('tr');
    if (i === 0) {
      // Header row: only one column
      const th = document.createElement('th');
      th.textContent = row[0];
      tr.appendChild(th);
    } else {
      row.forEach((cell) => {
        const td = document.createElement('td');
        if (Array.isArray(cell)) {
          cell.forEach((el) => td.appendChild(el));
        } else {
          td.appendChild(cell);
        }
        tr.appendChild(td);
      });
    }
    table.appendChild(tr);
  });
  element.replaceWith(table);
}
