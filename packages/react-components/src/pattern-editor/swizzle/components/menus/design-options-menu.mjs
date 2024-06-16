import { useCallback, useMemo } from 'react'

/**
 * The design options menu
 * @param  {String}  options.design        the name of the design
 * @param  {Object}  options.patternConfig the configuration from the pattern
 * @param  {Object}  options.settings      core settings
 * @param  {Object}  options.update        settings and ui update functions
 * @param  {String}  options.language      the menu language
 * @param  {Object}  options.account       the user account data
 */
export const DesignOptionsMenu = ({ isFirst = true, update, swizzled, state, Design }) => {
  // Swizzled methods
  const { menuOptionType, menuOptionsStructure } = swizzled.methods
  // Swizzled components
  const {
    BoolNoIcon,
    BoolYesIcon,
    ButtonFrame,
    DesignIcon,
    MenuBoolInput,
    MenuBoolValue,
    MenuConstantInput,
    MenuConstantOptionValue,
    MenuCountOptionValue,
    MenuDegInput,
    MenuDegOptionValue,
    MenuHighlightValue,
    MenuItem,
    MenuItemGroup,
    MenuListInput,
    MenuListOptionValue,
    MenuMmOptionValue,
    MenuPctInput,
    MenuPctOptionValue,
    MenuSliderInput,
    OptionsIcon,
  } = swizzled.components

  const structure = useMemo(
    () => menuOptionsStructure(Design.patternConfig.options, state.settings),
    [Design.patternConfig, state.settings]
  )
  const updateHandler = useCallback(
    (name, value) => update.settings(['options', ...name], value),
    [update.settings]
  )

  const drillProps = { swizzled, control: state.control }
  const inputs = {
    bool: (props) => <MenuBoolInput {...props} {...drillProps} />,
    constant: (props) => <MenuConstantInput {...props} {...drillProps} />,
    count: (props) => (
      <MenuSliderInput {...props} {...drillProps} config={{ ...props.config, step: 1 }} />
    ),
    deg: (props) => <MenuDegInput {...props} {...drillProps} />,
    list: (props) => <MenuListInput {...props} {...drillProps} isDesignOption />,
    mm: () => <span>FIXME: Mm options are deprecated. Please report this </span>,
    pct: (props) => <MenuPctInput {...props} {...drillProps} />,
  }
  const values = {
    bool: (props) => <MenuBoolValue {...props} {...drillProps} />,
    constant: (props) => <MenuConstantOptionValue {...props} {...drillProps} />,
    count: (props) => <MenuCountOptionValue {...props} {...drillProps} />,
    deg: (props) => <MenuDegOptionValue {...props} {...drillProps} />,
    list: (props) => <MenuListOptionValue {...props} {...drillProps} />,
    mm: (props) => <MenuMmOptionValue {...props} {...drillProps} />,
    pct: (props) => <MenuPctOptionValue {...props} {...drillProps} />,
  }

  return (
    <MenuItemGroup
      {...{
        structure,
        control: state.control,
        currentValues: state.settings.options || {},
        Icon: OptionsIcon,
        Item: (props) => (
          <DesignOption
            {...props}
            {...{ menuOptionType, inputs, values, MenuItem, swizzled, update, Design }}
          />
        ),
        isFirst,
        name: 'design-options:designOptions',
        language: state.locale,
        passProps: { settings: state.settings, patternConfig: Design.patternConfig },
        updateHandler,
        isDesignOptionsGroup: true,
        swizzled,
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
const DesignOption = ({
  config,
  settings,
  control,
  inputs,
  values,
  MenuItem,
  swizzled,
  ...rest
}) => {
  const type = swizzled.methods.menuOptionType(config)
  const Input = inputs[type]
  const Value = values[type]
  const allowOverride = ['pct', 'count', 'deg'].includes(type)
  const allowToggle =
    (control > 3 && type === 'bool') || (type == 'list' && config.list.length === 2)

  // Hide option?
  if (config?.hide || (typeof config?.hide === 'function' && config.hide(settings))) return null

  return (
    <MenuItem
      {...{
        config,
        control,
        ...rest,
        swizzled,
        Input,
        Value,
        allowOverride,
        allowToggle,
      }}
    />
  )
}
