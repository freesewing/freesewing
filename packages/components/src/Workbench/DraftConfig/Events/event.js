import React from 'react'
import DebugIcon from '@material-ui/icons/PlayCircleOutline'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/ErrorOutline'
import ErrorIcon from '@material-ui/icons/HighlightOff'
import Markdown from 'react-markdown'

const Event = ({ type, event }) => {
  const formatError = (err) => (
    <details>
      <summary>
        <Markdown className="react-markdown dense">
          {`
\`\`\`js
${err.name}: ${err.message}
\`\`\`
`}</Markdown>
      </summary>
      <Markdown className="react-markdown">
        {`Error in \`${err.fileName}\` line \`${err.lineNumber}:${err.columnNumber}\``}
      </Markdown>
      <Markdown className="react-markdown">
        ={`
\`\`\`js
${err.stack}
\`\`\`
`}</Markdown>
    </details>
  )

  const formatObject = (obj) => (
    <Markdown className="react-markdown">
      source={`
\`\`\`json
${JSON.stringify(obj, null, 2)}
\`\`\`
`}</Markdown>
  )

  const formatEvent = (e, data = false) => {
    if (!data) data = []
    if (typeof e === 'object') {
      if (e instanceof Error === true) data.push(formatError(e))
      else if (Array.isArray(e)) {
        for (const subevent of e) data.concat(formatEvent(subevent, data))
      } else data.push(formatObject(e))
    } else data.push(<Markdown className="react-markdown">{e}</Markdown>)

    return data
  }

  return (
    <div className={`draft-event ${type}`}>
      <div className={`icon ${type}`}>
        {type === 'debug' && <DebugIcon fontSize="small" />}
        {type === 'info' && <InfoIcon fontSize="small" />}
        {type === 'warning' && <WarningIcon fontSize="small" />}
        {type === 'error' && <ErrorIcon fontSize="small" />}
      </div>
      {formatEvent(event)}
    </div>
  )
}

export default Event
