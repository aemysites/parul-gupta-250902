/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the hero content section
  function findHeroContent(el) {
    // Look for the promo section inside the block
    return el.querySelector('.jupiter22-c-well-nasdaq-promo');
  }

  // Helper to get the background image (if any)
  function getBackgroundImage(el) {
    // In this HTML, there is no background image, but if there were, it might be on a div with a style or img
    // Try to find an img inside the hero block that is not the logo
    const imgs = el.querySelectorAll('img');
    for (const img of imgs) {
      // Skip the Nasdaq Plus logo
      if (!/nasdaq-plus/i.test(img.src)) {
        return img;
      }
    }
    // No background image found
    return null;
  }

  // Find the main hero promo section
  const heroSection = findHeroContent(element);
  if (!heroSection) return;

  // Get background image if present
  const bgImg = getBackgroundImage(heroSection);

  // Compose the content cell for row 3
  const contentParts = [];
  // Title (h2)
  const title = heroSection.querySelector('h2');
  if (title) contentParts.push(title);
  // Paragraph (subheading)
  const para = heroSection.querySelector('p');
  if (para) contentParts.push(para);
  // CTA (link)
  const cta = heroSection.querySelector('a');
  if (cta) contentParts.push(cta);

  // Build the table rows
  const headerRow = ['Hero (hero147)'];
  const bgRow = [bgImg ? bgImg : ''];
  const contentRow = [contentParts];

  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
