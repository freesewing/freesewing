import XrayIcon from 'shared/components/icons/xray.js'
import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'
import Reset from './reset.js'
import Disable from './disable.js'
import List from './list.js'

const Xray = props => {

  return (
    <details className='py-1' open>
      <summary className={`
        flex flex-row gap-4 text-lg
        hover:cursor-row-resize
        p-2
        text-base-content
        sm:text-neutral-content
        items-center
      `}>
        <span className="text-secondary-focus mr-4"><XrayIcon /></span>
        {props.gist?.xray?.enabled
          ? (
            <>
              <span className={`grow ${linkClasses} hover:cursor-resize font-bold uppercase`}>
                {props.app.t('settings.xray.title')}
              </span>
              <Chevron />
            </>
          ) : (
            <>
            <button
              className={`grow ${linkClasses} hover:cursor-resize uppercase font-bold text-left`}
              onClick={() => props.updateGist(['xray', 'enabled'], true)}
            >
              {props.app.t('settings.xray.title')}
            </button>
            <span className="text-normal text-secondary">
              {props.app.t('cfp.thingIsDisabled', { thing: props.app.t('settings.xray.title') })}
            </span>
            </>
          )
        }
      </summary>
      {props.gist?.xray?.enabled && (
        <ul className="pl-5 list-inside">
          <Disable {...props} />
          <Reset {...props} />
          {
            props.gist?.xray?.parts &&
            Object.keys(props.gist.xray.parts).map(partName => <List {...props} partName={partName} />)
          }
        </ul>
      )}
    </details>
  )
}

export default Xray
