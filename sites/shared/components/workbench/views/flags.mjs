// Dependencies
import { flagTypes } from 'plugins/plugin-annotations/src/flag.mjs'
import mustache from 'mustache'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import {
  ChatIcon,
  TipIcon,
  WarningIcon,
  ErrorIcon,
  WrenchIcon as FixmeIcon,
  ExpandIcon,
  FlagIcon,
  OptionsIcon,
} from 'shared/components/icons.mjs'
import Markdown from 'react-markdown'
import { SubAccordion } from 'shared/components/accordion.mjs'

const flagIcons = {
  note: ChatIcon,
  tip: TipIcon,
  warn: WarningIcon,
  error: ErrorIcon,
  fixme: FixmeIcon,
  // Used in content
  expand: ExpandIcon,
  options: OptionsIcon,
}

export const Flag = ({ data, t, handleUpdate }) => {
  const BtnIcon = data.suggest?.icon ? flagIcons[data.suggest.icon] : false

  const button =
    data.suggest?.text && data.suggest?.update ? (
      <button
        className={`btn btn-secondary btn-outline flex flex-row items-center ${
          BtnIcon ? 'gap-6' : ''
        }`}
        onClick={() => handleUpdate(data.suggest.update)}
      >
        {BtnIcon && <BtnIcon className="w-5 h-6 sm:w-6 h-6" />}
        {t(data.suggest.text)}
      </button>
    ) : null

  const desc = data.replace ? mustache.render(t(data.desc), data.replace) : t(data.desc)

  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="first:mt-0 grow md flag">
        <Markdown>{desc}</Markdown>
      </div>
      {button ? <div className="mt-2 w-full flex flex-row justify-end">{button}</div> : null}
    </div>
  )
}

const flattenFlags = (flags) => {
  const all = {}
  const ns = ['flag']
  for (const type of flagTypes) {
    let i = 0
    if (flags[type]) {
      for (const flag of Object.values(flags[type])) {
        i++
        all[`${type}-${i}`] = { ...flag, type }
        if (flag.ns) ns.push(flag.ns)
        if (flag.title.includes(':')) ns.push(flag.title.split(':').shift())
        if (flag.desc.includes(':')) ns.push(flag.desc.split(':').shift())
      }
    }
  }

  return [all, ns]
}

export const FlagsAccordionTitle = ({ flags }) => {
  const { t } = useTranslation(['flag'])
  const [flagList] = flattenFlags(flags)

  if (Object.keys(flagList).length < 1) return null

  return (
    <>
      <h5 className="flex flex-row gap-2 items-center justify-between w-full">
        <span className="text-left">
          {t('flag:flagMenu.t')} ({Object.keys(flagList).length})
        </span>
        <FlagIcon className="w-8 h-8" />
      </h5>
      <p className="text-left">
        {Object.keys(flagList).length > 1 ? t('flag:flagMenuMany.d') : t('flag:flagMenuOne.d')}
      </p>
    </>
  )
}

export const FlagsAccordionEntries = ({ flags, update }) => {
  const [flagList, ns] = flattenFlags(flags)
  const { t } = useTranslation(nsMerge(ns))

  if (Object.keys(flagList).length < 1) return null

  const handleUpdate = (config) => {
    if (config.settings) update.settings(...config.settings)
    if (config.ui) update.ui(...config.settings)
  }

  return (
    <SubAccordion
      items={Object.entries(flagList).map(([key, flag], i) => {
        const Icon = flagIcons[flag.type]
        const title = flag.replace ? mustache.render(t(flag.title), flag.replace) : t(flag.title)

        return [
          <div className="w-full flex flex-row gap2 justify-between" key={i}>
            <div className="flex flex-row items-center gap-2">
              <div className="no-shrink">
                <Icon />
              </div>
              <span className="font-medium text-left">{title}</span>
            </div>
            <span className="uppercase font-bold">{flag.type}</span>
          </div>,
          <Flag key={key} t={t} data={flag} handleUpdate={handleUpdate} />,
        ]
      })}
    />
  )
}
