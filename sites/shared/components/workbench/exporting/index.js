import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Popout from 'shared/components/popout'
import WebLink from 'shared/components/web-link'
import Worker from 'web-worker';
import fileSaver from 'file-saver'
import theme from '@freesewing/plugin-theme'
import {pagesPlugin} from '../layout/print/plugin'

export const exports = {
  exportForPrinting: ['a4', 'a3', 'a2', 'a1', 'a0', 'letter', 'tabloid'],
  exportForEditing: ['svg', 'pdf'],
  exportAsData: ['json', 'yaml', 'github gist'],
}

export const defaultPdfSettings = {
  size: 'a4',
  orientation: 'portrait',
  margin: 10,
  coverPage: true
}

export const handleExport = async(format, gist, design, t, app, onComplete) => {
  app.startLoading();

  const worker = new Worker(new URL('./export_worker.js', import.meta.url), {type: module});

  worker.addEventListener('message', e => {
    if (e.data.blob) {
      const fileType = exports.exportForPrinting.indexOf(format) === -1 ? format : 'pdf'
      fileSaver.saveAs(e.data.blob, `freesewing-${gist.design || 'gist'}.${fileType}`)
    }
    app.stopLoading()
    onComplete && onComplete(e)
  })

  let svg = ''
  // pdf settings
  const settings = {
    ...defaultPdfSettings,
    ...(gist._state.layout?.forPrinting?.page || {})
  }
  const workerArgs = {format, gist, settings}

  if (exports.exportAsData.indexOf(format) === -1) {
    // gist.embed=false
    // make a pattern instance for export rendering
    const layout = gist.layouts?.printingLayout || gist.layout || true
    let pattern = new design({...gist, layout})


    // add the theme and translation to the pattern
    pattern.use(theme, {stripped: format !== 'svg'})
    pattern.use({
      hooks: {
        insertText: (locale, text, {t}) => t(text)
      }
    },{t})

    // a specified size should override the gist one
    if (format !== 'pdf') {
      settings.size = format
    }

    try {
      // add pages to pdf exports
      if (format !== 'svg') {
        pattern.use(pagesPlugin({
          ...settings,
          printStyle: true,
          renderBlanks: false,
          setPatternSize: true
        }))
      }

      pattern.draft();
      svg = pattern.render()
      workerArgs.svg = svg
      if (pattern.parts.pages) {
        workerArgs.pages = pattern.parts.pages.pages
      }
    } catch(err) {
      console.log(err)
      app.stopLoading();
    }

  }

  worker.postMessage(workerArgs)
}

const ExportDraft = ({ gist, design, app }) => {

  const [link, setLink] = useState(false)
  const [format, setFormat] = useState(false)

  const { t } = useTranslation(['app'])
  const doExport = (format) => {
    setLink(false)
    setFormat(format)
    handleExport(format, gist, design, t, app, (e) => {
      if (e.data.link) {setLink(e.data.link)}
    })
  }

  return (
    <div className="max-w-screen-xl m-auto">
      <h2>{t('export')}</h2>
      <p className="text-lg sm:text-xl">{t('exportPattern-txt')}</p>
      {link && (
        <Popout link compact>
          <span className="font-bold mr-4 uppercase text-sm">
            {format}:
          </span>
          <WebLink href={link} txt={link} />
        </Popout>
      )}
      <div className="flex flex-row flex-wrap gap-8">
        {Object.keys(exports).map(type => (
          <div key={type} className="flex flex-col gap-2 w-full sm:w-auto">
            <h4>{t(type)}</h4>
            {exports[type].map(format => (
              <button key={format}
                className="btn btn-primary"
                onClick={() => doExport(format)}
              >
                {type === 'exportForPrinting' ? `${format} pdf` : format }
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExportDraft
