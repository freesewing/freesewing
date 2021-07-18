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

const isActive = (current, path) => (current.slice(0,path.length) === path) ? true : false
const isExpanded = props => {
  if (props.recurse || props.expanded) return true
  const steps = props.branch._path.slice(1).split('/')
  let i = 0
  for (const step of steps) {
    if (step !== props.active[i]) return false
    i++
  }
  return true
}

const Row = props => {
  if (!hasChildren(props.branch)) return null
  const active = isActive(props.current, props.branch._path)
  const expanded = isExpanded(props)
  const currentPage = (props.current === props.branch._path)
  let linkClasses = classes(props.level, props.plain)
  let iconClasses = 'transform transition'
  linkClasses += ' '
  linkClasses += active
    ? 'opacity-100 text-secondary'
    : 'opacity-70 hover:opacity-100'
  if (currentPage) {
    linkClasses += ' border-secondary'
    iconClasses += ' text-primary'
  }
  if (!expanded) iconClasses += ' -rotate-90'

  return (
  <li key={props.branch._path}>
    <div className='flex flex-row'>
      <div
        onClick={() => toggleActive(props)}
        className={`cursor-pointer w-6`}
      >
        {props.level < 5 && Object.keys(props.branch).length > 3 && (
          <button className="mt-1" onClick={() => toggleActive(props)}>
            <Icon
              icon='down'
              size={(24 - props.level*2)}
              className={iconClasses}
            />
          </button>
        )}
      </div>
      <div className="flex-grow">
        <Link href={props.branch._path || '/'}>
          <a className={linkClasses}>
            {props.branch._title}
          </a>
        </Link>
        {
          expanded &&
          Object.keys(props.branch) &&
          <Branch {...props} branch={props.branch} level={props.level+1} withBorder={props.level+1}/>
        }
      </div>
    </div>
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

const MainNavigation = props => {
  const [active, setActive] = useState([])
  const { tree=false, path=false, expanded=false, recurse=false, plain=false, setMenu=noop} = props
  if (!tree) return null

  const list = <Branch
    branch={tree}
    tree={tree}
    current={path}
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
