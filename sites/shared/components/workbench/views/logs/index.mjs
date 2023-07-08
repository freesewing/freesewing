import { useTranslation } from 'next-i18next'
import { analyzeDraftLogLine } from './errors.mjs'
import Markdown from 'react-markdown'

export const ns = ['logs']

const colors = {
  error: 'error',
  warning: 'warning',
  info: 'secondary',
  debug: 'base',
}

const DraftLogEntry = ({ type, line, t }) => {
  // Some lines are arrays, handle each entry individually
  if (Array.isArray(line))
    return line.reverse().map((l, key) => <DraftLogEntry key={key} line={l} {...{ t, type }} />)

  let title = 'Unsure how to treat this error'
  const data = []

  // Simple error string
  if (typeof line === 'string') title = line
  if (typeof line === 'object') {
    data.push(analyzeDraftLogLine({ type, line, t }))
    title = line.toString()
  }

  return (
    <div className={`relative my-2 bg-${colors[type]} bg-opacity-5 -ml-4 -mr-4 sm:ml-0 sm:mr-0`}>
      <div
        className={`
          lg:border-0 lg:border-l-4 px-4
          shadow text-base border-${colors[type]}
          flex flex-col items-start
        `}
      >
        <div className={`flex flex-row gap-1 py-1 pattern-logs`}>
          <span className={`hidden lg:block font-bold uppercase text-${colors[type]}`}>{type}</span>
          <span className={`hidden lg:block font-bold text-${colors[type]}`}>|</span>
          <span className="font-medium px-2 lg:px-0">
            <Markdown>{title}</Markdown>
          </span>
        </div>
        <div className="popout-content pl-2">{data}</div>
      </div>
    </div>
  )
}

const DraftLogs = ({ type, t, lines = [] }) =>
  lines.length > 0 ? (
    <>
      <h3>{t(type)}</h3>
      {lines.reverse().map((line, key) => (
        <DraftLogEntry key={key} {...{ type, line, t }} />
      ))}
    </>
  ) : null

const extractLogs = (pattern) => {
  const logs = {}
  for (const type of ['error', 'warning', 'info', 'debug']) {
    logs[type] = [...pattern.store.logs[type]]
    for (const store of pattern.setStores) logs[type].push(...store.logs[type])
  }

  return logs
}

export const LogView = ({ pattern, settings }) => {
  const { t } = useTranslation(ns)

  try {
    pattern.draft(settings)
  } catch (err) {
    console.log(err)
  }
  const logs = extractLogs(pattern)

  return (
    <div className="max-w-4xl mx-auto px-4 pb-8">
      <h1>{t('logs')}</h1>
      {Object.entries(logs).map(([type, lines], key) => (
        <DraftLogs key={key} {...{ type, lines, t }} />
      ))}
    </div>
  )
}
