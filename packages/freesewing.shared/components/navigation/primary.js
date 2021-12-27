import get from 'lodash.get'
import Link from 'next/link'
import orderBy from 'lodash.orderby'
import Logo from 'shared/components/logos/freesewing.js'
import ThemePicker from 'shared/components/theme-picker.js'
import { getTagline } from 'site/utils.js'
import RssIcon from 'shared/components/icons/rss.js'
import ThemeIcon from 'shared/components/icons/theme.js'
import TutorialIcon from 'shared/components/icons/tutorial.js'
import GuideIcon from 'shared/components/icons/guide.js'
import HelpIcon from 'shared/components/icons/help.js'
import DocsIcon from 'shared/components/icons/docs.js'

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

// List of icons matched to top-level slug
const icons = {
  blog: <RssIcon />,
  tutorials: <TutorialIcon />,
  guides: <GuideIcon />,
  howtos: <HelpIcon />,
  reference: <DocsIcon />
}

/* helper method to order nav entries */
const order = obj => orderBy(obj, ['__order', '__title'], ['asc', 'asc'])


// Component for the collapse toggle
const Chevron = ({w=8, m=2}) => <svg
  className={`fill-current opacity-75 w-${w} h-${w} mr-${m} details-toggle hover:text-secondary`}
  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
  <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/>
</svg>

// Helper method to filter out the real children
const currentChildren = current => Object.values(order(current))
  .filter(entry => (typeof entry === 'object'))

const howActive = (slug) => {
}

// Shared classes for links
const linkClasses = "text-lg text-base-content lg:text-xl py-1 hover:cursor-pointer hover:text-secondary bg-opacity-50"

// Figure out whether a page is on the path to the active page
const isActive = (slug, active) => {
  if (slug === active) return true
  let result = true
  const slugParts = slug.split('/')
  const activeParts = active.split('/')
  for (const i in slugParts) {
    if (slugParts[i] !== activeParts[i]) result = false
  }

  return result
}

// Component that renders a sublevel of navigation
const SubLevel = ({ nodes={}, active }) => (
  <ul className="pl-5 list-inside">
    {currentChildren(nodes).map(child => (Object.keys(child).length > 4)
      ? (
        <li key={child.__slug} className="flex flex-row">
          <details className="grow" open={isActive(child.__slug, active)}>
            <summary className={`
              flex flex-row
              px-2
              text-base-content
              hover:cursor-row-resize
              items-center
            `}>
              <Link href={child.__slug}>
                <a title={child.__title} className={`
                  grow pl-2 border-l-2
                  hover:border-secondary
                  ${linkClasses}
                  ${child.__slug === active ? 'text-secondary border-secondary' : 'text-base-content'}
                `}>
                  <span className={`
                    text-3xl mr-2 inline-block p-0 leading-3
                    ${child.__slug === active ? 'text-secondary translate-y-1' : 'translate-y-3' }
                  `}>
                    {child.__slug === active ? <>&bull;</> : <>&deg;</>}
                  </span>
                  <span className={child.__slug === active ? 'font-bold' : ''}>
                    { child?.__linktitle || child.__title }
                  </span>
                </a>
              </Link>
              <Chevron w={6} m={3}/>
            </summary>
            <SubLevel nodes={child} active={active} />
          </details>
        </li>
      ) : (
        <li className='pl-2 flex flex-row items-center'>
          <Link href={child.__slug} title={child.__title}>
            <a className={`
              pl-2 border-l-2
              grow hover:border-secondary
              ${linkClasses}
              ${child.__slug === active ? 'text-secondary border-secondary' : 'text-base-content'}
            `}>
              <span className={`
                text-3xl mr-2 inline-block p-0 leading-3
                ${child.__slug === active ? 'text-secondary translate-y-1' : 'translate-y-3' }
              `}>
               {child.__slug === active ? <>&bull;</> : <>&deg;</>}
              </span>
              <span className={child.__slug === active ? 'font-bold' : ''}>
                {child.__linktitle}
              </span>
            </a>
          </Link>
        </li>
      )

    )}
  </ul>
)

// Component that renders a toplevel of navigation
const TopLevel = ({ icon, title, nav, current, slug, hasChildren=false, active }) => (
  <details className='py-1' open={((keepClosed.indexOf(current.__slug) === -1) ? 1 : 0)}>
    <summary className={`
      flex flex-row uppercase gap-4 font-bold text-lg
      hover:cursor-row-resize
      p-2
      text-base-content
      items-center
    `}>
      <span className="text-secondary">{icon}</span>
      <Link href={`/${slug}`}>
        <a className={`grow ${linkClasses} ${slug === active ? 'text-secondary' : ''}`}>
          {title}
        </a>
      </Link>
    {hasChildren && <Chevron />}
    </summary>
    {hasChildren && <SubLevel nodes={current} active={active} />}
  </details>
)

// Component that renders the logo first entry
const TopLogo = ({ app }) => (
  <div className={`
    flex flex-row uppercase gap-4 font-bold text-lg
    items-center
    p-2
    text-base-content
  `}>
    <Link href='/'>
      <a className="hover:pointer">
        <span className="text-secondary">
          <Logo size={32} fill='currentColor' stroke={false}/>
        </span>
      </a>
    </Link>
    <div>
    <Link href='/'>
      <a className={`grow ${linkClasses}`}>
        freesewing.{app.site}
      </a>
    </Link>
    <p className={`text-base-content text-captalize text-sm font-normal
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
    p-2
    text-base-content
  `}>
    <span className="text-secondary">
      <ThemeIcon  />
    </span>
    <div className={`grow`}>
      Theme
    </div>
  </div>
  <div className="p-2">
    <ThemePicker app={app} className="pr-8"/>
  </div>
  </>
)

// TODO: Get rid of this when markdown has been restructured
const remove = ['contributors', 'developers', 'editors', 'translators']
const Navigation = ({ app, active }) => {
  if (!app.navigation) return null
  const output = []
  for (const key of Object.keys(app.navigation).sort()) {
    if (hide.indexOf(key) === -1) output.push(<TopLevel
      icon={icons[key] || <span className="text-3xl mr-2 translate-y-3 inline-block p-0 leading-3">&deg;</span>}
      title={key}
      slug={key}
      key={key}
      hasChildren={keepClosed.indexOf(key) === -1}
      nav={app.navigation}
      current={order(app.navigation[key])}
      active={active}
    />)
  }

  return output
}

const PrimaryMenu = ({ app, active }) => {

  return (
    <nav className={`
      sm:max-w-sm
      grow
      mb-12
    `}>
      <TopLogo app={app}/>
      <Navigation app={app} active={active} />
      <TopTheme app={app}/>
    </nav>
  )
}

export default PrimaryMenu
