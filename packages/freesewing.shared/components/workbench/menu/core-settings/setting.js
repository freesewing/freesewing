import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'
import PctDegOption from 'shared/components/workbench/inputs/design-option-pct-deg'
import CountOption from 'shared/components/workbench/inputs/design-option-count'
import ListSetting from './core-setting-list'
import MmSetting from './core-setting-mm'
import { formatMm, formatPercentage, optionType } from 'shared/utils.js'

const settings = {
  locale: props => {
    return (
      <span className="text-secondary">
        {props.app.t(`i18n.${props.gist.locale}`)}
      </span>
    )
  },
  units: props => {
    return (
      <span className="text-secondary">
        {props.app.t(`app.${props.gist.units}Units`)}
      </span>
    )
  },
  margin: props => {
    return (
      <span className="text-secondary" dangerouslySetInnerHTML={{
        __html: formatMm(props.gist.margin, props.gist.units)
      }} />
    )
  },
}

const Tmp = props => <p>not yet</p>

const inputs = {
  locale: props => <ListSetting
    {...props}
    list={props.config.list.map(key => ({
      key,
      title: props.app.t(`i18n.${key}`)
    }))}
  />,
  units: props => <ListSetting
    {...props}
    list={props.config.list.map(key => ({
      key,
      title: props.app.t(`app.${key}Units`)
    }))}
  />,
  margin: props => <MmSetting {...props} {...props.config} />,
}

const Setting = props => {
  const Input = inputs[props.setting]
  const Value = settings[props.setting]

  const toggleBoolean = () => {
    const dflt = props.pattern.config.options[props.option].bool
    const current = props.gist?.options?.[props.option]
    if (typeof current === 'undefined')
      props.updateGist(['options', props.option], !dflt)
    else props.unsetGist(['options', props.option])
  }

  if (props.setting === 'bool') return (
    <li className="flex flex-row">
      <button className={`
        flex flex-row
        w-full
        justify-between
        px-2
        text-left
        text-base-content
        sm:text-neutral-content
        items-center
        pr-6
      `} onClick={toggleBoolean}>
        <div className={`
          grow pl-2 border-l-2
          ${linkClasses}
          hover:cursor-pointer
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
        <Value setting={props.setting} {...props} />
      </button>
    </li>

  )

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
            <span>
              { props.app.t(`settings.${props.setting}.title`) }
            </span>
          </div>
          <Value setting={props.setting} {...props} />
          <Chevron w={6} m={3}/>
        </summary>
        <Input {...props} />
      </details>
    </li>
  )
}

export default Setting
