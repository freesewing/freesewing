// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { Collapse } from 'shared/components/collapse.mjs'
import { OptionsIcon, ClearIcon } from 'shared/components/icons.mjs'
import { Chevron } from 'shared/components/navigation/primary.mjs'
import {
  Li,
  Ul,
  Details,
  Summary,
  SumDiv,
  SumButton,
  Deg,
  TopSummary,
  TopSumTitle,
} from 'shared/components/workbench/menus/index.mjs'
import { optionsMenuStructure } from 'shared/utils.mjs'
import { optionType } from 'shared/utils.mjs'
import {
  BoolOptionInput,
  ConstantOptionInput,
  CountOptionInput,
  DegOptionInput,
  ListOptionInput,
  MmOptionInput,
  PctOptionInput,
} from './inputs.mjs'
import {
  BoolOptionValue,
  ConstantOptionValue,
  CountOptionValue,
  DegOptionValue,
  ListOptionValue,
  MmOptionValue,
  PctOptionValue,
} from './values.mjs'

export const ns = ['design-options']

// Facilitate lookup of the input component
const inputs = {
  bool: BoolOptionInput,
  constant: ConstantOptionInput,
  count: CountOptionInput,
  deg: DegOptionInput,
  list: ListOptionInput,
  mm: MmOptionInput,
  pct: PctOptionInput,
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

const ClearButton = ({ update, name, open }) => (
  <button
    className={`btn btn-accent ${open ? 'btn-xs px-0' : ''}`}
    onClick={(evt) => {
      evt.stopPropagation()
      update.settings(['options', name])
    }}
  >
    <ClearIcon />
  </button>
)

export const DesignOption = ({
  design,
  name,
  current,
  config,
  settings,
  update,
  t,
  changed = false,
}) => {
  const type = optionType(config)
  const Input = inputs[type]
  const Value = values[type]

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

  const buttons = []
  const openButtons = []
  if (changed) {
    buttons.push(<ClearButton {...{ update, name }} />)
    openButtons.push(<ClearButton {...{ update, name }} open />)
  }

  return (
    <Collapse
      color={changed ? 'accent' : 'secondary'}
      title={
        <div className="w-full flex flex-row gap2 items-center justify-between">
          <span className="font-bold">{t(`${name}.t`)}</span>
          <Value {...{ t, name, config, current, design, settings }} />
        </div>
      }
      openTitle={t(`${name}.t`)}
      {...{ buttons, openButtons }}
    >
      <Input {...{ t, name, config, settings, current, design, update }} ot={t} />
    </Collapse>
  )
}

export const DesignOptionGroup = ({
  design,
  patternConfig,
  settings,
  update,
  group,
  options,
  Option,
  t,
}) => (
  <Collapse
    color="secondary"
    title={
      <div className="w-full flex flex-row gap2 items-center justify-between">
        <span className="font-bold">{t(group)}</span>
        <OptionsIcon className="w-6 h-6 text-primary" />
      </div>
    }
    openTitle={t(group)}
  >
    {Object.entries(options).map(([option, type]) =>
      typeof type === 'string' ? (
        <Option
          {...{ t, design, update, settings }}
          key={option}
          name={option}
          settings={settings}
          current={settings.options?.[option]}
          config={patternConfig.options[option]}
          changed={wasChanged(settings.options?.[option], patternConfig.options[option])}
        />
      ) : (
        <OptionGroup
          {...{ design, patternConfig, settings, update, Option, t }}
          group={option}
          options={type}
          key={option}
        />
      )
    )}
  </Collapse>
)

const wasChanged = (current, config) => {
  if (typeof current === 'undefined') return false
  if (current === config.dflt) return false

  return true
}

export const DesignOptions = ({ design, patternConfig, settings, update, Option = false }) => {
  const { t } = useTranslation([design])

  // FIXME: Do we still care about passing in an Option component?
  if (!Option) Option = DesignOption
  const optionsMenu = optionsMenuStructure(patternConfig.options)

  return (
    <Collapse
      bottom
      color="primary"
      title={
        <div className="w-full flex flex-row gap2 items-center justify-between">
          <span className="font-bold">{t('design-options:designOptions')}</span>
          <OptionsIcon className="w-6 h-6 text-primary" />
        </div>
      }
      openTitle={t('design-options:designOptions')}
    >
      {Object.entries(optionsMenu).map(([group, option]) =>
        typeof option === 'string' ? (
          <Option
            {...{ t, design, update, settings }}
            key={group}
            name={group}
            current={settings.options?.[group]}
            config={patternConfig.options[group]}
            changed={wasChanged(settings.option?.[group], patternConfig.options[group])}
          />
        ) : (
          <DesignOptionGroup
            {...{ design, patternConfig, settings, update, group, Option, t }}
            options={option}
            key={group}
          />
        )
      )}
    </Collapse>
  )
}
