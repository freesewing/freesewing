import { OptionsIcon } from 'shared/components/icons.mjs'
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
import { useTranslation } from 'next-i18next'
import { optionsMenuStructure } from 'shared/utils.mjs'
import { optionType } from 'shared/utils.mjs'
import {
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

// Facilitate lookup of the input component
const inputs = {
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

export const DesignOption = ({ design, name, current, config, settings, update, t }) => {
  const type = optionType(config)
  const Input = inputs[type]
  const Value = values[type]

  // Hide option?
  if (config?.hide || (typeof config?.hide === 'function' && config.hide(settings))) return null

  if (type === 'bool') {
    const toggleBoolean = () => {
      const dflt = config.bool
      const current = settings.options?.[name]
      const newVal = typeof current === 'undefined' ? !dflt : !current
      update.settings(['options', name], newVal)
    }

    return (
      <Li>
        <SumButton onClick={toggleBoolean}>
          <SumDiv>
            <Deg />
            <span>{t(`${name}.t`)}</span>
          </SumDiv>
          <Value {...{ t, name, config, current, design, settings }} />
        </SumButton>
      </Li>
    )
  }

  return (
    <Li>
      <Details>
        <Summary>
          <SumDiv>
            <Deg />
            <span>{t(`${name}.t`)}</span>
          </SumDiv>
          <Value {...{ t, name, config, current, design, settings }} />
          <Chevron w={6} m={3} />
        </Summary>
        <Input {...{ t, name, config, settings, current, design, update }} ot={t} />
      </Details>
    </Li>
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
  <Li>
    <Details>
      <Summary>
        <SumDiv>
          <Deg />
          <span className="font-bold">{t(group)}</span>
        </SumDiv>
        <Chevron />
      </Summary>
      <Ul>
        {Object.entries(options).map(([option, type]) =>
          typeof type === 'string' ? (
            <Option
              {...{ t, design, update, settings }}
              key={option}
              name={option}
              settings={settings}
              current={settings.options?.[option]}
              config={patternConfig.options[option]}
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
      </Ul>
    </Details>
  </Li>
)

export const DesignOptions = ({ design, patternConfig, settings, update, Option = false }) => {
  const { t } = useTranslation([design])

  // FIXME: Do we still care about passing in an Option component?
  if (!Option) Option = DesignOption
  const optionsMenu = optionsMenuStructure(patternConfig.options)

  return (
    <Details open>
      <TopSummary icon={<OptionsIcon />}>
        <TopSumTitle>{t('designOptions')}</TopSumTitle>
        <Chevron />
      </TopSummary>
      <Ul className="pl-5 list-inside">
        {Object.entries(optionsMenu).map(([group, option]) =>
          typeof option === 'string' ? (
            <Option
              {...{ t, design, update, settings }}
              key={group}
              name={group}
              current={settings.options?.[group]}
              config={patternConfig.options[group]}
            />
          ) : (
            <DesignOptionGroup
              {...{ design, patternConfig, settings, update, group, Option, t }}
              options={option}
              key={group}
            />
          )
        )}
      </Ul>
    </Details>
  )
}
