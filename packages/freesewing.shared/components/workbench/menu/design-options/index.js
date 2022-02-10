import OptionsIcon from 'shared/components/icons/options.js'
import { Chevron } from 'shared/components/navigation/primary.js'
import OptionGroup from './option-group'
import { Ul, Details, TopSummary, TopSumTitle } from 'shared/components/workbench/menu'
import { useTranslation } from 'next-i18next'

const DesignOptions = props => {
  const { t } = useTranslation(['app'])

  return (
    <Details open>
      <TopSummary icon={<OptionsIcon />}>
        <TopSumTitle>{t('designOptions')}</TopSumTitle>
        <Chevron />
      </TopSummary>
      <Ul className="pl-5 list-inside">
        {Object.keys(props.pattern.config.optionGroups).map(group => (
          <OptionGroup {...props} group={group} key={group} />
        ))}
      </Ul>
    </Details>
  )
}

export default DesignOptions
