import { useState } from 'react'
import { SecText, SumButton, Li, SumDiv, Deg } from 'shared/components/workbench/menu/index.js'
import { useTranslation } from 'next-i18next'

const CoreSettingBool = props => {

  const { t } = useTranslation(['app'])
  const [value, setValue] = useState(props.gist[props.setting])

  const toggle = (evt) => {
    props.updateGist([props.setting], !value)
    setValue(!value)
  }

  return (
    <Li>
      <SumButton onClick={toggle}>
        <SumDiv>
          <Deg />
          <span>{ t(`settings:${props.setting}.t`) }</span>
        </SumDiv>
        <SecText>{ t(value ? 'yes' : 'no')}</SecText>
      </SumButton>
    </Li>
  )
}

export default CoreSettingBool
