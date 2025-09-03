/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel section
  const carouselSection = element.querySelector('.jupiter22-carousel');
  if (!carouselSection) return;

  // Find all slides
  const slidesContainer = carouselSection.querySelector('.glide__slides');
  if (!slidesContainer) return;
  const slideEls = Array.from(slidesContainer.children).filter(
    (el) => el.classList.contains('jupiter22-c-media-gallery')
  );

  // Build table rows
  const rows = [];
  // Header row as required
  const headerRow = ['Carousel (carousel104)'];
  rows.push(headerRow);

  slideEls.forEach((slide) => {
    // Find image (mandatory)
    const img = slide.querySelector('img');
    if (!img) return;

    // Find text content (optional):
    // Clone the slide and remove the image, then get the text content
    const slideClone = slide.cloneNode(true);
    const imgs = slideClone.querySelectorAll('img');
    imgs.forEach(i => i.remove());
    const textContent = slideClone.textContent.trim();
    // Always push two columns: image and textCell (empty string if no text)
    rows.push([img, textContent ? textContent : '']);
  });

  // Ensure all rows after the header have exactly two columns
  for (let i = 1; i < rows.length; i++) {
    if (rows[i].length < 2) {
      rows[i].push('');
    }
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
