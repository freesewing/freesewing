// Dependencies
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import Link from 'next/link'
import { BackToAccountButton } from './shared.mjs'
import { SaveSettingsButton } from 'shared/components/buttons/save-settings-button.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { RightIcon } from 'shared/components/icons.mjs'
import { PasswordInput } from 'shared/components/inputs.mjs'
import { DynamicOrgDocs } from 'site/components/dynamic-org-docs.mjs'

export const ns = ['account', 'status']

export const PasswordSettings = ({ welcome = false }) => {
  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { t, i18n } = useTranslation(ns)
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [password, setPassword] = useState('')

  // Helper method to save password to account
  const save = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.updateAccount({ password })
    if (result.success) {
      setAccount(result.data.account)
      setLoadingStatus([true, 'settingsSaved', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  return (
    <div className="max-w-xl">
      <PasswordInput
        id="account-password"
        label={t('passwordTitle')}
        current={password}
        update={setPassword}
        valid={(val) => val.length > 0}
        placeholder={t('passwordTitle')}
        docs={<DynamicOrgDocs language={i18n.language} path={`site/account/password`} />}
      />
      <SaveSettingsButton btnProps={{ onClick: save, disabled: password.length < 4 }} />
      {!welcome && <BackToAccountButton />}
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
