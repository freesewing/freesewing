import get from 'lodash.get'
import orderBy from 'lodash.orderby'
import Link from 'next/link'
import { useContext } from 'react'
import { NavigationContext } from 'shared/context/navigation-context.mjs'

// Helper method to filter out the real children
const order = (obj) => orderBy(obj, ['o', 't'], ['asc', 'asc'])
const currentChildren = (current) =>
  Object.values(order(current)).filter((entry) => typeof entry === 'object')

export const ReadMore = ({ app, recurse = 0 }) => {
  const { nav, slug } = useContext(NavigationContext)

  // Deal with recurse not being a number
  if (recurse) {
    if (typeof recurse === 'number') recurse--
    else recurse = 1
  }

  const root = slug && slug !== 'docs' ? get(nav, slug.split('/').slice(1)) : nav

  const list = []
  for (const page of currentChildren(root)) {
    list.push(
      <li key={page.s}>
        <Link href={`/${page.s}`}>{page.t}</Link>
        {recurse > 0 ? <ReadMore app={app} slug={page.s} recurse={recurse} /> : null}
      </li>
    )
  }

  return <ul>{list}</ul>
}
