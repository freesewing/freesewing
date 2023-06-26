import {
  DesignOptions,
  ns as designMenuNs,
} from 'shared/components/workbench/menus/design-options/index.mjs'
import {
  CoreSettings,
  ClearAllButton,
  ns as coreMenuNs,
} from 'shared/components/workbench/menus/core-settings/index.mjs'
import { PrintSettings, ns as printMenuNs } from './settings.mjs'
import { PrintActions } from './actions.mjs'

export const ns = [...coreMenuNs, ...designMenuNs, ...printMenuNs]

export const PrintMenu = ({
  design,
  patternConfig,
  setSettings,
  settings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
  exportIt,
}) => {
  const control = account.control
  const menuProps = {
    design,
    patternConfig,
    settings,
    update,
    language,
    account,
    DynamicDocs,
    control,
  }
  return (
    <nav className="grow mb-12">
      <PrintActions {...menuProps} ui={ui} exportIt={exportIt} />
      <PrintSettings {...menuProps} ui={ui} />
      <DesignOptions {...menuProps} isFirst={false} />
      <CoreSettings {...menuProps} />
      <ClearAllButton setSettings={setSettings} />
    </nav>
  )
}
