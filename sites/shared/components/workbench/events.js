import Markdown from 'react-markdown'

// Markdown wrapper to suppress creation of P tags
const Md = ({ children }) => <Markdown components={{ p: props => props.children }}>{children}</Markdown>

const renderEvent = evt => Array.isArray(evt)
  ? <Md>{evt[0]}</Md>
  : typeof evt === 'object'
  ? JSON.stringify(evt, null, 2)
  : <Md>{evt}</Md>

const EventGroup = ({ type='info', events=[] }) => events.length > 0 ? (
  <div className="">
    <h3 className="capitalize" id={`events-${type}`}>{type}</h3>
    <table className="table w-full mdx">
      <thead>
        <tr>
          <th className="text-right w-16">#</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {events.map((evt, i) => (
          <tr key={i} className="leading-1 hover:bg-base-200 hover:bg-opacity-40">
            <td className="text-right p-1 pr-4 font-bold opacity-80 text-accent">{i}</td>
            <td className="p-1 pl-4">{renderEvent(evt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : null

const order = [
  'error',
  'warning',
  'info',
  'debug'
]
const Events = props => props?.draft?.events
  ? (
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
  ) : null

export default Events
