import DefaultErrorView from 'shared/components/error/view';

const Error = ({ draft, patternProps, error, updateGist }) => {
  const inspectChildren = (<ul className="list-disc list-inside ml-4 text-xl">
      <li>
        Check the <button className="btn-link" onClick={() => updateGist(['_state', 'view'], 'events')}>
        <strong>{patternProps?.events?.error?.length} errors</strong> and <strong>
        {patternProps?.events?.warning?.length} warnings</strong></button>
      </li>
      <li>Check the partially rendered pattern below to see which areas are problematic</li>
  </ul>)

  return (<DefaultErrorView inspectChildren={inspectChildren}>
    <p>Don't be alarmed, but we ran into some trouble while drafting this pattern.</p>
  </DefaultErrorView>)
}

export default Error
