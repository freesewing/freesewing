import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'
import Option from './option'
import { Li, Ul, Details, Summary, SumButton, SumDiv, Deg } from 'shared/components/workbench/menu'

const OptionSubGroup = props => {
  return Object.keys(props.sub).map(name => (
    <Li>
      <Details>
        <Summary>
          <SumDiv>
            <Deg />
            <span className="font-bold">{ props.app.t(`optiongroups.${name}`) }</span>
          </SumDiv>
          <Chevron />
        </Summary>
        <Ul>
          {props.sub[name].map(option => typeof option === 'string'
            ? <Option {...props} option={option} key={option} />
            : <OptionSubGroup {...props} sub={option} config={config} />
          )}
        </Ul>
      </Details>
    </Li>
  ))
}

export default OptionSubGroup
