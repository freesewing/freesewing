import { Difficulty } from 'shared/components/designs/difficulty.mjs'

const ListValue = ({ current, t, config, changed }) =>
  changed
    ? t(`ui-settings:${config.valueTitles[current]}`)
    : t(`ui-settings:${config.valueTitles[config.dflt]}`)

export const RendererSettingValue = ListValue
export const InspectSettingValue = ListValue
export const ControlSettingValue = ({ control }) => <Difficulty score={control} color="primary" />
