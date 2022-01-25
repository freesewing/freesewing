import OptionsIcon from 'shared/components/icons/options.js'
import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'
import OptionGroup from './option-group'

const DesignOptions = props => {

  return (
    <details className='py-1' open>
      <summary className={`
        flex flex-row uppercase gap-4 font-bold text-lg
        hover:cursor-row-resize
        p-2
        text-base-content
        sm:text-neutral-content
        items-center
      `}>
        <span className="text-secondary-focus mr-4"><OptionsIcon /></span>
        <span className={`grow ${linkClasses}`}>
          {props.app.t('app.designOptions')}
        </span>
        <Chevron />
      </summary>
      <ul className="pl-5 list-inside">
        {Object.keys(props.pattern.config.optionGroups).map(group => (
          <OptionGroup {...props} group={group} key={group} />
        ))}
      </ul>
    </details>
  )
}

export default DesignOptions
