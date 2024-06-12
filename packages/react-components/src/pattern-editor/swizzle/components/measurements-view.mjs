/**
 * The measurements view is loaded to update/set measurements
 *
 * It will be automatically loaded if we do not have all required measurements for a design.
 *
 * @param {object} props - The component's props
 * @param {function} props.Design - The design constructor
 * @param {object} props.state - The ViewWrapper state object
 * @param {object} props.state.settings - The current settings
 * @param {object} props.update - Helper object for updating the ViewWrapper state
 * @param {array} props.missingMeasurements - List of missing measurements for the current design
 * @param {object} props.components - The possibly swizzled components
 * @param {object} props.methods - The possibly swizzled methods
 * @param {function} props.methods.t - The translation method
 * @return {function} MeasurementsView - React component
 */
export const MeasurementsView = (props) => {
  // Passed down regular props
  const { Design, missingMeasurements, update } = props
  // Passed down components
  const { Accordion, Popout, MeasurementsEditor } = props.components
  // Passed down methods
  const { t } = props.methods
  // Passed down ViewWrapper state
  const { settings } = props.state

  const loadMeasurements = (set) => {
    update.settings([
      [['measurements'], designMeasurements(Design, set.measies)],
      [['units'], set.imperial ? 'imperial' : 'metric'],
    ])
    // Save the measurement set name to pattern settings
    if (set[`name${capitalize(lang)}`])
      // Curated measurement set
      update.settings([[['metadata'], { setName: set[`name${capitalize(lang)}`] }]])
    else if (set?.name)
      // User measurement set
      update.settings([[['metadata'], { setName: set.name }]])
    setView('draft')
  }

  const loadMissingMeasurements = (set) => {
    update.settings([
      [['measurements'], designMeasurements(Design, set.measies)],
      [['units'], set.imperial ? 'imperial' : 'metric'],
    ])
    setView('measurements')
  }

  return (
    <div className="max-w-7xl mt-8 mx-auto px-4">
      <h2>{t('pe:measurements')}</h2>
      {missingMeasurements && (
        <Popout note dense noP>
          <h5>
            {t('pe:missingMeasurements', { nr: missingMeasurements.length })} (
            {missingMeasurements.length})
          </h5>
          <ol className="list list-inside ml-4 list-decimal">
            {missingMeasurements.map((m, i) => (
              <li key={i}>{t(`measurements:${m}`)}</li>
            ))}
          </ol>
          <p className="text-lg">{t('youCanPickOrEnter')}</p>
        </Popout>
      )}
      {!missingMeasurements && (
        <Popout note ompact>
          <span className="text-lg">{t('pe:measurementsAreOk')}</span>
          <pre>{JSON.stringify(typeof missingMeasurements, null, 2)}</pre>
          test
        </Popout>
      )}
      <h5 id="editmeasies">{t('pe:editMeasurements')}</h5>
      <p>{t('pe:editMeasurementsDesc')}</p>
      <MeasurementsEditor
        Design={Design}
        update={props.update}
        state={props.state}
        methods={props.methods}
      />
    </div>
  )
}
