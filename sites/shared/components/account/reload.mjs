// Dependencies
import { useTranslation } from 'next-i18next'
// Hooks
import { useContext } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'

export const ns = ['account', 'toast']

export const ReloadAccount = ({ title = false }) => {
  // Context
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const { setAccount, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)
  const toast = useToast()

  // Helper method to reload account
  const reload = async () => {
    startLoading()
    const result = await backend.reloadAccount()
    if (result.success) {
      setAccount(result.data.account)
      toast.success(<span>{t('nailedIt')}</span>)
    } else toast.for.backendError()
    stopLoading()
  }

  return (
    <div className="max-w-xl">
      {title ? <h2>{t('reloadMsg1')}</h2> : null}
      <p>{t('reloadMsg2')}</p>
      <button className="btn btn-primary capitalize w-full my-2" onClick={reload}>
        {t('reload')}
      </button>
      <BackToAccountButton loading={loading} />
    </div>
  )
}
