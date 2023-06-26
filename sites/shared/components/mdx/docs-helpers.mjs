import get from 'lodash.get'
import { useNavigation } from 'site/hooks/use-navigation.mjs'
import Link from 'next/link'

const getPage = {
  dev: (slug, nav) => get(nav, slug.split('/')),
  org: (root, nav) => {
    // Fixme: make this work for org
    if (!root) return nav
    if (root.indexOf('/') === -1) return nav[root]
    return get(nav, root.split('/'))
  },
}

export const DocsTitle = ({ slug, className = '', site = 'org' }) => {
  const siteNav = useNavigation()
  const page = getPage[site](slug, siteNav)

  return page ? <span className={className}>{page.t}</span> : null
}

export const DocsLink = (props) => (
  <Link href={`${props.site === 'org' ? '/docs/' : ''}${props.slug}`}>
    <DocsTitle {...props} />
  </Link>
)
