import React, { useState } from 'react'
import FormFieldList from '../../.form/FormFieldList'
import FormFieldSlider from '../../.form/FormFieldSlider'
import formatMm from '@freesewing/utils/formatMm'
import roundMm from '@freesewing/utils/roundMm'
import defaultSa from '@freesewing/utils/defaultSa'
import sliderStep from '@freesewing/utils/sliderStep'
import OptionPreamble from '../OptionPreamble'

const DraftSettingSa = (props) => {
  const [value, setValue] = useState(
    props.value === defaultSa[props.units] ? 'dflt' : props.value === 0 ? 'none' : 'custom'
  )
  const [saValue, setSaValue] = useState(
    props.value === null ? defaultSa[props.units] : props.value
  )
  const [customValue, setCustomValue] = useState(value === 'custom' ? props.value : 10)
  const [expanded, setExpanded] = useState(false)

  const update = (name, newValue, evt) => {
    switch (newValue) {
      case 'none':
        props.updateValue('sa', 0)
        setValue(newValue)
        setSaValue(0)
        break
      case 'dflt':
        props.updateValue('sa', defaultSa[props.units])
        setValue(newValue)
        setSaValue(defaultSa[props.units])
        break
      default:
        props.updateValue('sa', customValue)
        setValue(newValue)
        setSaValue(customValue)
        break
    }
  }

  let saDfltToggle = 'dflt'
  if (props.dflt === 0) saDfltToggle = 'none'
  if (props.dflt !== 10) saDfltToggle = 'custom'

  const reset = () => {
    setValue(saDfltToggle)
    setSaValue(props.dflt)
    props.updateValue('sa', props.dflt)
  }
  const patternReset = () => {
    setValue('dflt')
    setSaValue(defaultSa[props.units])
    props.updateValue('sa', defaultSa[props.units])
  }
  const toggleExpanded = () => setExpanded(!expanded)

  const updateCustom = (name, newValue, evt) => {
    newValue = roundMm(newValue)
    // Sometimes, when sliding, the rapid succession of updates
    // causes a weird timing issue to result in a value that is NaN.
    // If that's the case, just ignore this update and keep the
    // previous one instead
    if (!isNaN(newValue)) {
      setSaValue(newValue)
      setCustomValue(newValue)
      if (evt.type !== 'mousemove') props.updateValue('sa', newValue)
    } else {
      props.updateValue('sa', customValue)
    }
  }

  const list = {
    none: props.labels.none,
    dflt: props.labels.dflt,
    custom: props.labels.custom
  }

  let option = (
    <FormFieldList
      name="sa"
      value={value}
      dflt={'dflt'}
      onChange={update}
      label="po-bool-sa"
      updateValue={update}
      list={list}
    />
  )
  if (value === 'custom')
    option = (
      <React.Fragment>
        {option}
        <FormFieldSlider
          name="customSa"
          value={saValue}
          dflt={defaultSa[props.units]}
          label="po-bool-sa"
          updateValue={updateCustom}
          min={0}
          max={25.4}
          step={sliderStep[props.units]}
        />
      </React.Fragment>
    )
  return (
    <li className={expanded ? 'expanded' : 'collapsed'}>
      <OptionPreamble
        dflt={saDfltToggle}
        designDflt={'dflt'}
        sameButDifferent={props.dflt !== props.value}
        value={value}
        desc={props.desc}
        title={props.title}
        id="po-list-sa"
        displayValue={formatMm(saValue, props.units)}
        displayFormat="html"
        reset={reset}
        patternReset={patternReset}
        toggleExpanded={toggleExpanded}
        expanded={expanded}
        showHelp={() =>
          props.raiseEvent('showHelp', {
            type: 'draftSetting',
            value: 'sa'
          })
        }
        option={option}
        noDocs={props.noDocs}
      />
    </li>
  )
}

export default DraftSettingSa
