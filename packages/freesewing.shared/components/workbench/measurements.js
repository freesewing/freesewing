import MeasurementInput from './input-measurement.js'

const WorkbenchMeasurements = ({ app, pattern, gist, updateGist }) => {

  // Method to handle measurement updates
  const updateMeasurements = (value, m=false) => {
    if (m === false) {
      // Set all measurements
    } else {
      // Set one measurement
      const newValues = {...gist.measurements}
      newValues[m] = value.trim()
      updateGist('measurements', newValues)
    }
  }
  // Save us some typing
  const inputProps = { app, updateMeasurements, gist }

  return (
    <div className="m-auto max-w-prose">
      <h1>
        <span className='capitalize mr-4 opacity-70'>
          {pattern.config.name}:
        </span>
        {app.t('measurements')}
      </h1>
      {pattern.config.measurements && (
        <>
          <h2>{app.t('requiredMeasurements')}</h2>
          {pattern.config.measurements.map(m => (
            <MeasurementInput key={m} m={m} {...inputProps} />
          ))}
        </>
      )}
      {pattern.config.optionalMeasurements && (
        <>
          <h2>{app.t('optionalMeasurements')}</h2>
          {pattern.config.optionalMeasurements.map(m => (
            <MeasurementInput key={m} m={m} {...inputProps} />
          ))}
        </>
      )}
    </div>
  )
}

export default WorkbenchMeasurements

