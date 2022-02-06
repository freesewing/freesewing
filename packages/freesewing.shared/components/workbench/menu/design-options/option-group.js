import { Chevron } from 'shared/components/navigation/primary.js'
import Option from './option'
import OptionSubGroup from './option-sub-group'
import { Li, Ul, Details, Summary, SumDiv, Deg } from 'shared/components/workbench/menu'

const OptionGroup = props => {
  const config = props.config || props.pattern.config.optionGroups[props.group]
  return (
    <Li>
      <Details>
        <Summary>
          <SumDiv>
            <Deg />
            <span className="font-bold">
              { props.app.t(`optiongroups.${props.group}`) }
            </span>
          </SumDiv>
          <Chevron />
        </Summary>
        <Ul>
          {config.map(option => typeof option === 'string'
            ? <Option {...props} option={option} key={option} />
            : <OptionSubGroup {...props} sub={option} config={config} />
          )}
        </Ul>
      </Details>
    </Li>
  )
}

export default OptionGroup
