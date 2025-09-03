/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !document) return;

  // Header row as per block requirement
  const headerRow = ['Carousel (carousel172)'];
  const rows = [headerRow];

  // Find all slides (each .jupiter22-c-media-gallery is a slide)
  const slides = element.querySelectorAll('.jupiter22-c-media-gallery');

  slides.forEach((slide) => {
    // Find the image inside the slide
    const img = slide.querySelector('img');
    if (!img) return;
    // Clone the image to avoid moving it from the DOM
    const imgClone = img.cloneNode(true);
    // Only push the image cell if there is no text content
    rows.push([imgClone]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
