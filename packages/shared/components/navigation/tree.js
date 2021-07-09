import { useState } from 'react'
import set from 'lodash.set'
import sortBy from 'lodash.sortby'
import Link from 'next/link'
import Icon from 'shared/components/icon'

const getChildren = (path, pages, subnav={}) => {
  if (pages[path].offspring.length > 0) {
    for (const page of pages[path].offspring) {
      subnav[page.split('/').pop()] = pageToNav(page, pages)
    }
  }

  return (Object.keys(subnav).length > -1)
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

export const getSiteTree = pages => {

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

const getSiteBranch = (tree, href) => {
  const path = href.slice(1).split('/').join('/subnav/').split('/')
  let branch = tree
  for (const fork of path) branch = branch[fork]

  return branch.subnav
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

const plainClasses = "px-1 py-0.5"
const nonPlainClasses = `${plainClasses} hover:bg-base-200 block border-l-4 border-transparent hover:border-secondary w-full`
const activeClasses = "border-secondary"
const classes = (level, plain) => {
  const base = plain ? plainClasses : nonPlainClasses
  const classList = [
    null,
    `px-1 py-0.5 text-xl font-semibold w-full block`,
    `${base} text-lg font-medium pl-3`,
    `${base} text-base pl-6`,
    `${base} text-sm text-base pl-9`,
    `${base} text-sm text-base pl-12`,
    `${base} text-sm text-base pl-16`,
    `${base} text-sm text-base pl-20`,
    `${base} text-sm text-base pl-28`,
    `${base} text-sm text-base pl-28`,
    `${base} text-sm text-base pl-32`,
  ]

  return classList[level]
}

const toggleActive = props => {
  if (!props.active || props.active !== props.sub.href) props.setActive(props.sub.href)
  else props.setActive(null)
}

const Level1Row = props => (
  <li key={props.sub.href}>
    <div className="flex flex-row gap-2">
      <div className="flex-grow">
        <Link href={props.sub.href}>
          <a className={`${classes(props.level, props.plain)} ${(isActive(props.sub, props.href) || props.active === props.sub.href) ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}>
            {props.sub.title}
          </a>
        </Link>
      {(props.recurse || (props.active === props.sub.href) || props.expanded || onPath(props.sub, props.href, props.tree)) && (
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
      <a
        className={`
          ${classes(props.level, props.plain)}
          ${isActive(props.sub, props.href) ? activeClasses : ''}
        `}
        onClick={() => props.setMenu(false)}
      >
        {props.sub.title}
      </a>
    </Link>
    {(props.recurse || (props.level === 1 && props.active === sub.href) || props.expanded || onPath(props.sub, props.href, props.tree)) && (
      <SiteBranch {...props} leaf={props.sub} level={props.level+1}/>
    )}
  </li>
)

const activeBranch = (active, href) => ('/' + href.split('/')[1] === active)
  ? true
  : false

const SiteBranch = props => {
  if (!props.recurse) {
    const on = onPath(props.leaf, props.href, props.tree)
    if (!props.leaf.subnav) return null
    if (!on) {
      if (props.level > 2) return null
      if (!props.expanded && props.level !== props.expand) return null
    } else {
      if (props.active && props.level === 2 && props.active !== props.leaf.href) return null
    }
  }

  return (
    <ul>
      {sortBy(props.leaf.subnav, ['order', 'title']).map(sub => {
        if (props.level === 1) return <Level1Row {...props} sub={sub} />
        else if (props.level === 2 && (props.href || activeBranch(props.active, sub.href))) return <OtherRow {...props} sub={sub} />
        else if (props.href) return <OtherRow {...props} sub={sub} />
      })}
    </ul>
  )
}

const WithTitle = ({list, title}) => (
  <div className="border-2 border-primary rounded-lg border-opacity-25 my-4">
    <div className="bg-primary p-4 rounded-t-lg text-xl font-bold bg-opacity-25">
      {title ? title : 'Read more'}
    </div>
    <div className="px-4">
      <ul>{list}</ul>
    </div>
  </div>
)


const PageTree = props => {

  const [active, setActive] = useState(null)

  const { pages, href=false, expanded=false, recurse=false, plain=false} = props
  if (!pages) return null
  const fullTree = getSiteTree(pages)

  const tree = (props.offspring && props.href)
    ? getSiteBranch(fullTree, props.href)
    : fullTree

  const list = <SiteBranch
    leaf={{subnav: tree}}
    tree={fullTree}
    href={href}
    expanded={expanded}
    recurse={recurse}
    plain={plain}
    level={props.offspring ? 2 : 1}
    active={active}
    setActive={setActive}
    menu={props.menu}
    setMenu={props.setMenu}
  />


  if (props.noLogo || props.offspring) return props.list
    ? list
    : <WithTitle list={list} title={props.title} />
  else return (
    <>
      <div className="flex flex-row mb-4 justify-between pr-4">
        <Link href="/">
          <a href="/" onClick={() => props.setMenu(false)}>
          <h3 className="text-2xl font-bold hover:pointer">FreeSewing.dev</h3>
          </a>
        </Link>
        <Icon icon="freesewing" size={36} />
      </div>
      {list}
    </>
  )

}




export default PageTree
