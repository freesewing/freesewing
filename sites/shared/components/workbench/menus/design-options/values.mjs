import { formatMm, formatPercentage } from 'shared/utils.mjs'
import { ListValue, HighlightedValue, PlainValue, BoolValue } from '../shared/values'
import { mergeOptions } from '@freesewing/core'

/** Displays the current percentatge value, and the absolute value if configured */
export const PctOptionValue = ({ config, current, settings, changed, patternConfig }) => {
  const val = changed ? current : config.pct / 100

  return (
    <HighlightedValue changed={changed}>
      {formatPercentage(val)}
      {config.toAbs && settings.measurements
        ? ` | ${formatMm(
            config.toAbs(val, settings, mergeOptions(settings, patternConfig.options))
          )}`
        : null}
    </HighlightedValue>
  )
}

/** Displays a count value*/
export const CountOptionValue = ({ config, current, changed }) => (
  <PlainValue {...{ current, changed, dflt: config.count }} />
)

/** Displays a list option value */
export const ListOptionValue = (props) => (
  <ListValue {...props} t={(input) => props.t(`${props.name}.o.${input}`)} />
)

/** Displays a degree value */
export const DegOptionValue = ({ config, current, changed }) => (
  <HighlightedValue changed={changed}> {changed ? current : config.deg}&deg;</HighlightedValue>
)

/** Displays the MmOptions are not supported */
export const MmOptionValue = () => (
  <span className="text-error">FIXME: No Mm Options are not supported</span>
)

/** Displays that constant values are not implemented in the front end */
export const ConstantOptionValue = () => (
  <span className="text-error">FIXME: No ConstantOptionvalue implemented</span>
)

// Facilitate lookup of the value component
export const values = {
  bool: BoolValue,
  constant: ConstantOptionValue,
  count: CountOptionValue,
  deg: DegOptionValue,
  list: ListOptionValue,
  mm: MmOptionValue,
  pct: PctOptionValue,
}
