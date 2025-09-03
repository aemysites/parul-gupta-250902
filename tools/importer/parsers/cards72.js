/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container with all cards
  const slidesContainer = element.querySelector('.glide__slides');
  if (!slidesContainer) return;

  // Get all card elements (ignore clones by using image src as unique key)
  const cardNodes = Array.from(slidesContainer.children)
    .filter((child) => child.classList.contains('jupiter22-c-card'));

  // To avoid duplicates, use a Set of image srcs
  const seenSrcs = new Set();
  const rows = [];

  for (const card of cardNodes) {
    // Get image
    const img = card.querySelector('img');
    if (!img || !img.src || seenSrcs.has(img.src)) continue;
    seenSrcs.add(img.src);

    // Get card body
    const body = card.querySelector('.jupiter22-c-info-card__body');
    if (!body) continue;

    // Compose text cell content
    const frag = document.createDocumentFragment();

    // Subtitle (number)
    const subtitle = body.querySelector('.jupiter22-c-info-card__subtitle');
    if (subtitle) {
      const subDiv = document.createElement('div');
      subDiv.textContent = subtitle.textContent.trim();
      frag.appendChild(subDiv);
    }

    // Title (heading)
    const title = body.querySelector('.jupiter22-c-info-card__title');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      frag.appendChild(strong);
    }

    // Description (ul)
    const desc = body.querySelector('.jupiter22-c-text-passage');
    if (desc) {
      // Instead of just the ul, include all text content from the passage
      // This ensures we get all text, including any additional elements
      Array.from(desc.childNodes).forEach(node => {
        frag.appendChild(node.cloneNode(true));
      });
    }

    rows.push([img, frag]);
  }

  // Compose the table cells
  const cells = [
    ['Cards (cards72)'], // Header row as required
    ...rows
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
