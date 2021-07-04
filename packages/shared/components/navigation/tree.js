import set from 'lodash.set'
import sortBy from 'lodash.sortby'
import Link from 'next/link'

const getChildren = (path, pages, subnav={}) => {
  if (pages[path].offspring.length > 0) {
    for (const page of pages[path].offspring) {
      subnav[page.split('/').pop()] = pageToNav(page, pages)
    }
  }

  return (Object.keys(subnav).length > 0)
    ? subnav
    : false
}

const pageToNav = (page, pages) => ({
  href: '/' + pages[page].path,
  title: pages[page].frontmatter.title || page,
  subnav: getChildren(page, pages),
  order:pages[page].order
})

const anchorLeaf = (leaf, path, tree) => {
  path = path.split('/').join('.subnav.')
  set(tree, path, leaf)

  return tree
}

const getSiteTree = pages => {

  // Get children per page
  const leaves = {}
  for (const [path, page] of Object.entries(pages)) {
    leaves[path] = pageToNav(path, pages)
  }

  // Build tree
  const tree = {}
  for (const [path, leaf] of Object.entries(leaves)) anchorLeaf(leaf, path, tree)

  // Keep ui out of the tree
  delete tree.ui

  return tree
}

const onPath = (leaf, href=false, tree) => {
  if (!href || !leaf.href) return true
  if (href === leaf.href) return true
  const here = leaf.href.split('/')
  const target = href.split('/')

  for (const step in here) {
    if (here[step] !== target[step]) return false
  }

  return true
}

const isActive = (leaf, href=false) => {
  if (href === leaf.href) return true
  return false
}

const sharedClasses = "hover:bg-base-200 px-1 py-0.5 block border-l-4 border-transparent hover:border-info"
const smallestClasses = `${sharedClasses} text-sm`
const activeClasses = "border-accent bg-base-300"
const classes = [
  null,
  `${sharedClasses} text-xl font-semibold`,
  `${sharedClasses} text-lg font-medium pl-3`,
  `${sharedClasses} text-base pl-6`,
  `${smallestClasses} text-base pl-9`,
  `${smallestClasses} text-base pl-12`,
  `${smallestClasses} text-base pl-15`,
  `${smallestClasses} text-base pl-18`,
  `${smallestClasses} text-base pl-21`,
]

const SiteBranch = props => (
  props.leaf.subnav &&
  (
    props.expanded ||
    (
      onPath(props.leaf, props.href, props.tree)
    )
  )
)
  ? (
    <ul className="">
      {sortBy(props.leaf.subnav, ['order', 'title']).map(sub => (
        <li key={sub.href}>
          <Link href={sub.href}>
            <a className={`${classes[props.level]} ${isActive(sub, props.href) ? activeClasses : ''}`}>
              {sub.title}
            </a>
          </Link>
          {(props.expanded || onPath(sub, props.href, props.tree)) && (
            <SiteBranch {...props} leaf={sub} level={props.level+1}/>
          )}
        </li>
      ))}
    </ul>
  )
  : null

const SiteTree = props => {
  const { pages, href, expanded=false} = props
  if (!pages) return null
  const tree = getSiteTree(pages)

  return <SiteBranch leaf={{subnav: tree}} tree={tree} href={href} expanded={expanded} level={1}/>
}




export default SiteTree
