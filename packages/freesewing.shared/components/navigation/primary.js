import Icon from 'shared/components/icon/index.js'
import nav from 'site/prebuild/navigation.js'
import Link from 'next/link'

const keepClosed = ['blog', 'showcase', ]

const TopLevel = ({ icon, title, nav, current }) => (
  <details className='p-2' open={((keepClosed.indexOf(current._slug) === -1) ? 1 : 0)}>
    <summary className={`
      flex flex-row uppercase gap-4 font-bold text-lg
      hover:cursor-row-resize
      hover:bg-base-200
      p-2
    `}>
      <Link href={`/${current._slug}/`} className='hover:cursor-pointer'>{icon}</Link>
      <Link href={`/${current._slug}/`} className='hover:cursor-pointer'>{title}</Link>
    </summary>
    <div className='pl-4'>
      <ul>
        <li>Getting started on Linux</li>
        <li>Getting started on Mac</li>
        <li>Getting started on Windows</li>
        <li>Pattern design tutorial</li>
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
        nav={nav}
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
