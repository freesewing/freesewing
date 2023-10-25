// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useState, useContext } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { WebLink } from 'shared/components/link.mjs'

export const ns = ['account', 'status']

export const ExportAccount = () => {
  // Hooks
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  const [link, setLink] = useState()

  // Helper method to export account
  const exportData = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.exportAccount()
    if (result.success) {
      setLink(result.data.data)
      setLoadingStatus([true, 'nailedIt', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  return (
    <div className="max-w-xl">
      {link ? (
        <Popout link>
          <h5>{t('exportDownload')}</h5>
          <p className="text-lg">
            <WebLink href={link} txt={link} />
          </p>
        </Popout>
      ) : null}
      <p>{t('exportMsg')}</p>
      <button className="btn btn-primary capitalize w-full my-2" onClick={exportData}>
        {t('export')}
      </button>
      <BackToAccountButton />
    </div>
  )
}
