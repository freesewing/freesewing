import { useState } from 'react'
import set from 'lodash.set'
import sortBy from 'lodash.sortby'
import Link from 'next/link'
import Icon from '@/shared/components/icon'
import SidebarWrap from '@/site/components/wrap-sidebar'

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
  if (!props.active || props.active !== props.branch._path) props.setActive(props.branch._path)
  else props.setActive(null)
}

const isActive = (leaf, path=false) => {
  if (path === leaf.path) return true
  return false
}

const onPath = (path, branch) => {
  return true
}

const subBranch = (branch, key) => branch[key]
const hasChildren = branch => {
  for (const key in branch) {
    if (key[0] === '_') return true
  }

  return false
}

const Row = props => {
  if (!hasChildren(props.branch)) return null
  let linkClasses = classes(props.level, props.plain)
  linkClasses += ' '
  linkClasses += (
    isActive(props.branch, props._path) ||
    props.active === props.branch._path
  )
    ? 'opacity-100'
    : 'opacity-70 hover:opacity-100'
  const expanded = (
    props.recurse ||
    (props.active === props.branch._path) ||
    props.expanded ||
    onPath(props.branch, props.path, props.tree)
  )

  return (
  <li key={props.branch._path}>
    <div className="flex flex-row gap-2">
      <div className="flex-grow">
        <Link href={props.branch._path || '/'}>
          <a className={linkClasses}>
            {props.branch._title}
          </a>
        </Link>
        {expanded && Object.keys(props.branch) && <Branch {...props} branch={props.branch} level={props.level+1}/>}
      </div>
      <div onClick={() => toggleActive(props)} className="cursor-pointer px-4 hover:animate-pulse">
        {props.level === 1 && (
          <button className="block" onClick={() => toggleActive(props)}>
            <Icon
              icon='down'
              size={20}
              className={(props.active === props.branch._path)
                ? 'rotate-180 transition-transform'
                : 'transition-transform'
              }/>
          </button>
        )}
      </div>
    </div>
  </li>
)
}

const activeBranch = (active, href) => ('/' + href.split('/')[1] === active)
  ? true
  : false

const Branch = props => (
  <ul>
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

const MainNavigation = props => {
  const [active, setActive] = useState(null)
  const { tree=false, path=false, expanded=false, recurse=false, plain=false, setMenu=noop} = props
  if (!tree) return null

  const list = <Branch
    branch={tree}
    tree={tree}
    path={path}
    expanded={expanded}
    recurse={recurse}
    plain={plain}
    level={props.offspring ? 2 : 1}
    active={active}
    setActive={setActive}
    menu={props.menu}
    setMenu={setMenu}
  />

  if (props.noLogo || props.offspring) return props.list
    ? list
    : <WithTitle list={list} title={props.title} />
  else return <SidebarWrap>{list}</SidebarWrap>

}

export default MainNavigation
