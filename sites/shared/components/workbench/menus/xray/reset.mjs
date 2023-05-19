import { Li, SumButton, SumDiv, Deg } from 'shared/components/workbench/menus/index.mjs'
import { useTranslation } from 'next-i18next'

export const XrayReset = (props) => {
  const { t } = useTranslation(['app'])

  return (
    <Li>
      <SumButton onClick={() => props.updateGist(['_state', 'xray'], { enabled: true })}>
        <SumDiv>
          <Deg />
          <span>{t(`reset`)}</span>
        </SumDiv>
      </SumButton>
    </Li>
  )
}
