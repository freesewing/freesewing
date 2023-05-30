import { formatMm, formatFraction128 } from 'shared/utils.mjs'

export const HighlightedValue = ({ changed, children }) => (
  <span className={changed ? 'text-info' : ''}> {children} </span>
)

export const PlainValue = ({ current, dflt, changed }) => (
  <HighlightedValue changed={changed}> {changed ? current : dflt} </HighlightedValue>
)

export const ListValue = ({ current, t, config, changed }) => {
  const val = changed ? current : config.dflt
  let key
  if (config.valueTitles) key = config.valueTitles[val]
  else if (typeof val === 'string') key = val
  else if (val) key = 'yes'
  else key = 'no'

  return <HighlightedValue changed={changed}>{t(key)}</HighlightedValue>
}

export const MmValue = ({ current, t, config, units, changed }) => (
  <HighlightedValue changed={changed}>
    <span
      dangerouslySetInnerHTML={{
        __html: changed
          ? formatMm(current, units)
          : units === 'imperial'
          ? formatFraction128(config.dflt)
          : `${config.dflt}cm`,
      }}
    />
  </HighlightedValue>
)
