import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'
import ModesMenu from './modes.js'
import DesignOptions from './design-options'
import CoreSettings from './core-settings'
import Xray from './xray'

export const Ul = props => <ul className="pl-5 list-inside">{props.children}</ul>
export const Li = props => <li className="flex flex-row">{props.children}</li>
export const Details = props => (
  <details className="grow" open={props.open || false}>
    {props.children}
  </details>
)
export const Deg = props => <span className="text-3xl inline-block p-0 leading-3 px-2 translate-y-3">&deg;</span>
export const SumDiv = props => (
  <div className={`
    grow pl-2 border-l-2
    ${linkClasses}
    hover:cursor-resize
    hover:border-secondary
    sm:hover:border-secondary-focus
    text-base-content sm:text-neutral-content
  `}>{props.children}</div>
)
export const Summary = props => (
  <summary className={`
    flex flex-row
    px-2
    text-base-content
    sm:text-neutral-content
    hover:cursor-row-resize
    items-center
  `}>{props.children}</summary>
)
export const TopSummary = props => (
  <summary className={`
    flex flex-row gap-4 text-lg
    hover:cursor-row-resize
    p-2
    text-base-content
    sm:text-neutral-content
    items-center
  `}>
    <span className="text-secondary-focus mr-4">{props.icon || null}</span>
    {props.children}
  </summary>
)
export const SumButton = props => (
  <button className={`
    flex flex-row
    px-2
    w-full justify-between
    text-left
    text-base-content
    sm:text-neutral-content
    hover:cursor-pointer
    items-center
    mr-4
  `} onClick={props.onClick}>{props.children}</button>
)
export const TopSumTitle = props => (
  <span className={`grow ${linkClasses} hover:cursor-resize font-bold uppercase`}>
    {props.children}
  </span>
)
export const SecText = props => props.raw
  ? <span className="text-secondary" dangerouslySetInnerHTML={{__html: props.raw}} />
  : <span className="text-secondary">{props.children}</span>

const WorkbenchMenu = props => {
  return (
    <nav className="smmax-w-96 grow mb-12">
      <ModesMenu {...props} />
      {props.mode === 'draft' && (
        <>
          <DesignOptions {...props} />
          <CoreSettings {...props} />
          {props.gist.renderer === 'react' && <Xray {...props} />}
        </>
      )}
    </nav>
  )
}

export default WorkbenchMenu
