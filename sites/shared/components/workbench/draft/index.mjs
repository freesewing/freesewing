import { SvgWrapper } from './svg.mjs'
import { DraftError } from './error.mjs'

export const LabDraft = (props) => {
  const { app, draft, gist, updateGist, unsetGist, showInfo, feedback, hasRequiredMeasurements } =
    props

  if (!draft || !hasRequiredMeasurements) return null

  // Render as SVG
  if (gist?.renderer === 'svg') {
    let svg
    try {
      svg = draft.render()
    } catch (error) {
      console.log('Failed to render design', error)
      return <DraftError error={error} {...props} />
    }
    return <div dangerouslySetInnerHTML={{ __html: svg }} />
  }

  // Render as React
  let patternProps = {}
  try {
    patternProps = draft.getRenderProps()
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

  return (
    <>
      {errors.length > 0 ? (
        <DraftError
          {...{
            draft,
            patternProps,
            updateGist,
            patternLogs: draft.store.logs,
            setLogs: draft.setStores[0].logs,
            errors,
          }}
        />
      ) : null}
      <SvgWrapper
        {...{ draft, patternProps, gist, updateGist, unsetGist, showInfo, app, feedback }}
      />
    </>
  )
}
