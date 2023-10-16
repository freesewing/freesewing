import get from 'lodash.get'
import Link from 'next/link'
import { useContext } from 'react'
import { NavigationContext } from 'shared/context/navigation-context.mjs'
import { BulletIcon, RightIcon } from 'shared/components/icons.mjs'
import { pageHasChildren } from 'shared/utils.mjs'
import orderBy from 'lodash.orderby'

export const getRoot = {
  dev: (root, nav) => {
    if (!root) return nav
    if (root.indexOf('/') === -1) return nav[root]
    return get(nav, root.split('/'))
  },
  org: (root, nav) => {
    // Fixme: make this work for org
    if (!root) return nav
    if (root.indexOf('/') === -1) return get(nav, root)
    return get(nav, root.split('/'))
  },
}

/*
 * This is a recursive function, so it needs to be lean
 */
const RenderTree = ({ tree, recurse, depth = 1, level = 0 }) => {
  const orderedTree = orderBy(tree, ['o', 't'], ['asc', 'asc']).filter(
    (item) => typeof item === 'object'
  )

  return (
    <ul className="w-full list">
      {orderedTree.map((item, i) => {
        /*
         * Does this have children?
         */
        const hasChildren =
          recurse && (!depth || level < depth) && pageHasChildren(item)
            ? item.s.replaceAll('/', '')
            : false

        /*
         * The rotation of the chevron should in principle be possible with Tailwind's group variant modifiers
         * However, despite my best efforts, I can't seem to make it work. So this relies on a bit of CSS.
         * The 'summary-chevron' class is what does the trick.
         */
        return (
          <li key={i} className="w-full flex flex-row items-start gap-0.5 lg:gap-1">
            {hasChildren ? (
              <details className={`w-full inline flex flex-row`}>
                <summary className="hover:bg-opacity-20 bg-secondary bg-opacity-0 block w-full flex flex-row items-center gap-0.5 lg:gap-1 px-1 lg:px-2">
                  <RightIcon className={`w-4 h-4 summary-chevron transition-all`} stroke={3} />
                  <Link href={`/${item.s}`}>{item.t}</Link>
                </summary>
                <RenderTree tree={item} {...{ recurse, depth }} level={level + 1} />
              </details>
            ) : (
              <>
                <BulletIcon className="w-2 h-2 mt-2 mx-1 ml-2 lg:ml-3 shrink-0" fill stroke={0} />
                <Link href={`/${item.s}`} className="break-all">
                  {item.t}
                </Link>
              </>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export const ReadMore = ({ recurse = 0, root = false, site = 'org', depth = 99 }) => {
  const { siteNav, slug } = useContext(NavigationContext)

  // Deal with recurse not being a number
  if (recurse && recurse !== true) {
    if (typeof recurse === 'number') recurse--
    else recurse = 1
  }

  // Deal with root being passed as true
  if (root === true) root = ''

  const tree = root === false ? getRoot[site](slug, siteNav) : getRoot[site](root, siteNav)

  if (!tree) return null

  return <RenderTree {...{ tree, recurse, depth }} />
}
