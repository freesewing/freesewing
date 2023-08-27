// Dependencies
import { useTranslation } from 'next-i18next'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'

export const ns = ['account', 'status']

export const ReloadAccount = ({ title = false }) => {
  // Hooks
  const { setAccount } = useAccount()
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()

  // Helper method to reload account
  const reload = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.reloadAccount()
    if (result.success) {
      setAccount(result.data.account)
      setLoadingStatus([true, 'nailedIt', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  return (
    <div className="max-w-xl">
      <LoadingStatus />
      {title ? <h2>{t('reloadMsg1')}</h2> : null}
      <p>{t('reloadMsg2')}</p>
      <button className="btn btn-primary capitalize w-full my-2" onClick={reload}>
        {t('reload')}
      </button>
      <BackToAccountButton />
    </div>
  )
}
