import OptionsIcon from 'shared/components/icons/options.js'
import { Chevron } from 'shared/components/navigation/primary.js'
import OptionGroup from './option-group'
import { Ul, Details, TopSummary, TopSumTitle } from 'shared/components/workbench/menu'

const DesignOptions = props => {

  return (
    <Details open>
      <TopSummary icon={<OptionsIcon />}>
        <TopSumTitle>{props.app.t('app.designOptions')}</TopSumTitle>
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
