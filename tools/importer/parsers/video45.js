/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block-media-gallery element
  const blockMediaGallery = element.querySelector('.block-media-gallery');
  if (!blockMediaGallery) return;

  // Get the JWPlayer preview link
  let videoLink = null;
  const sharingTextarea = blockMediaGallery.querySelector('.jw-sharing-textarea');
  if (sharingTextarea && sharingTextarea.value) {
    videoLink = sharingTextarea.value.trim();
  } else {
    const jwpId = blockMediaGallery.getAttribute('data-jwp-id');
    if (jwpId) {
      videoLink = `https://cdn.jwplayer.com/previews/${jwpId}`;
    }
  }
  if (!videoLink) return;

  // Get the poster image
  let posterImg = null;
  const jwPreview = blockMediaGallery.querySelector('.jw-preview');
  if (jwPreview) {
    const style = jwPreview.getAttribute('style') || '';
    const match = style.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/);
    if (match && match[1]) {
      posterImg = document.createElement('img');
      posterImg.src = match[1];
      posterImg.alt = 'Video Poster';
      posterImg.loading = 'lazy';
    }
  }

  // Extract all text content from the video player overlay (e.g., title)
  let overlayText = '';
  const jwPlayer = blockMediaGallery.querySelector('.jwplayer');
  if (jwPlayer) {
    // Try to get aria-label
    overlayText = jwPlayer.getAttribute('aria-label') || '';
    overlayText = overlayText.trim();
  }

  // Compose the cell content
  const cellContent = [];
  if (posterImg) cellContent.push(posterImg);
  if (overlayText) {
    const overlayDiv = document.createElement('div');
    overlayDiv.textContent = overlayText;
    cellContent.push(overlayDiv);
  }
  // Always add the video link as an anchor
  const linkEl = document.createElement('a');
  linkEl.href = videoLink;
  linkEl.textContent = videoLink;
  cellContent.push(linkEl);

  // Build the table
  const headerRow = ['Video (video45)'];
  const rows = [headerRow, [cellContent]];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
