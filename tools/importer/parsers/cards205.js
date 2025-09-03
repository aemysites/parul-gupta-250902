/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create an image element from a background-image style or data-bg attribute
  function extractImage(section) {
    let imgUrl = '';
    // Try data-bg attribute first
    imgUrl = section.getAttribute('data-bg');
    // Fallback to style background-image
    if (!imgUrl) {
      const style = section.getAttribute('style') || '';
      const match = style.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/i);
      if (match) {
        imgUrl = match[1];
      }
    }
    if (imgUrl) {
      const img = document.createElement('img');
      img.src = imgUrl;
      img.alt = '';
      return img;
    }
    return '';
  }

  // Helper to extract the text content (title, description, CTA) from the card section
  function extractTextContent(section) {
    const contentDiv = section.querySelector('.jupiter22-c-nasdaq-promo__content');
    if (!contentDiv) return '';
    // We'll collect the heading, subheading, description, and CTA link
    const fragment = document.createDocumentFragment();
    // Eyebrow (h4)
    const eyebrow = contentDiv.querySelector('.jupiter22-c-nasdaq-promo__eyebrow');
    if (eyebrow) {
      fragment.appendChild(eyebrow);
    }
    // Title (h2)
    const title = contentDiv.querySelector('.jupiter22-c-nasdaq-promo__title');
    if (title) {
      fragment.appendChild(title);
    }
    // Description (first p)
    const desc = contentDiv.querySelector('p');
    if (desc) {
      fragment.appendChild(desc);
    }
    // CTA (a)
    const cta = contentDiv.querySelector('a');
    if (cta) {
      fragment.appendChild(cta);
    }
    return fragment;
  }

  // Find all card sections
  // The structure is: ...<div> <section class="jupiter22-c-well-nasdaq-promo ..."> ... </section> </div> ...
  // So we want to find all .jupiter22-c-well-nasdaq-promo inside the element
  const cardSections = element.querySelectorAll('.jupiter22-c-well-nasdaq-promo');

  // Build the table rows
  const rows = [];
  // Header row as per spec
  const headerRow = ['Cards (cards205)'];
  rows.push(headerRow);

  cardSections.forEach((section) => {
    const img = extractImage(section);
    const textContent = extractTextContent(section);
    rows.push([
      img || '',
      textContent || '',
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
