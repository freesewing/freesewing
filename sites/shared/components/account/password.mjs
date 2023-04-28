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
import Link from 'next/link'
import { BackToAccountButton } from './shared.mjs'
import { SaveSettingsButton } from 'site/components/buttons/save-settings-button.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { RightIcon } from 'shared/components/icons.mjs'

export const ns = ['account', 'toast']

export const PasswordSettings = ({ title = false, welcome = false }) => {
  // Context
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const { account, setAccount, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)
  const toast = useToast()

  // State
  const [password, setPassword] = useState('')
  const [reveal, setReveal] = useState(false)

  // Helper method to save password to account
  const save = async () => {
    startLoading()
    const result = await backend.updateAccount({ password })
    if (result.success) {
      setAccount(result.data.account)
      toast.for.settingsSaved()
    } else toast.for.backendError()
    stopLoading()
  }

  return (
    <div className="max-w-xl">
      {title ? <h2 className="text-4xl">{t('passwordTitle')}</h2> : null}
      <div className="flex flex-row items-center mt-4 gap-2">
        <input
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          className="input w-full input-bordered flex flex-row"
          type={reveal ? 'text' : 'password'}
          placeholder={t('newPasswordPlaceholder')}
        />
        <button
          className="btn hover:bg-opacity-10 border-0 btn-outline"
          onClick={() => setReveal(!reveal)}
        >
          <span role="img" className="text-3xl">
            {reveal ? '👀' : '🙈'}
          </span>
        </button>
      </div>
      <SaveSettingsButton btnProps={{ onClick: save, disabled: password.length < 4 }} />
      {!welcome && <BackToAccountButton loading={loading} />}
      {!account.mfaEnabled && (
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
    </div>
  )
}
