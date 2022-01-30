import Robot from 'shared/components/robot/index.js'
import Events from './events.js'

const Error = props => (
  <div className="mt-12">
    <div className="flex flex-row items-center justify-around">
      <h1>{props.app.t('errors.something')}</h1>
      <div className="max-w-96"><Robot pose='fail' embed/></div>
    </div>
    <Events events={props.draft.events} />
  </div>
)

export default Error

