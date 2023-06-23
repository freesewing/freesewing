import {
  DesignOptions,
  ns as designMenuNs,
} from 'shared/components/workbench/menus/design-options/index.mjs'
import {
  CoreSettings,
  ns as coreMenuNs,
} from 'shared/components/workbench/menus/core-settings/index.mjs'
import { UiSettings, ns as uiNs } from 'shared/components/workbench/menus/ui-settings/index.mjs'
import { MenuWrapper } from 'shared/components/workbench/menus/shared/menu-wrapper.mjs'
import { WrenchIcon } from 'shared/components/icons.mjs'

export const ns = [...coreMenuNs, ...designMenuNs, ...uiNs]

export const DraftMenu = (props) => {
  return (
    <MenuWrapper Icon={WrenchIcon} childProps={props}>
      {({
        design,
        patternConfig,
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
          <nav className="grow mb-12">
            <DesignOptions {...menuProps} />
            <CoreSettings {...menuProps} />
            <UiSettings {...menuProps} {...{ ui, view, setView }} />
          </nav>
        )
      }}
    </MenuWrapper>
  )
}
