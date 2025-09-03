/* global WebImporter */
export default function parse(element, { document }) {
  // Find the nav block containing the tabs
  const navContainer = element.querySelector('.jupiter22-c-nav__content');
  if (!navContainer) return;

  // Get the tab labels from the nav list
  const navList = navContainer.querySelector('.jupiter22-c-nav__list--primary');
  if (!navList) return;
  const tabItems = Array.from(navList.querySelectorAll('.jupiter22-c-nav__list-item'));

  // Build the table header
  const headerRow = ['Tabs (tabs9)'];
  const rows = [headerRow];

  // For each tab, extract label and content (content is empty if not present)
  tabItems.forEach((item) => {
    // Tab label
    const labelSpan = item.querySelector('.jupiter22-c-nav__page-nav-link-content');
    const tabLabel = labelSpan ? labelSpan.textContent.trim() : '';
    // Tab content: none in nav, so use empty string
    rows.push([tabLabel, '']);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
