/* global WebImporter */
export default function parse(element, { document }) {
  // Find the podcast banner container
  const bannerContainer = element.querySelector('.podcast-banner-container');
  if (!bannerContainer) return;

  // Find the banner itself
  const banner = bannerContainer.querySelector('.podcast-banner');
  if (!banner) return;

  // Find the heading ("Subscribe Now:") and get its text
  const heading = banner.querySelector('h2');
  let headingText = '';
  if (heading) {
    headingText = heading.textContent.trim();
  }

  // Find the list of links
  const ul = banner.querySelector('ul');
  let linkCells = [];
  if (ul) {
    // For each <li>, get the <a> (icon link)
    const items = ul.querySelectorAll('li');
    linkCells = Array.from(items).map(li => {
      const a = li.querySelector('a');
      if (a && a.href) {
        // If the <a> is empty, add a fallback label based on the URL
        if (!a.textContent.trim() && !a.querySelector('img')) {
          let label = '';
          if (a.href.includes('apple')) label = 'Apple Podcasts';
          else if (a.href.includes('spotify')) label = 'Spotify';
          else if (a.href.includes('google')) label = 'Google Podcasts';
          else if (a.href.includes('stitcher')) label = 'Stitcher';
          else label = a.href;
          a.textContent = label;
        }
        return a;
      }
      return '';
    });
  }

  // Build the table rows: header row, then one row with heading text and each link in its own column
  const headerRow = ['Columns (columns38)'];
  const contentRow = [headingText, ...linkCells];
  const rows = [headerRow, contentRow];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
