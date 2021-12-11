import Icon from 'shared/components/icon/index.js'

const PrimaryMenu = props => {

  return (
    <nav className={`
      sm:max-w-sm
      md:max-w-md
      lg:max-w-lg
      xl:max-w-xl
      bg-base-200
    `}>
      <details>
        <summary className='flex row uppercase font-bold text-lg gap-4'>
          <Icon />
          Tutorials
        </summary>
          <div className='pl-4'>
        More stuff here
          </div>
      </details>
      <ul>
        <li>Tutorials</li>
        <li>Guides</li>
        <li>Howtos</li>
        <li>Reference</li>
      </ul>
    </nav>
  )
}

export default PrimaryMenu
