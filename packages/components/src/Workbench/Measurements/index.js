import React from 'react'
import Button from '@material-ui/core/Button'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import FormFieldMeasurement from '../../.form/FormFieldMeasurement'
import { withBreasts, withoutBreasts } from '@freesewing/models'

const Measurements = (props) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      minHeight: '70vh'
    },
    chooser: {
      width: '100%',
      maxWidth: '500px',
      margin: 'auto',
      alignSelf: 'center'
    }
  }

  const getValue = (m) => {
    if (props.measurements === null) return ''
    if (typeof props.measurements[m] === 'undefined') return ''
    return props.measurements[m]
  }

  if (props.required.length < 1)
    return (
      <div style={styles.container}>
        <div style={styles.chooser}>
          <h2>
            <FormattedMessage id="app.requiredMeasurements" />
          </h2>
          <h3>
            <FormattedMessage id="cfp.noRequiredMeasurements" />
          </h3>
          <p>
            <FormattedHTMLMessage id="cfp.howtoAddMeasurements" />
          </p>
          <p>
            <FormattedMessage id="cfp.seeDocsAt" />
            &nbsp;
            <a href={'https://' + props.language + '/.freesewing.dev/core/config'}>
              {props.language}
              .freesewing.dev/core/config
            </a>
          </p>
        </div>
      </div>
    )
  return (
    <div style={styles.container}>
      <div style={styles.chooser}>
        <h2>
          <FormattedMessage id="app.requiredMeasurements" />
        </h2>
        <p>
          <FormattedMessage id="cfp.youCan" />
        </p>
        <ul>
          <li>
            <a href="#manual">
              <FormattedMessage id="cfp.enterMeasurements" />
            </a>
          </li>
          <li>
            <a href="#preload">
              <FormattedMessage id="cfp.preloadMeasurements" />
            </a>
          </li>
        </ul>
        <h3 id="manual">
          <FormattedMessage id="cfp.enterMeasurements" />
        </h3>
        {props.required.map((m) => (
          <FormFieldMeasurement
            key={m}
            name={m}
            units={props.units}
            value={getValue(m)}
            label={'measurements.' + m}
            updateValue={props.updateMeasurement}
          />
        ))}
        <h3 id="preload">
          <FormattedMessage id="cfp.preloadMeasurements" />
        </h3>
        <h4>
          <FormattedMessage id="app.withoutBreasts" />
        </h4>
        <ul>
          {Object.keys(withoutBreasts).map((m) => (
            <li key={m}>
              <Button onClick={() => props.preloadMeasurements(withoutBreasts[m])}>
                <FormattedMessage id="cfp.size" />
                &nbsp;
                {m.slice(-2)}
              </Button>
            </li>
          ))}
        </ul>
        <h4>
          <FormattedMessage id="app.withBreasts" />
        </h4>
        <ul>
          {Object.keys(withBreasts).map((m) => (
            <li key={m}>
              <Button onClick={() => props.preloadMeasurements(withBreasts[m])}>
                <FormattedMessage id="cfp.size" />
                &nbsp;
                {m.slice(-2)}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Measurements
