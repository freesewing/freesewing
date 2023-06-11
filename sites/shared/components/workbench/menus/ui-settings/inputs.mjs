import { ListInput, BoolInput } from '../shared/inputs'
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

const ViewInput = (props) => {
  props.config.dflt = props.view
  return (
    <ListInput
      {...props}
      updateFunc={(path, newVal) => props.setView(newVal)}
      current={props.view}
    />
  )
}

export const inputs = {
  renderer: ListInput,
  inspect: BoolInput,
  control: ControlSettingInput,
  view: ViewInput,
}
