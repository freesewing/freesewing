/**
 * The core settings menu
 * @param  {Object} options.update        settings and ui update functions
 * @param  {Object} options.settings      core settings
 * @param  {Object} options.patternConfig the configuration from the pattern
 * @param  {String} options.language      the menu language
 * @param  {Object} options.account       the user account data
 * @param {object} props.Swizzled - An object holding swizzled code
 */
export const CoreSettingsMenu = ({ update, state, language, Design, Swizzled }) => {
  const structure = Swizzled.methods.menuCoreSettingsStructure({
    language,
    units: state.settings?.units,
    sabool: state.settings?.sabool,
    parts: Design.patternConfig.draftOrder,
  })

  const inputs = {
    complete: Swizzled.components.MenuListInput,
    expand: Swizzled.components.MenuListInput,
    margin: Swizzled.components.MenuMmInput,
    only: Swizzled.components.MenuOnlySettingInput,
    paperless: Swizzled.components.MenuBoolInput,
    sabool: Swizzled.components.MenuBoolInput,
    samm: Swizzled.components.MenuMmInput,
    scale: Swizzled.components.MenuSliderInput,
    units: Swizzled.components.MenuBoolInput,
  }

  const values = {
    complete: Swizzled.components.MenuListValue,
    expand: Swizzled.components.MenuListValue,
    margin: Swizzled.components.MenuMmValue,
    only: Swizzled.components.MenuOnlySettingValue,
    paperless: Swizzled.components.MenuListValue,
    sabool: Swizzled.components.MenuListValue,
    samm: Swizzled.components.MenuMmValue,
    scale: Swizzled.components.MenuScaleSettingValue,
    units: Swizzled.components.MenuListValue,
  }

  return (
    <Swizzled.components.MenuItemGroup
      {...{
        structure,
        ux: state.ui.ux,
        currentValues: state.settings || {},
        Icon: Swizzled.components.SettingsIcon,
        Item: (props) => (
          <Swizzled.components.CoreSetting
            updateHandler={update}
            {...{ inputs, values, Swizzled, Design }}
            {...props}
          />
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
        Swizzled,
        state,
        Design,
        inputs,
        values,
      }}
    />
  )
}

/** A wrapper for {@see MenuItem} to handle core settings-specific business */
export const CoreSetting = ({
  Swizzled,
  name,
  config,
  ux,
  updateHandler,
  current,
  passProps,
  ...rest
}) => {
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
  const handler = Swizzled.config.menuCoreSettingsHandlerMethods?.[name.toLowerCase()]
    ? Swizzled.methods[Swizzled.config.menuCoreSettingsHandlerMethods[name.toLowerCase()]](
        handlerArgs
      )
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

export const ClearAllButton = ({ setSettings, compact = false }) => {
  const { t } = useTranslation('core-settings')
  return (
    <div className={`${compact ? '' : 'text-center mt-8'}`}>
      <button
        className={`justify-self-center btn btn-error btn-outline ${compact ? 'btn-sm' : ''}`}
        onClick={() => setSettings({})}
      >
        <TrashIcon />
        {t('clearSettings')}
      </button>
    </div>
  )
}
