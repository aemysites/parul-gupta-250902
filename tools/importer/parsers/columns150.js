/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid containing the two columns
  const grid = element.querySelector('.nsdq-l-grid--2up');
  if (!grid) return;

  // Get the two column regions
  const regions = grid.querySelectorAll(':scope > .layout__region');
  if (regions.length < 2) return;

  // Helper to extract the main heading, #1 card, and accordion list for each column
  function extractColumnContent(region) {
    const content = document.createElement('div');

    // Section heading (Late Stage / Giga)
    const heading = region.querySelector('.jupiter22-c-section-heading');
    if (heading) {
      // Use the headline element (h3 or h4)
      const headline = heading.querySelector('.jupiter22-c-section-heading__headline');
      if (headline) content.appendChild(headline.cloneNode(true));
    }

    // #1 Card (Figma / Airtable)
    const card = region.querySelector('.jupiter22-c-card');
    if (card) {
      // Get the h6 title and description paragraph and button
      const h6 = region.querySelector('h6.textblock-heading-sm');
      if (h6) content.appendChild(h6.cloneNode(true));
      const desc = card.querySelector('.jupiter22-c-text-passage p');
      if (desc) content.appendChild(desc.cloneNode(true));
      const btn = card.querySelector('.jupiter22-c-info-card__button');
      if (btn) content.appendChild(btn.cloneNode(true));
    }

    // Accordion list (remaining companies)
    const accordion = region.querySelector('.jupiter22-c-accordion');
    if (accordion) {
      const panels = accordion.querySelectorAll(':scope > .jupiter22-c-accordion-panel');
      panels.forEach(panel => {
        // Get the button (header)
        const button = panel.querySelector('.jupiter22-c-accordion-header__button');
        let headerText = '';
        if (button) {
          const title = button.querySelector('.jupiter22-c-accordion-header__title');
          if (title) {
            headerText = title.textContent.trim();
          }
        }
        // Compose the row: header + plus
        if (headerText) {
          const rowDiv = document.createElement('div');
          rowDiv.style.display = 'flex';
          rowDiv.style.alignItems = 'center';
          const headerSpan = document.createElement('span');
          headerSpan.textContent = headerText;
          rowDiv.appendChild(headerSpan);
          const plusSpan = document.createElement('span');
          plusSpan.textContent = ' +';
          plusSpan.style.color = '#0080FF';
          rowDiv.appendChild(plusSpan);
          content.appendChild(rowDiv);
        }
      });
    }

    return content;
  }

  // Build the table rows
  const headerRow = ['Columns (columns150)'];
  const column1Content = extractColumnContent(regions[0]);
  const column2Content = extractColumnContent(regions[1]);
  const columnsRow = [column1Content, column2Content];

  // Create the block table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
