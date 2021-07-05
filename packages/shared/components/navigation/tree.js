import { useState } from 'react'
import set from 'lodash.set'
import sortBy from 'lodash.sortby'
import Link from 'next/link'
import Icon from '../icon'

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

const sharedClasses = "hover:bg-base-200 px-1 py-0.5 block border-l-4 border-transparent hover:border-info w-full"
const smallestClasses = `${sharedClasses} text-sm`
const activeClasses = "border-info"
const classes = [
  null,
  `px-1 py-0.5 text-xl font-semibold w-full block`,
  `${sharedClasses} text-lg font-medium pl-3`,
  `${sharedClasses} text-base pl-6`,
  `${smallestClasses} text-base pl-9`,
  `${smallestClasses} text-base pl-12`,
  `${smallestClasses} text-base pl-15`,
  `${smallestClasses} text-base pl-18`,
  `${smallestClasses} text-base pl-21`,
]

const toggleActive = props => {
  if (!props.active || props.active !== props.sub.href) props.setActive(props.sub.href)
  else props.setActive(null)
}

const Level1Row = props => (
  <li key={props.sub.href}>
    <div className="flex flex-row gap-2">
      <div className="flex-grow">
        <Link href={props.sub.href}>
          <a className={`${classes[props.level]} ${(isActive(props.sub, props.href) || props.active === props.sub.href) ? 'opacity-100' : 'opacity-70'}`}>
            {props.sub.title}
          </a>
        </Link>
      {((props.active === props.sub.href) || props.expanded || onPath(props.sub, props.href, props.tree)) && (
        <SiteBranch {...props} leaf={props.sub} level={2} expand={2}/>
      )}
      </div>
      <div onClick={() => toggleActive(props)} className="cursor-pointer px-4 hover:animate-pulse">
        {props.level === 1 && (
          <button className="block" onClick={() => toggleActive(props)}>
            <Icon icon='down' size={20} className={(props.active === props.sub.href) ? 'rotate-180 transition-transform' : 'transition-transform'}/>
          </button>
        )}
      </div>
    </div>
  </li>
)

const OtherRow = props => (
  <li key={props.sub.href}>
    <Link href={props.sub.href}>
      <a className={`${classes[props.level]} ${isActive(props.sub, props.href) ? activeClasses : ''}`}>
        {props.sub.title}
      </a>
    </Link>
    {((props.level === 1 && props.active === sub.href) || props.expanded || onPath(props.sub, props.href, props.tree)) && (
      <SiteBranch {...props} leaf={props.sub} level={props.level+1}/>
    )}
  </li>
)

const SiteBranch = props => {
  const on = onPath(props.leaf, props.href, props.tree)

  if (!props.leaf.subnav) return null
  if (!on) {
    if (props.level > 2) return null
    if (!props.expanded && props.level !== props.expand) return null
  } else {
    if (props.active && props.level === 2 && props.active !== props.leaf.href) return null
  }

  return  (
    <ul className="">
      {sortBy(props.leaf.subnav, ['order', 'title']).map(sub => props.level === 1
        ? <Level1Row {...props} sub={sub} />
        : <OtherRow {...props} sub={sub} />
      )}
    </ul>
  )
}

const SiteTree = props => {

  const [active, setActive] = useState(null)

  const { pages, href, expanded=false} = props
  if (!pages) return null
  const tree = getSiteTree(pages)

  return <SiteBranch leaf={{subnav: tree}} tree={tree} href={href} expanded={expanded} level={1} active={active} setActive={setActive}/>
}




export default SiteTree
