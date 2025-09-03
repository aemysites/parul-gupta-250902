/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the deepest .footer__content block (may be nested)
  const footerContent = element.querySelector('.footer__content');
  if (!footerContent) return;

  // Get the main columns: left (primary links), middle (secondary links), right (logo/legal)
  const linksContainer = footerContent.querySelector('.footer__links');
  const socialLinks = footerContent.querySelector('.footer__links-social');
  const logo = footerContent.querySelector('.footer__logo');
  const legal = footerContent.querySelector('.footer__legal');

  // Defensive: get primary and secondary lists
  let primaryList = linksContainer ? linksContainer.querySelector('.footer__links-primary') : null;
  let secondaryList = linksContainer ? linksContainer.querySelector('.footer__links-secondary') : null;

  // Build left column: primary links + social
  const leftCol = document.createElement('div');
  if (primaryList) leftCol.appendChild(primaryList);
  if (socialLinks) leftCol.appendChild(socialLinks);

  // Build middle column: secondary links
  const middleCol = document.createElement('div');
  if (secondaryList) middleCol.appendChild(secondaryList);

  // Build right column: logo + legal
  const rightCol = document.createElement('div');
  if (logo) rightCol.appendChild(logo);
  if (legal) rightCol.appendChild(legal);

  // Table header
  const headerRow = ['Columns (columns16)'];
  // Table content row: 3 columns
  const contentRow = [leftCol, middleCol, rightCol];

  // Create table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(block);
}
