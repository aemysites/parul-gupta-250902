/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildrenBySelector(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // 1. Find the main left grid (the multi-card area)
  const leftGrid = element.querySelector('.nsdq-bento-layout__main--left--grid');
  // 2. Find the right rail (the search box)
  const aside = element.querySelector('aside');
  let rightRailContent = null;
  if (aside) {
    // Try to find the Instrument Search block
    const marketStatusDesktop = aside.querySelector('nsdq-market-status-desktop');
    if (marketStatusDesktop) {
      // Find the form block
      const region = marketStatusDesktop.querySelector('.layout__region.right-rail-first');
      if (region) {
        rightRailContent = region;
      }
    }
  }

  // Defensive: If leftGrid not found, fallback to element
  const grid = leftGrid || element;

  // Get all layout__region children (these are the columns)
  const regions = Array.from(grid.querySelectorAll(':scope > .layout__region'));

  // There are 3 main columns visually: left (2 cards), middle (1 card), right (search)
  // We'll build the first row with 3 columns
  // Column 1: left two cards
  // Column 2: middle card
  // Column 3: right rail (search)

  // Column 1: left two cards (ma-bento-fw1 and ma-bento-hw1)
  const col1 = document.createElement('div');
  // Section heading ("Related Content")
  const headingRegion = regions.find(r => r.classList.contains('ma-bento-fw1'));
  if (headingRegion) {
    // Grab heading and the next region (ma-bento-hw1)
    const heading = headingRegion.querySelector('.jupiter22-c-section-heading');
    if (heading) col1.appendChild(heading);
  }
  // Cards in ma-bento-hw1
  const hw1Region = regions.find(r => r.classList.contains('ma-bento-hw1'));
  if (hw1Region) {
    // Get all cards
    const cards = hw1Region.querySelectorAll('.jupiter22-c-callout-card');
    cards.forEach(card => col1.appendChild(card));
  }

  // Column 2: middle card (ma-bento-hw2)
  const col2 = document.createElement('div');
  const hw2Region = regions.find(r => r.classList.contains('ma-bento-hw2'));
  if (hw2Region) {
    const cards = hw2Region.querySelectorAll('.jupiter22-c-callout-card');
    cards.forEach(card => col2.appendChild(card));
  }

  // Column 3: right rail (search)
  const col3 = document.createElement('div');
  if (rightRailContent) {
    col3.appendChild(rightRailContent);
  }

  // Second row: the bottom cards (ma-bento-fw-ad)
  const bottomRegion = regions.find(r => r.classList.contains('ma-bento-fw-ad'));
  let bottomRow = [];
  if (bottomRegion) {
    // There are two cards, split into two columns
    const cards = bottomRegion.querySelectorAll('.jupiter22-c-callout-card');
    if (cards.length === 2) {
      bottomRow = [cards[0], cards[1]];
    } else if (cards.length > 0) {
      bottomRow = Array.from(cards);
    }
  }

  // Build the table rows
  const headerRow = ['Columns (columns83)'];
  const firstRow = [col1, col2, col3];
  // Only add bottom row if there are two cards
  const cells = bottomRow.length === 2 ? [headerRow, firstRow, bottomRow] : [headerRow, firstRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
