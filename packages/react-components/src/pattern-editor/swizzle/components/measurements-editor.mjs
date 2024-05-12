export const MeasurementsEditor = ({ Design, settings, update, components, methods, locale }) => {
  const { MeasurementInput, DynamicMdx = false } = components

  const onUpdate = (m, newVal) => {
    update.settings(['measurements', m], newVal)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h5>{methods.t('pe:requiredMeasurements')}</h5>
      {Object.keys(Design.patternConfig.measurements).length === 0 ? (
        <p>({methods.t('account:none')})</p>
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
      <h5>{methods.t('pe:optionalMeasurements')}</h5>
      {Object.keys(Design.patternConfig.optionalMeasurements).length === 0 ? (
        <p>({methods.t('account:none')})</p>
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
