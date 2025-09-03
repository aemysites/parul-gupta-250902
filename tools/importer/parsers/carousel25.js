/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel section
  const carouselSection = element.querySelector('section.jupiter22-carousel');
  if (!carouselSection) return;

  // Find the slides container
  const slidesContainer = carouselSection.querySelector('.glide__slides');
  if (!slidesContainer) return;

  // Get all slide elements
  const slides = Array.from(slidesContainer.children).filter(slide => slide.classList.contains('jupiter22-c-quote'));

  // Table header
  const headerRow = ['Carousel (carousel25)'];
  const cells = [headerRow];

  // Only create the block if at least one image is present in any slide
  let hasImage = false;
  slides.forEach(slide => {
    const img = slide.querySelector('img');
    if (img) {
      hasImage = true;
      const quoteBody = slide.querySelector('.jupiter22-c-quote__body');
      let textCell = '';
      if (quoteBody) {
        textCell = quoteBody;
      } else {
        textCell = slide;
      }
      cells.push([img, textCell]);
    }
  });

  // If no images found, do not modify DOM (per block requirements)
  if (hasImage && cells.length > 1) {
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
  }
}
