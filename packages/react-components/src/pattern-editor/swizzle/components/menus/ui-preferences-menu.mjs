const Alt = () => <p>alt</p>

export const UiPreferencesMenu = ({ Swizzled, update, state, Design }) => {
  const structure = Swizzled.methods.menuUiPreferencesStructure()

  const drillProps = { Design, state, update }
  const inputs = {
    control: (props) => <Swizzled.components.MenuControlSettingInput {...drillProps} {...props} />,
    kiosk: (props) => <Swizzled.components.MenuListInput {...drillProps} {...props} />,
    renderer: (props) => <Swizzled.components.MenuListInput {...drillProps} {...props} />,
  }
  const values = {
    control: (props) => <Swizzled.components.Control control={state.control} {...props} />,
    kiosk: Swizzled.components.MenuListValue,
    renderer: Swizzled.components.MenuListValue,
  }

  return (
    <Swizzled.components.MenuItemGroup
      {...{
        structure,
        control: state.control,
        currentValues: state.ui || {},
        //    Icon: Swizzled.components.UiIcon,
        Item: (props) => (
          <Swizzled.components.UiPreference
            updateHandler={update}
            {...{ inputs, values, Swizzled, Design }}
            {...props}
          />
        ),
        isFirst: true,
        name: 'pe:uiSettings',
        language: state.locale,
        passProps: {
          control: state.control,
          settings: state.settings,
          patternConfig: Design.patternConfig,
        },
        updateHandler: update.ui,
        isDesignOptionsGroup: false,
        Swizzled,
        state,
        Design,
        inputs,
        values,
      }}
    />
  )
}

export const UiPreference = ({ Swizzled, name, control, ...rest }) => (
  <Swizzled.components.MenuItem
    {...rest}
    name={name}
    allowToggle={!['control', 'view'].includes(name) && control > 3}
    control={control}
  />
)
