import React from 'react'
import Event from './event'

const DraftEvents = ({ events }) => (
  <div className="draft-events">
    {['error', 'warning', 'info', 'debug'].map((type) => (
      <div className={`events-${type}`}>
        {events[type].map((event, index) => (
          <Event event={event} type={type} key={index} />
        ))}
      </div>
    ))}
  </div>
)

export default DraftEvents
