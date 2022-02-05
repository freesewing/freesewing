import React from 'react'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import FormFieldMeasurement from '../../.form/FormFieldMeasurement'
import { withBreasts, withoutBreasts } from '@freesewing/models'
import Icon from '../../Icon'
import nonHuman from './non-human'

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
      alignSelf: 'top'
    },
    ul: {
      listStyleType: 'none',
      margin: '0',
      padding: '0'
    },
    li: {
      display: 'inline',
      padding: '0 5px 5px 0'
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
          <h3>
            <FormattedMessage id="cfp.noRequiredMeasurements" />
          </h3>
          <p>
            <FormattedMessage id="cfp.howtoAddMeasurements" />
          </p>
          <p>
            <FormattedMessage id="cfp.seeDocsAt" />
            &nbsp;
            <a href={'https://freesewing.dev/core/config'}>
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
        <h4 id="preload">
          <FormattedMessage id="cfp.preloadMeasurements" />
        </h4>
        <h5>Humans</h5>
        <ul style={styles.ul}>
          {Object.keys(withoutBreasts).map((m) => (
            <li key={`${m}-without`} style={styles.li}>
              <Button onClick={() => props.preloadMeasurements(withoutBreasts[m])}>
                <Icon icon="withoutBreasts" />
                <FormattedMessage id="cfp.size" />
                &nbsp;
                {m.slice(-2)}
              </Button>
            </li>
          ))}
          {Object.keys(withBreasts).map((m) => (
            <li key={`${m}-with`} style={styles.li}>
              <Button onClick={() => props.preloadMeasurements(withBreasts[m])}>
                <Icon icon="withBreasts" />
                <FormattedMessage id="cfp.size" />
                &nbsp;
                {m.slice(-2)}
              </Button>
            </li>
          ))}
        </ul>
        <h5>Dolls</h5>
        <ul style={styles.ul}>
          {Object.keys(nonHuman.withoutBreasts.dolls).map((m) => (
            <li key={`${m}-without`} style={styles.li}>
              <Button onClick={() => props.preloadMeasurements(nonHuman.withoutBreasts.dolls[m])}>
                <Icon icon="withoutBreasts" />
                <FormattedMessage id="cfp.size" />
                &nbsp;
                {m}
              </Button>
            </li>
          ))}
          {Object.keys(nonHuman.withBreasts.dolls).map((m) => (
            <li key={`${m}-with`} style={styles.li}>
              <Button onClick={() => props.preloadMeasurements(nonHuman.withBreasts.dolls[m])}>
                <Icon icon="withBreasts" />
                <FormattedMessage id="cfp.size" />
                &nbsp;
                {m}
              </Button>
            </li>
          ))}
        </ul>
        <h5>Giants</h5>
        <ul style={styles.ul}>
          {Object.keys(nonHuman.withoutBreasts.giants).map((m) => (
            <li key={`${m}-without`} style={styles.li}>
              <Button onClick={() => props.preloadMeasurements(nonHuman.withoutBreasts.giants[m])}>
                <Icon icon="withoutBreasts" />
                <FormattedMessage id="cfp.size" />
                &nbsp;
                {m}
              </Button>
            </li>
          ))}
          {Object.keys(nonHuman.withBreasts.giants).map((m) => (
            <li key={`${m}-with`} style={styles.li}>
              <Button onClick={() => props.preloadMeasurements(nonHuman.withBreasts.giants[m])}>
                <Icon icon="withBreasts" />
                <FormattedMessage id="cfp.size" />
                &nbsp;
                {m}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.chooser}>
        <h4 id="manual">
          <FormattedMessage id="cfp.enterMeasurements" />
        </h4>
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
        {props.optional.map((m) => (
          <FormFieldMeasurement
            key={m}
            name={m}
            units={props.units}
            value={getValue(m)}
            label={'measurements.' + m}
            updateValue={props.updateMeasurement}
          />
        ))}
      </div>
    </div>
  )
}

export default Measurements
