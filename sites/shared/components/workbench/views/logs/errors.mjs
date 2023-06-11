import { useState } from 'react'
import { WebLink } from 'shared/components/web-link.mjs'
import { Trans } from 'react-i18next'
import Markdown from 'react-markdown'

// If these vars are missing, we suspect they are not desctructured in the draft method
const knownVars = [
  'sa',
  'Path',
  'Point',
  'Snippet',
  'paths',
  'points',
  'snippets',
  'absoluteOptions',
  'complete',
  'measurements',
  'options',
  'paperless',
  'sa',
  'scale',
  'context',
  'getId',
  'hide',
  'log',
  'macro',
  'setHidden',
  'store',
  'unhide',
  'units',
  'utils',
  'Bezier',
  'part',
]

// Make it easy to suppress escapint in i18next
const interpolation = { escapeValue: false }

// Extend this method if you want to handle other things than errors
export const analyzeDraftLogLine = ({ type, line, t }) => {
  if (type === 'error' && line.stack) return <DraftError err={line} t={t} />

  return null
}

// Helper component to toggle the stack trace
const ShowStackButton = ({ setDetails, details, t, txt = 'clickHereForStackTrace' }) => (
  <button className="text-secondary font-medium px-1" onClick={() => setDetails(!details)}>
    {t(txt)}
  </button>
)

// This explains how the error is likely do to restructuring
const NotDestructured = ({ missing, setDetails, details, t }) => (
  <div className="pattern-logs">
    <Markdown>{t('notDestructured', { missing })}</Markdown>
    <br />
    <Markdown>
      {t('seeLinkOrClick', {
        link: `[${t('theDraftMethodDocs')}](https://freesewing.dev/reference/api/part/draft)`,
        click: '',
        interpolation,
      })}
    </Markdown>
    <ShowStackButton {...{ setDetails, details, t }} />
  </div>
)

// This explains a var is undefined in the design
const DesignsVarUndefined = ({ missing, err, t }) => (
  <div className="pattern-logs" key={missing}>
    <Markdown>
      {t('designVarUndefined', {
        missing,
        file: err.stack.split('\n')[0].split('/designs/').pop(),
        interpolation,
      })}
    </Markdown>
  </div>
)

// Some other var not being defined
const OtherVarUndefined = ({ missing, err, t }) => (
  <div key={missing}>
    <Markdown>{t('otherVarUndefined', { missing, interpolation })}</Markdown>
    <br />
    <Markdown>
      {t('checkForDetailsOrClick', {
        file: stack[0],
        click: '',
        interpolation,
      })}
    </Markdown>
    <ShowStackButton {...{ setDetails, details, t }} />
  </div>
)

// Component that displays an error log line
const DraftError = ({ err, t }) => {
  const [details, setDetails] = useState(false)
  const data = []
  const stack = err.stack.split('\n')
  // Leave this here, it's intentional. We log the error to you can inpect it.
  console.log(err)

  if (err.name === 'ReferenceError') {
    if (err.message.includes('is not defined')) {
      const missing = err.message.split(' ').shift()
      if (stack[0].includes('/designs/')) {
        data.push(<DesignsVarUndefined {...{ err, missing, t }} />)
        if (knownVars.includes(missing))
          data.push(<NotDestructured key="nd" {...{ details, setDetails, err, missing, t }} />)
      } else data.push(<OtherVarUndefined {...{ err, missing, t }} />)
    }
  }

  return (
    <>
      {data}
      {t('alsoLogged')}
      {details ? (
        <>
          <h6>{t('stackTrace')}</h6>
          <ol className="list list-inside list-decimal text-sm font-mono">
            {stack.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ol>
        </>
      ) : null}
    </>
  )
}
