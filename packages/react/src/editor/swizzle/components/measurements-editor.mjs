/**
 * This MeasurementsEditor component allows inline-editing of the measurements
 *
 * @param {object} props - The component's props
 * @param {function} props.Design - The design constructor
 * @param {object} props.state - The ViewWrapper state object
 * @param {object} props.state.settings - The current settings
 * @param {object} props.update - Helper object for updating the ViewWrapper state
 * @param {object} props.Swizzled - An object holding swizzled code
 * @return {function} MeasurementsEditor - React component
 */
export const MeasurementsEditor = ({ Design, update, state, Swizzled }) => {
  /*
   * Helper method to handle state updates for measurements
   */
  const onUpdate = (m, newVal) => {
    update.settings(['measurements', m], newVal)
  }

  return (
    <div className="max-w-2xl">
      <h5>{Swizzled.methods.t('pe:requiredMeasurements')}</h5>
      {Object.keys(Design.patternConfig.measurements).length === 0 ? (
        <p>({Swizzled.methods.t('account:none')})</p>
      ) : (
        <div>
          {Design.patternConfig.measurements.map((m) => (
            <Swizzled.components.MeasurementInput
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
      <h5>{Swizzled.methods.t('pe:optionalMeasurements')}</h5>
      {Object.keys(Design.patternConfig.optionalMeasurements).length === 0 ? (
        <p>({Swizzled.methods.t('account:none')})</p>
      ) : (
        Design.patternConfig.optionalMeasurements.map((m) => (
          <Swizzled.components.MeasurementInput
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
