/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Always use the correct block header
  const headerRow = ['Columns (columns152)'];

  // Find the main 2up grid (66-33 split)
  const mainGrid = element.querySelector('.nsdq-l-grid.nsdq-l-grid--2up-66-33');
  if (!mainGrid) return;

  // Get the left column (contains the contacts table and headings)
  const leftCol = mainGrid.querySelector('.nsdq-l-grid__item');
  if (!leftCol) return;

  // Get the right column (contains the callout cards)
  const rightCol = mainGrid.querySelectorAll('.nsdq-l-grid__item')[1];

  // --- Extract Press Contacts section ---
  // Get heading
  const contactsHeading = leftCol.querySelector('.jupiter22-c-section-heading__headline');
  // Get contacts table
  const contactsTable = leftCol.querySelector('table');

  // --- Extract Useful Information section ---
  // Get heading
  const infoHeading = leftCol.querySelectorAll('.jupiter22-c-section-heading__headline')[1];

  // Get callout cards from both left and right columns in the 2up grid below
  const infoGrid = element.querySelector('.nsdq-l-grid.nsdq-l-grid--2up');
  let infoCards = [];
  if (infoGrid) {
    infoCards = Array.from(infoGrid.querySelectorAll('.jupiter22-c-callout-card'));
  }

  // Build the block rows
  const cells = [headerRow];

  // First row: Press Contacts section (2 columns)
  if (contactsHeading && contactsTable) {
    const contactsRows = Array.from(contactsTable.querySelectorAll('tr'));
    contactsRows.forEach(tr => {
      const tds = Array.from(tr.querySelectorAll('td'));
      const cols = tds.map(td => {
        const div = document.createElement('div');
        while (td.firstChild) div.appendChild(td.firstChild);
        return div;
      });
      // Only add heading to the first row
      if (cells.length === 1 && contactsHeading) {
        cols.unshift(contactsHeading.cloneNode(true));
      }
      cells.push(cols);
    });
  }

  // Second section: Useful Information
  if (infoHeading) {
    // Compose a row with heading and callout cards
    const row = [];
    // Heading
    row.push(infoHeading.cloneNode(true));
    // Cards (grouped in one cell)
    if (infoCards.length) {
      const cardsDiv = document.createElement('div');
      infoCards.forEach(card => {
        cardsDiv.appendChild(card.cloneNode(true));
      });
      row.push(cardsDiv);
    }
    cells.push(row);
  }

  // Replace the original element with the new block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
