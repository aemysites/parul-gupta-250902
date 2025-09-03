/* global WebImporter */
export default function parse(element, { document }) {
  // Find video container and sidebar
  const videoContainer = element.querySelector('.jupiter22-series-video-player__container');
  const sidebar = element.querySelector('.jupiter22-series-video-player__video-sidebar');

  // Get main video block (the player)
  let videoBlock = null;
  if (videoContainer) {
    videoBlock = videoContainer.querySelector('.jupiter22-series-video-player__video');
  }

  // Get the first info block (the currently visible episode)
  let infoBlock = null;
  if (sidebar) {
    infoBlock = sidebar.querySelector('.jupiter22-series-video-player__info[aria-hidden="false"]');
  }

  // Defensive fallback
  if (!videoBlock) {
    videoBlock = videoContainer ? videoContainer.firstElementChild : null;
  }
  if (!infoBlock && sidebar) {
    infoBlock = sidebar.querySelector('.jupiter22-series-video-player__info');
  }

  // Compose the second row: only include non-empty columns
  const secondRow = [];
  if (videoBlock) secondRow.push(videoBlock);
  if (infoBlock) {
    // Compose right column with all text content (title, description, date)
    const rightColumn = document.createElement('div');
    const title = infoBlock.querySelector('.jupiter22-series-video-player__title');
    if (title && title.textContent.trim()) {
      const h2 = document.createElement('h2');
      h2.textContent = title.textContent.trim();
      rightColumn.appendChild(h2);
    }
    const desc = infoBlock.querySelector('.jupiter22-series-video-player__description');
    if (desc && desc.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      rightColumn.appendChild(p);
    }
    const date = infoBlock.querySelector('.jupiter22-series-video-player__date');
    if (date && date.textContent.trim()) {
      const dateP = document.createElement('p');
      dateP.textContent = date.textContent.trim();
      rightColumn.appendChild(dateP);
    }
    // Only push if there is content
    if (rightColumn.childNodes.length > 0) {
      secondRow.push(rightColumn);
    }
  }

  // Compose the header row
  const headerRow = ['Columns (columns166)'];

  // Compose the table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
