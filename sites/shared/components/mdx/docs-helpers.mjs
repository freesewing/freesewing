import { useContext } from 'react'
import { NavigationContext } from 'shared/context/navigation-context.mjs'
import get from 'lodash.get'
import { Link, linkClasses } from 'shared/components/link.mjs'

const getPage = {
  dev: (slug, nav) => get(nav, slug.split('/')),
  org: (root, nav) => {
    // Fixme: make this work for org
    if (!root) return nav
    if (root.indexOf('/') === -1) return nav[root]
    return get(nav, root.split('/'))
  },
}

const defaultFormatter = (title) => title

export const DocsTitle = ({ slug, className = '', site = 'org', format = defaultFormatter }) => {
  const { siteNav } = useContext(NavigationContext)
  const page = getPage[site](slug, siteNav)

  return page ? <span className={className}>{format(page.t)}</span> : null
}

export const DocsLink = (props) => (
  <Link href={`/${props.slug}`} className={linkClasses}>
    <DocsTitle {...props} />
  </Link>
)
