/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract tab label and content from a nav block
  function extractTabsFromNavBlock(navBlock) {
    const tabs = [];
    // Find the bento list (main tab content)
    const bentoList = navBlock.querySelector('.jupiter22-c-nav__bento-link-list');
    if (bentoList) {
      bentoList.querySelectorAll(':scope > li').forEach((li) => {
        const link = li.querySelector('a.jupiter22-c-nav-link');
        if (link) {
          // Tab label: from h4
          const h4 = link.querySelector('h4');
          const label = h4 ? h4.textContent.trim() : link.textContent.trim();
          // Tab content: everything inside the link (h4 + p)
          tabs.push([label, link]);
        }
      });
    }
    return tabs;
  }

  // Compose the table rows
  const headerRow = ['Tabs (tabs50)'];
  let rows = [headerRow];

  // Defensive: find the nav block with bento links
  const nav = element.querySelector('nav');
  if (nav) {
    // Find the bento dropdown list
    const productsList = nav.querySelector('.jupiter22-c-nav__list--products');
    if (productsList) {
      const dropdown = productsList.querySelector('.jupiter22-c-nav__dropdown--bento');
      if (dropdown) {
        const tabs = extractTabsFromNavBlock(dropdown);
        rows = rows.concat(tabs);
      }
    }
  }

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
