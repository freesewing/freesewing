import React from 'react'
import PropTypes from 'prop-types'
import SampleConfigurator from '../../SampleConfigurator'
import svgattrPlugin from '@freesewing/plugin-svgattr'
import { FormattedMessage } from 'react-intl'

const SamplePattern = (props) => {
  let pattern = new props.Pattern(props.gist.settings).use(svgattrPlugin, {
    class: 'freesewing draft'
  })
  try {
    pattern.sample()
  } catch (err) {
    console.log(err)
  }
  return (
    <div className="fs-sa">
      <section>
        <div dangerouslySetInnerHTML={{ __html: pattern.render() }} />
        <div style={{ padding: '1rem' }}>
          <div className="gatsby-highlight">
            <pre
              className="language-json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(props.gist, null, 2) }}
            />
          </div>
        </div>
      </section>

      <aside>
        <div className="sticky">
          <SampleConfigurator
            config={props.config}
            gist={props.gist}
            updateGist={props.updateGist}
            raiseEvent={props.raiseEvent}
            freesewing={props.freesewing}
            units={props.units}
          />
        </div>
      </aside>
    </div>
  )
}

SamplePattern.propTypes = {
  gist: PropTypes.object.isRequired,
  updateGist: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  raiseEvent: PropTypes.func.isRequired,
  Pattern: PropTypes.func.isRequired,
  units: PropTypes.oneOf(['metric', 'imperial'])
}

SamplePattern.defaultProps = {
  units: 'metric',
  pointInfo: null
}

export default SamplePattern
