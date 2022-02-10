import { useState } from 'react'
import { SecText, SumButton, Li, SumDiv, Deg } from 'shared/components/workbench/menu/index.js'
import { useTranslation } from 'next-i18next'

const CoreSettingSaBool = props => {

  const { t } = useTranslation(['app', 'settings'])
  const [value, setValue] = useState(props.gist.saBool || false)

  const toggle = () => {
    props.setGist({
      ...props.gist,
      saBool: !value,
      sa: value ? 0 : props.gist.saMm
    })
    setValue(!value)
  }

  return (
    <Li>
      <SumButton onClick={toggle}>
        <SumDiv>
          <Deg />
          <span>{ t(`settings:sa.t`) }</span>
          <span className="ml-4 opacity-50">
            [ { t(`yes`) }/
            { t(`no`) } ]
          </span>
        </SumDiv>
        <SecText>{t(value ? 'yes' : 'no')}</SecText>
      </SumButton>
    </Li>
  )
}

export default CoreSettingSaBool
