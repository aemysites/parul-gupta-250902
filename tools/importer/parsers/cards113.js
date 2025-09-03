/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all solution cards from both visible and accordion panels, but avoid duplicates
  function getAllSolutionCards() {
    const seen = new Set();
    const cards = [];
    // Main visible cards
    const mainCards = element.querySelectorAll('.jupiter22-card-cluster-solution-cards .jupiter22-c-solution-card');
    mainCards.forEach(card => {
      const key = card.outerHTML;
      if (!seen.has(key)) {
        seen.add(key);
        cards.push(card);
      }
    });
    // Accordion cards (if present)
    const accordionPanel = element.querySelector('.jupiter22-card-cluster-solution-cards-accordion .jupiter22-c-accordion-panel__body-inner');
    if (accordionPanel) {
      const accordionCards = accordionPanel.querySelectorAll('.jupiter22-c-solution-card');
      accordionCards.forEach(card => {
        const key = card.outerHTML;
        if (!seen.has(key)) {
          seen.add(key);
          cards.push(card);
        }
      });
    }
    return cards;
  }

  // Get header row
  const headerRow = ['Cards (cards113)'];
  const rows = [headerRow];

  // --- Add the "main card" (Investing Lists) as the first card row ---
  const mainCard = element.querySelector('.jupiter22-card-cluster-group_main-card-and-media');
  if (mainCard) {
    // First cell: only the main image (not the icon)
    const mediaImg = mainCard.querySelector('.jupiter22-card-cluster-group-media img');
    if (mediaImg) {
      const imgCell = mediaImg.cloneNode(true);
      // Second cell: icon (if present), title, description, CTA
      const textCellContent = [];
      // Icon (optional)
      const icon = mainCard.querySelector('.jupiter22-card-cluster-group_icon img');
      if (icon) {
        textCellContent.push(icon.cloneNode(true));
      }
      // Title
      const title = mainCard.querySelector('.jupiter22-card-cluster-group_main-card_heading');
      if (title) {
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        textCellContent.push(strong);
      }
      // Description (all paragraphs)
      const desc = mainCard.querySelectorAll('.jupiter22-c-text-passage p');
      desc.forEach(p => {
        textCellContent.push(p.cloneNode(true));
      });
      // CTA (Learn more)
      const cta = mainCard.querySelector('.jupiter22-card-cluster-group_main-card_text-link');
      if (cta) {
        textCellContent.push(cta.cloneNode(true));
      }
      rows.push([imgCell, textCellContent]);
    }
  }

  // Get all solution cards (no duplicates)
  const solutionCards = getAllSolutionCards();

  solutionCards.forEach(card => {
    // Only add row if there is an image/icon
    const iconContainer = card.querySelector('.jupiter22-c-solution-card__icon-container');
    let iconCell = null;
    if (iconContainer) {
      const img = iconContainer.querySelector('img');
      if (img) iconCell = img.cloneNode(true);
      else {
        const svg = iconContainer.querySelector('svg');
        if (svg) iconCell = svg.cloneNode(true);
      }
    }
    if (!iconCell) return;

    // Text cell
    const textCellContent = [];
    const titleContainer = card.querySelector('.jupiter22-c-solution-card__title');
    if (titleContainer) {
      let titleEl = titleContainer.querySelector('span') || titleContainer;
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      textCellContent.push(strong);
    }
    const descContainer = card.querySelector('.jupiter22-c-text-passage');
    if (descContainer) {
      const p = descContainer.querySelector('p');
      if (p) {
        textCellContent.push(p.cloneNode(true));
      }
    }
    const link = card.querySelector('a.jupiter22-c-solution-card__inner');
    if (link) {
      textCellContent.push(link.cloneNode(true));
    }
    rows.push([iconCell, textCellContent]);
  });

  // Replace element with block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
