import { XrayIcon } from 'shared/components/icons.mjs'
//import { ConsoleLog } from './log.mjs'
//import { XrayReset } from './reset.mjs'
//import { XrayList } from './list.mjs'
import { useTranslation } from 'next-i18next'
import { Popout } from 'shared/components/popout.mjs'

export const ns = ['xray']

export const XrayMenu = ({ design, update, settings, ui, account, control }) => {
  const { t } = useTranslation(ns)

  if (ui.renderer !== 'react' || control < 4) return null

  const toggleXray = () => update.ui(['xray', 'enabled'], ui?.xray?.enabled ? false : true)

  return (
    <>
      <div className="px-2 mt-8">
        {control > 4 ? (
          <div className="border-t border-solid border-base-300 pb-2 mx-36"></div>
        ) : (
          <>
            <h5 className="flex flex-row gap-2 items-center">
              <XrayIcon />
              <span>{t('xray:xrayPattern')}</span>
            </h5>
            <p>{t('core-settings:coreSettings.d')}</p>
          </>
        )}
      </div>
      <Popout fixme>Implement X-Ray</Popout>
    </>
  )
}
