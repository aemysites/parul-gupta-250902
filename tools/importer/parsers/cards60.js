/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract background-image url from style attribute
  function extractBgUrl(style) {
    if (!style) return null;
    const match = style.match(/background-image:\s*url\(['"]?(.*?)['"]?\)/i);
    return match ? match[1] : null;
  }

  // Helper to create an image element from a background-image style
  function createImageFromBg(style, alt = '', width = 355, height = 200) {
    const url = extractBgUrl(style);
    if (!url) return null;
    const img = document.createElement('img');
    img.src = url;
    img.alt = alt;
    img.width = width;
    img.height = height;
    return img;
  }

  // Table header as per block guidelines
  const headerRow = ['Cards (cards60)'];
  const rows = [];

  // --- First row: Martin Tillier's reference articles ---
  const mainExpertBlock = element.querySelector('.jupiter22-expert-reference-articles-wrapper');
  if (mainExpertBlock) {
    const articles = mainExpertBlock.querySelectorAll('.jupiter22-expert-reference-article');
    articles.forEach(article => {
      // Image
      const mediaDiv = article.querySelector('.jupiter22-expert-reference-article-media');
      let img = null;
      if (mediaDiv) {
        img = createImageFromBg(mediaDiv.getAttribute('style'), '', 355, 200);
      }
      // Title
      const titleDiv = article.querySelector('.jupiter22-expert-reference-article-title');
      let titleEl = null;
      if (titleDiv) {
        titleEl = document.createElement('strong');
        titleEl.textContent = titleDiv.textContent;
      }
      // Timestamp
      const timestampDiv = article.querySelector('.jupiter22-expert-reference-article-timestamp');
      let timestampEl = null;
      if (timestampDiv) {
        timestampEl = document.createElement('div');
        timestampEl.textContent = timestampDiv.textContent;
        timestampEl.style.fontSize = 'smaller';
      }
      // Compose text cell
      const textCell = document.createElement('div');
      if (titleEl) textCell.appendChild(titleEl);
      if (timestampEl) textCell.appendChild(timestampEl);
      rows.push([
        img,
        textCell
      ]);
    });
  }

  // --- Remaining experts ---
  const gridContainer = element.querySelector('.nsdq-u-grid-container.nsdq-u-grid-1-1-1');
  if (gridContainer) {
    const sections = gridContainer.querySelectorAll('section.layout__region');
    sections.forEach(section => {
      // Each section may contain multiple .jupiter22-c-expert blocks
      const expertBlocks = section.querySelectorAll('.jupiter22-c-expert');
      expertBlocks.forEach(expert => {
        // Only process experts that have a title link following them
        let next = expert.nextElementSibling;
        if (!next || !next.classList.contains('jupiter22-c-expert-title')) return;
        // Image
        let img = null;
        const imgContainer = expert.querySelector('.jupiter22-c-expert-media');
        if (imgContainer) {
          img = createImageFromBg(imgContainer.getAttribute('style'), '', 355, 200);
        }
        // Name
        const nameSpan = expert.querySelector('.jupiter22-c-expert-name span');
        let nameEl = null;
        if (nameSpan) {
          nameEl = document.createElement('strong');
          nameEl.textContent = nameSpan.textContent;
        }
        // CTA
        const ctaLink = expert.querySelector('.jupiter22-c-expert-insight-link');
        let ctaEl = null;
        if (ctaLink) {
          ctaEl = ctaLink.cloneNode(true);
        }
        // Title (article)
        let titleEl = null;
        if (next && next.classList.contains('jupiter22-c-expert-title')) {
          titleEl = document.createElement('div');
          const strong = document.createElement('strong');
          strong.textContent = next.textContent;
          titleEl.appendChild(strong);
          if (next.href) {
            const link = document.createElement('a');
            link.href = next.href;
            link.textContent = next.textContent;
            titleEl.appendChild(document.createElement('br'));
            titleEl.appendChild(link);
          }
        }
        // Metadata (date, logo)
        let metaEl = null;
        const metaDiv = next.nextElementSibling;
        if (metaDiv && metaDiv.classList.contains('jupiter22-c-metadata')) {
          // Extract date and logo
          metaEl = document.createElement('div');
          const dateLi = metaDiv.querySelector('li');
          if (dateLi) {
            const dateDiv = document.createElement('div');
            dateDiv.textContent = dateLi.textContent;
            dateDiv.style.fontSize = 'smaller';
            metaEl.appendChild(dateDiv);
          }
          const logoImg = metaDiv.querySelector('img');
          if (logoImg) {
            metaEl.appendChild(logoImg.cloneNode(true));
          }
        }
        // Compose text cell
        const textCell = document.createElement('div');
        if (nameEl) textCell.appendChild(nameEl);
        if (ctaEl) textCell.appendChild(ctaEl);
        if (titleEl) textCell.appendChild(titleEl);
        if (metaEl) textCell.appendChild(metaEl);
        rows.push([
          img,
          textCell
        ]);
      });
    });
  }

  // Build the table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
