// Dependencies
import { menuDesignOptionsStructure } from '../../lib/index.mjs'
import { designOptionType } from '@freesewing/utils'
// Hooks
import React, { useCallback, useMemo } from 'react'
// Components
import {
  MenuBoolInput,
  MenuConstantInput,
  MenuSliderInput,
  MenuDegInput,
  MenuListInput,
  MenuMmInput,
  MenuPctInput,
} from './Input.mjs'
import {
  MenuBoolValue,
  MenuConstantOptionValue,
  MenuCountOptionValue,
  MenuDegOptionValue,
  MenuListOptionValue,
  MenuMmOptionValue,
  MenuPctOptionValue,
} from './Value.mjs'
import { MenuItemGroup, MenuItem } from './Container.mjs'
import { OptionsIcon } from '@freesewing/react/components/Icon'

/**
 * The design options menu
 *
 * @param {object} props.Design - An object holding the Design instance
 * @param {String} props.isFirst - Boolean indicating whether this is the first/top entry of the menu
 * @param {Object} props.state - Object holding state
 * @param {Object} props.i18n - Object holding translations loaded from the design
 * @param {Object} props.update - Object holding state handlers
 */
export const DesignOptionsMenu = ({ Design, isFirst = true, state, i18n, update }) => {
  const structure = useMemo(
    () =>
      menuDesignOptionsStructure(
        Design.designConfig.data.id,
        Design.patternConfig.options,
        state.settings
      ),
    [Design.designConfig.data.id, Design.patternConfig, state.settings]
  )
  const updateHandler = useCallback(
    (name, value = '__UNSET__') => update.settings(['options', ...name], value),
    [update.settings]
  )

  const drillProps = { Design, state, update, i18n }
  const inputs = {
    bool: (props) => <MenuBoolInput {...drillProps} {...props} />,
    constant: (props) => <MenuConstantInput {...drillProps} {...props} />,
    count: (props) => (
      <MenuSliderInput {...drillProps} {...props} config={{ ...props.config, step: 1 }} />
    ),
    deg: (props) => <MenuDegInput {...drillProps} {...props} />,
    list: (props) => <MenuListInput {...drillProps} {...props} isDesignOption />,
    mm: (props) => <MenuMmInput {...drillProps} {...props} />,
    pct: (props) => <MenuPctInput {...drillProps} {...props} />,
  }
  const values = {
    bool: (props) => <MenuBoolValue {...drillProps} {...props} />,
    constant: (props) => <MenuConstantOptionValue {...drillProps} {...props} />,
    count: (props) => <MenuCountOptionValue {...drillProps} {...props} />,
    deg: (props) => <MenuDegOptionValue {...drillProps} {...props} />,
    list: (props) => <MenuListOptionValue {...drillProps} {...props} />,
    mm: (props) => <MenuMmOptionValue {...drillProps} {...props} />,
    pct: (props) => <MenuPctOptionValue {...drillProps} {...props} />,
  }

  return (
    <MenuItemGroup
      {...{
        structure,
        ux: state.ui.ux,
        currentValues: state.settings.options || {},
        Icon: OptionsIcon,
        Item: (props) => <DesignOption {...{ inputs, values, update, Design }} {...props} />,
        isFirst,
        name: 'Design Options',
        passProps: {
          ux: state.ui.ux,
          settings: state.settings,
          patternConfig: Design.patternConfig,
        },
        updateHandler,
        isDesignOptionsGroup: true,
        state,
        Design,
        inputs,
        values,
        i18n,
      }}
    />
  )
}

/**
 * A wrapper for {@see MenuItem} to handle design option-specific business
 * @param  {Object}    options.config   the config for the item
 * @param  {Object}    options.settings core settings
 * @param  {Object} options.rest     the rest of the props
 */
export const DesignOption = ({ config, settings, ux, inputs, values, ...rest }) => {
  const type = designOptionType(config)
  const Input = inputs[type]
  const Value = values[type]
  const allowOverride = ['pct', 'count', 'deg', 'mm'].includes(type)
  const allowToggle = (ux > 3 && type === 'bool') || (type == 'list' && config.list.length === 2)

  // Hide option?
  if (config?.hide || (typeof config?.hide === 'function' && config.hide(settings))) return null

  return (
    <MenuItem
      {...{
        config,
        ux,
        ...rest,
        Input,
        Value,
        allowOverride,
        allowToggle,
      }}
    />
  )
}
