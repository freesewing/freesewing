// Dependencies
import { menuDesignOptionsStructure } from '../../lib/index.mjs'
import { measurements as measurementsTranslations } from '@freesewing/i18n'
import { orderBy } from '@freesewing/utils'
// Hooks
import React, { useCallback, useMemo } from 'react'
// Components
import { MenuButtonGroup } from './Container.mjs'
import { BeakerIcon, OptionsIcon } from '@freesewing/react/components/Icon'

/**
 * The test design options menu
 *
 * @param {object} props.Design - An object holding the Design instance
 * @param {Object} props.state - Object holding state
 * @param {Object} props.i18n - Object holding translations loaded from the design
 * @param {Object} props.update - Object holding state handlers
 */
export const TestOptionsMenu = ({ Design, state, i18n, update }) => {
  const structure = useMemo(
    () =>
      menuDesignOptionsStructure(
        Design.designConfig.data.id,
        Design.patternConfig.options,
        state.settings
      ),
    [Design.designConfig.data.id, Design.patternConfig, state.settings]
  )

  return (
    <MenuButtonGroup
      {...{
        structure,
        ux: state.ui.ux,
        Icon: OptionsIcon,
        Button: (props) => <SampleOptionButton {...{ i18n, update }} {...props} />,
        name: 'Design Options',
        isDesignOptionsGroup: true,
        state,
        Design,
        i18n,
      }}
    />
  )
}

/**
 * The test measurements options menu
 *
 * @param {object} props.Design - An object holding the Design instance
 * @param {Object} props.state - Object holding state
 * @param {Object} props.update - Object holding state handlers
 */
export const TestMeasurementsMenu = ({ Design, state, update }) => {
  const structure = {}
  if (Design.patternConfig.measurements.length > 0)
    structure.required = { isGroup: true, title: 'Required Measurements' }
  for (const m of Design.patternConfig.measurements) {
    structure.required[m] = { isGroup: false, name: m, title: m }
  }
  if (Design.patternConfig.optionalMeasurements.length > 0)
    structure.optional = { isGroup: true, title: 'Optional Measurements' }
  for (const m of Design.patternConfig.optionalMeasurements) {
    structure.optional[m] = { isGroup: false, name: m, title: m }
  }

  return (
    <MenuButtonGroup
      {...{
        structure,
        Icon: OptionsIcon,
        Button: (props) => <SampleMeasurementButton {...{ update }} {...props} />,
        name: 'Design Measurments',
        isDesignOptionsGroup: true,
        state,
        Design,
      }}
    />
  )
}

const SampleOptionButton = ({ name, i18n, update }) => (
  <button
    className={
      'tw-daisy-btn tw-daisy-btn-outline tw-daisy-btn-sm tw-mx-2 ' +
      'tw-daisy-btn-secondary tw-flex tw-flex-row tw-items-center tw-justify-between'
    }
    onClick={() => update.settings('sample', { type: 'option', option: name })}
  >
    <BeakerIcon className="tw-w-5 tw-h-5" />
    <span>{i18n.en.o[name].t}</span>
  </button>
)

const SampleMeasurementButton = ({ name, i18n, update }) => (
  <button
    className={
      'tw-daisy-btn tw-daisy-btn-outline tw-daisy-btn-sm tw-mx-2 ' +
      'tw-daisy-btn-secondary tw-flex tw-flex-row tw-items-center tw-justify-between'
    }
    onClick={() => update.settings('sample', { type: 'option', option: name })}
  >
    <BeakerIcon className="tw-w-5 tw-h-5" />
    <span>{measurementsTranslations[name]}</span>
  </button>
)
