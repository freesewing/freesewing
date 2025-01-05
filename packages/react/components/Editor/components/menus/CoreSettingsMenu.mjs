import React from 'react'
import {
  menuCoreSettingsOnlyHandler,
  menuCoreSettingsSaboolHandler,
  menuCoreSettingsSammHandler,
  menuCoreSettingsStructure,
} from '../../lib/index.mjs'

/**
 * The core settings menu
 * @param  {Object} options.update        settings and ui update functions
 * @param  {Object} options.settings      core settings
 * @param  {Object} options.patternConfig the configuration from the pattern
 * @param  {String} options.language      the menu language
 * @param  {Object} options.account       the user account data
 * @param {object} props.Swizzled - An object holding swizzled code
 */
export const CoreSettingsMenu = ({ update, state, language, Design }) => {
  const structure = menuCoreSettingsStructure({
    language,
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
          <CoreSetting updateHandler={update} {...{ inputs, values, Design }} {...props} />
        ),
        isFirst: true,
        name: 'pe:designOptions',
        language: state.locale,
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
    <Swizzled.components.MenuItem
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

export const ClearAllButton = ({ setSettings, compact = false, Swizzled }) => {
  return (
    <div className={`${compact ? '' : 'text-center mt-8'}`}>
      <button
        className={`justify-self-center btn btn-error btn-outline ${compact ? 'btn-sm' : ''}`}
        onClick={() => setSettings({})}
      >
        <Swizzled.components.TrashIcon />
        {Swizzled.methods.t('clearSettings')}
      </button>
    </div>
  )
}
