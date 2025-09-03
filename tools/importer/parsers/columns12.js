/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the main feature card inside the block
  function getFeatureCard(el) {
    return el.querySelector('.jupiter22-feature-card');
  }

  // Helper to get both panels (columns) in order
  function getPanels(featureCard) {
    return Array.from(featureCard.querySelectorAll(':scope > .jupiter22-feature-card__panel'));
  }

  // Helper to get the content inside a panel, replacing video with link
  function getPanelContent(panel) {
    const content = panel.querySelector(':scope > .jupiter22-feature-card__panel-content') || panel;
    // Clone so we can safely manipulate
    const clone = content.cloneNode(true);
    // Replace any <video> with a link to its src
    clone.querySelectorAll('video[src], video source[src]').forEach(video => {
      let src = video.getAttribute('src') || (video.querySelector('source') && video.querySelector('source').getAttribute('src'));
      if (src) {
        const link = document.createElement('a');
        link.href = src;
        link.textContent = 'Video';
        video.replaceWith(link);
      }
    });
    return clone;
  }

  const featureCard = getFeatureCard(element);
  if (!featureCard) return;
  const panels = getPanels(featureCard);
  if (panels.length < 2) return;

  const isReverse = featureCard.classList.contains('jupiter22-feature-card--reverse');
  let leftPanel, rightPanel;
  if (isReverse) {
    rightPanel = getPanelContent(panels[0]);
    leftPanel = getPanelContent(panels[1]);
  } else {
    leftPanel = getPanelContent(panels[0]);
    rightPanel = getPanelContent(panels[1]);
  }

  const headerRow = ['Columns (columns12)'];
  const contentRow = [leftPanel, rightPanel];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
