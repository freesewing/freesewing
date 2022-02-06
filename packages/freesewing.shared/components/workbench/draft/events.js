import Markdown from 'react-markdown'
import { linkClasses } from 'shared/components/navigation/primary.js'

const eventBlock = events => events.join("  \n")

const EventGroup = ({ type='info', events=[] }) => events.length > 0 ? (
  <div className="">
    <h3 className="capitalize" id={`events-${type}`}>{type}</h3>
    <div className="mdx">
      <Markdown>{eventBlock(events)}</Markdown>
    </div>
  </div>
) : null

const order = [
  'error',
  'warning',
  'info',
  'debug'
]

const Events = props => (
  <div className="flex flex-col">
    <ul className="flex flex-row row-wrap">
      {order.map(type => (
        <li key={type} className="">
          <a href={`#events-${type}`} className={`text-secondary font-bold capitalize text-xl`}>{type}</a>
          {type === 'debug' ? '' : <span className="px-2 font-bold">|</span>}
        </li>
      ))}
    </ul>
    {order.map(type => <EventGroup type={type} events={props.events[type]} />)}
  </div>
)

export default Events
