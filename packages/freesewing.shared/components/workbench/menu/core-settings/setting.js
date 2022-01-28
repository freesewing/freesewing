import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'
import PctDegOption from 'shared/components/workbench/inputs/design-option-pct-deg'
import CountOption from 'shared/components/workbench/inputs/design-option-count'
import ListSetting from './core-setting-list'
import MmSetting from './core-setting-mm'
import BoolSetting from './core-setting-bool.js'
import SaBoolSetting from './core-setting-sa-bool.js'
import SaMmSetting from './core-setting-sa-mm.js'
import { formatMm, formatPercentage, optionType } from 'shared/utils.js'

const settings = {
  paperless: props => {
    return (
      <span className="text-secondary">
        {props.app.t(`app.${props.gist.paperless ? 'yes' : 'no'}`)}
      </span>
    )
  },
  complete: props => {
    return (
      <span className="text-secondary">
        {props.app.t(`app.${props.gist.complete ? 'yes' : 'no'}`)}
      </span>
    )
  },
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
  saMm: props => {
    return (
      <span className="text-secondary" dangerouslySetInnerHTML={{
        __html: formatMm(props.gist.saMm, props.gist.units)
      }} />
    )
  },
  renderer: props => (
    <span className="text-secondary">
      {props.config.titles[props.gist.renderer]}
    </span>
  ),
}

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
  saMm: props => <SaMmSetting {...props} {...props.config} />,
  renderer: props => <ListSetting
    {...props}
    list={props.config.list.map(key => ({
      key,
      title: props.config.titles[key]
    }))}
  />,
}

const Setting = props => {

  if (props.setting === 'saBool')
    return <SaBoolSetting {...props} {...props.config} />
  if (['paperless', 'complete'].indexOf(props.setting) !== -1)
    return <BoolSetting {...props} {...props.config} />

  const Input = inputs[props.setting]
  const Value = settings[props.setting]

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
            {props.setting === 'saMm'
              ? (
                <>
                  <span>{props.app.t(`settings.sa.title`)}</span>
                  <span className="ml-4 opacity-50">[ {props.app.t(`app.size`)} ]</span>
                </>
              )
              : <span>{props.app.t(`settings.${props.setting}.title`)}</span>
            }
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
