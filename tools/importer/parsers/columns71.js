/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main 2-column grid
  const grid = element.querySelector('.nsdq-l-grid--2up');
  if (!grid) return;

  // Get the two main column regions
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // --- LEFT COLUMN ---
  const leftRegion = regions[0];
  const numberCard = leftRegion.querySelector('.jupiter22-c-number-card');
  const leftContent = numberCard || leftRegion;

  // --- RIGHT COLUMN ---
  const rightRegion = regions[1];
  // Find the video player wrapper
  const videoWrapper = rightRegion.querySelector('.jupiter22-c-text-block_admin-wrapper');
  // Find the sidebar container (for "Next Up")
  const sidebarContainer = rightRegion.querySelector('.jupiter22-series-video-player__sidebar-container');

  // Compose right column content: video block + sidebar
  const rightContent = document.createElement('div');
  if (videoWrapper) rightContent.appendChild(videoWrapper);
  if (sidebarContainer) rightContent.appendChild(sidebarContainer);

  // Convert <video> elements (except images) to links in rightContent
  rightContent.querySelectorAll('video').forEach((vid) => {
    const src = vid.getAttribute('src');
    if (src) {
      const link = document.createElement('a');
      link.href = src;
      link.textContent = src;
      vid.replaceWith(link);
    }
  });

  // Table header row
  const headerRow = ['Columns (columns71)'];
  // Table content row: two columns
  const contentRow = [leftContent, rightContent];

  // Build the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
