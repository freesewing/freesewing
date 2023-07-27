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

export const ns = [...coreMenuNs, ...designMenuNs, ...uiNs]

export const DraftMenu = ({
  design,
  patternConfig,
  setSettings,
  settings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
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
    DynamicDocs,
    control,
  }

  return (
    <nav>
      <DesignOptions {...menuProps} />
      <CoreSettings {...menuProps} />
      <UiSettings {...menuProps} {...{ ui, view, setView }} />
      <ClearAllButton setSettings={setSettings} />
    </nav>
  )
}
