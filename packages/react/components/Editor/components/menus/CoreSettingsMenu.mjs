import React from 'react'
import {
  menuCoreSettingsOnlyHandler,
  menuCoreSettingsSaboolHandler,
  menuCoreSettingsSammHandler,
  menuCoreSettingsStructure,
} from '../../lib/index.mjs'
import {
  MenuBoolInput,
  MenuListInput,
  MenuMmInput,
  MenuOnlySettingInput,
  MenuSliderInput,
} from './Input.mjs'
import {
  //MenuBoolValue,
  MenuListValue,
  MenuMmValue,
  MenuOnlySettingValue,
  MenuScaleSettingValue,
} from './Value.mjs'
import { MenuItemGroup, MenuItem } from './Container.mjs'
import { SettingsIcon } from '@freesewing/react/components/Icon'

/**
 * The core settings menu
 *
 * @param {object} props.Design - An object holding the Design instance
 * @param {Object} props.state - Object holding state
 * @param {Object} props.i18n - Object holding translations loaded from the design
 * @param {Object} props.update - Object holding state handlers
 */
export const CoreSettingsMenu = ({ Design, state, i18n, update }) => {
  const structure = menuCoreSettingsStructure({
    units: state.settings?.units,
    sabool: state.settings?.sabool,
    parts: Design.patternConfig.draftOrder,
  })

  const inputs = {
    complete: MenuListInput,
    expand: MenuListInput,
    margin: MenuMmInput,
    only: MenuOnlySettingInput,
    paperless: MenuBoolInput,
    sabool: MenuBoolInput,
    samm: MenuMmInput,
    scale: MenuSliderInput,
    units: MenuBoolInput,
  }

  const values = {
    complete: MenuListValue,
    expand: MenuListValue,
    margin: MenuMmValue,
    only: MenuOnlySettingValue,
    paperless: MenuListValue,
    sabool: MenuListValue,
    samm: MenuMmValue,
    scale: MenuScaleSettingValue,
    units: MenuListValue,
  }

  return (
    <MenuItemGroup
      {...{
        structure,
        ux: state.ui.ux,
        currentValues: state.settings || {},
        Icon: SettingsIcon,
        Item: (props) => (
          <CoreSetting updateHandler={update} {...{ inputs, values, Design, i18n }} {...props} />
        ),
        isFirst: true,
        name: 'Core Settings',
        passProps: {
          ux: state.ui.ux,
          settings: state.settings,
          patternConfig: Design.patternConfig,
          toggleSa: update.toggleSa,
        },
        updateHandler: update.settings,
        isDesignOptionsGroup: false,
        state,
        Design,
        inputs,
        values,
        i18n,
      }}
    />
  )
}

// Facilitate custom handlers for core settings
const coreSettingsHandlerMethods = {
  only: menuCoreSettingsOnlyHandler,
  sabool: menuCoreSettingsSaboolHandler,
  samm: menuCoreSettingsSammHandler,
}

/** A wrapper for {@see MenuItem} to handle core settings-specific business */
export const CoreSetting = ({ name, config, ux, updateHandler, current, passProps, ...rest }) => {
  // is toggling allowed?
  const allowToggle = ux > 3 && config.list?.length === 2

  const handlerArgs = {
    updateHandler,
    current,
    config,
    ...passProps,
  }

  /*
   * Load a specific update handler if one is configured
   */
  const handler = coreSettingsHandlerMethods[name.toLowerCase()]
    ? coreSettingsHandlerMethods[name.toLowerCase()](handlerArgs)
    : updateHandler

  return (
    <MenuItem
      {...{
        name,
        config,
        ux,
        current,
        passProps,
        ...rest,
        allowToggle,
        updateHandler: handler,
      }}
    />
  )
}

export const ClearAllButton = ({ setSettings, compact = false }) => {
  return (
    <div className={`${compact ? '' : 'text-center mt-8'}`}>
      <button
        className={`justify-self-center btn btn-error btn-outline ${compact ? 'btn-sm' : ''}`}
        onClick={() => setSettings({})}
      >
        <TrashIcon />
        Clear Settings
      </button>
    </div>
  )
}
