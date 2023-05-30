import { useCallback } from 'react'
import { measurementAsMm } from 'shared/utils.mjs'
import { ListInput, SliderInput, BoolInput, MmInput } from '../shared/inputs.mjs'

export const LocaleSettingInput = ListInput
export const UnitsSettingInput = ListInput
export const RendererSettingInput = ListInput
export const CompleteSettingInput = ListInput
export const PaperlessSettingInput = ListInput

export const MarginSettingInput = MmInput
export const ScaleSettingInput = SliderInput
export const OnlySettingInput = (props) => {
  const { config, updateFunc, current } = props
  config.choiceTitles = {}
  config.list.forEach((p) => (config.choiceTitles[p] = p))

  const onlyUpdateFunc = useCallback(
    (path, part) => {
      if (part === undefined) return updateFunc(path, part)

      let newParts = new Set(current || [])
      if (newParts.has(part)) newParts.delete(part)
      else newParts.add(part)
      if (newParts.size < 1) newParts = undefined
      else newParts = [...newParts]

      updateFunc(path, newParts)
    },
    [updateFunc, current]
  )

  return <ListInput {...props} updateFunc={onlyUpdateFunc} />
}

export const SaMmSettingInput = (props) => {
  const { updateFunc, units, config } = props
  const mmUpdateFunc = useCallback(
    (_path, newCurrent) => {
      newCurrent = newCurrent === undefined ? measurementAsMm(config.dflt, units) : newCurrent
      updateFunc([
        [['samm'], newCurrent],
        [['sa'], newCurrent],
      ])
    },
    [updateFunc, units, config.dflt]
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
  const { updateFunc, samm } = props
  const saUpdateFunc = useCallback(
    (_path, newCurrent) =>
      updateFunc([
        [['sabool'], newCurrent],
        [['sa'], newCurrent ? samm : undefined],
      ]),
    [updateFunc, samm]
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
