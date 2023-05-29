import { formatMm, formatFraction128 } from 'shared/utils.mjs'

export const HighlightedValue = ({ changed, children }) => (
  <span className={changed ? 'text-accent' : 'text-secondary-focus'}> {children} </span>
)

export const PlainValue = ({ current, config, changed }) => (
  <HighlightedValue changed={changed}> {changed ? current : config.dflt} </HighlightedValue>
)

export const ListValue = ({ current, t, config, changed }) => (
  <HighlightedValue changed={changed}>
    {changed ? t(`${config.valueTitles[current]}`) : t(`${config.valueTitles[config.dflt]}`)}
  </HighlightedValue>
)

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
