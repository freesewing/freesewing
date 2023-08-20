// Dependencies
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
// Components
import { BackToAccountButton, Choice, Icons, welcomeSteps } from './shared.mjs'
import { ContinueButton } from 'shared/components/buttons/continue-button.mjs'

export const ns = ['account', 'status']

/** state handlers for any input that changes the control setting */
export const useControlState = () => {
  // Hooks
  const { account, setAccount, token } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()

  // State
  const [selection, setSelection] = useState(account.control)

  // Method to update the control setting
  const update = async (control) => {
    if (control !== selection) {
      if (token) {
        setLoadingStatus([true, 'processingUpdate'])
        const result = await backend.updateAccount({ control })
        if (result.success) {
          setSelection(control)
          setAccount(result.data.account)
          setLoadingStatus([true, 'settingsSaved', true, true])
        } else setLoadingStatus([true, 'backendError', true, true])
      }
      //fallback for guest users
      else {
        setAccount({ ...account, control })
        setSelection(control)
      }
    }
  }

  return { selection, update, LoadingStatus }
}

export const ControlSettings = ({ title = false, welcome = false, noBack = false }) => {
  const { t } = useTranslation(ns)

  const { selection, update, LoadingStatus } = useControlState()

  // Helper to get the link to the next onboarding step
  const nextHref = welcome
    ? welcomeSteps[selection].length > 1
      ? '/welcome/' + welcomeSteps[selection][1]
      : '/docs/guide'
    : false

  return (
    <div className="max-w-xl">
      <LoadingStatus />
      {title ? <h1 className="text-4xl">{t('controlTitle')}</h1> : null}
      {[1, 2, 3, 4, 5].map((val) => (
        <Choice val={val} t={t} update={update} current={selection} key={val}>
          <span className="block text-lg leading-5">{t(`control${val}.t`)}</span>
          {selection > 1 ? (
            <span className="block text-normal font-light normal-case pt-1 leading-5">
              {t(`control${val}.d`)}
            </span>
          ) : null}
        </Choice>
      ))}
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
      ) : noBack ? null : (
        <BackToAccountButton />
      )}
    </div>
  )
}
