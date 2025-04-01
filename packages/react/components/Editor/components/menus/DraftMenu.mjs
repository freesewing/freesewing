import React from 'react'
import { OptionsIcon, SettingsIcon, UiIcon } from '@freesewing/react/components/Icon'
import { DesignOptionsMenu } from './DesignOptionsMenu.mjs'
import { CoreSettingsMenu } from './CoreSettingsMenu.mjs'
import { UiPreferencesMenu } from './UiPreferencesMenu.mjs'
import { FlagsAccordionEntries } from '../Flag.mjs'
import { Accordion } from '../Accordion.mjs'

export const DraftMenu = ({ Design, pattern, state, update, i18n }) => {
  const menuProps = { Design, state, pattern, update }

  const sections = [
    {
      t: 'Design Options',
      d: 'These options are specific to this design. You can use them to customize your pattern in a variety of ways.',
      icon: <OptionsIcon className="tw-w-8 tw-h-8" />,
      menu: <DesignOptionsMenu {...menuProps} />,
    },
    {
      t: 'Core Settings',
      d: 'These settings are not specific to the design, but instead allow you to customize various parameters of the FreeSewing core library, which generates the design for you.',
      icon: <SettingsIcon className="tw-w-8 tw-h-8" />,
      menu: <CoreSettingsMenu {...menuProps} />,
    },
    {
      t: 'UI Preferences',
      d: 'These preferences control the UI (User Interface) of the pattern editor',
      icon: <UiIcon className="tw-w-8 tw-h-8" />,
      menu: <UiPreferencesMenu {...menuProps} />,
    },
  ]

  const items = []
  items.push(
    ...sections.map((section) => [
      <>
        <h5 className="tw-flex tw-flex-row tw-gap-2 tw-items-center tw-justify-between tw-w-full tw-font-bold tw-text-lg">
          <span>{section.t}</span>
          {section.icon}
        </h5>
        <p className="tw-text-left">{section.d}</p>
      </>,
      section.menu,
      section.name,
    ])
  )

  const flags = pattern.setStores?.[0]?.plugins?.['plugin-annotations']?.flags

  if (flags)
    items.push([
      <FlagsAccordionTitle key={1} {...{ flags, pattern, i18n }} />,
      <FlagsAccordionEntries {...{ update, state, flags }} key={2} />,
      'flags',
    ])

  return <Accordion items={items} />
}
