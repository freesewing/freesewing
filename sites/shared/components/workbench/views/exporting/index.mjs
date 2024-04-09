//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Dependencies
import {
  exportTypes,
  handleExport,
  ns as exportNs,
} from 'shared/components/workbench/exporting/export-handler.mjs'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Components
import { Popout } from 'shared/components/popout/index.mjs'
import { WebLink } from 'shared/components/link.mjs'

export const ns = ['exporting', exportNs, 'workbench']

export const ExportView = ({ settings, ui, design, Design }) => {
  const [link, setLink] = useState(false)
  const [format, setFormat] = useState(false)
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  const startLoading = () => setLoadingStatus([true, 'exporting'])
  const stopLoading = () => setLoadingStatus([true, 'status:nailedIt', true, true])
  const stopLoadingFail = () => setLoadingStatus([true, 'status:failed', true])

  const { t } = useTranslation(ns)
  const doExport = (format) => {
    setLink(false)
    setFormat(format)
    handleExport({
      format,
      settings,
      design,
      t,
      Design,
      ui,
      startLoading,
      stopLoading,
      stopLoadingFail,
      onComplete: (e) => {
        if (e.data.link) {
          setLink(e.data.link)
        }
      },
      onError: (e) => {
        if (e.data?.error) setLoadingStatus([true, e.data.error.message, true, false])
      },
    })
  }

  return (
    <div className="max-w-screen-xl m-auto py-8">
      <h2>{t('workbench:export')}</h2>
      <p className="text-lg sm:text-xl">{t('exportPattern-txt')}</p>
      {link && (
        <Popout link compact>
          <span className="font-bold mr-4 uppercase text-sm">{format}:</span>
          <WebLink href={link} txt={link} />
        </Popout>
      )}
      <div className="flex flex-row flex-wrap gap-8">
        {Object.keys(exportTypes).map((type) => (
          <div key={type} className="flex flex-col gap-2 w-full sm:w-auto">
            <h4>{t(type)}</h4>
            {exportTypes[type].map((format) => (
              <button
                key={format}
                className="btn btn-primary uppercase"
                onClick={() => doExport(format)}
              >
                {type === 'exportForPrinting' ? `${format} pdf` : format}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
