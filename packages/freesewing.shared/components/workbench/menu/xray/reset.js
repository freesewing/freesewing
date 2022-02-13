import { Li, SumButton, SumDiv, Deg } from 'shared/components/workbench/menu'
import { useTranslation } from 'next-i18next'

const ResetXray = props =>  {
  const { t } = useTranslation(['app'])

  return (
    <Li>
      <SumButton onClick={() => props.updateGist(['xray'], { enabled: true })}>
        <SumDiv>
          <Deg />
          <span>{ t(`reset`) }</span>
        </SumDiv>
      </SumButton>
    </Li>
  )
}

export default ResetXray
