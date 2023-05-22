import { formatMm, formatPercentage } from 'shared/utils.mjs'

export const PctOptionValue = ({ name, config, current, settings }) => {
  const val = typeof current === 'undefined' ? config.pct / 100 : current

  return (
    <span className={val === config.pct / 100 ? 'text-secondary-focus' : 'text-accent'}>
      {formatPercentage(val)}
      {config.toAbs && settings.measurements ? ` | ${formatMm(config.toAbs(val, settings))}` : null}
    </span>
  )
}

export const BoolOptionValue = ({ name, config, current, t }) => {
  const dflt = config.bool
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
}

export const CountOptionValue = ({ name, config, current }) =>
  config.count == current || typeof current === 'undefined' ? (
    <span className="text-secondary-focus">{config.count}</span>
  ) : (
    <span className="text-accent">{current}</span>
  )

export const ListOptionValue = ({ name, config, current, t }) => {
  const translate = config.doNotTranslate ? (input) => input : (input) => t(`${name}.o.${input}`)

  return config.dflt == current || typeof current === 'undefined' ? (
    <span className="text-secondary-focus">{translate(config.dflt)}</span>
  ) : (
    <span className="text-accent">{translate(current)}</span>
  )
}

export const DegOptionValue = ({ name, config, current }) =>
  config.deg == current || typeof current === 'undefined' ? (
    <span className="text-secondary-focus">{config.deg}&deg;</span>
  ) : (
    <span className="text-accent">{current}&deg;</span>
  )

export const MmOptionValue = () => (
  <span className="text-error">FIXME: No MmOptionvalue implemented</span>
)
export const ConstantOptionValue = () => (
  <span className="text-error">FIXME: No ConstantOptionvalue implemented</span>
)
