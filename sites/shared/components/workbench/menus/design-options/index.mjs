// Hooks
import { useContext, useState } from 'react'
import { useTranslation } from 'next-i18next'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { Collapse } from 'shared/components/collapse.mjs'
import { OptionsIcon, ClearIcon, HelpIcon, EditIcon } from 'shared/components/icons.mjs'
import { optionsMenuStructure } from 'shared/utils.mjs'
import { optionType } from 'shared/utils.mjs'
import {
  BoolInput,
  ConstantInput,
  SliderInput,
  DegInput,
  ListInput,
  MmInput,
  PctInput,
} from '../shared/inputs.mjs'
import {
  BoolOptionValue,
  ConstantOptionValue,
  CountOptionValue,
  DegOptionValue,
  ListOptionValue,
  MmOptionValue,
  PctOptionValue,
} from './values.mjs'
import { WorkbenchMenu, useDocsLoader, wasChanged } from '../shared/index.mjs'
import { MenuItem, ItemTitle, MenuItemGroup } from '../shared/menu-item.mjs'

export const ns = ['design-options']

// Facilitate lookup of the input component
const inputs = {
  bool: BoolInput,
  constant: ConstantInput,
  count: SliderInput,
  deg: DegInput,
  list: ListInput,
  mm: MmInput,
  pct: PctInput,
}

// Facilitate lookup of the value component
const values = {
  bool: BoolOptionValue,
  constant: ConstantOptionValue,
  count: CountOptionValue,
  deg: DegOptionValue,
  list: ListOptionValue,
  mm: MmOptionValue,
  pct: PctOptionValue,
}

// Emojis for option groups :)
const emojis = {
  advanced: '🤓',
  fit: '👕',
  style: '💃🏽',
  dflt: '🕹️',
  groupDflt: '📁',
}

export const DesignOption = ({
  name,
  current,
  config,
  settings,
  update,
  t,
  loadDocs,
  changed = false,
}) => {
  const type = optionType(config)
  const Input = inputs[type]
  const Value = values[type]
  const allowOverride = ['pct', 'count', 'deg'].includes(type)

  // Hide option?
  if (config?.hide || (typeof config?.hide === 'function' && config.hide(settings))) return null

  if (type === 'bool') {
    config = {
      ...config,
      list: [0, 1],
      choiceTitles: {
        0: `${name}No`,
        1: `${name}Yes`,
      },
      valueTitles: {
        0: 'no',
        1: 'yes',
      },
      dflt: config.dflt ? 1 : 0,
    }
  }

  return (
    <MenuItem
      {...{
        name,
        config,
        current,
        updater: update.settings,
        updatePath: ['options'],
        t,
        changed,
        loadDocs,
        Input,
        Value,
        allowOverride,
      }}
    />
  )
}

export const DesignOptionGroup = ({
  design,
  patternConfig,
  settings,
  update,
  group,
  options,
  t,
  loadDocs,
}) => (
  <Collapse
    bottom
    color="secondary"
    title={
      <ItemTitle
        {...{
          name: group,
          t,
          emoji: emojis[group] ? emojis[group] : emojis.groupDflt,
        }}
      />
    }
    openTitle={t(group)}
  >
    {Object.entries(options).map(([option, type]) =>
      typeof type === 'string' ? (
        <DesignOption
          {...{ t, design, update, settings, loadDocs }}
          key={option}
          name={option}
          settings={settings}
          current={settings.options?.[option]}
          config={patternConfig.options[option]}
          changed={wasChanged(settings.options?.[option], option, patternConfig.options)}
        />
      ) : (
        <DesignOptionGroup
          {...{ design, patternConfig, settings, update, Option, t, loadDocs }}
          group={option}
          options={type}
          key={option}
        />
      )
    )}
  </Collapse>
)

export const DesignOptions = ({
  design,
  patternConfig,
  settings,
  update,
  language,
  account,
  DynamicDocs = false,
}) => {
  const menuNs = [`o_${design}`, ...ns]
  const { t } = useTranslation(menuNs)
  const optionsMenu = optionsMenuStructure(patternConfig.options)
  const getDocsPath = (option) =>
    `patterns/${design}/options${option ? '/' + option.toLowerCase() : ''}`
  const loadDocs = useDocsLoader(DynamicDocs, getDocsPath, language)

  return (
    <WorkbenchMenu
      {...{
        name: 'design-options:designOptions',
        updater: update.settings,
        ns: menuNs,
        Icon: OptionsIcon,
        inputs,
        values,
        currentValues: settings.options,
        language,
        DynamicDocs,
        getDocsPath,
      }}
    >
      <MenuItemGroup
        {...{
          wrapped: false,
          groupConfig: patternConfig.options,
          currents: settings.options,
          items: optionsMenu,
          Item: DesignOption,
          loadDocs,
          itemProps: { design, update, settings },
          emojis,
          t,
        }}
      />
    </WorkbenchMenu>
  )
}
