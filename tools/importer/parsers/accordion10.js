/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: convert all non-image elements with src to links
  function convertSrcToLink(root) {
    const elements = root.querySelectorAll('[src]:not(img)');
    elements.forEach((el) => {
      const src = el.getAttribute('src');
      if (src) {
        const link = document.createElement('a');
        link.href = src;
        link.textContent = src;
        el.replaceWith(link);
      }
    });
  }

  // Find the accordion container
  const layoutContainer = element.querySelector('.nsdq-l-layout-container');
  if (!layoutContainer) return;

  // Find the grid (2 columns)
  const grid = layoutContainer.querySelector('.nsdq-l-grid');
  if (!grid) return;

  // Accordion is always in the right rail
  const rightRail = Array.from(grid.children).find((c) => c.classList.contains('layout-right-rail'));
  if (!rightRail) return;

  // Find the accordion dl
  const accordion = rightRail.querySelector('dl.jupiter22-c-accordion');
  if (!accordion) return;

  // Get all accordion panels
  const panels = accordion.querySelectorAll(':scope > div.jupiter22-c-accordion-panel');

  // Table header
  const headerRow = ['Accordion (accordion10)'];
  const rows = [headerRow];

  panels.forEach((panel) => {
    // Title cell: find the button > .jupiter22-c-accordion-header__button-text > h3
    let title = panel.querySelector('.jupiter22-c-accordion-header__button-text h3');
    if (!title) {
      // fallback: get button text
      const btn = panel.querySelector('button');
      title = btn ? document.createElement('span') : null;
      if (title && btn) title.textContent = btn.textContent.trim();
    }

    // Content cell: find the dd (panel body)
    const body = panel.querySelector('dd');
    let content = null;
    if (body) {
      // Defensive: find the inner content
      const inner = body.querySelector('.jupiter22-c-accordion-panel__body-inner') || body;
      // If there is a modal inside (Press Kit), include the whole li
      const modalLi = inner.querySelector('li');
      if (modalLi) {
        content = modalLi.cloneNode(true);
      } else {
        content = inner.cloneNode(true);
      }
      // Convert all non-image src elements to links in content
      convertSrcToLink(content);
    }
    // Defensive: fallback to empty span if missing
    if (!content) {
      content = document.createElement('span');
      content.textContent = '';
    }
    rows.push([title, content]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
