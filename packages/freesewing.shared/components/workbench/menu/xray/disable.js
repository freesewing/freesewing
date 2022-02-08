import { Li, SumButton, SumDiv, Deg } from 'shared/components/workbench/menu'
import { useTranslation } from 'next-i18next'

const DisableXray = props => {
  const { t } = useTranslation(['cfp', 'settings'])

  return (
    <Li>
      <SumButton onClick={() => props.updateGist(['xray', 'enabled'], false)}>
        <SumDiv>
          <Deg />
          <span>
            {t('cfp:thingIsEnabled', { thing: t('settings:xray.title') })}
          </span>
        </SumDiv>
      </SumButton>
    </Li>
  )
}

export default DisableXray
