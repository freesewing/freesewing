// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'site/hooks/useBackend.mjs'
import { useToast } from 'site/hooks/useToast.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'
import { SaveSettingsButton } from 'site/components/buttons/save-settings-button.mjs'

export const ns = ['account', 'toast']

export const GithubSettings = ({ app, title = false, welcome = false }) => {
  const backend = useBackend(app)
  const { t } = useTranslation(ns)
  const toast = useToast()
  const [github, setGithub] = useState(app.account.github || '')

  const save = async () => {
    app.startLoading()
    const result = await backend.updateAccount({ github })
    if (result === true) toast.for.settingsSaved()
    else toast.for.backendError()
    app.stopLoading()
  }

  return (
    <>
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
      {!welcome && <BackToAccountButton loading={app.loading} />}
    </>
  )
}
