import { linkClasses } from 'shared/components/navigation/primary.mjs'
import { DesignOptions } from './design-options/index.mjs'
import { CoreSettings } from './core-settings/index.mjs'
import { XrayMenu } from './xray/index.mjs'
import { TestDesignOptions } from './test-design-options/index.mjs'

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
export const Deg = () => (
  <span className="text-3xl inline-block p-0 leading-3 px-2 translate-y-3">&deg;</span>
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
    items-center
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
    items-center
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

export const DraftMenu = (props) => {
  const { design, patternConfig, settings, ui, update, Option = false } = props

  return (
    <nav className="grow mb-12">
      <DesignOptions {...props} />
      <CoreSettings {...props} />
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
