import { pageHasChildren } from '../utils.mjs'
import orderBy from 'lodash.orderby'

/*
 * A method to recursively add the ordered slugs to the LUT
 */
const flattenOrderedChildPages = (nav) => {
  const slugs = []
  for (const page of orderBy(nav, ['o', 't'], ['asc', 'asc'])) {
    if (page.s) {
      slugs.push(page.s)
      if (pageHasChildren(page)) slugs.push(...flattenOrderedChildPages(page))
    }
  }

  return slugs
}

/*
 * This builds the slugLut (slug look up table) which makes it trivial to
 * build the PrevNext component as it builds a flat list of all pages in
 * the order they are naturally presented to the reader. So if you have
 * a page's slug, you merely need to look it up in the list and return the
 * next entry (or previous)
 */
export const orderedSlugLut = (nav) => {
  const slugs = []
  for (const page of orderBy(nav, ['o', 't'], ['asc', 'asc'])) {
    if (page.s) {
      slugs.push(page.s)
      if (pageHasChildren(page)) slugs.push(...flattenOrderedChildPages(page))
    }
  }

  return slugs
}
