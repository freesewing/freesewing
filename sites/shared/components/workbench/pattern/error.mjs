import { ErrorView } from 'shared/components/error/view.mjs'

export const DraftError = (props) => {
  const errors = {
    pattern: 0,
    sets: 0,
  }
  const warnings = {
    pattern: 0,
    sets: 0,
  }
  if (props.patternLogs) {
    errors.pattern += props.patternLogs.error.length
    warnings.pattern += props.patternLogs.warning.length
  }
  if (props.setLogs) {
    errors.sets += props.setLogs.error.length
    warnings.sets += props.setLogs.warning.length
  }

  const logInfo = []
  if (errors.pattern > 0)
    logInfo.push(
      <li>
        There are <strong>{errors.pattern} errors</strong> in the pattern logs
      </li>
    )
  if (errors.sets > 0)
    logInfo.push(
      <li>
        There are <strong>{errors.sets} errors</strong> in the draft logs
      </li>
    )
  if (warnings.pattern > 0)
    logInfo.push(
      <li>
        There are <strong>{warnings.pattern} warnings</strong> in the pattern logs
      </li>
    )
  if (warnings.sets > 0)
    logInfo.push(
      <li>
        There are <strong>{warnings.sets} warnings</strong> in the draft logs
      </li>
    )
  const ic = (
    <ul className="list-disc list-inside ml-4 text-xl">
      {logInfo}
      {logInfo.length > 0 && (
        <li>
          <button className="btn-link" onClick={() => props.updateGist(['_state', 'view'], 'logs')}>
            Check the logs for more details
          </button>
        </li>
      )}
      <li>Check the partially rendered pattern below to see which areas are problematic</li>
    </ul>
  )

  return (
    <ErrorView inspectChildren={ic} {...props}>
      <p>No need to be alarmed, but we ran into some trouble while drafting this pattern.</p>
    </ErrorView>
  )
}
