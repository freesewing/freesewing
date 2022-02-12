import Markdown from 'react-markdown'

const eventBlock = events => events.join("  \n")

const EventGroup = ({ type='info', events=[] }) => events.length > 0 ? (
  <div className="">
    <h3 className="capitalize" id={`events-${type}`}>{type}</h3>
    <div className="mdx ml-2">
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
  <div className="max-w-screen-xl m-auto">
    <div className="flex flex-col">
      <ul className="flex flex-row row-wrap">
        {order.map(type => (props.draft.events[type].length > 0)
          ? (
            <li key={type} className="">
              <a href={`#events-${type}`} className={`text-secondary font-bold capitalize text-xl`}>{type}</a>
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
      {order.map(type => <EventGroup type={type} events={props.draft.events[type]} />)}
    </div>
  </div>
)

export default Events
