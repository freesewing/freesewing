import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { SecText, SumButton, Li, SumDiv, Deg } from 'shared/components/workbench/menu/index.mjs'

export const CoreSettingBool = (props) => {
  const { t } = useTranslation(['app'])
  const [value, setValue] = useState(props.gist[props.setting])

  const toggle = () => {
    props.updateGist([props.setting], !value)
    setValue(!value)
  }

  return (
    <Li>
      <SumButton onClick={toggle}>
        <SumDiv>
          <Deg />
          <span>{t(`settings:${props.setting}.t`)}</span>
        </SumDiv>
        <SecText>{t(value ? 'yes' : 'no')}</SecText>
      </SumButton>
    </Li>
  )
}
