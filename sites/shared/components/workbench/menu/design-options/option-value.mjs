import { useTranslation } from 'next-i18next'
import { formatMm, formatPercentage } from 'shared/utils.mjs'

export const values = {
  Pct: (props) => {
    const val =
      typeof props.gist?.options?.[props.option] === 'undefined'
        ? props.design.patternConfig.options[props.option].pct / 100
        : props.gist.options[props.option]
    return (
      <span
        className={
          val === props.design.patternConfig.options[props.option].pct / 100
            ? 'text-secondary-focus'
            : 'text-accent'
        }
      >
        {formatPercentage(val)}
        {props.design.patternConfig.options[props.option]?.toAbs && props.gist.measurements
          ? ' | ' +
            formatMm(props.design.patternConfig.options[props.option]?.toAbs(val, props.gist))
          : null}
      </span>
    )
  },
  Bool: (props) => {
    const { t } = useTranslation(['app'])
    const dflt = props.design.patternConfig.options[props.option].bool
    let current = props.gist?.options?.[props.option]
    current = current === undefined ? dflt : current
    return (
      <span
        className={
          dflt == current || typeof current === 'undefined' ? 'text-secondary-focus' : 'text-accent'
        }
      >
        {current ? t('yes') : t('no')}
      </span>
    )
  },
  Count: (props) => {
    const dflt = props.design.patternConfig.options[props.option].count
    const current = props.gist?.options?.[props.option]
    return dflt == current || typeof current === 'undefined' ? (
      <span className="text-secondary-focus">{dflt}</span>
    ) : (
      <span className="text-accent">{current}</span>
    )
  },
  List: (props) => {
    const dflt = props.design.patternConfig.options[props.option].dflt
    const current = props.gist?.options?.[props.option]
    const prefix = `${props.option}.o.`
    const translate = props.design.patternConfig.options[props.option]?.doNotTranslate
      ? (input) => input
      : (input) => props.t(prefix + input)
    return dflt == current || typeof current === 'undefined' ? (
      <span className="text-secondary-focus">{translate(dflt)}</span>
    ) : (
      <span className="text-accent">{translate(current)}</span>
    )
  },
  Deg: (props) => {
    const dflt = props.design.patternConfig.options[props.option].deg
    const current = props.gist?.options?.[props.option]
    return dflt == current || typeof current === 'undefined' ? (
      <span className="text-secondary-focus">{dflt}&deg;</span>
    ) : (
      <span className="text-accent">{current}&deg;</span>
    )
  },
  Mm: () => {
    return <p>No mm val yet</p>
  },
  Constant: () => {
    return <p>No constant val yet</p>
  },
}
