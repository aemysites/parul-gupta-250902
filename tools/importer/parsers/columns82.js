/* global WebImporter */
export default function parse(element, { document }) {
  // Find the video container and sidebar
  const videoContainer = element.querySelector('.jupiter22-series-video-player__video');
  const sidebar = element.querySelector('.jupiter22-series-video-player__video-sidebar');

  // --- COLUMN 1: Extract video poster and link ---
  let videoCell = '';
  if (videoContainer) {
    // Try to get the poster image from the JWPlayer preview div
    const preview = videoContainer.querySelector('.jw-preview');
    let posterUrl = '';
    if (preview && preview.style.backgroundImage) {
      const match = preview.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      if (match && match[1]) {
        posterUrl = match[1];
      }
    }
    // Try to get the video link from JWPlayer sharing textarea
    let videoLink = '';
    const sharingTextarea = videoContainer.querySelector('.jw-sharing-textarea');
    if (sharingTextarea) {
      videoLink = sharingTextarea.value.trim();
    }
    // Compose cell: image and link
    if (posterUrl && videoLink) {
      const img = document.createElement('img');
      img.src = posterUrl;
      img.alt = 'Video Preview';
      const a = document.createElement('a');
      a.href = videoLink;
      a.textContent = 'Watch Video';
      videoCell = [img, document.createElement('br'), a];
    } else if (posterUrl) {
      const img = document.createElement('img');
      img.src = posterUrl;
      img.alt = 'Video Preview';
      videoCell = img;
    } else if (videoLink) {
      const a = document.createElement('a');
      a.href = videoLink;
      a.textContent = 'Watch Video';
      videoCell = a;
    } else {
      videoCell = '';
    }
  }

  // --- COLUMN 2: Info Block ---
  let infoCell = '';
  if (sidebar) {
    const infoBlock = sidebar.querySelector('.jupiter22-series-video-player__info[aria-hidden="false"]') || sidebar.querySelector('.jupiter22-series-video-player__info');
    if (infoBlock) {
      const title = infoBlock.querySelector('.jupiter22-series-video-player__title');
      const desc = infoBlock.querySelector('.jupiter22-series-video-player__description');
      const date = infoBlock.querySelector('.jupiter22-series-video-player__date');
      const frag = document.createDocumentFragment();
      if (title) {
        const h2 = document.createElement('h2');
        h2.textContent = title.textContent.trim();
        frag.appendChild(h2);
      }
      if (desc) {
        const p = document.createElement('p');
        p.textContent = desc.textContent.trim();
        frag.appendChild(p);
      }
      if (date) {
        const small = document.createElement('small');
        small.textContent = date.textContent.trim();
        frag.appendChild(small);
      }
      infoCell = frag;
    }
  }

  // --- TABLE STRUCTURE ---
  const headerRow = ['Columns (columns82)'];
  const contentRow = [videoCell, infoCell];

  // Create the table block
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
