import React from 'react'
import DebugIcon from '@material-ui/icons/PlayCircleOutline'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/ErrorOutline'
import ErrorIcon from '@material-ui/icons/HighlightOff'
import Markdown from 'react-markdown'

const Event = ({ type, event }) => (
  <div className={`draft-event ${type}`}>
    <div className={`icon ${type}`}>
      {type === 'debug' && <DebugIcon fontSize="small" />}
      {type === 'info' && <InfoIcon fontSize="small" />}
      {type === 'warning' && <WarningIcon fontSize="small" />}
      {type === 'error' && <ErrorIcon fontSize="small" />}
    </div>
    <Markdown source={event} />
  </div>
)

export default Event
