import { formatMm, formatPercentage } from 'shared/utils.mjs'
import { ListValue, HighlightedValue, PlainValue } from '../shared/values'
export const PctOptionValue = ({ name, config, current, settings, changed }) => {
  const val = changed ? current : config.pct / 100

  return (
    <HighlightedValue changed={changed}>
      {formatPercentage(val)}
      {config.toAbs && settings.measurements ? ` | ${formatMm(config.toAbs(val, settings))}` : null}
    </HighlightedValue>
  )
}

export const BoolOptionValue = ({ name, config, current, t, changed }) => (
  <ListValue
    {...{
      current: current === undefined ? current : Number(current),
      t,
      config: { ...config, dflt: Number(config.bool) },
      changed,
    }}
  />
)

export const CountOptionValue = ({ config, current, changed }) => (
  <PlainValue {...{ current, changed, dflt: config.count }} />
)

export const ListOptionValue = ({ name, config, current, t, changed }) => {
  const translate = config.doNotTranslate ? (input) => input : (input) => t(`${name}.o.${input}`)
  const value = translate(changed ? current : config.dflt)
  return <HighlightedValue changed={changed}> {value} </HighlightedValue>
}

export const DegOptionValue = ({ config, current, changed }) => (
  <HighlightedValue changed={changed}> {changed ? current : config.deg}&deg;</HighlightedValue>
)

export const MmOptionValue = () => (
  <span className="text-error">FIXME: No MmOptionvalue implemented</span>
)
export const ConstantOptionValue = () => (
  <span className="text-error">FIXME: No ConstantOptionvalue implemented</span>
)
