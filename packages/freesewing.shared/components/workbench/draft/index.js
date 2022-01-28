import React, { useState } from 'react'
import Svg from './svg'
import Defs from './defs'
import Part from './part'
import theme from 'pkgs/plugin-theme/src/index.js'
import Robot from 'shared/components/robot/index.js'
import Error from './error.js'
import Events from './events.js'
import Json from 'shared/components/json.js'
import Yaml from 'shared/components/yaml.js'
import { capitalize } from 'shared/utils.js'

const tabClasses = active => `
  tab tab-bordered font-bold text-4xl pb-12 capitalize
  ${active && 'text-base-content tab-active'}
`

const Wrap = props => <div className="max-w-screen-xl m-auto">{props.children}</div>

const LabDraft = props => {
  const { app, pattern, gist, updateGist, unsetGist } = props

  const [tab, setTab] = useState(props.pattern.config.name)

  const patternInstance = new pattern(gist)
  const eprops = { ...props, patternInstance }
  if (gist?.renderer === 'svg') patternInstance.use(theme)
  // Catch errors
  try { patternInstance.draft() }
  catch(error) {
    console.log('Failed to draft pattern', error)
    return <Error error={error} {...eprops} at={'draft'} />
  }

  // Render as SVG
  let svg
  try { svg = patternInstance.render() }
  catch(error) {
    console.log('Failed to render pattern', error)
    return <Error error={error} {...eprops} />
  }

  if (gist?.renderer === 'svg')
    return <div dangerouslySetInnerHTML={{ __html: svg }} />

  // Render as React
  let patternProps = {}
  try { patternProps = patternInstance.draft().getRenderProps() }
  catch(error) {
    console.log('Failed to get render props for pattern', error)
    return <Error error={error} {...eprops} />
  }

  return (
    <div>
      <div className="tabs my-8 mx-auto justify-center">
        {[props.pattern.config.name, 'events', 'yaml', 'json'].map(name => <button
          key={name}
          onClick={() => setTab(name)}
          className={tabClasses(tab === name)}
        >{name}</button>)}
      </div>
      {tab === 'events' && <Wrap><Events events={patternInstance.events} /></Wrap>}
      {tab === 'json' && <Wrap><Json>{JSON.stringify(props.gist, null, 2)}</Json></Wrap>}
      {tab === 'yaml' && <Wrap><Yaml json={JSON.stringify(props.gist, null, 2)} /></Wrap>}
      {tab === props.pattern.config.name && (
        <Svg {...patternProps}>
          <Defs {...patternProps} />
          <style>{`:root { --pattern-scale: ${gist.scale || 1}}`}</style>
          <g>
            {Object.keys(patternProps.parts).map((name) => (
              <Part
                key={name}
                partName={name}
                part={patternProps.parts[name]}
                app={app}
                gist={gist}
                updateGist={updateGist}
                unsetGist={unsetGist}
              />
            ))}
          </g>
        </Svg>
      )}
    </div>
  )
}

export default LabDraft
