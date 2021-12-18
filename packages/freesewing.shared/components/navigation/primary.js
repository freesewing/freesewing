import get from 'lodash.get'
import Icon from 'shared/components/icon/index.js'
import nav from 'site/prebuild/navigation.js'
import Link from 'next/link'
import orderBy from 'lodash.orderby'
import Logo from '@freesewing/components/Logo'
import ThemePicker from 'shared/components/theme-picker.js'
import { getTagline } from 'site/utils.js'

// TODO: Clean this up after restructuring markdown content
const hide = ['contributors', 'developers', 'editors', 'translators']

// Don't show children for blog and showcase posts
const keepClosed = ['blog', 'showcase', ]

// TODO: For now we force tailwind to pickup these styles
// At some point this should 'just work' though, but let's not worry about it now
const force = [
  <p className="w-6 mr-2"/>,
  <p className="w-8 mr-3"/>
]

// Component for the collapse toggle
const Chevron = ({w=8, m=2}) => <svg
  className={`fill-current opacity-75 w-${w} h-${w} mr-${m} details-toggle`}
  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
  <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/>
</svg>

// Helper method to filter out the real children
const currentChildren = current => Object.values(current)
  .filter(entry => (typeof entry === 'object'))

// Component that renders a sublevel of navigation
const SubLevel = ({ nodes={} }) => (
  <ul className='list-inside'>
    {currentChildren(nodes).map(child => (Object.keys(child).length > 4)
      ? (
        <li key={child.__slug}>
          <details>
            <summary className={`
              flex flex-row gap-4 font-bold
              hover:cursor-row-resize
              hover:bg-base-200
              p-1
              px-2
              text-primary
            `}>
                <Link href={child.__slug}>
                  <a title={child.__title} className={`
                grow
                text-primary
                color-primary
                hover:cursor-pointer
                hover:underline
                hover:decoration-secondary
                hover:decoration-2
                  `}>
                    { child?.__linktitle || child.__title }
                  </a>
                </Link>
              <Chevron w={6} m={3}/>
            </summary>
            <SubLevel nodes={child} />
          </details>
        </li>
      ) : (
        <li className='text-primary pl-2 font-bold'>
          <div className={`
                p-1
                text-primary
                color-primary
                hover:cursor-pointer
                hover:underline
                hover:decoration-secondary
                hover:decoration-2
          `}>
          <Link href={child.__slug} title={child.__title}>
            {child.__linktitle}
          </Link>
          </div>
        </li>
      )

    )}
  </ul>
)

// Component that renders a toplevel of navigation
const TopLevel = ({ icon, title, nav, current, slug, showChildren=false }) => (
  <details className='p-2' open={((keepClosed.indexOf(current._slug) === -1) ? 1 : 0)}>
    <summary className={`
      flex flex-row uppercase gap-4 font-bold text-lg
      hover:cursor-row-resize
      hover:bg-base-200
      p-2
      text-primary
    `}>
      {icon}
      {/* Wrapping this in a div because tailwind doesn't pick up
      classes on the next js Link component */}
      <div className={`
        grow
        hover:cursor-pointer hover:text-underline
        hover:underline
        hover:decoration-secondary
        hover:decoration-4
      `}>
        <Link href={`/${current._slug}/`}>
          {title}
        </Link>
      </div>
    {showChildren && <Chevron />}
    </summary>
    {showChildren && <SubLevel nodes={current} />}
  </details>
)

// Component that renders the logo first entry
const TopLogo = ({ app }) => (
  <div className={`
    flex flex-row uppercase gap-4 font-bold text-lg
    items-center
    hover:cursor-row-resize
    hover:bg-base-200
    p-2
    text-primary
  `}>
    <Logo size={32} />
    <div className={`
      grow
      hover:cursor-pointer hover:text-underline
      hover:underline
      hover:decoration-secondary
      hover:decoration-4
    `}>
      <Link href='/'>
        <a>freesewing.{app.site}</a>
      </Link>
      <p className={`text-base text-captalize text-primary text-sm font-normal
        `}>{getTagline()}</p>
    </div>
  </div>
)

// Component that renders the theme picker first entry
const TopTheme = ({ app }) => (
  <>
  <div className={`
    flex flex-row uppercase gap-4 font-bold text-lg
    items-center
    hover:cursor-row-resize
    hover:bg-base-200
    p-2
    text-primary
  `}>
    <Icon icon='theme' />
    <div className={`
      grow
      hover:cursor-pointer hover:text-underline
      hover:underline
      hover:decoration-secondary
      hover:decoration-4
    `}>
      Theme
    </div>
  </div>
  <ThemePicker app={app} />
  </>
)

// TODO: Get rid of this when markdown has been restructured
const remove = ['contributors', 'developers', 'editors', 'translators']
const Navigation = ({ nav, app }) => {
  const output = []
  for (const key of Object.keys(nav[app.language]).sort()) {
    if (hide.indexOf(key) === -1) output.push(<TopLevel
      icon={<Icon icon={key}/>}
      title={key}
      slug={key}
      key={key}
      showChildren={keepClosed.indexOf(key) === -1}
      nav={nav[app.language]}
      current={orderBy(nav[app.language][key], ['order', 'title'], ['asc', 'asc'])}
    />)
  }

  return output
}

const PrimaryMenu = props => {

  return (
    <nav className={`
      sm:max-w-sm
      grow
    `}>
      <TopLogo app={props.app}/>
      <Navigation nav={nav} app={props.app}/>
      <TopTheme app={props.app}/>
    </nav>
  )
}

export default PrimaryMenu
