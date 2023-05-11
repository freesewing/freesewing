import { XrayIcon } from 'shared/components/icons.mjs'
import { linkClasses, Chevron } from 'shared/components/navigation/primary.mjs'
import { ConsoleLog } from './log.mjs'
import { XrayReset } from './reset.mjs'
import { XrayDisable } from './disable.mjs'
import { XrayList } from './list.mjs'
import { Ul, Details, TopSummary } from 'shared/components/workbench/menus/index.mjs'
import { useTranslation } from 'next-i18next'

export const XrayMenu = (props) => {
  const { t } = useTranslation(['app', 'settings'])

  return (
    <Details open>
      <TopSummary icon={<XrayIcon />}>
        {props.gist?._state?.xray?.enabled ? (
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
              onClick={() => props.updateGist(['_state', 'xray', 'enabled'], true)}
            >
              {t('settings:xray.t')}
            </button>
            <span className="text-normal text-secondary">
              {t('cfp:thingIsDisabled', { thing: t('settings:xray.t') })}
            </span>
          </>
        )}
      </TopSummary>
      {props.gist?._state?.xray?.enabled && (
        <Ul>
          <XrayDisable {...props} />
          <ConsoleLog {...props} />
          <XrayReset {...props} />
          {props.gist?._state?.xray?.parts &&
            Object.keys(props.gist._state.xray.parts).map((partName) => (
              <XrayList {...props} partName={partName} key={partName} />
            ))}
        </Ul>
      )}
    </Details>
  )
}
