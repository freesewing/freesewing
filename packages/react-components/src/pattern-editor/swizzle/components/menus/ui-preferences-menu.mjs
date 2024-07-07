const Alt = () => <p>alt</p>

export const UiPreferencesMenu = ({ Swizzled, update, state, Design }) => {
  const structure = Swizzled.methods.menuUiPreferencesStructure()

  const drillProps = { Design, state, update }
  const inputs = {
    ux: (props) => <Swizzled.components.MenuUxSettingInput {...drillProps} {...props} />,
    kiosk: (props) => <Swizzled.components.MenuListInput {...drillProps} {...props} />,
    renderer: (props) => <Swizzled.components.MenuListInput {...drillProps} {...props} />,
  }
  const values = {
    ux: (props) => <Swizzled.components.Ux ux={state.ui.ux} {...props} />,
    kiosk: Swizzled.components.MenuListValue,
    renderer: Swizzled.components.MenuListValue,
  }

  return (
    <Swizzled.components.MenuItemGroup
      {...{
        structure,
        ux: state.ui.ux,
        currentValues: state.ui || {},
        Item: (props) => (
          <Swizzled.components.UiPreference
            updateHandler={update}
            {...{ inputs, values, Swizzled, Design }}
            {...props}
          />
        ),
        isFirst: true,
        name: 'pe:uiPreferences',
        language: state.locale,
        passProps: {
          ux: state.ui.ux,
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

export const UiPreference = ({ Swizzled, name, ux, ...rest }) => (
  <Swizzled.components.MenuItem
    {...rest}
    name={name}
    allowToggle={!['ux', 'view'].includes(name) && ux > 3}
    ux={ux}
  />
)
