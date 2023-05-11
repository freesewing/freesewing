import { Li, SumButton, SumDiv, Deg } from 'shared/components/workbench/menus/index.mjs'
import { useTranslation } from 'next-i18next'

export const XrayDisable = (props) => {
  const { t } = useTranslation(['cfp', 'settings'])

  return (
    <Li>
      <SumButton onClick={() => props.updateGist(['_state', 'xray', 'enabled'], false)}>
        <SumDiv>
          <Deg />
          <span>{t('cfp:thingIsEnabled', { thing: t('settings:xray.t') })}</span>
        </SumDiv>
      </SumButton>
    </Li>
  )
}
