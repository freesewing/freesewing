import { useTranslation } from 'next-i18next'
import { formatMm, formatPercentage} from 'shared/utils'

export const values = {
  pct: props => {
    const val = (typeof props.gist?.options?.[props.option] === 'undefined')
      ? props.design.config.options[props.option].pct/100
      : props.gist.options[props.option]
    return (
      <span className={
        val=== props.design.config.options[props.option].pct/100
          ? 'text-secondary-focus'
          : 'text-accent'
      }>
        {formatPercentage(val)}
        {props.design.config.options[props.option]?.toAbs && props.gist.measurements
          ? ' | ' +formatMm(props.design.config.options[props.option]?.toAbs(val, props.gist))
          : null
        }
      </span>
    )
  },
  bool: props => {
    const { t } = useTranslation(['app'])
    const dflt = props.design.config.options[props.option].bool
    let current = props.gist?.options?.[props.option]
    current = current === undefined ? dflt : current;
    return (
      <span className={
        (dflt==current || typeof current === 'undefined')
          ? 'text-secondary-focus'
          : 'text-accent'
      }>
        {current
          ? t('yes')
          : t('no')
        }
      </span>
    )
  },
  count: props => {
    const dflt = props.design.config.options[props.option].count
    const current = props.gist?.options?.[props.option]
    return (dflt==current || typeof current === 'undefined')
      ? (<span className="text-secondary-focus">{dflt}</span>)
      : (<span className="text-accent">{current}</span>)
  },
  list: props => {
    const dflt = props.design.config.options[props.option].dflt
    const current = props.gist?.options?.[props.option]
    const prefix = `${props.option}.o.`
    return (dflt==current || typeof current === 'undefined')
      ? (<span className="text-secondary-focus">{props.t(prefix+dflt)}</span>)
      : (<span className="text-accent">{props.t(prefix+current)}</span>)
  },
  deg: props => {
    const dflt = props.design.config.options[props.option].deg
    const current = props.gist?.options?.[props.option]
    return (dflt==current || typeof current === 'undefined')
      ? (<span className="text-secondary-focus">{dflt}&deg;</span>)
      : (<span className="text-accent">{current}&deg;</span>)
  },
  mm: props => {
    return (<p>No mm val yet</p>)
  },
  constant: props => {
    return (<p>No constant val yet</p>)
  }
}
