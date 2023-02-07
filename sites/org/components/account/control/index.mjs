// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'site/hooks/useBackend.mjs'
// Components
import Link from 'next/link'
import { Choice, Icons, welcomeSteps } from '../shared.mjs'

export const ns = ['control']

export const ControlSettings = ({ app, title = false, welcome = false }) => {
  const backend = useBackend(app)
  const { t } = useTranslation(ns)
  const [selection, setSelection] = useState(app.account.control || 2)

  const update = async (control) => {
    if (control !== selection) {
      const result = await backend.updateAccount({ control })
      if (result) setSelection(control)
    }
  }

  const nextHref =
    welcomeSteps[selection].length > 1 ? '/welcome/' + welcomeSteps[selection][1] : '/docs/guide'

  return (
    <>
      {title ? <h1 className="text-4xl">{t('title')}</h1> : null}
      {[1, 2, 3, 4, 5].map((val) => {
        if (selection === 1 && val > 2) return null
        if (selection === 2 && val > 3) return null
        if (selection === 3 && val > 4) return null
        if (selection === 5 && val < 4) return null
        else
          return (
            <Choice val={val} t={t} update={update} current={selection} key={val}>
              <span className="block text-lg leading-5">
                {selection === 1 && val === 2 ? t('showMore') : t(`${val}t`)}
              </span>
              {selection > 1 ? (
                <span className="block text-xs font-light normal-case pt-1">{t(`${val}d`)}</span>
              ) : null}
            </Choice>
          )
      })}
      {welcome ? (
        <>
          <Link href={nextHref} className="btn btn-primary w-full mt-12">
            {t('continue')}
          </Link>
          {welcomeSteps[selection].length > 1 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={100 / welcomeSteps[selection].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                1 / {welcomeSteps[selection].length}
              </span>
              <Icons done={[]} todo={welcomeSteps[selection].slice(1)} current="" />
            </>
          ) : null}
        </>
      ) : null}
    </>
  )
}

export default ControlSettings
