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
        <Markdown
          source={`
\`\`\`js
${err.name}: ${err.message}
\`\`\`
`}
          className="react-markdown dense"
        />
      </summary>
      <Markdown
        source={`Error in \`${err.fileName}\` line \`${err.lineNumber}:${err.columnNumber}\``}
        className="react-markdown"
      />
      <Markdown
        source={`
\`\`\`js
${err.stack}
\`\`\`
`}
        className="react-markdown"
      />
    </details>
  )

  const formatObject = (obj) => (
    <Markdown
      source={`
\`\`\`json
${JSON.stringify(obj, null, 2)}
\`\`\`
`}
      className="react-markdown"
    />
  )

  const formatEvent = (e, data = false) => {
    if (!data) data = []
    if (typeof e === 'object') {
      if (e instanceof Error === true) data.push(formatError(e))
      else if (Array.isArray(e)) {
        for (const subevent of e) data.concat(formatEvent(subevent, data))
      } else data.push(formatObject(e))
    } else data.push(<Markdown source={e} className="react-markdown" />)

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
