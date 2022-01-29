import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'
import ClearIcon from 'shared/components/icons/clear.js'

const XrayList = props => {

  let title = props.app.t(`parts.${props.partName}`)
  if (title !== props.partName || true) title + ` (${props.partName})`

  return (
    <li className="flex flex-row">
      <details className="grow">
        <summary className={`
          flex flex-row
          px-2
          text-base-content
          sm:text-neutral-content
          hover:cursor-row-resize
          items-center
        `}>
          <div className={`
            grow pl-2 border-l-2
            ${linkClasses}
            hover:cursor-resize
            hover:border-secondary
            sm:hover:border-secondary-focus
            text-base-content sm:text-neutral-content
          `}>
            <span className={`
              text-3xl inline-block p-0 leading-3 px-2
              translate-y-3
            `}>
              <>&deg;</>
            </span>
            <span>{title}</span>
            <span className="ml-2 opacity-60">[{props.partName}]</span>
          </div>
          <button
            className="text-accent px-3 hover:text-secondary-focus"
            onClick={() => props.unsetGist(['xray', 'parts', props.partName])}
          >
            <ClearIcon />
          </button>
          <Chevron w={6} m={3}/>
        </summary>
        fixme: something
      </details>
    </li>
  )
}

export default XrayList
