// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'site/hooks/useBackend.mjs'
import { useToast } from 'site/hooks/useToast.mjs'
// Components
import Link from 'next/link'
import { BackToAccountButton } from './shared.mjs'
import { SaveSettingsButton } from 'site/components/buttons/save-settings-button.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { RightIcon } from 'shared/components/icons.mjs'

export const ns = ['account', 'toast']

export const PasswordSettings = ({ app, title = false, welcome = false }) => {
  const backend = useBackend(app)
  const { t } = useTranslation(ns)
  const toast = useToast()
  const [password, setPassword] = useState('')

  const save = async () => {
    app.startLoading()
    const result = await backend.updateAccount({ password })
    if (result === true) toast.for.settingsSaved()
    else toast.for.backendError()
    app.stopLoading()
  }

  return (
    <>
      {title ? <h2 className="text-4xl">{t('passwordTitle')}</h2> : null}
      <div className="flex flex-row items-center mt-4">
        <input
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          className="input w-full input-bordered flex flex-row"
          type="text"
          placeholder={t('newPasswordPlaceholder')}
        />
      </div>
      <SaveSettingsButton app={app} btnProps={{ onClick: save, disabled: password.length < 4 }} />
      {!welcome && <BackToAccountButton loading={app.loading} />}
      {!app.account.mfa && (
        <Popout tip>
          <h5>{t('mfaTipTitle')}</h5>
          <p>{t('mfaTipMsg')}</p>
          <p className="text-right m-0 pt-0">
            <Link className="btn btn-secondary btn-accent" href="/account/mfa">
              {t('mfa')} <RightIcon className="h-6 w-6 ml-2" />
            </Link>
          </p>
        </Popout>
      )}
    </>
  )
}
