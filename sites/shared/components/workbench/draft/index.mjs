import { SvgWrapper } from './svg.mjs'
import { DraftError } from './error.mjs'

export const DraftView = ({ pattern, setView, gist, updateGist }) => {
  //const { app, draft, gist, updateGist, unsetGist, showInfo, feedback, hasRequiredMeasurements } = props

  if (!pattern) return null

  // Render as SVG
  if (gist?.renderer === 'svg') {
    let svg
    try {
      svg = pattern.render()
    } catch (error) {
      console.log('Failed to render design', error)
      return <DraftError error={error} {...props} />
    }
    return <div dangerouslySetInnerHTML={{ __html: svg }} />
  }

  // Render as React
  let patternProps = {}
  try {
    patternProps = pattern.getRenderProps()
  } catch (error) {
    console.log('Failed to get render props for design', error)
    return (
      <DraftError
        error={error}
        patternLogs={patternProps.store.logs}
        setLogs={patternProps.setStores[0].logs}
        updateGist={updateGist}
      />
    )
  }

  const errors = []
  errors.push(...patternProps.logs.pattern.error)
  for (const set of patternProps.logs.sets) {
    errors.push(...set.error)
  }

  console.log(patternProps)

  return (
    <>
      {errors.length > 0 ? (
        <DraftError
          {...{
            pattern,
            patternProps,
            updateGist,
            patternLogs: pattern.store.logs,
            setLogs: pattern.setStores[0].logs,
            errors,
          }}
        />
      ) : null}
      <SvgWrapper {...{ pattern, patternProps, gist, updateGist }} />
    </>
  )
}
