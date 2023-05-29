import { ListValue, MmValue, PlainValue, HighlightedValue } from '../shared/values'

export const RendererSettingValue = ListValue
export const LocaleSettingValue = ListValue
export const CompleteSettingValue = ListValue
export const PaperlessSettingValue = ListValue
export const SaBoolSettingValue = ListValue
export const UnitsSettingValue = ListValue

export const MarginSettingValue = MmValue
export const SaMmSettingValue = MmValue

export const ScaleSettingValue = PlainValue

export const OnlySettingValue = ({ current, config }) => (
  <HighlightedValue changed={current !== undefined}>
    {' '}
    {current ? current.length : config.parts.length}{' '}
  </HighlightedValue>
)
