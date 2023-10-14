//  __SDEFILE__ - This file is a dependency for the stand-alone environment
//Dependencies
import { loadSettingsConfig } from './config.mjs'
// Components
import { WorkbenchMenu } from '../shared/index.mjs'
import { MenuItem } from '../shared/menu-item.mjs'
import { DesktopIcon } from 'shared/components/icons.mjs'
import { inputs } from './inputs.mjs'
import { values } from './values.mjs'
import { DynamicMdx } from 'shared/components/mdx/dynamic.mjs'

export const ns = ['ui-settings']

const UiSetting = ({ name, control, ...rest }) => (
  <MenuItem
    {...rest}
    name={name}
    allowToggle={!['control', 'view'].includes(name) && control > 3}
    control={control}
    docs={
      <DynamicMdx
        language={rest.language}
        slug={
          name === 'control'
            ? 'docs/site/account/control'
            : `docs/site/draft/ui-settings/${name.toLowerCase()}`
        }
      />
    }
  />
)

export const UiSettings = ({ update, ui, control, language, view, setView }) => {
  const settingsConfig = loadSettingsConfig()

  return (
    <WorkbenchMenu
      {...{
        config: settingsConfig,
        control,
        currentValues: ui,
        Icon: DesktopIcon,
        inputs,
        Item: UiSetting,
        values,
        language,
        name: 'uiSettings',
        ns,
        updateFunc: update.ui,
        passProps: { view, setView },
      }}
    />
  )
}
