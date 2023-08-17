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
import { BackToAccountButton } from './shared.mjs'
import { SaveSettingsButton } from 'shared/components/buttons/save-settings-button.mjs'
import { Popout } from 'shared/components/popout/index.mjs'

export const ns = ['account', 'toast']

export const GithubSettings = ({ title = false, welcome = false }) => {
  // Context
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const { account, setAccount, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)
  const toast = useToast()

  // State
  const [githubUsername, setGithubUsername] = useState(account.data.githubUsername || '')
  const [githubEmail, setGithubEmail] = useState(account.data.githubEmail || '')

  // Helper method to save changes
  const save = async () => {
    startLoading()
    const result = await backend.updateAccount({ data: { githubUsername, githubEmail } })
    if (result.success) {
      setAccount(result.data.account)
      toast.for.settingsSaved()
    } else toast.for.backendError()
    stopLoading()
  }

  return (
    <div className="max-w-xl">
      {title ? <h2 className="text-4xl">{t('githubTitle')}</h2> : null}
      <label className="font-bold">{t('username')}</label>
      <div className="flex flex-row items-center mb-4">
        <input
          value={githubUsername}
          onChange={(evt) => setGithubUsername(evt.target.value)}
          className="input w-full input-bordered flex flex-row"
          type="text"
          placeholder={account.username}
        />
      </div>
      <label className="font-bold">{t('email')}</label>
      <div className="flex flex-row items-center mb-4">
        <input
          value={githubEmail}
          onChange={(evt) => setGithubEmail(evt.target.value)}
          className="input w-full input-bordered flex flex-row"
          type="text"
          placeholder={`${account.username}@users.freesewing.org`}
        />
      </div>
      <SaveSettingsButton btnProps={{ onClick: save }} />
      {!welcome && <BackToAccountButton loading={loading} />}
      <Popout note>
        <p className="text-sm font-bold">{t('githubWhy1')}</p>
        <p className="text-sm">{t('githubWhy2')}</p>
        <p className="text-sm">{t('githubWhy3')}</p>
        <p className="text-sm">{t('githubWhy4')}</p>
        <p className="text-sm">{t('tooComplex')}</p>
      </Popout>
    </div>
  )
}
