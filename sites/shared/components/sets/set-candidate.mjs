import { ChoiceButton } from 'shared/components/choice-button.mjs'
import { ChoiceLink } from 'shared/components/choice-link.mjs'
import { OkIcon, NoIcon, WarningIcon } from 'shared/components/icons.mjs'
import { useTranslation } from 'next-i18next'
import { capitalize } from 'shared/utils.mjs'
import Image from 'next/image'

export const ns = ['sets']

const Title = ({ set, language }) => (
  <div className="flex flex-row items-center gap-2">
    <Image
      alt="img"
      src={set.img || ''}
      width={100}
      height={100}
      className="shadow mask mask-squircle bg-neutral aspect-square w-12 h-12"
    />
    <span>{set[`name${language ? capitalize(language) : ''}`]}</span>
  </div>
)

export const SetSummary = ({ set, href, clickHandler, language, hasMeasies, t, design }) => {
  const inner = hasMeasies ? null : (
    <div className="flex flex-row gap-2 items-center">
      <WarningIcon className="w-6 h-6 shrink-0 text-error" />
      <span>{t('setLacksMeasiesForDesign', { design: t(`designs:${design}.t`) })}</span>
    </div>
  )
  const wrapProps = {
    icon: hasMeasies ? (
      <OkIcon className="w-10 h-10 text-success" />
    ) : (
      <NoIcon className="w-10 h-10 text-error" />
    ),
    title: <Title set={set} language={language} />,
  }
  if (clickHandler) wrapProps.onClick = () => clickHandler(set)
  else if (href) wrapProps.href = href

  const Component = clickHandler ? ChoiceButton : ChoiceLink

  return <Component {...wrapProps}>{inner}</Component>
}

export const SetCandidate = ({
  set,
  design,
  requiredMeasies = [],
  href,
  clickHandler,
  language,
}) => {
  const { t } = useTranslation(['sets', design])

  let hasMeasies = true
  const setMeasies = Object.keys(set.measies)
  // Quick check for required measurements
  if (!set.measies || setMeasies.length < requiredMeasies.length) hasMeasies = false

  // Proper check for required measurements
  if (hasMeasies) {
    for (const m of requiredMeasies) {
      if (!Object.keys(set.measies).includes(m)) {
        hasMeasies = false
        break
      }
    }
  }

  const setProps = { set, design, t, href, clickHandler, hasMeasies, language }
  return <SetSummary {...setProps} />
}
