import { ListInput, SliderInput, BoolInput, MmInput } from '../shared/inputs.mjs'

/** an input for the 'only' setting. toggles individual parts*/
const OnlySettingInput = (props) => {
  const { config } = props

  // set up choice titles
  config.choiceTitles = {}
  config.list.forEach((p) => (config.choiceTitles[p] = p))

  return <ListInput {...props} />
}

export const inputs = {
  complete: ListInput,
  locale: ListInput,
  margin: MmInput,
  only: OnlySettingInput,
  paperless: BoolInput,
  sabool: BoolInput,
  samm: MmInput,
  scale: SliderInput,
  units: BoolInput,
}

/** custom event handlers for inputs that need them */
export const handlers = {
  only:
    ({ updateFunc, current }) =>
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
  samm:
    ({ updateFunc, config }) =>
    (_path, newCurrent) => {
      // convert to millimeters if there's a value
      newCurrent = newCurrent === undefined ? config.dflt : newCurrent
      // update both values to match
      updateFunc([
        [['samm'], newCurrent],
        [['sa'], newCurrent],
      ])
    },
  sabool:
    ({ updateFunc, samm }) =>
    (_path, newCurrent) => {
      updateFunc([
        // update sabool to the new current
        [['sabool'], newCurrent],
        // set sa based on whether there's a current value or not
        [['sa'], newCurrent ? samm : undefined],
      ])
    },
}
