import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import PatternOptions from './PatternOptions'
import { withBreasts, withoutBreasts } from '@freesewing/models'
import neckstimate from '@freesewing/utils/neckstimate'

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
  const antMan = { ant: {}, b: {}, c: {}, man: {} }
  const antWoman = { ant: {}, b: {}, c: {}, woman: {} }
  for (let m in withoutBreasts.size42) {
    let val = neckstimate(420, m, false)
    antMan.ant[m] = val / 10
    antMan.b[m] = val / 5
    antMan.c[m] = val / 2
    antMan.man[m] = val
  }
  for (let m in withBreasts.size36) {
    let val = neckstimate(360, m, true)
    antWoman.ant[m] = val / 10
    antWoman.b[m] = val / 5
    antWoman.c[m] = val / 2
    antWoman.woman[m] = val
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
          <li>
            <a
              href="#logo"
              onClick={() => {
                sampleModels(antWoman)
                setType('models')
                setInstance('antWoman')
              }}
              className={type === 'models' && instance === 'antWoman' ? 'active' : ''}
            >
              Antperson (with breasts)
            </a>
          </li>
          <li>
            <a
              href="#logo"
              onClick={() => {
                sampleModels(antMan)
                setType('models')
                setInstance('antMan')
              }}
              className={type === 'models' && instance === 'antMan' ? 'active' : ''}
            >
              Antperson (without breasts)
            </a>
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default SampleConfigurator
