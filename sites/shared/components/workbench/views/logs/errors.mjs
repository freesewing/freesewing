import { useState } from 'react'
import { WebLink } from 'shared/components/web-link.mjs'

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

export const analyzeDraftLogLine = ({ type, line, t }) => {
  if (type === 'error' && line.stack) return <DraftError err={line} t={t} />

  return null
}

const Code = ({ children }) => <code className="font-mono font-bold px-1 rounded">{children}</code>

const ShowStackButton = ({
  setDetails,
  details,
  t,
  txt = 'click here to show the stack trace',
}) => (
  <button className="text-secondary font-medium" onClick={() => setDetails(!details)}>
    {txt}
  </button>
)

const NotDestructured = ({ missing, err, setDetails, details, t }) => (
  <div>
    This most likely means that <Code>{missing}</Code> was not desctructured as a draft method
    parameter.
    <br />
    See{' '}
    <WebLink
      href="https://freesewing.dev/reference/api/part/draft"
      txt="the draft method documentation"
    />{' '}
    or <ShowStackButton {...{ setDetails, details, t }} />.
  </div>
)

const DesignsVarUndefined = ({ missing, err, t }) => (
  <div key={missing}>
    We were unable to draft this pattern because <Code>{missing}</Code> is undefined in{' '}
    <Code>{err.stack.split('\n')[0].split('/designs/').pop()}</Code>
  </div>
)

const OtherVarUndefined = ({ missing, err, t }) => (
  <div key={missing}>
    The <Code>{missing}</Code> variable is undefined.
    <br />
    Check <Code>{stack[0]}</Code> for details or <ShowStackButton {...{ setDetails, details, t }} />
    .
  </div>
)

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
