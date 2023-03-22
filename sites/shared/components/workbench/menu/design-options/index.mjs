import { OptionsIcon } from 'shared/components/icons.mjs'
import { Chevron } from 'shared/components/navigation/primary.mjs'
import { OptionGroup } from './option-group.mjs'
import { OptionComponent } from './option.mjs'
import { Ul, Details, TopSummary, TopSumTitle } from 'shared/components/workbench/menu/index.mjs'
import { useTranslation } from 'next-i18next'
import { optionsMenuStructure } from 'shared/utils.mjs'

export const DesignOptions = (props) => {
  const { t } = useTranslation(['app'])
  const Option = props.Option ? props.Option : OptionComponent
  const optionsMenu = optionsMenuStructure(props.design.patternConfig.options)

  return (
    <Details open>
      <TopSummary icon={<OptionsIcon />}>
        <TopSumTitle>{t('designOptions')}</TopSumTitle>
        <Chevron />
      </TopSummary>
      <Ul className="pl-5 list-inside">
        {Object.entries(optionsMenu).map(([group, options]) =>
          typeof options === 'string' ? (
            <Option {...props} type={options} option={group} key={group} />
          ) : (
            <OptionGroup {...props} group={group} options={options} key={group} Option={Option} />
          )
        )}
      </Ul>
    </Details>
  )
}
