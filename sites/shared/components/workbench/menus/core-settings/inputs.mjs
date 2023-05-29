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
export const OnlySettingInput = ({ name, config, current, updateFunc, t, draftOrder, design }) => {
  const partNames = config.parts.map((part) => ({
    id: part,
    t: t(`${design}:${part}.t`),
    d: t(`${design}:${part}.d`),
  }))

  const togglePart = (part) => {
    const parts = current || []
    const newParts = new Set(parts)
    if (newParts.has(part)) newParts.delete(part)
    else newParts.add(part)
    if (newParts.size < 1) reset()
    else updateFunc(['only'], [...newParts])
  }

  const reset = () => {
    updateFunc(['only'])
  }

  return (
    <>
      <p>{t(`core-settings:only.d`)}</p>
      {orderBy(partNames, ['name'], ['asc']).map((part) => {
        const included = Array.isArray(current) ? (current.includes(part.id) ? true : false) : true

        return (
          <ChoiceButton
            key={part.id}
            title={part.t}
            color={included ? 'secondary' : 'accent'}
            active={included}
            onClick={() => togglePart(part.id)}
          >
            {part.d}
          </ChoiceButton>
        )
      })}
    </>
  )
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
