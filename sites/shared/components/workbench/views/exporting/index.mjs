import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { Popout } from 'shared/components/popout.mjs'
import { WebLink } from 'shared/components/web-link.mjs'
import { LoadingContext } from 'shared/context/loading-context.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
import {
  exportTypes,
  handleExport,
  ns as exportNs,
} from 'shared/components/workbench/exporting/export-handler.mjs'

export const ns = ['exporting', exportNs]

export const ExportView = ({ settings, ui, design, Design }) => {
  const [link, setLink] = useState(false)
  const [format, setFormat] = useState(false)
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)
  const toast = useToast()

  const { t } = useTranslation(ns)
  const doExport = (format) => {
    setLink(false)
    setError(false)
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
      onComplete: (e) => {
        if (e.data.link) {
          setLink(e.data.link)
        }
      },
      onError: (e) => {
        if (e.data?.error) toast.error(e.data.error.message)
      },
    })
  }

  return (
    <div className="max-w-screen-xl m-auto py-8">
      <h2>{t('export')}</h2>
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
              <button key={format} className="btn btn-primary" onClick={() => doExport(format)}>
                {type === 'exportForPrinting' ? `${format} pdf` : format}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
