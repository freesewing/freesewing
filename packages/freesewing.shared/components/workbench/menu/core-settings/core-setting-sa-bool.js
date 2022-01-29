import { useState } from 'react'
import { SecText, SumButton, Li, SumDiv, Deg } from 'shared/components/workbench/menu/index.js'

const CoreSettingSaBool = props => {

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
          <span>{ props.app.t(`settings.sa.title`) }</span>
          <span className="ml-4 opacity-50">
            [ { props.app.t(`app.yes`) }/
            { props.app.t(`app.no`) } ]
          </span>
        </SumDiv>
        <SecText>{props.app.t('app.'+ (value ? 'yes' : 'no'))}</SecText>
      </SumButton>
    </Li>
  )
}

export default CoreSettingSaBool
