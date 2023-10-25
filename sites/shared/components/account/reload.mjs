// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useContext } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'

export const ns = ['account', 'status']

export const ReloadAccount = ({ title = false }) => {
  // Hooks
  const { setAccount } = useAccount()
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const { setLoadingStatus } = useContext(LoadingStatusContext)

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
      {title ? <h2>{t('reloadMsg1')}</h2> : null}
      <p>{t('reloadMsg2')}</p>
      <button className="btn btn-primary capitalize w-full my-2" onClick={reload}>
        {t('reload')}
      </button>
      <BackToAccountButton />
    </div>
  )
}
