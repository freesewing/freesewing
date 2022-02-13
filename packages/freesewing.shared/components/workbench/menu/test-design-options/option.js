import { linkClasses } from 'shared/components/navigation/primary.js'
import { Li, Ul, Details, Summary, Deg } from 'shared/components/workbench/menu'
import { useTranslation } from 'next-i18next'

const SumButton = props => (
  <button className={`
    flex flex-row
    px-2
    w-full justify-between
    text-left
    text-base-content
    sm:text-neutral-content
    hover:cursor-pointer
    items-center
    mr-4
  `} onClick={props.onClick}>{props.children}</button>
)
const SumDiv = (props) => (
  <div className={`
    grow pl-2 border-l-2
    ${linkClasses}
    hover:cursor-resize
    hover:border-secondary
    sm:hover:border-secondary-focus
    text-base-content sm:text-neutral-content
    ${props.active && 'border-secondary-focus'}

  `}>{props.children}</div>
)

const Option = props => {
  const { t } = useTranslation([`o_${props.pattern.config.name}`, 'workbench'])
  const active = (
    props.gist.sample?.type === 'option' &&
    props.gist.sample?.option === props.option
  )

  return (
    <Li>
      <SumButton onClick={() => props.updateGist(
        ['sample'],
        {
          type: 'option',
          option: props.option
        }
      )}>
        <SumDiv active={active}>
          <span className={`
            text-3xl inline-block p-0 leading-3 px-2
            ${active
              ? 'text-secondary sm:text-secondary-focus translate-y-1 font-bold'
              : 'translate-y-3'
            }`}
          >
            {active ? <span>&bull;</span> : <span>&deg;</span>}
          </span>
          <span className={active ? 'text-secondary font-bold' : ''}>
            {t(`o_${props.pattern.config.name}:${props.option}.t`)}
          </span>
        </SumDiv>
      </SumButton>
    </Li>
  )
}

export default Option
