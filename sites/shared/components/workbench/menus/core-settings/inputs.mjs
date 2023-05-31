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

/** an input for the 'only' setting. toggles individual parts*/
export const OnlySettingInput = (props) => {
  const { config, updateFunc, current } = props

  // set up choice titles
  config.choiceTitles = {}
  config.list.forEach((p) => (config.choiceTitles[p] = p))

  // make an update function that toggles the parts
  const onlyUpdateFunc = useCallback(
    (path, part) => {
      // if there's no part being set, it's a reset
      if (part === undefined) return updateFunc(path, part)

      // add or remove the part from the set
      let newParts = new Set(current || [])
      if (newParts.has(part)) newParts.delete(part)
      else newParts.add(part)

      // if the set is now empty, reset
      if (newParts.size < 1) newParts = undefined
      // otherwise use the new set
      else newParts = [...newParts]

      updateFunc(path, newParts)
    },
    [updateFunc, current]
  )

  return <ListInput {...props} updateFunc={onlyUpdateFunc} />
}

/** An input for the samm setting */
export const SaMmSettingInput = (props) => {
  const { updateFunc, units, config } = props

  // the update function to switch the 'sa' setting along with samm
  const mmUpdateFunc = useCallback(
    (_path, newCurrent) => {
      // convert to millimeters if there's a value
      newCurrent = newCurrent === undefined ? measurementAsMm(config.dflt, units) : newCurrent
      // update both values to match
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

/** An input for the sabool setting */
export const SaBoolSettingInput = (props) => {
  const { updateFunc, samm } = props

  // the update function to toggle the 'sa' setting based on 'sabool'
  const saUpdateFunc = useCallback(
    (_path, newCurrent) => {
      updateFunc([
        // update sabool to the new current
        [['sabool'], newCurrent],
        // set sa based on whether there's a current value or not
        [['sa'], newCurrent ? samm : undefined],
      ])
    },
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
