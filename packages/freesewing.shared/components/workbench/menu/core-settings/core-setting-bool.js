import { useState } from 'react'
import { SecText, SumButton, Li, SumDiv, Deg } from 'shared/components/workbench/menu/index.js'

const CoreSettingBool = props => {

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
          <span>{ props.app.t(`settings.${props.setting}.title`) }</span>
        </SumDiv>
        <SecText>{props.app.t('app.'+ (value ? 'yes' : 'no'))}</SecText>
      </SumButton>
    </Li>
  )
}

export default CoreSettingBool
