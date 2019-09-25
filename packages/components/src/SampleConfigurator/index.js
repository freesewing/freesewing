import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import PatternOptions from './PatternOptions'
import { withBreasts, withoutBreasts } from '@freesewing/models'

const SampleConfigurator = props => {
  const [expanded, setExpanded] = useState([])

  const sampleOption = option => {
    props.updateGist(
      {
        type: 'option',
        option
      },
      'settings',
      'sample'
    )
  }

  const sampleMeasurement = measurement => {
    props.updateGist(
      {
        type: 'measurement',
        measurement
      },
      'settings',
      'sample'
    )
  }

  const sampleModels = models => {
    props.updateGist(
      {
        type: 'models',
        models
      },
      'settings',
      'sample'
    )
  }
  let antMan = {
    ant: {},
    man: withoutBreasts.manSize42
  }
  for (let m in withoutBreasts.manSize42) antMan.ant[m] = antMan.man[m] / 10

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
          {props.config.measurements.map(m => (
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
          <FormattedMessage id="app.models" />
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
