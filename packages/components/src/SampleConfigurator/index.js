import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import PatternOptions from './PatternOptions'
import { withBreasts, withoutBreasts } from '@freesewing/models'
import nonHuman from '../Workbench/Measurements/non-human.js'

const SampleConfigurator = (props) => {
  const [type, setType] = useState()
  const [instance, setInstance] = useState()

  const sampleOption = (option) => {
    setType('option')
    setInstance(option)
    props.updateGist(
      {
        type: 'option',
        option
      },
      'settings',
      'sample'
    )
  }

  const sampleMeasurement = (measurement) => {
    setType('measurement')
    setInstance(measurement)
    props.updateGist(
      {
        type: 'measurement',
        measurement
      },
      'settings',
      'sample'
    )
  }

  const sampleModels = (models) => {
    setType('models')
    props.updateGist(
      {
        type: 'models',
        models
      },
      'settings',
      'sample'
    )
  }

  return (
    <ul>
      <li>
        <h5>
          <FormattedMessage id="app.patternOptions" />
        </h5>
        <PatternOptions
          config={props.config}
          gist={props.gist}
          sampleOption={sampleOption}
          activeOption={type === 'option' ? instance : null}
        />
      </li>
      <li>
        <h5>
          <FormattedMessage id="app.measurements" />
        </h5>
        <ul>
          {props.config.measurements.map((m) => (
            <li key={m}>
              <a
                href="#logo"
                onClick={() => sampleMeasurement(m)}
                className={type === 'measurement' && instance === m ? 'active' : ''}
              >
                <FormattedMessage id={'measurements.' + m} />
              </a>
            </li>
          ))}
        </ul>
      </li>
      <li>
        <h5>
          <FormattedMessage id="app.people" />
        </h5>
        <ul>
          <li>
            <a
              href="#logo"
              onClick={() => {
                sampleModels(withBreasts)
                setType('models')
                setInstance('withBreasts')
              }}
              className={type === 'models' && instance === 'withBreasts' ? 'active' : ''}
            >
              <FormattedMessage id="app.withBreasts" />
            </a>
          </li>
          <li>
            <a
              href="#logo"
              onClick={() => {
                sampleModels(withoutBreasts)
                setType('models')
                setInstance('withoutBreasts')
              }}
              className={type === 'models' && instance === 'withoutBreasts' ? 'active' : ''}
            >
              <FormattedMessage id="app.withoutBreasts" />
            </a>
          </li>
        </ul>
      </li>
      {['dolls', 'giants'].map(type => (
        <li key={type}>
          <h5>
            <FormattedMessage id={`app.${type}`} />
          </h5>
          <ul>
            <li>
              <a
                href="#logo"
                onClick={() => {
                  sampleModels(nonHuman.withBreasts[type])
                  setType('models')
                  setInstance('withBreasts')
                }}
                className={type === 'models' && instance === 'withBreasts' ? 'active' : ''}
              >
                <FormattedMessage id="app.withBreasts" />
              </a>
            </li>
            <li>
              <a
                href="#logo"
                onClick={() => {
                  sampleModels(nonHuman.withoutBreasts[type])
                  setType('models')
                  setInstance('withoutBreasts')
                }}
                className={type === 'models' && instance === 'withoutBreasts' ? 'active' : ''}
              >
                <FormattedMessage id="app.withoutBreasts" />
              </a>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default SampleConfigurator
