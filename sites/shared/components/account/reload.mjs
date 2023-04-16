// Dependencies
import { useTranslation } from 'next-i18next'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'

export const ns = ['account', 'toast']

export const ReloadAccount = ({ app, title = false }) => {
  const { setAccount, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)
  const toast = useToast()

  const reload = async () => {
    app.startLoading()
    const result = await backend.reloadAccount()
    if (result.success) {
      setAccount(result.data.account)
      toast.success(<span>{t('nailedIt')}</span>)
    } else toast.for.backendError()
    app.stopLoading()
  }

  return (
    <>
      {title ? <h2>{t('reloadMsg1')}</h2> : null}
      <p>{t('reloadMsg2')}</p>
      <button className="btn btn-primary capitalize w-full my-2" onClick={reload}>
        {t('reload')}
      </button>
      <BackToAccountButton loading={app.state.loading} />
    </>
  )
}
