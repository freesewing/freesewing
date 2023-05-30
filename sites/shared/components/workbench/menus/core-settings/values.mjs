import { ListValue, MmValue, PlainValue } from '../shared/values'

export const RendererSettingValue = ListValue
export const LocaleSettingValue = ListValue
export const CompleteSettingValue = ListValue
export const PaperlessSettingValue = ListValue
export const SaBoolSettingValue = ListValue
export const UnitsSettingValue = ListValue

export const MarginSettingValue = MmValue
export const SaMmSettingValue = MmValue

export const ScaleSettingValue = ({ current, config, changed }) => (
  <PlainValue current={current} dflt={config.dflt} changed={changed} />
)

export const OnlySettingValue = ({ current, config }) => (
  <PlainValue
    current={current?.length}
    dflt={config.parts.length}
    changed={current !== undefined}
  />
)
