// Dependencies
import { flagTypes } from 'plugins/plugin-annotations/src/flag.mjs'
import mustache from 'mustache'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
// Components
import {
  ChatIcon,
  TipIcon,
  WarningIcon,
  ErrorIcon,
  WrenchIcon as FixmeIcon,
  ExpandIcon,
} from 'shared/components/icons.mjs'
import Markdown from 'react-markdown'

const flagColors = {
  note: 'primary',
  tip: 'accent',
  warn: 'error',
  error: 'error',
  fixme: 'warning',
}

const flagIcons = {
  note: ChatIcon,
  tip: TipIcon,
  warn: WarningIcon,
  error: ErrorIcon,
  fixme: FixmeIcon,
  // Used in content
  expand: ExpandIcon,
}

export const Flags = ({ flags, update }) => {
  const handleUpdate = (config) => {
    if (config.settings) update.settings(...config.settings)
    if (config.ui) update.ui(...config.settings)
  }

  return (
    <div className="p-4 flex flex-row overflow-x-auto w-full gap-4 max-w-screen">
      {flagTypes.map((type) =>
        flags[type]
          ? Object.values(flags[type]).map((flag) => (
              <Flag type={type} data={flag} handleUpdate={handleUpdate} key={flag.id} />
            ))
          : null
      )}
    </div>
  )
}

export const Flag = ({ type, data, handleUpdate }) => {
  const { t } = useTranslation(nsMerge('flag', data.ns, data.msg.split(':').shift()))
  const [hide, setHide] = useState(false)

  if (hide || !data.msg) return null

  const color = flagColors[type]
  const Icon = flagIcons[type]
  const BtnIcon = data.suggest?.icon ? flagIcons[data.suggest.icon] : false

  const button =
    data.suggest?.text && data.suggest?.update ? (
      <button
        className={`btn btn-sm sm:btn-normal btn-neutral btn-outline grow flex flex-row items-center justify-between sm:grow-0 shrink-0 z-10 ${
          BtnIcon ? 'gap-6' : ''
        }`}
        onClick={() => handleUpdate(data.suggest.update)}
      >
        {BtnIcon && <BtnIcon className="w-5 h-6 sm:w-6 h-6" />}
        {t(data.suggest.text)}
      </button>
    ) : null

  const msg = data.replace
    ? mustache.render(t(data.msg), { ...data.replace, '&quot;': '"' })
    : t(data.msg)

  return (
    <div className="w-4/5 max-w-md shrink-0">
      <div className={`relative bg-${color} bg-opacity-10`}>
        <div className="p-3 rounded-lg shadow text-base">
          <div className="flex flex-row flex-wrap sm:flex-nowrap gap-2 items-start z-10">
            <div className="first:mt-0 popout-content grow z-10 md flag">
              <Markdown>{msg}</Markdown>
            </div>
            {button ? (
              <div className="flex flex-row justify-between sm:flex-col gap-2 shrink-0 z-10 w-full sm:w-auto">
                {button}
                <button
                  className="w-1/2 sm:w-full btn btn-ghost btn-sm z-10 flex flex-row items-center justify-between w-full"
                  onClick={() => setHide(true)}
                >
                  {t('flag:dismiss')}
                  <Icon className="w-5 h-6 sm:w-6 h-6" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  className="btn btn-sm btn-circle btn-ghost"
                  onClick={() => setHide(true)}
                  title={t('flag:hide')}
                >
                  <Icon className="w-5 h-5 sm:w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
