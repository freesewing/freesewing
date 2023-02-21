import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { SecText, SumButton, Li, SumDiv, Deg } from 'shared/components/workbench/menu/index.mjs'

export const CoreSettingSaBool = (props) => {
  const { t } = useTranslation(['app', 'settings'])
  const [value, setValue] = useState(props.gist.saBool || false)

  const toggle = () => {
    props.setGist({
      ...props.gist,
      saBool: !value,
      sa: value ? 0 : props.gist.saMm,
    })
    setValue(!value)
  }

  return (
    <Li>
      <SumButton onClick={toggle}>
        <SumDiv>
          <Deg />
          <span>{t('settings:sabool.t')}</span>
        </SumDiv>
        <SecText>{t(value ? 'yes' : 'no')}</SecText>
      </SumButton>
    </Li>
  )
}
