// Dependencies
import { menuDesignOptionsStructure } from '../../lib/index.mjs'
// Hooks
import React, { useCallback, useMemo } from 'react'
// Components
import {
  MenuBoolInput,
  MenuConstantInput,
  MenuSliderInput,
  MenuDegInput,
  MenuListInput,
  MenuPctInput,
} from './Input.mjs'
import {
  MenuBoolValue,
  MenuConstantOptionValue,
  MenuCountOptionValue,
  MenuDegOptionValue,
  MenuListOptionValue,
  MenyMmOptionValue,
  MenuPctOptionValue,
} from './Value.mjs'
import { MenuItemGroup } from './Container.mjs'
import { OptionsIcon } from '@freesewing/react/components/Icon'

//
/**
 * The design options menu
 * @param {object} props.Design - An object holding the Design instance
 * @param {String} props.isFirst - Boolean indicating whether this is the first/top entry of the menu
 * @param {Object} props.state - Object holding state
 * @param {Object} props.update - Object holding state handlers
 */
export const DesignOptionsMenu = ({ Design, isFirst = true, state, update }) => {
  const structure = useMemo(
    () => menuDesignOptionsStructure(Design.patternConfig.options, state.settings),
    [Design.patternConfig, state.settings]
  )
  const updateHandler = useCallback(
    (name, value = '__UNSET__') => update.settings(['options', ...name], value),
    [update.settings]
  )

  const drillProps = { Design, state, update }
  const inputs = {
    bool: (props) => <MenuBoolInput {...drillProps} {...props} />,
    constant: (props) => <MenuConstantInput {...drillProps} {...props} />,
    count: (props) => (
      <MenuSliderInput {...drillProps} {...props} config={{ ...props.config, step: 1 }} />
    ),
    deg: (props) => <MenuDegInput {...drillProps} {...props} />,
    list: (props) => <MenuListInput {...drillProps} {...props} isDesignOption />,
    mm: () => <span>FIXME: Mm options are deprecated. Please report this </span>,
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
        name: 'pe:designOptions',
        language: state.locale,
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
  const allowOverride = ['pct', 'count', 'deg'].includes(type)
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
