/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from background-image style
  function createImageFromBg(div) {
    const style = div.getAttribute('style') || '';
    const match = style.match(/background-image:\s*url\(['"]?([^'")]+)['"]?\)/);
    if (match && match[1]) {
      const img = document.createElement('img');
      img.src = match[1];
      img.alt = '';
      return img;
    }
    return null;
  }

  // Find all card regions
  const cardRegions = Array.from(element.querySelectorAll('.nsdq-l-grid__item'));
  const rows = [];
  const headerRow = ['Cards (cards195)'];
  rows.push(headerRow);

  cardRegions.forEach(region => {
    // Left: Image
    let img = null;
    const mediaDiv = region.querySelector('.jupiter22-c-expert-media');
    if (mediaDiv) {
      img = createImageFromBg(mediaDiv);
    }
    // Defensive: If no image, use empty string
    if (!img) img = '';

    // Right: Text content
    const expert = region.querySelector('.jupiter22-c-expert');
    const rightContainer = expert ? expert.querySelector('.jupiter22-c-expert-right-container') : null;
    const nameSpan = rightContainer ? rightContainer.querySelector('.jupiter22-c-expert-name span') : null;
    const insightLink = rightContainer ? rightContainer.querySelector('.jupiter22-c-expert-insight-link') : null;
    const titleLink = expert ? expert.querySelector('.jupiter22-c-expert-title') : null;
    const metadata = expert ? expert.querySelector('.jupiter22-c-metadata') : null;

    // Compose text cell
    const textCell = document.createElement('div');
    // Name (as heading)
    if (nameSpan) {
      const heading = document.createElement('strong');
      heading.textContent = nameSpan.textContent;
      textCell.appendChild(heading);
      textCell.appendChild(document.createElement('br'));
    }
    // Insight link (CTA)
    if (insightLink) {
      const cta = document.createElement('div');
      cta.appendChild(insightLink);
      textCell.appendChild(cta);
    }
    // Title (as main title)
    if (titleLink) {
      const titleDiv = document.createElement('div');
      titleDiv.appendChild(titleLink);
      textCell.appendChild(titleDiv);
    }
    // Metadata (date, logo)
    if (metadata) {
      textCell.appendChild(metadata);
    }

    rows.push([img, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
