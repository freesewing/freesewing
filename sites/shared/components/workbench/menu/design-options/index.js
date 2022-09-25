import OptionsIcon from 'shared/components/icons/options.js'
import { Chevron } from 'shared/components/navigation/primary.js'
import OptionGroup from './option-group'
import OptionComponent from './option'
import { Ul, Details, TopSummary, TopSumTitle } from 'shared/components/workbench/menu'
import { useTranslation } from 'next-i18next'
import { optionsMenuStructure } from 'shared/utils.mjs'

const DesignOptions = props => {
  const { t } = useTranslation(['app'])
  const Option = props.Option
    ? props.Option
    : OptionComponent
  const optionsMenu = optionsMenuStructure(props.design.patternConfig.options)

  return (
    <Details open>
      <TopSummary icon={<OptionsIcon />}>
        <TopSumTitle>{t('designOptions')}</TopSumTitle>
        <Chevron />
      </TopSummary>
      <Ul className="pl-5 list-inside">
        {Object.entries(optionsMenu).map(([group, options]) => typeof options === "string"
          ? <Option {...props} type={options} option={group} key={group} />
          : <OptionGroup {...props} group={group} options={options} key={group} Option={Option} />
        )}
      </Ul>
    </Details>
  )
}

export default DesignOptions

