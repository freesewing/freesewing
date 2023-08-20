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
import { Popout } from 'shared/components/popout/index.mjs'

export const ns = ['account', 'status']

export const PlatformSettings = ({ platform }) => {
  // Hooks
  const { account, setAccount, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()

  // State
  const [platformId, setPlatformId] = useState(account.data[platform] || '')

  // Helper method to save changes
  const save = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const data = { data: {} }
    data.data[platform] = platformId
    const result = await backend.updateAccount(data)
    if (result.success) {
      setAccount(result.data.account)
      setLoadingStatus([true, 'settingsSaved', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  return (
    <div className="max-w-xl">
      <LoadingStatus />
      <h2 className="text-4xl">
        {t(platform === 'website' ? 'account:websiteTitle' : 'account:platformTitle', {
          platform: platform,
        })}
      </h2>
      <div className="flex flex-row items-center mb-4">
        <input
          value={platformId}
          onChange={(evt) => setPlatformId(evt.target.value)}
          className="input w-full input-bordered flex flex-row"
          type="text"
          placeholder={account[platform]}
        />
      </div>
      <SaveSettingsButton btnProps={{ onClick: save }} />
      <BackToAccountButton />
      <Popout note>
        <p className="text-sm font-bold">{t('platformWhy')}</p>
      </Popout>
    </div>
  )
}
