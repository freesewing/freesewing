/* Remember Mc_Shifton:
 * Note: Set 'm' to truthy to show this as a main section in the side-navigation (optional)
 * Note: Set 'c' to set the control level to hide things from users (optional)
 * Note: Set 's' to the slug (optional insofar as it's not a real page (a spacer for the header))
 * Note: Set '_' to never show the page in the site navigation (like the tags pages)
 * Note: Set 'h' to indicate this is a top-level page that should be hidden from the side-nav (like search)
 * Note: Set 'i' when something should be included as top-level in the collapse side-navigation (optional)
 * Note: Set 'f' to add the page to the footer
 * Note: Set 't' to the title
 * Note: Set 'o' to set the order (optional)
 * Note: Set 'n' to mark this as a noisy entry that should always be closed unless active (like blog)
 */

export const extendSiteNav = (pages) => {
  pages.search = {
    s: 'search',
    h: 1,
    f: 1,
    t: 'Search',
    o: 270,
  }
  pages.sitemap = {
    s: 'sitemap',
    h: 1,
    f: 1,
    t: 'Sitemap',
    o: 270,
  }

  // Make top-level documentation entries appear in i-list
  let order = 10
  for (const slug of ['guides', 'howtos', 'reference', 'tutorials', 'training']) {
    pages[slug].o = order
    pages[slug].i = 1
    pages[slug].m = 1
    order += 10
  }

  return pages
}
