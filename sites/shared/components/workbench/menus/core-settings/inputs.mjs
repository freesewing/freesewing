import { useState, useCallback } from 'react'
import { formatMm, measurementAsMm, measurementAsUnits, formatFraction128 } from 'shared/utils.mjs'
import { ChoiceButton } from 'shared/components/choice-button.mjs'
import orderBy from 'lodash.orderby'
import { ListInput, SliderInput, BoolInput, MmInput } from '../shared/inputs.mjs'

export const LocaleSettingInput = ListInput
export const UnitsSettingInput = ListInput
export const RendererSettingInput = ListInput
export const CompleteSettingInput = ListInput
export const PaperlessSettingInput = ListInput

export const MarginSettingInput = MmInput
export const ScaleSettingInput = SliderInput
export const OnlySettingInput = (props) => {
  props.config.choiceTitles = {}
  props.config.list.forEach((p) => (props.config.choiceTitles[p] = p))

  const onlyUpdateFunc = useCallback(
    (path, part) => {
      if (part === undefined) return props.updateFunc(path, part)

      let newParts = new Set(props.current || [])
      if (newParts.has(part)) newParts.delete(part)
      else newParts.add(part)
      if (newParts.size < 1) newParts = undefined
      else newParts = [...newParts]

      props.updateFunc(path, newParts)
    },
    [props.updateFunc, props.current]
  )

  return <ListInput {...props} updateFunc={onlyUpdateFunc} />
}

export const SaMmSettingInput = (props) => {
  const mmUpdateFunc = useCallback(
    (_path, newCurrent) => {
      newCurrent =
        newCurrent === undefined ? measurementAsMm(props.config.dflt, props.units) : newCurrent
      props.updateFunc([
        [['samm'], newCurrent],
        [['sa'], newCurrent],
      ])
    },
    [props.updateFunc, props.units, props.config.dflt]
  )

  return (
    <MmInput
      {...{
        ...props,
        updateFunc: mmUpdateFunc,
      }}
    />
  )
}

export const SaBoolSettingInput = (props) => {
  const saUpdateFunc = useCallback(
    (_path, newCurrent) =>
      props.updateFunc([
        [['sabool'], newCurrent],
        [['sa'], newCurrent ? props.samm : undefined],
      ]),
    [props.updateFunc, props.samm]
  )

  return (
    <BoolInput
      {...{
        ...props,
        name: 'sabool',
        updateFunc: saUpdateFunc,
      }}
    />
  )
}
