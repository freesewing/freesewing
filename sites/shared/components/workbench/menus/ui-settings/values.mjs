import { Difficulty } from 'shared/components/designs/difficulty.mjs'
import { ListValue } from '../shared/values.mjs'

export const RendererSettingValue = ListValue
export const InspectSettingValue = ListValue
export const ControlSettingValue = ({ control }) => <Difficulty score={control} color="primary" />
