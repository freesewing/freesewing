// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { BackToAccountButton, Icons, welcomeSteps } from './shared.mjs'
import { ContinueButton } from 'shared/components/buttons/continue-button.mjs'
import { ListInput } from 'shared/components/inputs.mjs'
import { DynamicOrgDocs } from 'site/components/dynamic-org-docs.mjs'
import { OkIcon, NoIcon } from 'shared/components/icons.mjs'

export const ns = ['account', 'status']

export const NewsletterSettings = ({ welcome = false }) => {
  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { t, i18n } = useTranslation(ns)
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  // State
  const [selection, setSelection] = useState(account?.newsletter ? 'yes' : 'no')

  // Helper method to update account
  const update = async (val) => {
    if (val !== selection) {
      setLoadingStatus([true, 'processingUpdate'])
      const result = await backend.updateAccount({ newsletter: val === 'yes' ? true : false })
      if (result.success) {
        setAccount(result.data.account)
        setSelection(val)
        setLoadingStatus([true, 'settingsSaved', true, true])
      } else setLoadingStatus([true, 'backendError', true, true])
    }
  }

  // Next step for onboarding
  const nextHref =
    welcomeSteps[account?.control].length > 2
      ? '/welcome/' + welcomeSteps[account?.control][2]
      : '/docs/guide'

  return (
    <div className="max-w-xl">
      <ListInput
        id="account-newsletter"
        label={t('newsletterTitle')}
        list={['yes', 'no'].map((val) => ({
          val,
          label: (
            <div className="flex flex-row items-center w-full justify-between">
              <span>{t(val === 'yes' ? 'newsletterYes' : 'noThanks')}</span>
              {val === 'yes' ? (
                <OkIcon className="w-8 h-8 text-success" stroke={4} />
              ) : (
                <NoIcon className="w-8 h-8 text-error" stroke={3} />
              )}
            </div>
          ),
          desc: t(val === 'yes' ? 'newsletterYesd' : 'newsletterNod'),
        }))}
        current={selection}
        update={update}
        docs={<DynamicOrgDocs language={i18n.language} path={`site/account/newsletter`} />}
      />
      {welcome ? (
        <>
          <ContinueButton btnProps={{ href: nextHref }} link />
          {welcomeSteps[account?.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={200 / welcomeSteps[account?.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                2 / {welcomeSteps[account?.control].length}
              </span>
              <Icons
                done={welcomeSteps[account?.control].slice(0, 1)}
                todo={welcomeSteps[account?.control].slice(2)}
                current="newsletter"
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

export default NewsletterSettings
