import { loadSettingsConfig as loadUiSettingsConfig } from 'shared/components/workbench/menus/ui-settings/config.mjs'
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
import { nsMerge } from 'shared/utils.mjs'
import { SettingsIcon, OptionsIcon, DesktopIcon } from 'shared/components/icons.mjs'
import { Accordion } from 'shared/components/accordion.mjs'
import {
  FlagsAccordionTitle,
  FlagsAccordionEntries,
} from 'shared/components/workbench/views/flags.mjs'

export const ns = nsMerge(coreMenuNs, designMenuNs, uiNs)

export const DraftMenu = ({
  design,
  patternConfig,
  //setSettings,
  settings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
  view,
  setView,
  flags = false,
}) => {
  const { t } = useTranslation()
  const control = account.control
  const menuProps = {
    design,
    patternConfig,
    settings,
    update,
    language,
    account,
    DynamicDocs,
    control,
  }
  const uiSettingsConfig = loadUiSettingsConfig()

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

  const items = []
  if (control >= uiSettingsConfig.kiosk.control && flags)
    items.push([
      <FlagsAccordionTitle flags={flags} key={1} />,
      <FlagsAccordionEntries {...{ update, control, flags }} key={2} />,
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
    ])
  )

  return <Accordion items={items} />
}
