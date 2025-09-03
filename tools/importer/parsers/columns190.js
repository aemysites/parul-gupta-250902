/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main card/media container and the solution cards container
  const mainCardAndMedia = element.querySelector('.jupiter22-card-cluster-group_main-card-and-media');
  const solutionCards = element.querySelector('.jupiter22-card-cluster-solution-cards');
  const accordionPanel = element.querySelector('.jupiter22-card-cluster-solution-cards-accordion');

  // Left column: image + heading + description
  let leftColContent = [];
  if (mainCardAndMedia) {
    // Image
    const media = mainCardAndMedia.querySelector('.jupiter22-card-cluster-group-media img');
    if (media) leftColContent.push(media);
    // Heading and description
    const heading = mainCardAndMedia.querySelector('.jupiter22-card-cluster-group_main-card_heading');
    if (heading) leftColContent.push(heading);
    const desc = mainCardAndMedia.querySelector('.jupiter22-card-cluster-group-main-card_text-passage');
    if (desc) leftColContent.push(desc);
  }

  // Right column: all solution cards (including those in accordion panel)
  let rightColContent = [];
  // Add visible solution cards
  if (solutionCards) {
    solutionCards.querySelectorAll('.jupiter22-c-solution-card').forEach(card => {
      rightColContent.push(card);
    });
  }
  // Add hidden solution cards from accordion panel
  if (accordionPanel) {
    accordionPanel.querySelectorAll('.jupiter22-c-solution-card').forEach(card => {
      rightColContent.push(card);
    });
  }

  // Table header
  const headerRow = ['Columns (columns190)'];
  // Table content row: left and right columns
  const contentRow = [leftColContent, rightColContent];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
