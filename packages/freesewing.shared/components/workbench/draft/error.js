import Robot from 'shared/components/robot/index.js'
import Events from '../events.js'
import { useTranslation } from 'next-i18next'

const Error = props => {
  const { t } = useTranslation(['errors'])

  return (
    <div className="mt-12">
      <div className="flex flex-row items-center justify-around">
        <h1>{t('errors:something')}</h1>
        <div className="max-w-96"><Robot pose='fail' embed/></div>
      </div>
      <Events events={props.draft.events} />
    </div>
  )
}


export default Error

