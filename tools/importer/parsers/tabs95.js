/* global WebImporter */
export default function parse(element, { document }) {
  // Find the nav root
  const navRoot = element.querySelector('.jupiter22-c-nav');
  if (!navRoot) return;

  // Helper to extract all top-level tabs (primary)
  function extractTabs(navRoot) {
    const tabs = [];
    // Find the title (active tab label)
    const titleRow = navRoot.querySelector('.jupiter22-c-nav__title-row');
    let firstTabLabel = '';
    if (titleRow) {
      const h3 = titleRow.querySelector('h3');
      if (h3) {
        firstTabLabel = h3.textContent.trim();
      }
    }
    // Find the main nav list (primary tabs)
    const primaryList = navRoot.querySelector('.jupiter22-c-nav__list--primary');
    if (primaryList) {
      const items = primaryList.querySelectorAll(':scope > li');
      items.forEach((li) => {
        let label = '';
        let content = null;
        // Dropdown or simple link
        const dropdown = li.querySelector(':scope > .jupiter22-c-nav__dropdown');
        if (dropdown) {
          // Dropdown tab
          const trigger = dropdown.querySelector('.jupiter22-c-nav__dropdown-trigger-text');
          label = trigger ? trigger.textContent.trim() : '';
          // Content: all links in dropdown
          const panel = dropdown.querySelector('.jupiter22-c-nav__dropdown-panel');
          if (panel) {
            const links = panel.querySelectorAll('a');
            // Create a fragment to hold all links
            const frag = document.createElement('div');
            links.forEach(a => frag.appendChild(a.cloneNode(true)));
            content = frag;
          }
        } else {
          // Simple link tab
          const link = li.querySelector('a');
          if (link) {
            label = link.textContent.trim();
            content = link.cloneNode(true);
          }
        }
        if (label && content) {
          tabs.push([label, content]);
        }
      });
    }
    // Add the first tab (title) if not already present
    if (firstTabLabel) {
      let found = tabs.find(([lbl]) => lbl === firstTabLabel);
      if (!found) {
        found = tabs.find(([lbl]) => lbl.toLowerCase() === firstTabLabel.toLowerCase());
      }
      if (!found) {
        // Try to find a matching link
        const link = primaryList ? Array.from(primaryList.querySelectorAll('a')).find(a => a.textContent.trim() === firstTabLabel) : null;
        if (link) {
          tabs.unshift([firstTabLabel, link.cloneNode(true)]);
        } else {
          // Fallback: just add the label with empty content
          tabs.unshift([firstTabLabel, document.createElement('div')]);
        }
      }
    }
    return tabs;
  }

  // Extract tabs
  const tabs = extractTabs(navRoot);
  if (!tabs.length) return;

  // Build the table rows
  const headerRow = ['Tabs (tabs95)'];
  const rows = [headerRow];
  tabs.forEach(([label, content]) => {
    rows.push([label, content]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
