//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { ListInput } from '../shared/inputs'
import { useControlState } from 'shared/components/account/control.mjs'

export const ControlSettingInput = (props) => {
  const { selection, update } = useControlState()

  props.config.dflt = selection
  return (
    <ListInput
      {...props}
      updateFunc={(path, newVal) => update(newVal)}
      current={selection}
      compact={selection < 2}
    />
  )
}

export const inputs = {
  control: ControlSettingInput,
  kiosk: ListInput,
  renderer: ListInput,
}
