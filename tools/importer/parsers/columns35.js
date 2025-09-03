/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main block container
  const block = element.querySelector('.jupiter22-js-marketo-form-block');
  if (!block) return;

  // Get the left column (form and content)
  let leftCol;
  const content = block.querySelector('.jupiter22-c-marketo-form-block__content');
  if (content) {
    leftCol = document.createElement('div');
    // Subheading (blue text)
    const subheading = content.querySelector('.jupiter22-c-marketo-form-block__subheading');
    if (subheading) leftCol.appendChild(subheading.cloneNode(true));
    // The form itself
    const marketoForm = content.querySelector('.jupiter22-marketo-form');
    if (marketoForm) {
      // Clone the form so we can safely manipulate it
      const formClone = marketoForm.cloneNode(true);
      // Find all iframes inside the form and replace with links
      formClone.querySelectorAll('iframe').forEach((iframe) => {
        const src = iframe.getAttribute('src');
        if (src) {
          const link = document.createElement('a');
          link.href = src;
          link.textContent = src;
          iframe.replaceWith(link);
        }
      });
      leftCol.appendChild(formClone);
    }
  }

  // Get the right column (background image + heading)
  let rightCol;
  const header = block.querySelector('header.jupiter22-c-marketo-form-block__header');
  if (header) {
    rightCol = document.createElement('div');
    // Add background image as <img>
    const bgUrl = header.getAttribute('data-bg') || '';
    if (bgUrl) {
      const img = document.createElement('img');
      img.src = bgUrl;
      img.alt = '';
      rightCol.appendChild(img);
    }
    // Heading ("Subscribe Today")
    const heading = header.querySelector('.jupiter22-c-marketo-form-block__heading');
    if (heading) rightCol.appendChild(heading.cloneNode(true));
  }

  // Build the table cells
  const headerRow = ['Columns (columns35)'];
  const secondRow = [leftCol, rightCol];

  // Create the block table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
