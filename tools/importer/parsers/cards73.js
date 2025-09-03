/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from background-image style
  function extractImage(section) {
    const bgUrl = section.getAttribute('data-bg') || '';
    if (!bgUrl) return null;
    const img = document.createElement('img');
    img.src = bgUrl;
    img.alt = '';
    img.loading = 'lazy';
    return img;
  }

  // Helper to extract text content (title, description, CTA)
  function extractTextContent(section) {
    const content = section.querySelector('.jupiter22-c-nasdaq-promo__content');
    if (!content) return '';
    const parts = [];
    // Title
    const title = content.querySelector('h2');
    if (title) {
      const h = document.createElement('h3');
      h.textContent = title.textContent.trim();
      parts.push(h);
    }
    // Description (remove empty/whitespace-only paragraphs)
    const desc = content.querySelector('p');
    if (desc) {
      // Remove <br> and &nbsp; from the end
      let descHtml = desc.innerHTML.replace(/(<br\s*\/?>|&nbsp;)+$/gi, '').trim();
      if (descHtml.replace(/<[^>]*>/g, '').trim()) {
        const p = document.createElement('p');
        p.innerHTML = descHtml;
        parts.push(p);
      }
    }
    // CTA
    const cta = content.querySelector('a');
    if (cta) {
      parts.push(cta);
    }
    return parts;
  }

  // Find all cards (sections) in correct order
  const cards = [];
  const grid = element.querySelector('.nsdq-l-grid');
  if (grid) {
    // Always select .jupiter22-c-well-nasdaq-promo in DOM order
    const sections = grid.querySelectorAll('.jupiter22-c-well-nasdaq-promo');
    sections.forEach(section => {
      const img = extractImage(section);
      const textContent = extractTextContent(section);
      cards.push([img, textContent]);
    });
  }

  if (cards.length === 0) return;

  // Table header
  const headerRow = ['Cards (cards73)'];
  const tableRows = [headerRow, ...cards];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
