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
  mm: () => <span>FIXME: Mm options are deprecated. Please report this </span>,
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
  updateFunc,
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

  return (
    <MenuItem
      {...{
        name,
        config,
        current,
        updateFunc,
        t,
        changed,
        loadDocs,
        Input,
        Value,
        allowOverride,
        passProps: { settings },
      }}
    />
  )
}

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
        config: optionsMenu,
        currentValues: settings.options,
        DynamicDocs,
        emojis,
        getDocsPath,
        Icon: OptionsIcon,
        Item: DesignOption,
        name: 'design-options:designOptions',
        language,
        ns: menuNs,
        passProps: { settings },
        updateFunc: (name, value) => update.settings(['options', name], value),
      }}
    />
  )
}
