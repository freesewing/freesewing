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
import { Choice, Icons, welcomeSteps, BackToAccountButton } from './shared.mjs'
import { ContinueButton } from 'site/components/buttons/continue-button.mjs'

export const ns = ['account', 'toast']

export const CompareSettings = ({ title = false, welcome = false }) => {
  // Context
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const { account, setAccount, token } = useAccount()
  const backend = useBackend(token)
  const toast = useToast()
  const { t } = useTranslation(ns)

  // State
  const [selection, setSelection] = useState(account?.compare ? 'yes' : 'no')

  // Helper method to update the account
  const update = async (val) => {
    if (val !== selection) {
      startLoading()
      const result = await backend.updateAccount({
        compare: val === 'yes' ? true : false,
      })
      if (result.success) {
        setAccount(result.data.account)
        setSelection(val)
        toast.for.settingsSaved()
      } else toast.for.backendError()
      stopLoading()
    }
  }

  // Link to the next onboarding step
  const nextHref =
    welcomeSteps[account?.control].length > 3
      ? '/welcome/' + welcomeSteps[account?.control][4]
      : '/docs/guide'

  return (
    <div className="max-w-xl">
      {title ? <h2 className="text-4xl">{t('compareTitle')}</h2> : null}
      {['yes', 'no'].map((val) => (
        <Choice val={val} t={t} update={update} current={selection} bool key={val}>
          <span className="block text-lg leading-5">
            {selection === 1 && val === 2
              ? t('showMore')
              : t(val === 'yes' ? 'compareYes' : 'compareNo')}
          </span>
          <span className="block text-normal font-light normal-case pt-1 leading-5">
            {t(val === 'yes' ? 'compareYesd' : 'compareNod')}
          </span>
        </Choice>
      ))}
      {welcome ? (
        <>
          <ContinueButton btnProps={{ href: nextHref }} link />
          {welcomeSteps[account?.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={400 / welcomeSteps[account?.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                4 / {welcomeSteps[account?.control].length}
              </span>
              <Icons
                done={welcomeSteps[account?.control].slice(0, 3)}
                todo={welcomeSteps[account?.control].slice(4)}
                current="compare"
              />
            </>
          ) : null}
        </>
      ) : (
        <BackToAccountButton loading={loading} />
      )}
    </div>
  )
}
