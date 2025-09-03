/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Embed (embedVideo40)'];

  // Try to find a video embed or external video URL in the element
  let url = '';
  // Look for iframes, embeds, or anchor tags with a likely video URL
  const iframe = element.querySelector('iframe');
  if (iframe && iframe.src) {
    url = iframe.src;
  } else {
    const embed = element.querySelector('embed');
    if (embed && embed.src) {
      url = embed.src;
    } else {
      // Look for anchor tags with a likely video URL
      const anchor = element.querySelector('a[href*="vimeo.com"], a[href*="youtube.com"], a[href*="youtu.be"]');
      if (anchor && anchor.href) {
        url = anchor.href;
      }
    }
  }

  // If no video URL found, try to extract any visible text content as fallback
  let cellContent = '';
  if (url) {
    cellContent = url;
  } else {
    // Fallback: get all visible text content
    const text = element.textContent.trim();
    cellContent = text || '';
  }

  // Build the table
  const cells = [headerRow, [cellContent]];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
