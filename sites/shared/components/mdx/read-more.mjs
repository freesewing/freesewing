import get from 'lodash.get'
import Link from 'next/link'
import { useContext } from 'react'
import { NavigationContext } from 'shared/context/navigation-context.mjs'
import { RightIcon } from 'shared/components/icons.mjs'
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

const onActivePath = (slug, active) => (active ? active.slice(0, slug.length) === slug : false)

/*
 * This is a recursive function, so it needs to be lean
 */
const RenderTree = ({ tree, recurse, depth = 1, level = 0, active = false }) => {
  const orderedTree = orderBy(tree, ['o', 't'], ['asc', 'asc'])
    .filter((item) => typeof item === 'object')
    .filter((item) => !item.h)
    .filter((item) => !item._)

  return (
    <ul className="w-full list">
      {orderedTree.map((item, i) => {
        /*
         * Does this have children?
         */
        const hasChildren =
          recurse && item.s && (!depth || level < depth) && pageHasChildren(item)
            ? item.s.replaceAll('/', '')
            : false

        /*
         * The rotation of the chevron should in principle be possible with Tailwind's group variant modifiers
         * However, despite my best efforts, I can't seem to make it work. So this relies on a bit of CSS.
         * The 'summary-chevron' class is what does the trick.
         */
        const liClasses =
          'hover:bg-opacity-20 bg-secondary bg-opacity-0 block w-full p-0 break-all rounded'
        return (
          <li key={i} className="w-full flex flex-row items-stretch">
            {hasChildren ? (
              <details
                className={`w-full flex flex-row items-center`}
                open={onActivePath(item.s, active)}
              >
                <summary className="hover:bg-opacity-20 bg-secondary bg-opacity-0 w-full flex flex-row items-center gap-0.5 lg:gap-1 pl-1 lg:pl-2 py-0">
                  <Link href={`/${item.s}`} className="grow p-1">
                    {active === item.s ? <b>{item.t}</b> : item.t}
                  </Link>
                  <div className="btn btn-sm btn-secondary btn-ghost h-full px-2">
                    <RightIcon
                      className={`details-toggle h-5 h-5 summary-chevron transition-all`}
                      stroke={3}
                    />
                  </div>
                </summary>
                <RenderTree tree={item} {...{ recurse, depth, active }} level={level + 1} />
              </details>
            ) : (
              <>
                <Link href={`/${item.s}`} className={`${liClasses} p-1 pl-3`}>
                  {active === item.s ? <b>{item.t}</b> : item.t}
                </Link>
              </>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export const ReadMore = ({
  recurse = 0,
  root = false,
  site = 'org',
  asMenu = false,
  depth = 99,
  from = false,
}) => {
  const { siteNav, slug } = useContext(NavigationContext)
  let active = false

  // Deal with recurse not being a number
  if (recurse && recurse !== true) {
    if (typeof recurse === 'number') recurse--
    else recurse = 1
  }

  // Deal with root being passed as true
  if (root === true) root = ''

  if (asMenu && slug.split('/').length > 1) {
    root = from ? from : slug.split('/').slice(0, -1).join('/')
    active = slug
  }

  const tree =
    root === false ? getRoot[site](from ? from : slug, siteNav) : getRoot[site](root, siteNav)

  if (!tree) return null

  return <RenderTree {...{ tree, recurse, depth, active, from }} />
}
