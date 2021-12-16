import get from 'lodash.get'
import Icon from 'shared/components/icon/index.js'
import nav from 'site/prebuild/navigation.js'
import Link from 'next/link'
import orderBy from 'lodash.orderby'

const keepClosed = ['blog', 'showcase', ]

const linkClasses = {className: 'hover:text-underline color-primary'}


const TopLevel = ({ icon, title, nav, current }) => (
  <details className='p-2' open={((keepClosed.indexOf(current._slug) === -1) ? 1 : 0)}>
    <summary className={`
      flex flex-row uppercase gap-4 font-bold text-lg
      hover:cursor-row-resize
      hover:bg-base-200
      p-2
      text-primary
    `}>
      {icon}
      <Link
        href={`/${current._slug}/`}
        className='hover:cursor-pointer'
      >
        {title}
      </Link>
    </summary>
    <div className='pl-4'>
      <ul>
        {orderBy(Object.values(current._children), ['order', 'title'], ['asc', 'asc']).map(item => {
          console.log(item)
          const target = item._slug ? get(nav, item._slug.split('/')) : '/'
          return (
            <li key={item._slug}>
              { item?._linktitle || item._title }
            </li>
          )
        })}
      </ul>
    </div>
  </details>
)

// TODO: Get rid of this when markdown has been restructured
const remove = ['contributors', 'developers', 'editors', 'translators']
const Navigation = ({ nav, app }) => {
  const output = []
  for (const key of Object.keys(nav[app.language]).sort()) {
    if (
      key.slice(0,1) !== '_' &&
      remove.indexOf(key) === -1
    ) output.push(<TopLevel
        icon={<Icon icon={key}/>}
        title={key}
        key={key}
        nav={nav[app.language]}
        current={nav[app.language][key]}
      />
    )
  }

  return output
}

const PrimaryMenu = props => {

  return (
    <nav className={`
      sm:max-w-sm
      grow
    `}>
      <Navigation nav={nav} app={props.app}/>
    </nav>
  )
}

export default PrimaryMenu
