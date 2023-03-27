// Dependencies
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'
import { SaveSettingsButton } from 'site/components/buttons/save-settings-button.mjs'

export const ns = ['account', 'toast']

export const GithubSettings = ({ app, title = false, welcome = false }) => {
  const { account, setAccount, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)
  const toast = useToast()
  const [github, setGithub] = useState(account.github || '')

  const save = async () => {
    app.startLoading()
    const result = await backend.updateAccount({ github })
    if (result.success) {
      setAccount(result.data.account)
      toast.for.settingsSaved()
    } else toast.for.backendError()
    app.stopLoading()
  }

  return (
    <div className="max-w-xl">
      {title ? <h2 className="text-4xl">{t('githubTitle')}</h2> : null}
      <div className="flex flex-row items-center mt-4">
        <input
          value={github}
          onChange={(evt) => setGithub(evt.target.value)}
          className="input w-full input-bordered flex flex-row"
          type="text"
          placeholder={t('github')}
        />
      </div>
      <SaveSettingsButton app={app} btnProps={{ onClick: save }} />
      {!welcome && <BackToAccountButton loading={app.state.loading} />}
    </div>
  )
}
