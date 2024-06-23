import { useCallback, useMemo } from 'react'

/**
 * The design options menu
 * @param {object} props.Design - An object holding the Design instance
 * @param {String} props.isFirst - Boolean indicating whether this is the first/top entry of the menu
 * @param {Object} props.state - Object holding state
 * @param {Object} props.update - Object holding state handlers
 * @param {object} props.Swizzled - An object holding swizzled code
 */
export const DesignOptionsMenu = ({ Design, isFirst = true, state, update, Swizzled }) => {
  const structure = useMemo(
    () => Swizzled.methods.menuOptionsStructure(Design.patternConfig.options, state.settings),
    [Design.patternConfig, state.settings]
  )
  const updateHandler = useCallback(
    (name, value = '__UNSET__') => update.settings(['options', ...name], value),
    [update.settings]
  )

  const drillProps = { Design, state, update, Swizzled }
  const inputs = {
    bool: (props) => <Swizzled.components.MenuBoolInput {...drillProps} {...props} />,
    constant: (props) => <Swizzled.components.MenuConstantInput {...drillProps} {...props} />,
    count: (props) => (
      <Swizzled.components.MenuSliderInput
        {...drillProps}
        {...props}
        config={{ ...props.config, step: 1 }}
      />
    ),
    deg: (props) => <Swizzled.components.MenuDegInput {...drillProps} {...props} />,
    list: (props) => (
      <Swizzled.components.MenuListInput {...drillProps} {...props} isDesignOption />
    ),
    mm: () => <span>FIXME: Mm options are deprecated. Please report this </span>,
    pct: (props) => <Swizzled.components.MenuPctInput {...drillProps} {...props} />,
  }
  const values = {
    bool: (props) => <Swizzled.components.MenuBoolValue {...drillProps} {...props} />,
    constant: (props) => <Swizzled.components.MenuConstantOptionValue {...drillProps} {...props} />,
    count: (props) => <Swizzled.components.MenuCountOptionValue {...drillProps} {...props} />,
    deg: (props) => <Swizzled.components.MenuDegOptionValue {...drillProps} {...props} />,
    list: (props) => <Swizzled.components.MenuListOptionValue {...drillProps} {...props} />,
    mm: (props) => <Swizzled.components.MenuMmOptionValue {...drillProps} {...props} />,
    pct: (props) => <Swizzled.components.MenuPctOptionValue {...drillProps} {...props} />,
  }

  return (
    <Swizzled.components.MenuItemGroup
      {...{
        structure,
        control: state.control,
        currentValues: state.settings.options || {},
        Icon: Swizzled.components.OptionsIcon,
        Item: (props) => (
          <Swizzled.components.DesignOption
            {...{ inputs, values, Swizzled, update, Design }}
            {...props}
          />
        ),
        isFirst,
        name: 'pe:designOptions',
        language: state.locale,
        passProps: {
          control: state.control,
          settings: state.settings,
          patternConfig: Design.patternConfig,
        },
        updateHandler,
        isDesignOptionsGroup: true,
        Swizzled,
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
export const DesignOption = ({ config, settings, control, inputs, values, Swizzled, ...rest }) => {
  const type = Swizzled.methods.menuOptionType(config)
  const Input = inputs[type]
  const Value = values[type]
  const allowOverride = ['pct', 'count', 'deg'].includes(type)
  const allowToggle =
    (control > 3 && type === 'bool') || (type == 'list' && config.list.length === 2)

  // Hide option?
  if (config?.hide || (typeof config?.hide === 'function' && config.hide(settings))) return null

  return (
    <Swizzled.components.MenuItem
      {...{
        config,
        control,
        ...rest,
        Swizzled,
        Input,
        Value,
        allowOverride,
        allowToggle,
      }}
    />
  )
}
