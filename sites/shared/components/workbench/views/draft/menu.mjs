//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import {
  DesignOptions,
  ns as designMenuNs,
} from 'shared/components/workbench/menus/design-options/index.mjs'
import {
  CoreSettings,
  ns as coreMenuNs,
} from 'shared/components/workbench/menus/core-settings/index.mjs'
import { UiSettings, ns as uiNs } from 'shared/components/workbench/menus/ui-settings/index.mjs'
import { useTranslation } from 'next-i18next'
import { patternNsFromPatternConfig, nsMerge } from 'shared/utils.mjs'
import { SettingsIcon, OptionsIcon, DesktopIcon, HelpIcon } from 'shared/components/icons.mjs'
import { Accordion } from 'shared/components/accordion.mjs'
import {
  FlagsAccordionTitle,
  FlagsAccordionEntries,
} from 'shared/components/workbench/views/flags.mjs'
import { collection } from 'site/hooks/use-design.mjs'

export const ns = nsMerge(coreMenuNs, designMenuNs, uiNs, collection)

export const DraftMenu = ({
  design,
  patternConfig,
  //setSettings,
  settings,
  ui,
  update,
  language,
  account,
  view,
  setView,
  flags = false,
}) => {
  const { t } = useTranslation(nsMerge(ns, patternNsFromPatternConfig(patternConfig)))
  const control = account.control
  const menuProps = {
    design,
    patternConfig,
    settings,
    update,
    language,
    account,
    control,
  }

  const sections = [
    {
      name: 'designOptions',
      ns: 'design-options',
      icon: <OptionsIcon className="w-8 h-8" />,
      menu: <DesignOptions {...menuProps} />,
    },
    {
      name: 'coreSettings',
      ns: 'core-settings',
      icon: <SettingsIcon className="w-8 h-8" />,
      menu: <CoreSettings {...menuProps} />,
    },
    {
      name: 'uiSettings',
      ns: 'ui-settings',
      icon: <DesktopIcon className="w-8 h-8" />,
      menu: <UiSettings {...menuProps} {...{ ui, view, setView }} />,
    },
  ]
  // Show tip for lower User Experiences
  if (control <= 3)
    sections.push({
      name: 'missingSettings' + control,
      ns: 'ui-settings',
      icon: <HelpIcon className="w-8 h-8" />,
    })

  const items = []
  if (flags)
    items.push([
      <FlagsAccordionTitle flags={flags} key={1} />,
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
