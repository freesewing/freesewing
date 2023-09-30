import Markdown from 'react-markdown'
import { formatMm } from 'shared/utils.mjs'
import { Tab, Tabs } from '../tabs.mjs'

export const Error = ({ err }) => {
  // Include the error name and message info if it isn't already at the top
  // of the error stack.
  let stack = err.stack
  if (!err.stack.startsWith(err.toString())) {
    stack = err.toString() + '\n' + err.stack
  }
  return (
    <pre>
      {stack
        .split(/\n/g)
        .slice(0, 5)
        .map((l, i) => (
          <code
            key={`error-${i}`}
            className={'block whitespace-pre-wrap' + (i > 0 ? ' break-all' : '')}
          >
            {l}
          </code>
        ))}
    </pre>
  )
}

// Markdown wrapper to suppress creation of P tags
const Md = ({ children }) => (
  <Markdown components={{ p: (props) => props.children }}>{children}</Markdown>
)

const Log = ({ log, units }) => {
  if (Array.isArray(log)) {
    if (log[1]?.mm)
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: `${log[0]}: <strong>${formatMm(log[1].mm, units, 'html')}</strong>`,
          }}
        />
      )
    else return log.map((l) => <Log log={l} key={l} />)
  } else if (log.message) return <Error err={log} />
  else if (typeof log === 'string') return <Md>{log}</Md>

  return <Md>Unrecognized log: {JSON.stringify(log, null, 2)}</Md>
}

export const LogGroup = ({ type = 'info', logs = [], units = 'metric' }) =>
  logs.length > 0 ? (
    <div className="">
      <h3 className="capitalize" id={`logs-${type}`}>
        {type}
      </h3>
      <table className="table w-full mdx">
        <thead>
          <tr>
            <th className="text-right w-16">#</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i} className="leading-1 hover:bg-base-200 hover:bg-opacity-40">
              <td className="text-right p-1 pr-4 font-bold opacity-80 text-accent">{i}</td>
              <td className="p-1 pl-4 whitespace-pre-wrap">
                <Log log={log} units={units} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null

const order = ['error', 'warning', 'info', 'debug']

const StoreLogs = ({ logs, units }) => (
  <div className="max-w-screen-xl m-auto">
    <div className="flex flex-col">
      <ul className="flex flex-row row-wrap">
        {order.map((type) =>
          logs[type].length > 0 ? (
            <li key={type} className="">
              <a href={`#logs-${type}`} className={`text-secondary font-bold capitalize text-xl`}>
                {type}
              </a>
              {type === 'debug' ? '' : <span className="px-2 font-bold">|</span>}
            </li>
          ) : (
            <li key={type} className="text-base-content font-bold capitalize text-xl">
              <span className="opacity-50">{type}</span>
              {type === 'debug' ? '' : <span className="px-2 font-bold">|</span>}
            </li>
          )
        )}
      </ul>
      {order.map((type) => (
        <LogGroup type={type} logs={logs[type]} units={units} key={type} />
      ))}
    </div>
  </div>
)

export const DraftLogs = (props) => {
  return (
    <Tabs
      tabs={[
        ...props.draft.setStores.map((store, i) => `Draft logs [set ${i}]`),
        'Pattern Logs',
      ].join(',')}
    >
      {[...props.draft.setStores, props.draft.store].map((store, i) => (
        <Tab key={i}>
          <StoreLogs logs={store.logs} units={props.gist.units} />
        </Tab>
      ))}
    </Tabs>
  )
}

export default DraftLogs
