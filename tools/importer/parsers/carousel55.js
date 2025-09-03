/* global WebImporter */
export default function parse(element, { document }) {
  // Only process the carousel block
  const carousel = element.querySelector('.jupiter22-carousel');
  if (!carousel) return;

  // Helper to extract all slides from the carousel
  function getSlides(carousel) {
    const slidesContainer = carousel.querySelector('.glide__track .glide__slides');
    if (!slidesContainer) return [];
    return Array.from(slidesContainer.children).filter((el) => el.classList.contains('nsdq-l-grid__item'));
  }

  // Helper to extract image from a slide (img only, mandatory)
  function extractImage(slide) {
    const img = slide.querySelector('img');
    return img || null;
  }

  // Helper to extract ALL text content from a slide (be flexible, grab all text, not just specific selectors)
  function extractTextContent(slide) {
    const card = slide.querySelector('.jupiter22-c-card');
    if (!card) return '';
    // Instead of picking specific elements, grab all visible text content in order
    const fragment = document.createElement('div');
    // Heading (h4)
    const heading = card.querySelector('.jupiter22-c-number-card__heading');
    if (heading) {
      // Clone all child nodes of heading (to preserve structure)
      Array.from(heading.childNodes).forEach((node) => {
        fragment.appendChild(node.cloneNode(true));
      });
    }
    // Subtitle (p)
    const subtitle = card.querySelector('.jupiter22-c-number-card__subtitle');
    if (subtitle) {
      fragment.appendChild(subtitle.cloneNode(true));
    }
    // If nothing found, fallback to all text content
    if (!fragment.childNodes.length) {
      fragment.textContent = card.textContent.trim();
    }
    // Return array of nodes if possible, else string
    return fragment.childNodes.length ? Array.from(fragment.childNodes) : fragment.textContent;
  }

  // Build the table rows
  const rows = [];
  // Header row: must be a single cell
  const headerRow = ['Carousel (carousel55)'];
  rows.push(headerRow);

  const slides = getSlides(carousel);
  slides.forEach((slide) => {
    const image = extractImage(slide); // Only <img> allowed, mandatory
    if (!image) return; // skip slides without image
    const textContent = extractTextContent(slide);
    rows.push([
      image,
      textContent || ''
    ]);
  });

  // Only output the carousel block table, remove all other content
  element.innerHTML = '';
  element.appendChild(WebImporter.DOMUtils.createTable(rows, document));
}
