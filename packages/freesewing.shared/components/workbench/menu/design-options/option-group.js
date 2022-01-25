import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'
import Option from './option'
import OptionSubGroup from './option-sub-group'

const OptionGroup = props => {
  const config = props.config || props.pattern.config.optionGroups[props.group]
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
            hover:border-secondary
            sm:hover:border-secondary-focus
            text-base-content sm:text-neutral-content
            font-bold
          `}>
            <span className={`
              text-3xl mr-2 inline-block p-0 leading-3
              translate-y-3
            `}>
              <>&deg;</>
            </span>
            <span>
              { props.app.t(`optiongroups.${props.group}`) }
            </span>
          </div>
          <Chevron w={6} m={3}/>
        </summary>
        <ul className="pl-5 list-inside">
          {config.map(option => typeof option === 'string'
            ? <Option {...props} option={option} key={option} />
            : <OptionSubGroup {...props} sub={option} config={config} />
          )}
        </ul>
      </details>
    </li>
  )
}

export default OptionGroup
