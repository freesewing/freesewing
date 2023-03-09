import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Popout } from 'shared/components/popout.mjs'
import { WebLink } from 'shared/components/web-link.mjs'
import { exportTypes, handleExport } from './export-handler.mjs'

export const ExportDraft = ({ gist, design, app }) => {
  const [link, setLink] = useState(false)
  const [error, setError] = useState(false)
  const [format, setFormat] = useState(false)

  const { t } = useTranslation(['app', 'plugin'])
  const doExport = (format) => {
    setLink(false)
    setError(false)
    setFormat(format)
    handleExport(
      format,
      gist,
      design,
      t,
      app,
      (e) => {
        if (e.data.link) {
          setLink(e.data.link)
        }
      },
      (e) => {
        if (e.data?.error) {
          setError(true)
        }
      }
    )
  }

  return (
    <div className="max-w-screen-xl m-auto">
      <h2>{t('export')}</h2>
      <p className="text-lg sm:text-xl">{t('exportPattern-txt')}</p>
      {link && (
        <Popout link compact>
          <span className="font-bold mr-4 uppercase text-sm">{format}:</span>
          <WebLink href={link} txt={link} />
        </Popout>
      )}
      {error && (
        <Popout warning compact>
          <span className="font-bold mr-4 uppercase text-sm">{t('error')}:</span>
          {t('somethingWentWrong')}
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
