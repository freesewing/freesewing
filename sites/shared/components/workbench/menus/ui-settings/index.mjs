//Dependencies
import { loadSettingsConfig } from './config.mjs'
// Components
import { WorkbenchMenu } from '../shared/index.mjs'
import { MenuItem } from '../shared/menu-item.mjs'
import { DesktopIcon } from 'shared/components/icons.mjs'
import { inputs } from './inputs.mjs'
import { values } from './values.mjs'

export const ns = ['ui-settings']

const UiSetting = ({ name, control, ...rest }) => (
  <MenuItem
    {...rest}
    name={name}
    allowToggle={name !== 'control' && control > 3}
    control={control}
  />
)

export const UiSettings = ({ design, update, settings, ui, control, language, DynamicDocs }) => {
  const settingsConfig = loadSettingsConfig(ui)

  return (
    <WorkbenchMenu
      {...{
        config: settingsConfig,
        control,
        currentValues: ui,
        DynamicDocs,
        getDocsPath: (setting) => `site/draft/ui-settings${setting ? `/${setting}` : ''}`,
        Icon: DesktopIcon,
        inputs,
        Item: UiSetting,
        values,
        language,
        name: 'uiSettings',
        ns,
        updateFunc: update.ui,
      }}
    />
  )
}
