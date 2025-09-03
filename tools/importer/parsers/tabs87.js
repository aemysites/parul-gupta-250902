/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract tab label and content from a nav item
  function extractTabFromListItem(li) {
    // Dropdown tab
    const dropdown = li.querySelector('.jupiter22-c-nav__dropdown');
    if (dropdown) {
      // Tab label
      const trigger = dropdown.querySelector('.jupiter22-c-nav__dropdown-trigger-text');
      let label = trigger ? trigger.textContent.trim() : '';
      // Tab content: all dropdown links as a list
      const panel = dropdown.querySelector('.jupiter22-c-nav__dropdown-panel');
      let content = '';
      if (panel) {
        const innerContainer = panel.querySelector('.jupiter22-c-nav__dropdown-inner-container');
        if (innerContainer) {
          // Create a fragment with all links as block elements
          const links = innerContainer.querySelectorAll('.jupiter22-c-nav__page-nav-link');
          const frag = document.createElement('div');
          links.forEach(link => {
            const div = document.createElement('div');
            div.appendChild(link.cloneNode(true));
            frag.appendChild(div);
          });
          content = frag.childNodes.length === 1 ? frag.firstChild : frag;
        } else {
          // Fallback: get all text in panel
          content = panel.textContent.trim();
        }
      }
      return [label, content];
    }
    // Regular tab
    const link = li.querySelector('.jupiter22-c-nav__page-nav-link');
    if (link) {
      // Tab label
      const labelSpan = link.querySelector('.jupiter22-c-nav__page-nav-link-content');
      let label = labelSpan ? labelSpan.textContent.trim() : link.textContent.trim();
      // Tab content: the link itself (for now, as that's all that's present)
      return [label, link.cloneNode(true)];
    }
    return null;
  }

  // Find the nav menu
  const nav = element.querySelector('nav');
  if (!nav) return;
  // Find the primary tab list
  const primaryList = nav.querySelector('.jupiter22-c-nav__list--primary');
  if (!primaryList) return;

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Tabs (tabs87)']);

  // Each tab: label, content
  const tabItems = Array.from(primaryList.children).filter(li => li.classList.contains('jupiter22-c-nav__list-item'));
  tabItems.forEach(li => {
    const tab = extractTabFromListItem(li);
    if (tab && tab[0] && tab[1]) {
      rows.push([tab[0], tab[1]]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
