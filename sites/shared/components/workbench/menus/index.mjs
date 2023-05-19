import { DesignOptions } from './design-options/index.mjs'
import { CoreSettings, ns as coreSettingsNs } from './core-settings/index.mjs'
import { XrayMenu } from './xray/index.mjs'
import { TestDesignOptions } from './test-design-options/index.mjs'
import { BulletIcon } from 'shared/components/icons.mjs'

export const linkClasses = `
  text-base text-base-content sm:text-base-content
  hover:text-secondary
  sm:hover:text-secondary
`

export const ns = coreSettingsNs
export const Ul = (props) => <ul className="pl-5 list-inside">{props.children}</ul>
export const Li = (props) => (
  <li className="flex flex-row border-r-2 border-r-transparent hover:border-r-secondary">
    {props.children}
  </li>
)
export const Details = (props) => (
  <details className="grow" open={props.open || false}>
    {props.children}
  </details>
)
export const Deg = ({ changed }) => (
  <BulletIcon
    className={`w-2.5 h-2.5 inline-block p-0 mr-1  ${changed ? 'text-accent' : ''}`}
    stroke={6}
  />
)

export const NoSumDiv = (props) => (
  <div
    className={`
    grow px-2 ml-2 border-l-2
    ${linkClasses}
    hover:cursor-pointer
    hover:border-secondary
    sm:hover:border-secondary-focus
    text-base-content sm:text-base-content
  `}
  >
    {props.children}
  </div>
)
export const SumDiv = (props) => (
  <div
    className={`
    grow pl-2 border-l-2
    ${linkClasses}
    hover:cursor-pointer
    hover:border-secondary
    sm:hover:border-secondary-focus
    text-base-content sm:text-base-content
    py-2
  `}
  >
    {props.children}
  </div>
)
export const Summary = (props) => (
  <summary
    className={`
    flex flex-row
    px-2
    text-base-content
    sm:text-base-content
    hover:cursor-pointer
    items-start
  `}
  >
    {props.children}
  </summary>
)
export const TopSummary = (props) => (
  <summary
    className={`
    flex flex-row gap-4 text-lg
    hover:cursor-pointer
    p-2
    text-base-content
    sm:text-base-content
    items-center
  `}
  >
    <span className="text-secondary-focus mr-4">{props.icon || null}</span>
    {props.children}
  </summary>
)
export const SumButton = (props) => (
  <button
    className={`
    flex flex-row
    px-2
    w-full justify-between
    text-left
    text-base-content
    sm:text-base-content
    hover:cursor-pointer
    items-start
    mr-4
  `}
    onClick={props.onClick}
  >
    {props.children}
  </button>
)
export const TopSumTitle = (props) => (
  <span className={`grow ${linkClasses} hover:cursor-pointer font-bold uppercase`}>
    {props.children}
  </span>
)
export const SecText = (props) =>
  props.raw ? (
    <span className="text-secondary-focus" dangerouslySetInnerHTML={{ __html: props.raw }} />
  ) : (
    <span className="text-secondary-focus">{props.children}</span>
  )

export const AccentText = (props) =>
  props.raw ? (
    <span className="text-accent-focus" dangerouslySetInnerHTML={{ __html: props.raw }} />
  ) : (
    <span className="text-accent-focus">{props.children}</span>
  )

export const PrimaryText = (props) =>
  props.raw ? (
    <span className="text-primary-focus" dangerouslySetInnerHTML={{ __html: props.raw }} />
  ) : (
    <span className="text-primary-focus">{props.children}</span>
  )

export const DraftMenu = (props) => {
  const { design, patternConfig, settings, ui, update, Option = false } = props

  return (
    <nav className="grow mb-12">
      <DesignOptions {...{ design, update, settings, patternConfig }} />
      <CoreSettings {...{ design, update, settings, patternConfig }} />
      {ui.renderer === 'react' ? <XrayMenu {...props} /> : null}
    </nav>
  )
}

export const TestMenu = (props) => {
  return (
    <nav className="grow mb-12">
      <TestDesignOptions {...props} />
    </nav>
  )
}
