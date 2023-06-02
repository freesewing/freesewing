import { useState } from 'react'
import { ChoiceButton } from 'shared/components/choice-button.mjs'
import { ControlSettings } from 'shared/components/account/control.mjs'
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

export const inputs = {
  renderer: ListInput,
  xray: BoolInput,
  control: ControlSettingInput,
}
