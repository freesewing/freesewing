// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'site/hooks/useBackend.mjs'
import { useToast } from 'site/hooks/useToast.mjs'
// Components
import { BackToAccountButton, Choice, Icons, welcomeSteps } from './shared.mjs'
import { ContinueButton } from 'site/components/buttons/continue-button.mjs'

export const ns = ['account', 'toast']

export const NewsletterSettings = ({ app, title = false, welcome = false }) => {
  const backend = useBackend(app)
  const toast = useToast()
  const { t } = useTranslation(ns)
  const [selection, setSelection] = useState(app.account?.newsletter ? 'yes' : 'no')

  const update = async (val) => {
    if (val !== selection) {
      app.startLoading()
      const result = await backend.updateAccount({ newsletter: val === 'yes' ? true : false })
      if (result === true) {
        setSelection(val)
        toast.for.settingsSaved()
      } else toast.for.backendError()
      app.stopLoading()
    }
  }

  const nextHref =
    welcomeSteps[app.account?.control].length > 2
      ? '/welcome/' + welcomeSteps[app.account?.control][2]
      : '/docs/guide'

  return (
    <>
      {title ? <h1 className="text-4xl">{t('newsletterTitle')}</h1> : null}
      {['yes', 'no'].map((val) => (
        <Choice val={val} t={t} update={update} current={selection} bool key={val}>
          <span className="block text-lg leading-5">
            {selection === 1 && val === 2
              ? t('showMore')
              : t(val === 'yes' ? 'newsletterYes' : 'noThanks')}
          </span>
          <span className="block text-normal font-light normal-case pt-1 leading-5">
            {t(val === 'yes' ? 'newsletterYesd' : 'newsletterNod')}
          </span>
        </Choice>
      ))}
      {welcome ? (
        <>
          <ContinueButton app={app} btnProps={{ href: nextHref }} link />
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
      ) : (
        <BackToAccountButton loading={app.loading} />
      )}
    </>
  )
}

export default NewsletterSettings
