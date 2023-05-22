// Dependencies
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
// Components
import { BackToAccountButton, Choice, Icons, welcomeSteps } from './shared.mjs'
import { ContinueButton } from 'shared/components/buttons/continue-button.mjs'

export const ns = ['account', 'toast']

export const ControlSettings = ({ title = false, welcome = false }) => {
  // Context
  const { startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const { account, setAccount, token } = useAccount()
  const backend = useBackend(token)
  const toast = useToast()
  const { t } = useTranslation(ns)

  // State
  const [selection, setSelection] = useState(account.control || 2)

  // Method to update the control setting
  const update = async (control) => {
    if (control !== selection) {
      startLoading()
      const result = await backend.updateAccount({ control })
      if (result.success) {
        setSelection(control)
        toast.for.settingsSaved()
        setAccount(result.data.account)
      } else toast.for.backendError()
      stopLoading()
    }
  }

  // Helper to get the link to the next onboarding step
  const nextHref = welcome
    ? welcomeSteps[selection].length > 1
      ? '/welcome/' + welcomeSteps[selection][1]
      : '/docs/guide'
    : false

  return (
    <div className="max-w-xl">
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
          <ContinueButton btnProps={{ href: nextHref }} link />
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
        <BackToAccountButton />
      )}
    </div>
  )
}
