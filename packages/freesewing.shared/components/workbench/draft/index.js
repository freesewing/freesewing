import React, { useState } from 'react'
import SvgWrapper from './svg-wrapper'
import Error from './error.js'
import Events from './events.js'
import Json from 'shared/components/json.js'
import Yaml from 'shared/components/yaml.js'
import { capitalize } from 'shared/utils.js'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

const tabClasses = active => `
  tab tab-bordered font-bold text-4xl pb-12 capitalize
  ${active && 'text-base-content tab-active'}
`

const Wrap = props => <div className="max-w-screen-xl m-auto">{props.children}</div>

const LabDraft = props => {
  const { app, draft, pattern, gist, updateGist, unsetGist } = props
  if (!draft) return null

  const [tab, setTab] = useState(props.pattern.config.name)

  if (gist?.renderer === 'svg') {
    // Render as SVG
    let svg
    try { svg = draft.render() }
    catch(error) {
      console.log('Failed to render pattern', error)
      return <Error error={error} {...props} />
    }
    return <div dangerouslySetInnerHTML={{ __html: svg }} />
  }

  // Render as React
  let patternProps = {}
  try { patternProps = draft.draft().getRenderProps() }
  catch(error) {
    console.log('Failed to get render props for pattern', error)
    return <Error error={error} {...props} />
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
      {tab === 'events' && <Wrap><Events events={draft.events} /></Wrap>}
      {tab === 'json' && <Wrap><Json>{JSON.stringify(props.gist, null, 2)}</Json></Wrap>}
      {tab === 'yaml' && <Wrap><Yaml json={JSON.stringify(props.gist, null, 2)} /></Wrap>}
      {tab === props.pattern.config.name && <SvgWrapper
        draft={draft}
        patternProps={patternProps}
        gist={gist}
        updateGist={updateGist}
        unsetGist={unsetGist}
        app={app}
      />}
    </div>
  )
}

export default LabDraft
