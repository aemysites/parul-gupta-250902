/* global WebImporter */
export default function parse(element, { document }) {
  // Find main video container and sidebar
  const videoContainer = element.querySelector('.jupiter22-series-video-player__video');
  const sidebar = element.querySelector('.jupiter22-series-video-player__video-sidebar');

  // Left column: video container (as-is, for flexibility)
  let leftCol = null;
  if (videoContainer) {
    leftCol = videoContainer.cloneNode(true);
  }

  // Right column: all visible info content (title, description, date)
  let rightCol = null;
  if (sidebar) {
    const infoBlock = sidebar.querySelector('.jupiter22-series-video-player__info[aria-hidden="false"]');
    if (infoBlock) {
      // Collect all text content (title, description, date) using less specific selectors
      const frag = document.createElement('div');
      // Instead of picking only one description, get all direct children of infoBlock
      Array.from(infoBlock.querySelectorAll('.jupiter22-series-video-player__info-list > *')).forEach((node) => {
        frag.appendChild(node.cloneNode(true));
      });
      rightCol = frag;
    }
  }

  // Table header
  const headerRow = ['Columns (columns17)'];
  // Table content row: [video, info]
  const contentRow = [leftCol, rightCol];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
