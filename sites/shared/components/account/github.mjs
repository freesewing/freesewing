// Dependencies
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'
import { SaveSettingsButton } from 'shared/components/buttons/save-settings-button.mjs'
import { StringInput } from 'shared/components/inputs.mjs'
import { DynamicOrgDocs } from 'shared/components/dynamic-docs/org.mjs'

export const ns = ['account', 'status']

export const GithubSettings = () => {
  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { t, i18n } = useTranslation(ns)
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()

  // State
  const [githubUsername, setGithubUsername] = useState(account.data.githubUsername || '')
  const [githubEmail, setGithubEmail] = useState(account.data.githubEmail || '')

  // Helper method to save changes
  const save = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.updateAccount({ data: { githubUsername, githubEmail } })
    if (result.success) {
      setAccount(result.data.account)
      setLoadingStatus([true, 'settingsSaved', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  return (
    <div className="max-w-xl">
      <LoadingStatus />
      <h2 className="text-4xl">{t('githubTitle')}</h2>
      <StringInput
        label={t('email')}
        current={githubEmail}
        update={setGithubEmail}
        valid={(val) => val.length > 0}
        placeholder={'joostdecock'}
        docs={<DynamicOrgDocs language={i18n.language} path={`site/account/github`} />}
      />
      <StringInput
        label={t('username')}
        current={githubUsername}
        update={setGithubUsername}
        valid={(val) => val.length > 0}
        placeholder={'joost@joost.at'}
        docs={<DynamicOrgDocs language={i18n.language} path={`site/account/github`} />}
      />
      <SaveSettingsButton btnProps={{ onClick: save }} />
      <BackToAccountButton />
    </div>
  )
}
