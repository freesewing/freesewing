import DefaultErrorView from 'shared/components/error/view'

const Error = ({ logs=[], updateGist }) => {
  let errors = 0
  let warnings = 0
  for (const log of logs) {
    errors += log.errors.length
    warnings += log.warnings.length
  }

  const inspectChildren = (
    <ul className="list-disc list-inside ml-4 text-xl">
      <li>
        Check the{' '}
        <button className="btn-link" onClick={() => updateGist(['_state', 'view'], 'logs')}>
          <strong>{errors.length} errors</strong> and <strong>{warnings.length} warnings</strong>
        </button>
      </li>
      <li>Check the partially rendered pattern below to see which areas are problematic</li>
    </ul>
  )

  return (
    <DefaultErrorView inspectChildren={inspectChildren}>
      <p>No need to be alarmed, but we ran into some trouble while drafting this pattern.</p>
    </DefaultErrorView>
  )
}

export default Error
