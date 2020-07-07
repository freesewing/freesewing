import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import PatternOptions from './PatternOptions'
import { withBreasts, withoutBreasts } from '@freesewing/models'
import neckstimate from '@freesewing/utils/neckstimate'

const SampleConfigurator = (props) => {
  const [expanded, setExpanded] = useState([])

  const sampleOption = (option) => {
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
    <ul className="links">
      <li className="nodot">
        <h4>
          <FormattedMessage id="app.patternOptions" />
        </h4>
        <PatternOptions config={props.config} gist={props.gist} sampleOption={sampleOption} />
      </li>
      <li className="nodot">
        <h4>
          <FormattedMessage id="app.measurements" />
        </h4>
        <ul style={{ paddingLeft: '1rem' }}>
          {props.config.measurements.map((m) => (
            <li key={m}>
              <a href="#logo" onClick={() => sampleMeasurement(m)}>
                <FormattedMessage id={'measurements.' + m} />
              </a>
            </li>
          ))}
        </ul>
      </li>
      <li className="nodot">
        <h4>
          <FormattedMessage id="app.people" />
        </h4>
        <ul style={{ paddingLeft: '1rem' }}>
          <li>
            <a href="#logo" onClick={() => sampleModels(withBreasts)}>
              <FormattedMessage id="app.withBreasts" />
            </a>
          </li>
          <li>
            <a href="#logo" onClick={() => sampleModels(withoutBreasts)}>
              <FormattedMessage id="app.withoutBreasts" />
            </a>
          </li>
          <li>
            <a href="#logo" onClick={() => sampleModels(antWoman)}>
              Antwoman
            </a>
          </li>
          <li>
            <a href="#logo" onClick={() => sampleModels(antMan)}>
              Antman
            </a>
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default SampleConfigurator
