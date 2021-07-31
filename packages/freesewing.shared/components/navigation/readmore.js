import { useState } from 'react'
import set from 'lodash.set'
import sortBy from 'lodash.sortby'
import Link from 'next/link'
import Icon from '@/shared/components/icon'
import SidebarWrap from '@/site/components/wrap-sidebar'

const plainClasses = "px-1 py-0.5"
const nonPlainClasses = `${plainClasses} hover:bg-base-200 block border-r-4 border-transparent hover:border-secondary w-full`
const activeClasses = "border-secondary"
const classes = (level, plain) => {
  const base = plain ? plainClasses : nonPlainClasses
  const classList = [
    null,
    `px-1 py-0.5 text-xl font-semibold w-full block`,
    `${base} text-lg font-medium`,
    `${base} text-base`,
    `${base} text-sm text-base`,
    `${base} text-sm text-base`,
    `${base} text-sm text-base`,
    `${base} text-sm text-base`,
    `${base} text-sm text-base`,
    `${base} text-sm text-base`,
    `${base} text-sm text-base`,
  ]

  return classList[level]
}

const toggleActive = (props) => {
  const steps = props.branch._path.slice(1).split('/').slice(0, props.level)
  if (isExpanded(props)) props.setActive(steps.slice(0, -1))
  else props.setActive(steps)
}

const forceCollapse = (props) => {
  props.setActive(props.path.split('/'))
}

const hasTitle = branch => (branch._title) ? true : false

const hasChildren = branch => {
  for (const key in branch) {
    if (key[0] !== '_') return true
  }

  return false
}

const isActive = (current, path) => (current.slice(0,path.length) === path) ? true : false
const isExpanded = props => {
  if (props.recurse || props.expanded) return true
  if (props.current.slice(0, props.branch._path.length) === props.branch._path) {
    if (props.active.length === 0) return true
  }
  const steps = props.branch._path.slice(1).split('/')
  let i = 0
  for (const step of steps) {
    if (step !== props.active[i]) return false
    i++
  }
  return true
}

const Row = props => {
  if (!hasTitle(props.branch)) return null
  let linkClasses = classes(props.level, props.plain)
  let iconClasses = 'transform transition'

  return (
  <li key={props.branch._path}>
    <Link href={props.branch._path || '/'}>
      <a className={linkClasses}>
        {props.branch._title}
      </a>
    </Link>
    { props.recurse && <Branch {...props} branch={props.branch} /> }
  </li>
)
}

const activeBranch = (active, href) => ('/' + href.split('/')[1] === active)
  ? true
  : false

const Branch = props => (
  <ul
    className={`border-l-2 border-${(props.level > 2 && props.withBorder === props.level) ? 'base-200' : 'transparent'}`}
  >
    {sortBy(props.branch, ['_order', '_title']).map(branch => <Row {...props} branch={branch} />)}
  </ul>
)

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

const noop = () => null

const ReadMore = props => {
  const { tree=false, path=false, recurse=false, title=false } = props
  if (!tree) return null

  const list = <Branch
    branch={tree}
    tree={tree}
    current={path}
    path={path}
    recurse={recurse}
    level={props.offspring ? 2 : 1}
  />

  return props.title
    ? <WithTitle list={list} title={props.title} />
    : list
}

export default ReadMore
