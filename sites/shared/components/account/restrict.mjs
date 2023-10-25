// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'
import { Popout } from 'shared/components/popout/index.mjs'

export const ns = ['account', 'status']

export const RestrictAccount = () => {
  // Hooks
  const { signOut } = useAccount()
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // Helper method to export account
  const restrictAccount = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.restrictAccount()
    if (result.success) {
      setLoadingStatus([true, 'nailedIt', true, true])
      signOut()
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  return (
    <div className="max-w-xl">
      <Popout warning>
        <h5>{t('proceedWithCaution')}</h5>
        <p className="text-lg">{t('restrictWarning')}</p>
        <button className="btn btn-error capitalize w-full my-2" onClick={restrictAccount}>
          {t('restrict')}
        </button>
      </Popout>
      <BackToAccountButton />
    </div>
  )
}
