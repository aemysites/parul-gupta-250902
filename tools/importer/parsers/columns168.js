/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero carousel root
  const hero = element.querySelector('.jupiter22-c-hero-carousel');
  if (!hero) return;

  // --- LEFT COLUMN ---
  // Get all text content and button in the left area
  const leftCol = document.createElement('div');
  // Eyebrow title
  const eyebrow = hero.querySelector('.jupiter22-c-hero-carousel__eyebrow-title');
  if (eyebrow) leftCol.appendChild(eyebrow.cloneNode(true));
  // Main title
  const mainTitle = hero.querySelector('.jupiter22-c-hero-carousel__title');
  if (mainTitle) leftCol.appendChild(mainTitle.cloneNode(true));
  // Button
  const button = hero.querySelector('.jupiter22-c-hero-carousel__button-subgroup');
  if (button) leftCol.appendChild(button.cloneNode(true));

  // --- RIGHT COLUMN ---
  // Find the active slide (should be the one visible)
  const slidesContainer = hero.querySelector('.jupiter22-c-hero-carousel__slides-container');
  const rightCol = document.createElement('div');
  if (slidesContainer) {
    const activeSlide = slidesContainer.querySelector('li.active') || slidesContainer.querySelector('li');
    if (activeSlide) {
      // Image
      const imgContainer = activeSlide.querySelector('.jupiter22-c-slide__image');
      if (imgContainer) rightCol.appendChild(imgContainer.cloneNode(true));
      // Title
      const textTitle = activeSlide.querySelector('.jupiter22-c-slide__text-title');
      if (textTitle) rightCol.appendChild(textTitle.cloneNode(true));
      // Description
      const textPassage = activeSlide.querySelector('.jupiter22-c-slide__text-passage');
      if (textPassage) rightCol.appendChild(textPassage.cloneNode(true));
    }
  }

  // --- TABLE ASSEMBLY ---
  const headerRow = ['Columns (columns168)'];
  const contentRow = [leftCol, rightCol];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
