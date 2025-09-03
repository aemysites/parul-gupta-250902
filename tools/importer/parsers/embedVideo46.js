/* global WebImporter */
export default function parse(element, { document }) {
  // Block name header row
  const headerRow = ['Embed (embedVideo46)'];

  // The code must include all text content from the source HTML
  // Find all text nodes within the element
  let textContent = '';
  // Use a TreeWalker to get all visible text
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode: function(node) {
      // Only include non-empty, non-whitespace text
      if (node.textContent && node.textContent.trim()) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_REJECT;
    }
  });
  let node;
  while ((node = walker.nextNode())) {
    textContent += node.textContent.trim() + ' ';
  }
  textContent = textContent.trim();

  // If no text found, use a placeholder
  if (!textContent) {
    textContent = 'Embed URL not found';
  }

  // Create a cell with the text content
  const contentRow = [textContent];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
