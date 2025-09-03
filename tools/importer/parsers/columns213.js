/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns from the grid
  const grid = element.querySelector('.nsdq-l-grid--2up');
  if (!grid) return;
  const regions = grid.querySelectorAll(':scope > .nsdq-l-grid__item');
  if (regions.length < 2) return;

  // LEFT COLUMN: Extract all relevant text content from the quote block
  let leftCellContent = document.createElement('div');
  const leftRegion = regions[0];
  const quoteBlock = leftRegion.querySelector('.jupiter22-c-quote');
  if (quoteBlock) {
    // Get the quote text
    const quoteText = quoteBlock.querySelector('.jupiter22-c-quote__quote');
    if (quoteText) leftCellContent.appendChild(quoteText.cloneNode(true));
    // Get the attribution
    const attribution = quoteBlock.querySelector('.jupiter22-c-quote__attribution');
    if (attribution) leftCellContent.appendChild(attribution.cloneNode(true));
  } else {
    // fallback: use all children
    Array.from(leftRegion.childNodes).forEach((node) => {
      leftCellContent.appendChild(node.cloneNode(true));
    });
  }

  // RIGHT COLUMN: Extract the video poster image
  let rightCellContent = document.createElement('div');
  const rightRegion = regions[1];
  const mediaGallery = rightRegion.querySelector('.block-media-gallery');
  if (mediaGallery) {
    const previewDiv = mediaGallery.querySelector('.jw-preview');
    if (previewDiv) {
      const style = previewDiv.getAttribute('style') || '';
      const match = style.match(/background-image: url\(("|')?(.*?)("|')?\)/);
      if (match && match[2]) {
        const posterImg = document.createElement('img');
        posterImg.src = match[2];
        posterImg.alt = 'Video preview';
        posterImg.style.maxWidth = '100%';
        rightCellContent.appendChild(posterImg);
      }
    }
  } else {
    // fallback: use all children
    Array.from(rightRegion.childNodes).forEach((node) => {
      rightCellContent.appendChild(node.cloneNode(true));
    });
  }

  // Compose table rows
  const headerRow = ['Columns (columns213)'];
  const contentRow = [leftCellContent, rightCellContent];

  // Create table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(block);
}
