import { Chevron } from 'shared/components/navigation/primary.js'
import PctDegOption from 'shared/components/workbench/inputs/design-option-pct-deg'
import CountOption from 'shared/components/workbench/inputs/design-option-count'
import ListOption from 'shared/components/workbench/inputs/design-option-list'
import { formatMm, formatPercentage, optionType } from 'shared/utils.js'
import { Li, Ul, Details, Summary, SumButton, SumDiv, Deg } from 'shared/components/workbench/menu'
import { useTranslation } from 'next-i18next'

const values = {
  pct: props => {
    const val = (typeof props.gist?.options?.[props.option] === 'undefined')
      ? props.pattern.config.options[props.option].pct/100
      : props.gist.options[props.option]
    return (
      <span className={
        val=== props.pattern.config.options[props.option].pct/100
          ? 'text-secondary-focus'
          : 'text-accent'
      }>
        {formatPercentage(val)}
        {props.pattern.config.options[props.option]?.toAbs
          ? ' | ' +formatMm(props.pattern.config.options[props.option]?.toAbs(val, props.gist))
          : null
        }
      </span>
    )
  },
  bool: props => {
    const { t } = useTranslation(['app'])
    const dflt = props.pattern.config.options[props.option].bool
    const current = props.gist?.options?.[props.option]
    return (
      <span className={
        (dflt==current || typeof current === 'undefined')
          ? 'text-secondary-focus'
          : 'text-accent'
      }>
        {props.gist?.options?.[props.option]
          ? t('yes')
          : t('no')
        }
      </span>
    )
  },
  count: props => {
    const dflt = props.pattern.config.options[props.option].count
    const current = props.gist?.options?.[props.option]
    return (dflt==current || typeof current === 'undefined')
      ? <span className="text-secondary-focus">{dflt}</span>
      : <span className="text-accent">{current}</span>
  },
  list: props => {
    const dflt = props.pattern.config.options[props.option].dflt
    const current = props.gist?.options?.[props.option]
    const prefix = `${props.option}.o.`
    return (dflt==current || typeof current === 'undefined')
      ? <span className="text-secondary-focus">{props.t(prefix+dflt)}</span>
      : <span className="text-accent">{props.t(prefix+current)}</span>
  },
  deg: props => {
    const dflt = props.pattern.config.options[props.option].deg
    const current = props.gist?.options?.[props.option]
    return (dflt==current || typeof current === 'undefined')
      ? <span className="text-secondary-focus">{dflt}&deg;</span>
      : <span className="text-accent">{current}&deg;</span>
  },
  mm: props => {
    return <p>No mm val yet</p>
  },
  constant: props => {
    return <p>No constant val yet</p>
  },
}

const Tmp = props => <p>not yet</p>

const inputs = {
  pct: PctDegOption,
  count: CountOption,
  deg: props => <PctDegOption {...props} type='deg' />,
  list: ListOption,
  mm: <p>Mm options are not supported. Please report this.</p>,
  constant: Tmp,
}


const Option = props => {
  const { t } = useTranslation([`o_${props.pattern.config.name}`])
  const type = optionType(props.pattern.config.options[props.option])
  const Input = inputs[type]
  const Value = values[type]

  const toggleBoolean = () => {
    const dflt = props.pattern.config.options[props.option].bool
    const current = props.gist?.options?.[props.option]
    if (typeof current === 'undefined')
      props.updateGist(['options', props.option], !dflt)
    else props.unsetGist(['options', props.option])
  }

  return (type === 'bool')
    ? (
      <Li>
        <SumButton onClick={toggleBoolean}>
          <SumDiv>
            <Deg />
            <span>{t(`${props.option}.t`) }</span>
          </SumDiv>
          <Value type={type} {...props} t={t} />
        </SumButton>
      </Li>
    ) : (
      <Li>
        <Details>
          <Summary>
            <SumDiv>
              <Deg />
              <span>{t(`${props.option}.t`)}</span>
            </SumDiv>
            <Value type={type} {...props} t={t} />
            <Chevron w={6} m={3}/>
          </Summary>
          <Input {...props} ot={t} />
        </Details>
      </Li>
    )
}

export default Option
