import { XrayIcon, HelpIcon } from 'shared/components/icons.mjs'
//import { ConsoleLog } from './log.mjs'
//import { XrayReset } from './reset.mjs'
//import { XrayList } from './list.mjs'
import { useTranslation } from 'next-i18next'
import { Collapse } from 'shared/components/collapse.mjs'
import { ChoiceButton } from 'shared/components/choice-button.mjs'
import { Popout } from 'shared/components/popout.mjs'

export const ns = ['xray']

export const XrayMenu = ({ design, update, settings, ui }) => {
  const { t } = useTranslation(ns)

  const toggleXray = () => update.ui(['xray', 'enabled'], ui?.xray?.enabled ? false : true)

  return (
    <Collapse
      bottom
      color="primary"
      title={
        <div className="w-full flex flex-row gap2 items-center justify-between">
          <span className="font-bold">{t('xray:xrayPattern')}</span>
          <XrayIcon className="w-6 h-6 text-primary" />
        </div>
      }
      openTitle={t('xray:xrayPattern')}
      openButtons={[
        <button className="btn btn-xs btn-ghost px-0 z-10" onClick={(evt) => loadDocs(evt)}>
          <HelpIcon className="w-4 h-4" />
        </button>,
      ]}
    >
      <Popout fixme>Implement X-Ray</Popout>
      <ChoiceButton
        title={t(`yes`)}
        color={ui?.xray?.enabled ? 'primary' : 'accent'}
        active={ui?.xray?.enabled}
        onClick={toggleXray}
      >
        {t(`xray:yes.t`)}
      </ChoiceButton>
      <ChoiceButton
        title={t(`no`)}
        color={ui?.xray?.enabled ? 'accent' : 'primary'}
        active={!ui?.xray?.enabled}
        onClick={toggleXray}
      >
        {t(`xray:no.t`)}
      </ChoiceButton>
      {ui?.xray?.enabled && (
        <>
          <p>xray here</p>
        </>
      )}
    </Collapse>
  )
}

//<ConsoleLog  />
//<XrayReset  />
//{settings.xray.parts &&
//  Object.keys(settings.xray.parts).map((partName) => (
//    <XrayList partName={partName} key={partName} />
//  ))}
