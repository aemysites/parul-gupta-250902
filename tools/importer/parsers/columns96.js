/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the first visible tab panel
  function getActivePanel(el) {
    return el.querySelector('.jupiter22-c-tabs__panel.active, .jupiter22-c-tabs__panel[aria-hidden="false"]');
  }

  const panel = getActivePanel(element);
  if (!panel) return;

  // Find the two main columns inside the active panel
  const panels = panel.querySelectorAll('.jupiter22-feature-card__panel');
  if (panels.length < 2) return;

  // First column: image (include all content in the media panel)
  const imagePanel = panels[0];
  let imageCell = document.createElement('div');
  Array.from(imagePanel.childNodes).forEach(node => {
    imageCell.appendChild(node.cloneNode(true));
  });

  // Second column: content (include all content in the content panel)
  const contentPanel = panels[1];
  let contentCell = document.createElement('div');
  Array.from(contentPanel.childNodes).forEach(node => {
    contentCell.appendChild(node.cloneNode(true));
  });

  // Build table rows
  const headerRow = ['Columns (columns96)'];
  const contentRow = [imageCell, contentCell];

  // Create the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
