import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'

const Option = props => {
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
          `}>
            <span className={`
              text-3xl mr-2 inline-block p-0 leading-3
              translate-y-3
            `}>
              <>&deg;</>
            </span>
            <span>
              { props.app.t(`options.${props.pattern.config.name}.${props.option}.title`) }
            </span>
          </div>
          <Chevron w={6} m={3}/>
        </summary>
        fixme
      </details>
    </li>
  )
}

    //props.pattern.config.optionsgroups[props.group].map(option => (
export default Option
