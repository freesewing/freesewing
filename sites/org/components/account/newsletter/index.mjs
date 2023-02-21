// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'site/hooks/useBackend.mjs'
// Components
import Link from 'next/link'
import { Choice, Icons, welcomeSteps } from '../shared.mjs'

export const ns = ['newsletter']

export const NewsletterSettings = ({ app, title = false, welcome = false }) => {
  const backend = useBackend(app)
  const { t } = useTranslation(ns)
  const [selection, setSelection] = useState(app.account?.newsletter ? 'yes' : 'no')

  const update = async (val) => {
    if (val !== selection) {
      const result = await backend.updateAccount({ newsletter: val === 'yes' ? true : false })
      if (result) setSelection(val)
    }
  }

  const nextHref =
    welcomeSteps[app.account?.control].length > 2
      ? '/welcome/' + welcomeSteps[app.account?.control][2]
      : '/docs/guide'

  return (
    <>
      {title ? <h1 className="text-4xl">{t('title')}</h1> : null}
      {['yes', 'no'].map((val) => (
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
                value={200 / welcomeSteps[app.account?.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                2 / {welcomeSteps[app.account?.control].length}
              </span>
              <Icons
                done={welcomeSteps[app.account?.control].slice(0, 1)}
                todo={welcomeSteps[app.account?.control].slice(2)}
                current="newsletter"
              />
            </>
          ) : null}
        </>
      ) : null}
    </>
  )
}

export default NewsletterSettings
