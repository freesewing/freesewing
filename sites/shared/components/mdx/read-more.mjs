import get from 'lodash.get'
import orderBy from 'lodash.orderby'
import Link from 'next/link'
import { useContext } from 'react'
import { NavigationContext } from 'shared/context/navigation-context.mjs'
import { useNavigation } from 'site/hooks/use-navigation.mjs'

const baseClasses =
  'text-base-content no-underline inline-block hover:text-secondary hover:underline'
const classes = [
  `text-3xl font-bold py-2 ${baseClasses} list-disc`,
  `text-2xl font-bold py-1 ${baseClasses}`,
  `text-xl font-medium ${baseClasses}`,
  `text-lg font-medium ${baseClasses}`,
]

const getClasses = (level) => classes[level] || `text-normal font-regular ${baseClasses}`

// Helper method to filter out the real children
const order = (obj) => orderBy(obj, ['o', 't'], ['asc', 'asc'])
const currentChildren = (current) =>
  Object.values(order(current)).filter((entry) => typeof entry === 'object')

const getRoot = {
  dev: (root, nav) => {
    if (!root) return nav
    if (root.indexOf('/') === -1) return nav[root]
    return get(nav, root.split('/'))
  },
  org: (root, nav) => {
    // Fixme: make this work for org
    if (!root) return nav
    if (root.indexOf('/') === -1) return nav[root]
    return get(nav, root.split('/'))
  },
}

export const ReadMore = ({
  recurse = 0,
  root = false,
  site = 'org',
  level = 0,
  pretty = false,
}) => {
  const { nav, slug } = useContext(NavigationContext)
  const { siteNav } = useNavigation()

  // Deal with recurse not being a number
  if (recurse && recurse !== true) {
    if (typeof recurse === 'number') recurse--
    else recurse = 1
  }

  // Deal with root being passed as true
  if (root === true) root = ''

  const tree = getRoot[site](root, siteNav)
  const list = []
  for (const page of currentChildren(tree)) {
    list.push(
      <li key={page.s}>
        <Link href={`/${page.s}`}>
          <span className={pretty ? getClasses(level) : ''}>{page.t}</span>
        </Link>
        {recurse ? <ReadMore root={page.s} recurse={recurse} level={level + 1} /> : null}
      </li>
    )
  }

  return <ul>{list}</ul>
}
