import SvgWrapper from './svg-wrapper'
import Error from './error.js'
import Robot from 'shared/components/robot/index.js'

const LabDraft = props => {
  const { app, draft, pattern, gist, updateGist, unsetGist, feedback } = props

  if (!draft) return null

  // Render as SVG
  if (gist?.renderer === 'svg') {
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
  try { patternProps = draft.getRenderProps() }
  catch(error) {
    console.log('Failed to get render props for pattern', error)
    return <Error error={error} {...props} />
  }

  return (
    <>
      {(!patternProps || patternProps.events.error.length > 0)
        ? <Error draft={draft} patternProps={patternProps} updateGist={updateGist} />
        : null
      }
      <SvgWrapper {...{ draft, patternProps, gist, updateGist, unsetGist, app, feedback }} />
    </>
  )
}

export default LabDraft
