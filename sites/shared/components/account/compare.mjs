// Dependencies
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { Icons, welcomeSteps, BackToAccountButton } from './shared.mjs'
import { ContinueButton } from 'shared/components/buttons/continue-button.mjs'
import { ListInput } from 'shared/components/inputs.mjs'
import { OkIcon, NoIcon } from 'shared/components/icons.mjs'
import { DynamicOrgDocs } from 'site/components/dynamic-org-docs.mjs'

export const ns = ['account', 'status']

export const CompareSettings = ({ welcome = false }) => {
  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const { t, i18n } = useTranslation(ns)

  // State
  const [selection, setSelection] = useState(account?.compare ? 'yes' : 'no')

  // Helper method to update the account
  const update = async (val) => {
    if (val !== selection) {
      setLoadingStatus([true, 'processingUpdate'])
      const result = await backend.updateAccount({
        compare: val === 'yes' ? true : false,
      })
      if (result.success) {
        setLoadingStatus([true, 'settingsSaved', true, true])
        setAccount(result.data.account)
        setSelection(val)
      } else setLoadingStatus([true, 'backendError', true, true])
    }
  }

  // Link to the next onboarding step
  const nextHref =
    welcomeSteps[account?.control].length > 3
      ? '/welcome/' + welcomeSteps[account?.control][4]
      : '/docs/guide'

  return (
    <div className="max-w-xl">
      <ListInput
        id="account-compare"
        label={t('compareTitle')}
        list={['yes', 'no'].map((val) => ({
          val,
          label: (
            <div className="flex flex-row items-center w-full justify-between">
              <span>{t(val === 'yes' ? 'compareYes' : 'compareNo')}</span>
              {val === 'yes' ? (
                <OkIcon className="w-8 h-8 text-success" stroke={4} />
              ) : (
                <NoIcon className="w-8 h-8 text-error" stroke={3} />
              )}
            </div>
          ),
          desc: t(val === 'yes' ? 'compareYesd' : 'compareNod'),
        }))}
        current={selection}
        update={update}
        docs={<DynamicOrgDocs language={i18n.language} path={`site/account/compare`} />}
      />
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
        <BackToAccountButton />
      )}
    </div>
  )
}
