// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'site/hooks/useBackend.mjs'
// Components
import Link from 'next/link'
import { Choice, Icons, welcomeSteps } from '../shared.mjs'

export const ns = ['units']

export const UnitsSettings = ({ app, title = false, welcome = false }) => {
  const backend = useBackend(app)
  const { t } = useTranslation(ns)
  const [selection, setSelection] = useState(app.account?.imperial === true ? 'imperial' : 'metric')

  const update = async (val) => {
    if (val !== selection) {
      const result = await backend.updateAccount({ imperial: val === 'imperial' ? true : false })
      if (result) setSelection(val)
    }
  }

  const nextHref =
    welcomeSteps[app.account?.control].length > 3
      ? '/welcome/' + welcomeSteps[app.account?.control][3]
      : '/docs/guide'

  return (
    <>
      {title ? <h1 className="text-4xl">{t('title')}</h1> : <h1></h1>}
      {['metric', 'imperial'].map((val) => (
        <Choice val={val} t={t} update={update} current={selection} bool key={val}>
          <span className="block text-lg leading-5">
            {selection === 1 && val === 2 ? t('showMore') : t(`${val}`)}
          </span>
          <span className="block text-xs font-light normal-case pt-1">{t(`${val}d`)}</span>
        </Choice>
      ))}
      {welcome ? (
        <>
          <Link href={nextHref} className="btn btn-primary w-full mt-12">
            {t('continue')}
          </Link>
          {welcomeSteps[app.account?.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={300 / welcomeSteps[app.account?.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                3 / {welcomeSteps[app.account?.control].length}
              </span>
              <Icons
                done={welcomeSteps[app.account?.control].slice(0, 2)}
                todo={welcomeSteps[app.account?.control].slice(3)}
                current="units"
              />
            </>
          ) : null}
        </>
      ) : null}
    </>
  )
}
