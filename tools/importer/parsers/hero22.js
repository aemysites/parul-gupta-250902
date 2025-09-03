/* global WebImporter */
export default function parse(element, { document }) {
  // Find all promo sections
  const promoSections = element.querySelectorAll('section.jupiter22-c-well-nasdaq-promo');
  if (!promoSections.length) return;

  const headerRow = ['Hero (hero22)'];

  // Row 2: Background images (all promos)
  const imageEls = Array.from(promoSections).map((promoSection) => {
    let bgUrl = promoSection.getAttribute('data-bg');
    if (!bgUrl) {
      const style = promoSection.getAttribute('style');
      if (style) {
        const match = style.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/);
        if (match) bgUrl = match[1];
      }
    }
    if (bgUrl) {
      const img = document.createElement('img');
      img.src = bgUrl;
      img.alt = '';
      img.setAttribute('loading', 'eager');
      img.style.width = '100%';
      return img;
    }
    return '';
  });
  const imageRow = [imageEls.length === 1 ? imageEls[0] : imageEls];

  // Row 3: All content blocks (all promos)
  const contentBlocks = Array.from(promoSections).map((promoSection) => {
    const contentDiv = promoSection.querySelector('.jupiter22-c-nasdaq-promo__content');
    const frag = document.createDocumentFragment();
    if (contentDiv) {
      // Eyebrow (h4)
      const eyebrow = contentDiv.querySelector('h4');
      if (eyebrow && eyebrow.textContent.trim()) {
        const h4 = document.createElement('h4');
        h4.textContent = eyebrow.textContent.trim();
        frag.appendChild(h4);
      }
      // Heading
      const heading = contentDiv.querySelector('h2');
      if (heading && heading.textContent.trim()) {
        const h2 = document.createElement('h2');
        h2.textContent = heading.textContent.trim();
        frag.appendChild(h2);
      }
      // Paragraph(s)
      const paragraphs = contentDiv.querySelectorAll('p');
      paragraphs.forEach(p => {
        if (p.textContent.trim()) {
          const para = document.createElement('p');
          para.innerHTML = p.innerHTML;
          frag.appendChild(para);
        }
      });
      // CTA link
      const cta = contentDiv.querySelector('a');
      if (cta && cta.textContent.trim()) {
        const a = document.createElement('a');
        a.href = cta.href;
        a.textContent = cta.textContent.replace(/\s+/g, ' ').trim();
        frag.appendChild(a);
      }
    }
    return frag;
  });
  const contentRow = [contentBlocks.length === 1 ? contentBlocks[0] : contentBlocks];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
