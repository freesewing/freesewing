import { Li, SumButton, SumDiv, Deg } from 'shared/components/workbench/menu'

const DisableXray = props => (
  <Li>
    <SumButton onClick={() => props.updateGist(['xray', 'enabled'], false)}>
      <SumDiv>
        <Deg />
        <span>
          {props.app.t('cfp.thingIsEnabled', { thing: props.app.t('settings.xray.title') })}
        </span>
      </SumDiv>
    </SumButton>
  </Li>
)

export default DisableXray
