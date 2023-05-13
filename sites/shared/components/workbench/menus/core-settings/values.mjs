import { formatMm } from 'shared/utils.mjs'
import { SecText, AccentText, PrimaryText } from 'shared/components/workbench/menus/index.mjs'

export const BoolValue = ({ current, t }) => <SecText>{t(current ? 'yes' : 'no')}</SecText>

const ListValue = ({ current, t, config, changed }) =>
  changed
    ? t(`core-settings:${config.valueTitles[current]}`)
    : t(`core-settings:${config.valueTitles[config.dflt]}`)

export const RendererSettingValue = ListValue
export const LocaleSettingValue = ListValue
export const CompleteSettingValue = ListValue
export const PaperlessSettingValue = ListValue

export const DebugSettingValue = BoolValue

export const MarginSettingValue = ({ current, t, units }) => (
  <SecText raw={formatMm(current, units)} />
)

export const SaBoolSettingValue = ({ current, t }) => null
export const OnlySettingValue = ({ current, t }) => null
//current && current.length > 0
//  ? <SecText>{current.length}</SecText>
//  : <span className="text-secondary-focus">{t('default')}</span>

export const SaMmSettingValue = ({ current, units }) => <SecText raw={formatMm(current, units)} />

export const ScaleSettingValue = ({ current, t }) =>
  current === 1 ? <SecText>{current}</SecText> : <span className="text-accent">{current}</span>

export const UnitsSettingValue = ({ current, t, units }) => <SecText>{t(`${units}Units`)}</SecText>
