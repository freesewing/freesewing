export const DraftMenu = ({ Design, pattern, state, Swizzled, update }) => {
  // Swizzled methods
  const { t } = Swizzled.methods
  // Swizzled components
  const { FlagsAccordionTitle, FlagsAccordionEntries, Accordion, HelpIcon } = Swizzled.components

  const menuProps = { Design, state, Swizzled, pattern, update }

  const sections = [
    {
      name: 'designOptions',
      icon: <Swizzled.components.OptionsIcon className="w-8 h-8" />,
      menu: <Swizzled.components.DesignOptionsMenu {...menuProps} />,
    },
    {
      name: 'coreSettings',
      icon: <Swizzled.components.SettingsIcon className="w-8 h-8" />,
      menu: <Swizzled.components.CoreSettingsMenu {...menuProps} />,
    },
    {
      name: 'uiPreferences',
      icon: <Swizzled.components.UiIcon className="w-8 h-8" />,
      menu: <Swizzled.components.UiPreferencesMenu {...menuProps} />,
    },
  ]

  // Show tip for lower User Experiences
  if (state.ui.control <= 3)
    sections.push({
      name: 'missingSettings' + state.ui.control,
      icon: <HelpIcon className="w-8 h-8" />,
    })

  const items = []
  const flags = pattern.setStores?.[0]?.plugins?.['plugin-annotations']?.flags

  if (flags)
    items.push([
      <FlagsAccordionTitle key={1} {...{ flags, Swizzled }} />,
      <FlagsAccordionEntries {...{ update, state, flags }} key={2} />,
      'flags',
    ])
  items.push(
    ...sections.map((section) => [
      <>
        <h5 className="flex flex-row gap-2 items-center justify-between w-full">
          <span>{t(`pe:${section.name}.t`)}</span>
          {section.icon}
        </h5>
        <p className="text-left">{t(`pe:${section.name}.d`)}</p>
      </>,
      section.menu,
      section.name,
    ])
  )

  return <Accordion items={items} />
}
