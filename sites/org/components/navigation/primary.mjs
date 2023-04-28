import { useState, useEffect } from 'react'
import Link from 'next/link'
import orderBy from 'lodash.orderby'
import { FreeSewingIcon } from 'shared/components/icons.mjs'
import { TopLevelNavigation as TopLevel } from './top-level.mjs'

/* helper method to order nav entries */
const order = (obj) => orderBy(obj, ['__order', '__title'], ['asc', 'asc'])

// Component for the collapse toggle
// Exported for re-use
export const Chevron = ({ w = 8, m = 2 }) => (
  <svg
    className={`
    fill-current opacity-75 w-${w} h-${w} mr-${m}
    details-toggle hover:text-secondary sm:hover:text-secondary
  `}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
  </svg>
)

// Helper method to filter out the real children
const currentChildren = (current) =>
  Object.values(order(current)).filter((entry) => typeof entry === 'object')

// Shared classes for links
// Exported for re-use
export const linkClasses = `
  py-1
  text-base-content sm:text-base-content
  hover:text-secondary
  sm:hover:text-secondary
`

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
const SubLevel = ({ nodes = {}, active }) => (
  <ul className="pl-5 list-inside">
    {currentChildren(nodes).map((child) =>
      Object.keys(child).length > 4 ? (
        <li key={child.__slug} className="flex flex-row">
          <details className="grow" open={isActive(child.__slug, active)}>
            <summary
              className={`
              flex flex-row
              px-2
              text-base-content
              sm:text-base-content
              hover:cursor-row-resize
              items-center
            `}
            >
              <Link
                href={`/${child.__slug}`}
                title={child.__title}
                className={`
                  grow pl-2 border-l-2
                  hover:cursor-pointer
                  hover:border-secondary
                  sm:hover:border-secondary
                  ${
                    child.__slug === active
                      ? 'text-secondary border-secondary sm:text-secondary sm:border-secondary'
                      : 'text-base-content sm:text-base-content'
                  }
                `}
              >
                <span className={linkClasses}>
                  <span
                    className={`
                      text-3xl mr-2 inline-block p-0 leading-3
                      ${
                        child.__slug === active
                          ? 'text-secondary sm:text-secondary translate-y-1'
                          : 'translate-y-3'
                      }
                    `}
                  >
                    {child.__slug === active ? <>&bull;</> : <>&deg;</>}
                  </span>
                  <span className={child.__slug === active ? 'font-medium' : ''}>
                    {child.__linktitle || child.__title}
                  </span>
                </span>
              </Link>
              <Chevron w={6} m={3} />
            </summary>
            <SubLevel nodes={child} active={active} />
          </details>
        </li>
      ) : (
        <li className="pl-2 flex flex-row items-center" key={child.__slug}>
          <Link
            href={`/${child.__slug}`}
            title={child.__title}
            className={`
              pl-2 border-l-2
              grow
              hover:cursor-pointer
              hover:border-secondary
              sm:hover:border-secondary
              ${
                child.__slug === active
                  ? 'text-secondary border-secondary sm:text-secondary sm:border-secondary'
                  : 'text-base-content sm:text-base-content'
              }`}
          >
            <span className={linkClasses}>
              <span
                className={`
                  text-3xl mr-2 inline-block p-0 leading-3
                  ${
                    child.__slug === active
                      ? 'text-secondary sm:text-secondary translate-y-1'
                      : 'translate-y-3'
                  }
                `}
              >
                {child.__slug === active ? <>&bull;</> : <>&deg;</>}
              </span>
              <span className={child.__slug === active ? 'font-medium' : ''}>
                {child.__linktitle || child.__title}
              </span>
            </span>
          </Link>
        </li>
      )
    )}
  </ul>
)

const LevelHomeButton = ({ setShowLevel, level }) => (
  <>
    <button
      className="h-8 mb-1 flex flex-row p-0 items-center -ml-7"
      title="FreeSewing.org"
      onClick={() => setShowLevel(level)}
    >
      <div
        className={`bg-neutral h-8 pl-2 pr-1 pt-1.5 font-medium text-secondary-content rounded-l-full`}
      >
        <FreeSewingIcon className="w-5 h-5 text-neutral-content" />
      </div>
      <div
        className={`border-neutral h-12`}
        style={{
          width: 0,
          height: 0,
          borderWidth: '1rem',
          borderRightColor: 'transparent',
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
        }}
      ></div>
    </button>
  </>
)

const colors = ['primary', 'secondary', 'accent']

const LevelButton = ({ title, level, showLevel, setShowLevel, href = false }) => {
  const props = {
    className: `h-8 mb-1 flex flex-row p-0 items-center -ml-7 max-w-1/3 ${
      showLevel < level ? 'opacity-50' : ''
    }`,
  }
  const content = (
    <>
      <div
        className={`border-${colors[level]}`}
        style={{
          width: 0,
          height: 0,
          borderWidth: '1rem',
          borderLeftColor: 'transparent',
        }}
      ></div>
      <div
        className={`
      bg-${colors[level]} h-8 pr-1 pt-0.5 -ml-2 font-medium
      text-secondary-content overflow-hidden`}
      >
        {title}
      </div>
      <div
        className={`border-${colors[level]} h-12`}
        style={{
          width: 0,
          height: 0,
          borderWidth: '1rem',
          borderRightColor: 'transparent',
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
        }}
      ></div>
    </>
  )

  return href ? (
    <Link {...props} href={href}>
      {content}
    </Link>
  ) : (
    <button {...props} onClick={() => setShowLevel(level)}>
      {content}
    </button>
  )
}

const Navigation = ({ app, active, className = '' }) => {
  // Levels
  const levels = active.split('/')

  useEffect(() => {
    setShowLevel(Math.max(levels.length, 2))
  }, [active])
  const [showLevel, setShowLevel] = useState(Math.max(levels.length, 2))
  if (!app.navigation) return null
  if (levels.length < 1) return null

  let navigation = app.navigation

  const shared = { showLevel, setShowLevel }
  const levelButtons = []
  if (levels[0]) {
    const title = app.navigation[levels[0].__title] || levels[0]
    navigation = app.navigation[levels[0]]
    levelButtons.push(<LevelHomeButton key="home" {...shared} level={-1} />)
    levelButtons.push(<LevelButton title={title} key={0} level={0} {...shared} />)
  }
  if (levels[1]) {
    const title = app.navigation[levels[0]][levels[1]]?.__title || levels[1]
    if (showLevel > 0) navigation = navigation[levels[1]]
    levelButtons.push(<LevelButton title={title} key={1} level={1} {...shared} />)
  }
  if (levels[2] && levels.length > 3) {
    if (showLevel > 1) navigation = navigation[levels[2]]
    levelButtons.push(
      <LevelButton
        title={app.navigation[levels[0]][levels[1]][levels[2]].__title}
        key={2}
        level={2}
        {...shared}
      />
    )
  }

  const output = [
    <div key="levelButtons" className="pl-8 flex flex-row flex-wrap mb-4">
      {levelButtons}
    </div>,
  ]
  if (showLevel < 0) output.push(<TopLevel />)
  else output.push(<SubLevel nodes={order(navigation)} active={active} />)

  return <div className={`pb-20 ${className}`}>{output}</div>
}

export const PrimaryNavigation = ({ app, active, before = [], after = [] }) => (
  <nav className="mb-12">
    {before}
    <Navigation app={app} active={active} />
    {after}
  </nav>
)
