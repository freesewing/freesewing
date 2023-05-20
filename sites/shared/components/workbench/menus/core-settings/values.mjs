import { formatMm } from 'shared/utils.mjs'

const ListValue = ({ current, t, config, changed }) =>
  changed
    ? t(`core-settings:${config.valueTitles[current]}`)
    : t(`core-settings:${config.valueTitles[config.dflt]}`)

export const RendererSettingValue = ListValue
export const LocaleSettingValue = ListValue
export const CompleteSettingValue = ListValue
export const PaperlessSettingValue = ListValue
export const SaBoolSettingValue = ListValue

export const MarginSettingValue = ({ current, t, units, config }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: formatMm(typeof current === 'undefined' ? config.dflt : current, units),
    }}
  />
)

export const OnlySettingValue = ({ current, config }) =>
  current ? current.length : config.parts.length

export const SaMmSettingValue = ({ current, units, config }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: formatMm(typeof current === 'undefined' ? config.dflt : current, units),
    }}
  />
)

export const ScaleSettingValue = ({ current, config }) => (current ? current : config.dflt)

export const UnitsSettingValue = ({ current, t, units }) => t(`core-settings:${current}`)
