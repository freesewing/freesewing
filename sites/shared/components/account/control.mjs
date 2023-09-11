// Dependencies
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { BackToAccountButton, Icons, welcomeSteps } from './shared.mjs'
import { ContinueButton } from 'shared/components/buttons/continue-button.mjs'
import { ListInput } from 'shared/components/inputs.mjs'
import { DynamicOrgDocs } from 'site/components/dynamic-org-docs.mjs'
import { ControlScore } from 'shared/components/control/score.mjs'

export const ns = ['account', 'status']

/** state handlers for any input that changes the control setting */
export const useControlState = () => {
  // Hooks
  const { account, setAccount, token } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

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

  return { selection, update }
}

export const ControlSettings = ({ welcome = false, noBack = false }) => {
  const { t, i18n } = useTranslation(ns)

  const { selection, update } = useControlState()

  // Helper to get the link to the next onboarding step
  const nextHref = welcome
    ? welcomeSteps[selection].length > 1
      ? '/welcome/' + welcomeSteps[selection][1]
      : '/docs/guide'
    : false

  return (
    <div className="max-w-xl">
      <ListInput
        id="account-control"
        label={t('controlTitle')}
        list={[1, 2, 3, 4, 5].map((val) => ({
          val,
          label: (
            <div className="flex flex-row items-center w-full justify-between">
              <span>{t(`control${val}.t`)}</span>
              <ControlScore control={val} />
            </div>
          ),
          desc: t(`control${val}.d`),
        }))}
        current={selection}
        update={update}
        docs={<DynamicOrgDocs language={i18n.language} path={`site/account/control`} />}
      />
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
