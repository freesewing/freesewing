import SvgWrapper from './svg-wrapper'
import Error from './error.js'
import { capitalize } from 'shared/utils.js'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

const LabDraft = props => {
  const { app, draft, pattern, gist, updateGist, unsetGist } = props
  if (!draft) return null

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
      <SvgWrapper
        draft={draft}
        patternProps={patternProps}
        gist={gist}
        updateGist={updateGist}
        unsetGist={unsetGist}
        app={app}
      />
    </div>
  )
}

export default LabDraft
