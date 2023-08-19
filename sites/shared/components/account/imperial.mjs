// Dependencies
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
// Components
import { Choice, Icons, welcomeSteps, BackToAccountButton } from './shared.mjs'
import { ContinueButton } from 'shared/components/buttons/continue-button.mjs'

export const ns = ['account', 'status']

export const ImperialSettings = ({ title = false, welcome = false }) => {
  // Hooks
  const { account, setAccount, token } = useAccount()
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)

  // State
  const [selection, setSelection] = useState(account?.imperial === true ? 'imperial' : 'metric')

  // Helper method to update account
  const update = async (val) => {
    if (val !== selection) {
      setLoadingStatus([true, 'processingUpdate'])
      const result = await backend.updateAccount({ imperial: val === 'imperial' ? true : false })
      if (result.success) {
        setAccount(result.data.account)
        setSelection(val)
        setLoadingStatus([true, 'settingsSaved', true, true])
      } else setLoadingStatus([true, 'backendError', true, true])
    }
  }

  // Next step in the onboarding
  const nextHref =
    welcomeSteps[account?.control].length > 3
      ? '/welcome/' + welcomeSteps[account?.control][3]
      : '/docs/guide'

  return (
    <div className="max-w-xl">
      <LoadingStatus />
      {title ? <h1 className="text-4xl">{t('unitsTitle')}</h1> : <h1></h1>}
      {['metric', 'imperial'].map((val) => (
        <Choice
          val={val}
          t={t}
          update={update}
          current={selection}
          bool
          key={val}
          boolIcons={{ yes: <span>&quot;</span>, no: <span>cm</span> }}
        >
          <span className="block text-lg leading-5">
            {selection === 1 && val === 2 ? t('showMore') : t(`${val}Units`)}
          </span>
          <span className="block text-normal font-light normal-case pt-1">{t(`${val}Unitsd`)}</span>
        </Choice>
      ))}
      {welcome ? (
        <>
          <ContinueButton btnProps={{ href: nextHref }} link />
          {welcomeSteps[account?.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={300 / welcomeSteps[account?.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                3 / {welcomeSteps[account?.control].length}
              </span>
              <Icons
                done={welcomeSteps[account?.control].slice(0, 2)}
                todo={welcomeSteps[account?.control].slice(3)}
                current="units"
              />
            </>
          ) : null}
        </>
      ) : (
        <BackToAccountButton />
      )}
    </div>
  )
}
