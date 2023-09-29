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
import { SaveSettingsButton } from 'shared/components/buttons/save-settings-button.mjs'
import { ContinueButton } from 'shared/components/buttons/continue-button.mjs'
import { MarkdownInput } from 'shared/components/inputs.mjs'
import { DynamicOrgDocs } from 'site/components/dynamic-org-docs.mjs'
import { TipIcon } from 'shared/components/icons.mjs'

export const ns = ['account', 'status']

export const Tab = ({ id, activeTab, setActiveTab, t }) => (
  <button
    className={`text-xl font-bold capitalize tab tab-bordered grow
    ${activeTab === id ? 'tab-active' : ''}`}
    onClick={() => setActiveTab(id)}
  >
    {t(id)}
  </button>
)

export const BioSettings = ({ welcome = false }) => {
  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { t, i18n } = useTranslation(ns)
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [bio, setBio] = useState(account.bio)

  // Helper method to save bio
  const save = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.updateAccount({ bio })
    if (result.success) {
      setAccount(result.data.account)
      setLoadingStatus([true, 'settingsSaved', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  // Next step in the onboarding
  const nextHref =
    welcomeSteps[account.control].length > 5
      ? '/welcome/' + welcomeSteps[account.control][6]
      : '/docs/guide'

  return (
    <div className="max-w-xl xl:pl-4">
      <MarkdownInput
        id="account-bio"
        label={t('bioTitle')}
        update={setBio}
        current={bio}
        placeholder={t('bioTitle')}
        docs={<DynamicOrgDocs language={i18n.language} path={`site/account/bio`} />}
        labelBL={
          <span className="flex flex-row items-center gap-1">
            <TipIcon className="w-6 h-6 text-success" />
            {t('mdSupport')}
          </span>
        }
      />
      <SaveSettingsButton btnProps={{ onClick: save }} welcome={welcome} />
      {!welcome && <BackToAccountButton />}

      {welcome ? (
        <>
          <ContinueButton btnProps={{ href: nextHref }} link />
          {welcomeSteps[account.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={600 / welcomeSteps[account.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                6 / {welcomeSteps[account.control].length}
              </span>
              <Icons
                done={welcomeSteps[account.control].slice(0, 5)}
                todo={welcomeSteps[account.control].slice(6)}
                current="bio"
              />
            </>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
