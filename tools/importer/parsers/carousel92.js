/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Table header row as specified
  const headerRow = ['Carousel (carousel92)'];
  const rows = [headerRow];

  // Find the slides container
  const slidesContainer = element.querySelector('.glide__slides');
  if (!slidesContainer) return;

  // Get all slide elements (only direct children of .glide__slides that are not clones)
  const slides = Array.from(slidesContainer.children).filter(
    (child) => child.classList.contains('jupiter22-c-media-gallery') && !child.classList.contains('glide__slide--clone')
  );

  // For each slide, extract the image (first cell), and always add a second cell (empty if no text)
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    if (!img) return;
    // Always two cells: image, and empty string (no text content in HTML)
    rows.push([img, '']);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
