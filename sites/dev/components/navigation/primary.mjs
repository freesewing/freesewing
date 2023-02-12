import Link from 'next/link'
import orderBy from 'lodash.orderby'
import { TutorialIcon, GuideIcon, HelpIcon, DocsIcon } from 'shared/components/icons.mjs'

// List of icons matched to top-level slug
const icons = {
  guides: (className = '') => <GuideIcon className={className} />,
  howtos: (className = '') => <HelpIcon className={className} />,
  reference: (className = '') => <DocsIcon className={className} />,
  tutorials: (className = '') => <TutorialIcon className={className} />,
}

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
export const linkClasses = `text-lg lg:text-xl
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
                href={`${child.__slug}`}
                title={child.__title}
                className={`
                grow pl-2 border-l-2
                ${linkClasses}
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
                <span className={`${linkClasses} grow hover:cursor-pointer`}>
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
                  <span className={child.__slug === active ? 'font-bold' : ''}>
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
            href={`${child.__slug}`}
            title={child.__title}
            className={`
            pl-2 border-l-2
            grow
            ${linkClasses}
            hover:cursor-pointer
            hover:border-secondary
            sm:hover:border-secondary
            ${
              child.__slug === active
                ? 'text-secondary border-secondary sm:text-secondary sm:border-secondary'
                : 'text-base-content sm:text-base-content'
            }`}
          >
            <span className={`${linkClasses} hover:cursor-pointer`}>
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
              <span className={child.__slug === active ? 'font-bold' : ''}>
                {child.__linktitle || child.__title}
              </span>
            </span>
          </Link>
        </li>
      )
    )}
  </ul>
)

export const Icons = ({
  app,
  ulClasses = '',
  linkClasses = `grow text-lg lg:text-xl py-1 text-base-content sm:text-base-content
  hover:text-secondary sm:hover:text-secondary hover:cursor-pointer
  flex flex-col items-center`,
  linkStyle = {},
}) => {
  if (!app.navigation) return null
  const output = []
  for (const page of order(app.navigation)) {
    output.push(
      <li key={page.__slug}>
        <Link
          href={`${page.__slug}`}
          className={linkClasses}
          title={page.__title}
          style={linkStyle}
        >
          {icons[page.__slug] ? icons[page.__slug]('w-14 h-14') : <HelpIcon />}
          <span className="font-bold">{page.__title}</span>
        </Link>
      </li>
    )
  }

  return <ul className={ulClasses}>{output}</ul>
}

export const MainSections = ({ app, active }) => {
  if (!app.navigation) return null
  const output = []
  for (const page of order(app.navigation)) {
    const act = isActive(page.__slug, active)
    const txt = (
      <>
        {icons[page.__slug] ? (
          icons[page.__slug](`w-8 h-8 ${act ? 'text-accent' : ''}`)
        ) : (
          <HelpIcon />
        )}
        <span className={`font-bold ${act ? 'text-accent' : ''}`}>{page.__title}</span>
      </>
    )

    const item = (
      <li key={page.__slug}>
        {act ? (
          <span
            className={`
                flex flex-row gap-4 items-center
                text-accent
                hover:text-base-content
                p-2 rounded
                bg-base-200
              `}
            title={page.__title}
          >
            {txt}
          </span>
        ) : (
          <Link
            href={`/${page.__slug}`}
            className={`
              flex flex-row gap-4 items-center
              hover:bg-secondary hover:bg-opacity-10 hover:cursor-pointer
              p-2 rounded
            `}
            title={page.__title}
          >
            {txt}
          </Link>
        )}
      </li>
    )
    output.push(item)
  }

  return <ul>{output}</ul>
}

export const ActiveSection = ({ app, active }) => (
  <div className="-ml-5 mt-4 pt-4 border-t-2">
    <SubLevel
      hasChildren={1}
      nav={app.navigation}
      active={active}
      nodes={order(app.navigation[active.split('/')[0]])}
    />
  </div>
)
