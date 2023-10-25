//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import {
  DesignOptions,
  ns as designMenuNs,
} from 'shared/components/workbench/menus/design-options/index.mjs'
import {
  CoreSettings,
  ClearAllButton,
  ns as coreMenuNs,
} from 'shared/components/workbench/menus/core-settings/index.mjs'
import { UiSettings, ns as uiNs } from 'shared/components/workbench/menus/ui-settings/index.mjs'
import { Inspector, ns as inspectorNs } from './inspector/menu.mjs'

export const ns = [...coreMenuNs, ...designMenuNs, ...uiNs, inspectorNs]

export const DraftMenu = ({
  design,
  patternConfig,
  setSettings,
  settings,
  ui,
  update,
  language,
  account,
  inspector = false,
  renderProps,
  view,
  setView,
}) => {
  const control = account.control
  const menuProps = {
    design,
    patternConfig,
    settings,
    update,
    language,
    account,
    control,
  }

  return (
    <nav>
      <Inspector {...menuProps} {...{ ui, inspector, renderProps }} />
      <DesignOptions {...menuProps} />
      <CoreSettings {...menuProps} />
      <UiSettings {...menuProps} {...{ ui, view, setView }} />
      <ClearAllButton setSettings={setSettings} />
    </nav>
  )
}
