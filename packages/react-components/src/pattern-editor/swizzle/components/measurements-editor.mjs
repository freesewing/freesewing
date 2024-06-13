/**
 * This MeasurementsEditor component allows inline-editing of the measurements
 *
 * @param {object} props - The component's props
 * @param {function} props.Design - The design constructor
 * @param {object} props.state - The ViewWrapper state object
 * @param {object} props.state.settings - The current settings
 * @param {object} props.update - Helper object for updating the ViewWrapper state
 * @param {object} props.components - The possibly swizzled components
 * @param {object} props.methods - The possibly swizzled methods
 * @param {function} props.methods.t - The translation method
 * @return {function} MeasurementsEditor - React component
 */
export const MeasurementsEditor = (props) => {
  // Passed down regular props
  const { Design, update } = props
  // Passed down components
  const { MeasurementInput, DynamicMdx = false } = props.components
  // Passed down methods
  const { t } = props.methods
  // Passed down ViewWrapper state
  const { settings } = props.state

  const onUpdate = (m, newVal) => {
    update.settings(['measurements', m], newVal)
  }

  return (
    <div className="max-w-2xl">
      <h5>{t('pe:requiredMeasurements')}</h5>
      {Object.keys(Design.patternConfig.measurements).length === 0 ? (
        <p>({t('account:none')})</p>
      ) : (
        <div>
          {Design.patternConfig.measurements.map((m) => (
            <MeasurementInput
              key={m}
              m={m}
              imperial={settings.units === 'imperial' ? true : false}
              original={settings.measurements?.[m]}
              update={(m, newVal) => onUpdate(m, newVal)}
              id={`edit-${m}`}
            />
          ))}
          <br />
        </div>
      )}
      <h5>{t('pe:optionalMeasurements')}</h5>
      {Object.keys(Design.patternConfig.optionalMeasurements).length === 0 ? (
        <p>({t('account:none')})</p>
      ) : (
        Design.patternConfig.optionalMeasurements.map((m) => (
          <MeasurementInput
            key={m}
            m={m}
            imperial={settings.units === 'umperial' ? true : false}
            original={settings.measurements?.[m]}
            update={(m, newVal) => onUpdate(m, newVal)}
            id={`edit-${m}`}
          />
        ))
      )}
    </div>
  )
}
