import XrayIcon from 'shared/components/icons/xray.js'
import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'
import Reset from './reset.js'
import Disable from './disable.js'
import List from './list.js'
import { Ul, Details, TopSummary } from 'shared/components/workbench/menu'
import { useTranslation } from 'next-i18next'

const Xray = props => {
  const { t } = useTranslation(['app', 'settings'])

  return (
    <Details open>
      <TopSummary icon={<XrayIcon />}>
        {props.gist?.xray?.enabled
          ? (
            <>
              <span className={`grow ${linkClasses} hover:cursor-resize font-bold uppercase`}>
                {t('settings:xray.t')}
              </span>
              <Chevron />
            </>
          ) : (
            <>
            <button
              className={`grow ${linkClasses} hover:cursor-resize uppercase font-bold text-left`}
              onClick={() => props.updateGist(['xray', 'enabled'], true)}
            >
              {t('settings:xray.t')}
            </button>
            <span className="text-normal text-secondary">
              {t('cfp:thingIsDisabled', { thing: t('settings:xray.t') })}
            </span>
            </>
          )
        }
      </TopSummary>
      {props.gist?.xray?.enabled && (
        <Ul>
          <Disable {...props} />
          <Reset {...props} />
          {
            props.gist?.xray?.parts &&
            Object.keys(props.gist.xray.parts).map(partName => <List {...props} partName={partName} />)
          }
        </Ul>
      )}
    </Details>
  )
}

export default Xray
