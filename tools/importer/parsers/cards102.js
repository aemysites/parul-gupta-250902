/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards102)'];
  const rows = [headerRow];

  // Find all card elements (direct children of grid)
  const grid = element.querySelector('.nsdq-l-grid');
  if (!grid) return;
  const cardRegions = grid.querySelectorAll(':scope > .layout__region');

  cardRegions.forEach(region => {
    // Card container
    const card = region.querySelector('.jupiter22-c-news-card');
    if (!card) return;

    // --- IMAGE CELL ---
    // No images in the provided HTML, so use the 'no images' variant: empty first cell
    // --- TEXT CELL ---
    const textContainer = card.querySelector('.jupiter22-c-news-card__text');
    if (!textContainer) return;

    // Compose text cell content by extracting all relevant children
    const textCellContent = [];

    // Topic badge (optional)
    const badge = textContainer.querySelector('.jupiter22-c-badge a[hreflang]');
    if (badge && badge.textContent.trim()) {
      const badgeDiv = document.createElement('div');
      badgeDiv.textContent = badge.textContent.trim();
      badgeDiv.style.fontWeight = 'bold';
      badgeDiv.style.fontSize = '0.9em';
      badgeDiv.style.marginBottom = '8px';
      textCellContent.push(badgeDiv);
    }

    // Headline (mandatory)
    const headline = textContainer.querySelector('.jupiter22-c-news-card__headline a');
    if (headline) {
      const headlineEl = document.createElement('h3');
      headlineEl.appendChild(headline.cloneNode(true));
      headlineEl.style.margin = '0 0 8px 0';
      textCellContent.push(headlineEl);
    }

    // Description (optional)
    const desc = textContainer.querySelector('.jupiter22-c-news-card__copy');
    if (desc) {
      const descEl = document.createElement('p');
      descEl.innerHTML = desc.innerHTML;
      descEl.style.margin = '0 0 8px 0';
      textCellContent.push(descEl);
    }

    // Metadata (all li items)
    const meta = textContainer.querySelector('.jupiter22-c-metadata ul');
    if (meta) {
      const metaDiv = document.createElement('div');
      metaDiv.style.fontSize = '0.85em';
      metaDiv.style.color = '#555';
      metaDiv.style.marginTop = '8px';
      // Collect all li text, separated by non-breaking spaces
      const metaText = Array.from(meta.querySelectorAll('li')).map(li => li.textContent.trim()).filter(Boolean).join(' \u00A0 \u00A0 ');
      metaDiv.textContent = metaText;
      textCellContent.push(metaDiv);
    }

    // Defensive: ensure at least headline or description is present
    if (textCellContent.length === 0) return;

    // Add row: [empty image cell, text cell]
    rows.push([
      '',
      textCellContent
    ]);
  });

  // Create block table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
