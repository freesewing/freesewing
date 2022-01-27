import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'
import PctDegOption from 'shared/components/workbench/inputs/design-option-pct-deg'
import CountOption from 'shared/components/workbench/inputs/design-option-count'
import ListSetting from './core-setting-list'
import { formatMm, formatPercentage, optionType } from 'shared/utils.js'

const settings = {
  locale: props => {
    return (
      <span className="text-secondary">
        {props.app.t(`i18n.${props.gist.settings.locale}`)}
      </span>
    )
  },
  pct: props => {
    const val = (typeof props.gist?.options?.[props.option] === 'undefined')
      ? props.pattern.config.options[props.option].pct/100
      : props.gist.options[props.option]
    return (
      <span className={
        val=== props.pattern.config.options[props.option].pct/100
          ? 'text-secondary'
          : 'text-accent'
      }>
        {formatPercentage(val)}
        {props.pattern.config.options[props.option]?.toAbs
          ? ' | ' +formatMm(props.pattern.config.options[props.option]?.toAbs(val, props.gist))
          : null
        }
      </span>
    )
  },
  bool: props => {
    const dflt = props.pattern.config.options[props.option].bool
    const current = props.gist?.options?.[props.option]
    return (
      <span className={
        (dflt==current || typeof current === 'undefined')
          ? 'text-secondary'
          : 'text-accent'
      }>
        {props.gist?.options?.[props.option]
          ? props.app.t('app.yes')
          : props.app.t('app.no')
        }
      </span>
    )
  },
  count: props => {
    const dflt = props.pattern.config.options[props.option].count
    const current = props.gist?.options?.[props.option]
    return (dflt==current || typeof current === 'undefined')
      ? <span className="text-secondary">{dflt}</span>
      : <span className="text-accent">{current}</span>
  },
  deg: props => {
    const dflt = props.pattern.config.options[props.option].deg
    const current = props.gist?.options?.[props.option]
    return (dflt==current || typeof current === 'undefined')
      ? <span className="text-secondary">{dflt}&deg;</span>
      : <span className="text-accent">{current}&deg;</span>
  },
  mm: props => {
    return <p>No mm val yet</p>
  },
  constant: props => {
    return <p>No constant val yet</p>
  },
}

const Tmp = props => <p>not yet</p>

const inputs = {
  locale: props => <ListSetting
    {...props}
    list={props.app.languages.map(key => ({
      key,
      title: props.app.t(`i18n.${key}`)
    }))}
  />,
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
