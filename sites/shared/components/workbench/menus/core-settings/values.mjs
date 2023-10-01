//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { ListValue, MmValue, PlainValue } from '../shared/values'

const ScaleSettingValue = ({ current, config, changed }) => (
  <PlainValue current={current} dflt={config.dflt} changed={changed} />
)

const OnlySettingValue = ({ current, config }) => (
  <PlainValue
    current={current?.length}
    dflt={config.parts.length}
    changed={current !== undefined}
  />
)

export const values = {
  complete: ListValue,
  expand: ListValue,
  locale: ListValue,
  margin: MmValue,
  only: OnlySettingValue,
  paperless: ListValue,
  sabool: ListValue,
  samm: MmValue,
  scale: ScaleSettingValue,
  units: ListValue,
}
