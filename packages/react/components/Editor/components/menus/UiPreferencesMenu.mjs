// Depdendencies
import React from 'react'
import { menuUiPreferencesStructure } from '../../lib/index.mjs'
// Components
import { MenuUxSettingInput, MenuListInput } from './Input.mjs'
import { MenuListValue } from './Value.mjs'
import { MenuItemGroup, MenuItem } from './Container.mjs'
import { Ux } from '@freesewing/react/components/Ux'

export const UiPreferencesMenu = ({ update, state, Design }) => {
  const structure = menuUiPreferencesStructure()

  const drillProps = { Design, state, update }
  const inputs = {
    ux: (props) => <MenuUxSettingInput {...drillProps} {...props} />,
    aside: (props) => <MenuListInput {...drillProps} {...props} />,
    kiosk: (props) => <MenuListInput {...drillProps} {...props} />,
    rotate: (props) => <MenuListInput {...drillProps} {...props} />,
    renderer: (props) => <MenuListInput {...drillProps} {...props} />,
  }
  const values = {
    ux: (props) => <Ux ux={state.ui.ux} {...props} />,
    aside: MenuListValue,
    kiosk: MenuListValue,
    rotate: MenuListValue,
    renderer: MenuListValue,
  }

  return (
    <MenuItemGroup
      {...{
        structure,
        ux: state.ui?.ux,
        currentValues: state.ui || {},
        Item: (props) => (
          <UiPreference updateHandler={update} {...{ inputs, values, Design }} {...props} />
        ),
        isFirst: true,
        name: 'pe:uiPreferences',
        language: state.locale,
        passProps: {
          ux: state.ui?.ux,
          settings: state.settings,
          patternConfig: Design.patternConfig,
        },
        updateHandler: update.ui,
        isDesignOptionsGroup: false,
        state,
        Design,
        inputs,
        values,
      }}
    />
  )
}

export const UiPreference = ({ name, ux, ...rest }) => (
  <MenuItem {...rest} name={name} allowToggle={!['ux', 'view'].includes(name) && ux > 3} ux={ux} />
)
