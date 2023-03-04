// Hooks
import { useTranslation } from 'next-i18next'
import { useBackend } from 'site/hooks/useBackend.mjs'
import { useToast } from 'site/hooks/useToast.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'

export const ns = ['account', 'toast']

export const ReloadAccount = ({ app, title = false }) => {
  const backend = useBackend(app)
  const { t } = useTranslation(ns)
  const toast = useToast()

  const reload = async () => {
    app.startLoading()
    const result = await backend.reloadAccount()
    if (result === true) toast.success(<span>{t('nailedIt')}</span>)
    else toast.for.backendError()
    app.stopLoading()
  }

  return (
    <>
      {title ? <h2>{t('reloadMsg1')}</h2> : null}
      <p>{t('reloadMsg2')}</p>
      <button className="btn btn-primary capitalize w-full my-2" onClick={reload}>
        {t('reload')}
      </button>
      <BackToAccountButton loading={app.loading} />
    </>
  )
}
