import React from 'react'
import { MeasurementInput } from '@freesewing/react/components/Input'

/**
 * This MeasurementsEditor component allows inline-editing of the measurements
 *
 * @param {object} props - The component's props
 * @param {function} props.Design - The design constructor
 * @param {object} props.state - The ViewWrapper state object
 * @param {object} props.state.settings - The current settings
 * @param {object} props.update - Helper object for updating the ViewWrapper state
 * @return {function} MeasurementsEditor - React component
 */
export const MeasurementsEditor = ({ Design, update, state }) => {
  /*
   * Helper method to handle state updates for measurements
   */
  const onUpdate = (m, newVal) => {
    update.settings(['measurements', m], newVal)
  }

  return (
    <div className="tw-max-w-2xl tw-mx-auto">
      <h4>Required Measurements</h4>
      {Object.keys(Design.patternConfig.measurements).length === 0 ? (
        <p>This design does not require any measurements.</p>
      ) : (
        <div>
          {Design.patternConfig.measurements.map((m) => (
            <MeasurementInput
              key={m}
              m={m}
              imperial={state.settings.units === 'imperial' ? true : false}
              original={state.settings.measurements?.[m]}
              update={(m, newVal) => onUpdate(m, newVal)}
              id={`edit-${m}`}
            />
          ))}
          <br />
        </div>
      )}
      <h4>Optional Measurements</h4>
      {Object.keys(Design.patternConfig.optionalMeasurements).length === 0 ? (
        <p>This design does not use any optional measurements.</p>
      ) : (
        Design.patternConfig.optionalMeasurements.map((m) => (
          <MeasurementInput
            key={m}
            m={m}
            imperial={state.settings.units === 'umperial' ? true : false}
            original={state.settings.measurements?.[m]}
            update={(m, newVal) => onUpdate(m, newVal)}
            id={`edit-${m}`}
          />
        ))
      )}
    </div>
  )
}
