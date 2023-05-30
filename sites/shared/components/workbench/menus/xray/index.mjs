import { XrayIcon } from 'shared/components/icons.mjs'
//import { ConsoleLog } from './log.mjs'
//import { XrayReset } from './reset.mjs'
//import { XrayList } from './list.mjs'
import { useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import { Popout } from 'shared/components/popout.mjs'
import { WorkbenchMenu } from '../shared/index.mjs'
import { BoolInput } from '../shared/inputs.mjs'

export const ns = ['xray']

export const XrayMenu = ({ update, ui, DynamicDocs }) => {
  const { t } = useTranslation(ns)
  const enabled = !!ui.xray?.enabled
  const toggleXray = useCallback(
    () => update.ui(['xray', 'enabled'], Number(!enabled)),
    [enabled, update]
  )

  return (
    <WorkbenchMenu
      {...{
        DynamicDocs,
        Icon: XrayIcon,
        name: 'xrayPattern',
        ns,
      }}
    >
      <Popout fixme>Implement X-Ray</Popout>
      <BoolInput
        {...{
          name: 'enabled',
          current: Number(enabled),
          config: { dflt: 0 },
          updateFunc: toggleXray,
          t,
        }}
      />
    </WorkbenchMenu>
  )
}

//<ConsoleLog  />
//<XrayReset  />
//{settings.xray.parts &&
//  Object.keys(settings.xray.parts).map((partName) => (
//    <XrayList partName={partName} key={partName} />
//  ))}
