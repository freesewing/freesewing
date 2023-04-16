import get from 'lodash.get'
import orderBy from 'lodash.orderby'
import Link from 'next/link'

// Helper method to filter out the real children
const order = (obj) => orderBy(obj, ['o', 't'], ['asc', 'asc'])
const currentChildren = (current) =>
  Object.values(order(current)).filter((entry) => typeof entry === 'object')

export const ReadMore = ({ app, recurse = 0, slug = false }) => {
  // Don't bother if we don't have the navigation tree in app
  if (!app) return null

  // Deal with recurse not being a number
  if (recurse) {
    if (typeof recurse === 'number') recurse--
    else recurse = 1
  }

  const root =
    slug && slug !== 'docs' ? get(app.state.nav, slug.split('/').slice(1)) : app.state.nav
  console.log(root)

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
