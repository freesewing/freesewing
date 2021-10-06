import React from 'react'
import Event from './event'

const DraftEvents = ({ events, types = ['error', 'warning', 'debug'] }) => (
  <div className="draft-events">
    {types.map((type) => (
      <div className={`events-${type}`} key={type}>
        {events[type].map((event, index) => (
          <Event event={event} type={type} key={index} />
        ))}
      </div>
    ))}
  </div>
)

export default DraftEvents
