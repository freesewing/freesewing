import { Li, SumButton, SumDiv, Deg } from 'shared/components/workbench/menu'

const ResetXray = props =>  (
  <Li>
    <SumButton onClick={() => props.updateGist(['xray'], { enabled: true })}>
      <SumDiv>
        <Deg />
        <span>{ props.app.t(`app.reset`) }</span>
      </SumDiv>
    </SumButton>
  </Li>
)

export default ResetXray
