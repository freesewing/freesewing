import Icon from 'shared/components/icon/index.js'
import nav from 'site/prebuild/navigation.js'

const TopLevel = ({ icon, title }) => (
  <details className='p-3'>
    <summary className='flex flex-row uppercase font-bold text-lg gap-6'>
      {icon}
      {title}
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

const PrimaryMenu = props => {

  return (
    <nav className={`
      sm:max-w-sm
      bg-base-200
      grow
    `}>
      <TopLevel icon={<Icon icon='tutorial' size={28}/>} title='tutorials' />
      <TopLevel icon={<Icon icon='guide' size={28}/>} title='guides' />
      <TopLevel icon={<Icon icon='help' size={28}/>} title='howtos' />
      <TopLevel icon={<Icon icon='docs' size={28}/>} title='reference' />
      <pre>{Object.keys(nav[props.app.language])}</pre>
    </nav>
  )
}

export default PrimaryMenu
