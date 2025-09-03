/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row as required
  const headerRow = ['Columns (columns36)'];

  // Find all <a> that contain an <img> (the app store and play store badges)
  const links = Array.from(element.querySelectorAll('a')).filter(a => a.querySelector('img'));

  // If no links found, fallback to all images
  let contentRow;
  if (links.length > 0) {
    contentRow = links.map(link => link.cloneNode(true));
  } else {
    // fallback: all images in the element
    const imgs = Array.from(element.querySelectorAll('img')).map(img => img.cloneNode(true));
    if (imgs.length === 0) return;
    contentRow = imgs;
  }

  // Build the table structure
  const cells = [
    headerRow,
    contentRow,
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
