/* global WebImporter */
export default function parse(element, { document }) {
  function getSlides(root) {
    const track = root.querySelector('.glide__track');
    if (!track) return [];
    const slidesContainer = track.querySelector('.glide__slides');
    if (!slidesContainer) return [];
    return Array.from(slidesContainer.children).filter(slide => slide.classList.contains('jupiter22-c-card'));
  }

  function extractSlideContent(slide) {
    let img = null;
    const figure = slide.querySelector('figure');
    if (figure) {
      img = figure.querySelector('img');
    }
    if (!img) {
      img = slide.querySelector('img');
    }
    let textCellContent = [];
    const body = slide.querySelector('.jupiter22-c-info-card__body');
    if (body) {
      Array.from(body.childNodes).forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches('h3')) {
            if (node.textContent.trim()) {
              const heading = document.createElement('h2');
              heading.textContent = node.textContent.trim();
              textCellContent.push(heading);
            }
          } else if (node.matches('.jupiter22-c-text-passage')) {
            if (node.textContent.trim()) {
              const p = document.createElement('p');
              p.textContent = node.textContent.trim();
              textCellContent.push(p);
            }
            node.querySelectorAll('a').forEach(link => {
              textCellContent.push(link.cloneNode(true));
            });
          } else if (node.matches('a')) {
            textCellContent.push(node.cloneNode(true));
          }
        }
      });
    }
    // Only include the second column if there is text content
    return textCellContent.length ? [img, textCellContent] : [img];
  }

  const headerRow = ['Carousel (carousel76)'];
  const rows = [headerRow];
  const slides = getSlides(element);
  slides.forEach(slide => {
    const row = extractSlideContent(slide);
    rows.push(row);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
