/* global WebImporter */
export default function parse(element, { document }) {
  // Find the left (video) and right (info) columns
  const videoContainer = element.querySelector('.jupiter22-series-video-player__video');
  const sidebar = element.querySelector('.jupiter22-series-video-player__video-sidebar');
  if (!videoContainer || !sidebar) return;

  // Find the first visible info block
  const infoBlocks = sidebar.querySelectorAll('.jupiter22-series-video-player__info');
  let infoBlock = null;
  for (const block of infoBlocks) {
    if (block.getAttribute('aria-hidden') === 'false') {
      infoBlock = block;
      break;
    }
  }
  if (!infoBlock) return;

  // Compose right column: title, description, date, CTA if present
  const infoList = infoBlock.querySelector('.jupiter22-series-video-player__info-list');
  let title = infoList?.querySelector('.jupiter22-series-video-player__title');
  let desc = infoList?.querySelector('.jupiter22-series-video-player__description');
  let date = infoList?.querySelector('.jupiter22-series-video-player__date');
  let cta = null;
  const ctaContainer = sidebar.querySelector('.jupiter22-series-video-player__cta');
  if (ctaContainer) cta = ctaContainer;

  // Instead of pushing elements, extract their text content for flexibility
  const rightColumnContent = [];
  if (title) {
    const h = document.createElement('h2');
    h.textContent = title.textContent.trim();
    rightColumnContent.push(h);
  }
  if (desc) {
    const p = document.createElement('p');
    p.textContent = desc.textContent.trim();
    rightColumnContent.push(p);
  }
  if (date) {
    const d = document.createElement('p');
    d.textContent = date.textContent.trim();
    rightColumnContent.push(d);
  }
  if (cta) {
    // Clone the CTA link if present
    const ctaLink = cta.querySelector('a');
    if (ctaLink) {
      const a = document.createElement('a');
      a.href = ctaLink.href;
      a.textContent = ctaLink.textContent.trim();
      rightColumnContent.push(a);
    }
  }

  // Compose the table
  const headerRow = ['Columns (columns39)'];
  const contentRow = [videoContainer, rightColumnContent];
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
