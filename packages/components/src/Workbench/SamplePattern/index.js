import React from 'react'
import SampleConfigurator from '../../SampleConfigurator'
import svgattrPlugin from '@freesewing/plugin-svgattr'

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
            units={props.units || 'metric'}
          />
        </div>
      </aside>
    </div>
  )
}

export default SamplePattern
