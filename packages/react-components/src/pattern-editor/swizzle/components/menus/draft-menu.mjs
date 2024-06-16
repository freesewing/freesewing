export const DraftMenu = (props) => {
  const { control, Design, update, methods, components } = props
  const { t } = methods
  const {
    OptionsIcon,
    DesignOptionsMenu,
    SettingsIcon,
    CoreSettingsMenu,
    UiIcon,
    UiSettingsMenu,
    FlagsAccordionTitle,
    FlagsAccordionEntries,
    Accordion,
  } = components

  const menuProps = {
    Design: props.Design,
    state: props.state,
    components: props.components,
    methods: props.methods,
    hooks: props.hooks,
    control: props.control,
    pattern: props.pattern,
    update,
  }

  const sections = [
    {
      name: 'designOptions',
      ns: 'design-options',
      icon: <OptionsIcon className="w-8 h-8" />,
      menu: <DesignOptionsMenu {...menuProps} />,
    },
    //{
    //  name: 'coreSettings',
    //  ns: 'core-settings',
    //  icon: <SettingsIcon className="w-8 h-8" />,
    //  menu: <CoreSettingsMenu {...menuProps} />,
    //},
    //{
    //  name: 'uiSettings',
    //  ns: 'ui-settings',
    //  icon: <UiIcon className="w-8 h-8" />,
    //  menu: <UiSettingsMenu {...menuProps} {...{ ui, view, setView }} />,
    //},
  ]

  // Show tip for lower User Experiences
  if (control <= 3)
    sections.push({
      name: 'missingSettings' + control,
      ns: 'ui-settings',
      icon: <HelpIcon className="w-8 h-8" />,
    })

  const items = []
  const flags = props.pattern.setStores?.[0]?.plugins?.['plugin-annotations']?.flags

  if (flags)
    items.push([
      <FlagsAccordionTitle key={1} {...{ flags, methods, components }} />,
      <FlagsAccordionEntries {...{ update, control, flags }} key={2} />,
      'flags',
    ])
  items.push(
    ...sections.map((section) => [
      <>
        <h5 className="flex flex-row gap-2 items-center justify-between w-full">
          <span>{t(`${section.ns}:${section.name}.t`)}</span>
          {section.icon}
        </h5>
        <p className="text-left">{t(`${section.ns}:${section.name}.d`)}</p>
      </>,
      section.menu,
      section.name,
    ])
  )

  return <Accordion items={items} />
}
