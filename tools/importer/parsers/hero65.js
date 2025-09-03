/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content card (hero content)
  const contentCard = element.querySelector('.jupiter22-c-content-card');
  let title = null;
  let cta = null;

  // Fallback: get heading from accordion if not in content card
  let headingText = '';
  if (contentCard) {
    // Find the heading (title)
    const headingEl = contentCard.querySelector('.jupiter22-c-content-card__title, h3');
    if (headingEl) {
      headingText = headingEl.textContent.trim();
    }
    // Find the CTA button (Subscribe to Market Makers)
    const ctaList = contentCard.querySelector('.jupiter22-modal-form-list');
    if (ctaList) {
      const btn = ctaList.querySelector('button');
      if (btn) {
        const btnTextSpan = btn.querySelector('.jupiter22-c-button__text');
        const btnText = btnTextSpan ? btnTextSpan.textContent.trim() : btn.textContent.trim();
        cta = document.createElement('a');
        cta.href = '#';
        cta.textContent = btnText;
        cta.setAttribute('style', 'display:inline-block;margin-top:16px;');
      }
    }
  }
  // If no heading found, try accordion
  if (!headingText) {
    const accordionHeading = element.querySelector('.jupiter22-c-accordion-header__title, .jupiter22-c-accordion-header__button-text h3');
    if (accordionHeading) {
      headingText = accordionHeading.textContent.trim();
    }
    // Find CTA in accordion
    const accordionCtaBtn = element.querySelector('.jupiter22-c-accordion-panel__body .jupiter22-c-button__text');
    if (!cta && accordionCtaBtn) {
      cta = document.createElement('a');
      cta.href = '#';
      cta.textContent = accordionCtaBtn.textContent.trim();
      cta.setAttribute('style', 'display:inline-block;margin-top:16px;');
    }
  }

  // Compose the content cell for the hero
  const contentCell = [];
  if (headingText) {
    const h = document.createElement('h2');
    h.textContent = headingText;
    contentCell.push(h);
  }
  if (cta) {
    contentCell.push(document.createElement('br'));
    contentCell.push(cta);
  }

  // Compose the table rows
  const headerRow = ['Hero (hero65)'];
  const backgroundRow = ['']; // No background image
  const contentRow = [contentCell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
