/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel section
  const carouselSection = element.querySelector('section[data-type="carousel"]');
  if (!carouselSection) return;

  // Find the slides container
  const slidesContainer = carouselSection.querySelector('.glide__slides');
  if (!slidesContainer) return;

  // Find all unique slides (ignore clones)
  const slideEls = Array.from(slidesContainer.children)
    .filter((el) => el.classList.contains('jupiter22-c-quote') && !el.classList.contains('glide__slide--clone'));

  // If no non-clone slides, fallback to all slides
  const slides = slideEls.length ? slideEls : Array.from(slidesContainer.children).filter((el) => el.classList.contains('jupiter22-c-quote'));

  // Table header
  const headerRow = ['Carousel (carousel169)'];
  const rows = [headerRow];

  // For each slide, build the row
  slides.forEach((slide) => {
    // The first cell must contain an image (mandatory)
    // These slides do not have an <img>, but do have an SVG icon
    // We'll use the SVG as the image for the first cell
    const iconDiv = slide.querySelector('.jupiter22-c-quote__icon');
    let imageCell = '';
    if (iconDiv) {
      imageCell = iconDiv.cloneNode(true);
    }

    // Second cell: text content (figure)
    // Instead of just the figure, get all text content: blockquote and attribution
    const blockquote = slide.querySelector('blockquote');
    const attribution = slide.querySelector('.jupiter22-c-quote__attribution');
    const textCellContent = [];
    if (blockquote) {
      // Use the <p> inside blockquote as the main text
      const p = blockquote.querySelector('p');
      if (p) {
        // Wrap in heading for visual match
        const heading = document.createElement('h2');
        heading.innerHTML = p.innerHTML;
        textCellContent.push(heading);
      }
    }
    if (attribution) {
      const div = document.createElement('div');
      div.textContent = attribution.textContent;
      textCellContent.push(div);
    }
    rows.push([imageCell, textCellContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
