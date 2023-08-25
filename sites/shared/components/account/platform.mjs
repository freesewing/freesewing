// Dependencies
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { freeSewingConfig } from 'shared/config/freesewing.config.mjs'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'
import { SaveSettingsButton } from 'shared/components/buttons/save-settings-button.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { StringInput } from 'shared/components/inputs.mjs'
import { DynamicOrgDocs } from 'shared/components/dynamic-docs/org.mjs'

export const ns = ['account', 'status']

export const PlatformSettings = ({ platform }) => {
  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { t, i18n } = useTranslation(ns)
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
      <StringInput
        label={t(platform === 'website' ? 'account:websiteTitle' : 'account:platformTitle', {
          platform: platform,
        })}
        current={platformId}
        update={setPlatformId}
        valid={(val) => val.length > 0}
        placeholder={'joostdecock'}
        docs={<DynamicOrgDocs language={i18n.language} path={`site/account/platform`} />}
      />
      <SaveSettingsButton btnProps={{ onClick: save }} />
      <BackToAccountButton />
    </div>
  )
}
