/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tabs container and chart container
  const tabList = Array.from(element.querySelectorAll('.table-tabs__list button'));
  const chartContainer = element.querySelector('#container');

  // If no tabs or chart, do nothing
  if (!tabList.length || !chartContainer) return;

  // Header row
  const headerRow = ['Tabs (tabs33)'];

  // Instead of only the active tab, include all tabs as rows, each with the chart as content (since the chart is the only content shown)
  // But to be more flexible, let's include all tab labels and the chart content for each
  // However, to avoid duplicating the chart, only the active tab should get the chart, others get a placeholder or empty
  const rows = tabList.map(tab => {
    const label = tab.textContent.trim();
    if (tab.classList.contains('table-tabs__tab--active')) {
      // Clone the chart container to avoid moving it multiple times
      const chartClone = chartContainer.cloneNode(true);
      return [label, chartClone];
    } else {
      // For inactive tabs, leave content empty (could be improved if more content is present)
      return [label, ''];
    }
  });

  // Compose table cells
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
