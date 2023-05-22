import { Li, SumButton, SumDiv } from 'shared/components/workbench/menus/index.mjs'

export const Option = (props) => {
  const active = props.sampleSettings?.type === 'option' && props.active === props.option

  const setSampleSettings = () => {
    props.updateGist(
      ['sample'],
      props.sampleSettings,
      true // Close navigation on mobile
    )
  }

  return (
    <Li>
      <SumButton onClick={setSampleSettings}>
        <SumDiv active={active}>
          <span
            className={`
            text-3xl inline-block p-0 leading-3 px-2
            ${
              active
                ? 'text-secondary sm:text-secondary-focus translate-y-1 font-bold'
                : 'translate-y-3'
            }`}
          >
            {active ? <span>&bull;</span> : <span>&deg;</span>}
          </span>
          <span className={active ? 'text-secondary font-bold' : ''}>{props.label}</span>
        </SumDiv>
      </SumButton>
    </Li>
  )
}
