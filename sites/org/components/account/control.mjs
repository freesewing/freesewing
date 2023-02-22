// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'site/hooks/useBackend.mjs'
import { useToast } from 'site/hooks/useToast.mjs'
// Components
import { BackToAccountButton, Choice, Icons, welcomeSteps } from './shared.mjs'
import { ContinueButton } from 'site/components/buttons/continue-button.mjs'

export const ns = ['account', 'toast']

export const ControlSettings = ({ app, title = false, welcome = false }) => {
  const backend = useBackend(app)
  const toast = useToast()
  const { t } = useTranslation(ns)
  const [selection, setSelection] = useState(app.account.control || 2)

  const update = async (control) => {
    if (control !== selection) {
      app.startLoading()
      const result = await backend.updateAccount({ control })
      if (result) setSelection(control)
      if (result === true) toast.for.settingsSaved()
      else toast.for.backendError()
      app.stopLoading()
    }
  }

  const nextHref =
    welcomeSteps[selection].length > 1 ? '/welcome/' + welcomeSteps[selection][1] : '/docs/guide'

  return (
    <>
      {title ? <h1 className="text-4xl">{t('controlTitle')}</h1> : null}
      {[1, 2, 3, 4, 5].map((val) => {
        if (selection === 1 && val > 2) return null
        if (selection === 2 && val > 3) return null
        if (selection === 3 && val > 4) return null
        if (selection === 5 && val < 4) return null
        else
          return (
            <Choice val={val} t={t} update={update} current={selection} key={val}>
              <span className="block text-lg leading-5">
                {selection === 1 && val === 2 ? t('showMore') : t(`control${val}t`)}
              </span>
              {selection > 1 ? (
                <span className="block text-normal font-light normal-case pt-1 leading-5">
                  {t(`control${val}d`)}
                </span>
              ) : null}
            </Choice>
          )
      })}
      {welcome ? (
        <>
          <ContinueButton app={app} btnProps={{ href: nextHref }} link />
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
      ) : (
        <BackToAccountButton loading={app.loading} />
      )}
    </>
  )
}
