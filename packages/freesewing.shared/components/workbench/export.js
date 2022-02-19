import { useState } from 'react'
import { SizeMe } from 'react-sizeme'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import svgattrPlugin from '@freesewing/plugin-svgattr'
import { useTranslation } from 'next-i18next'
import fileSaver from 'file-saver'
import yaml from 'js-yaml'
import axios from 'axios'
import Popout from 'shared/components/popout'
import WebLink from 'shared/components/web-link'
import theme from 'pkgs/plugin-theme/src/index.js'

export const exports = {
  exportForPrinting: ['a4', 'a3', 'a2', 'a1', 'a0', 'letter', 'tabloid'],
  exportForEditing: ['svg', 'pdf'],
  exportAsData: ['json', 'yaml', 'github gist'],
}

const handleExport = (format, gist, pattern, app, setLink, setFormat) => {
  setLink(false)
  setFormat(format)
  if (exports.exportAsData.indexOf(format) !== -1) {
    if (format === 'json') exportJson(gist)
    else if (format === 'yaml') exportYaml(gist)
    else if (format === 'github gist') exportGithubGist(gist, app, setLink)
  }
  else {
    gist.embed=false
    let svg = ''
    try {
      svg = new pattern(gist).use(theme).draft().render()
    } catch(err) {
      console.log(err)
    }
    if (format === 'svg') return exportSvg(gist, svg)
    app.startLoading()
    axios.post('https://tiler.freesewing.org/api', {
      svg,
      format: 'pdf',
      size: format === 'pdf' ? 'full' : format,
      url: 'https://freesewing.org',
      design: gist.design
    })
    .then(res => setLink(res.data.link))
    .catch(err => console.log(err))
    .finally(() => app.stopLoading())
  }
}
const exportJson = gist => {
  const blob = new Blob([JSON.stringify(gist, null, 2)], {
    type: 'application/json;charset=utf-8'
  })
  fileSaver.saveAs(blob, `freesewing-${gist.design || 'gist'}.json`)
}
const exportYaml = gist => {
  const blob = new Blob([yaml.dump(gist)], {
    type: 'application/x-yaml;charset=utf-8'
  })
  fileSaver.saveAs(blob, `freesewing-${gist.design || 'gist'}.yaml`)
}
const exportSvg = (gist, svg) => {
  const blob = new Blob([svg], {
    type: 'image/svg+xml;charset=utf-8'
  })
  fileSaver.saveAs(blob, `freesewing-${gist.design || 'pattern'}.svg`)
}
const exportGithubGist = (data, app, setLink) => {
  app.setLoading(true)
  axios.post('https://backend.freesewing.org/github/gist', {
    design: data.design,
    data: yaml.dump(data)
  })
  .then(res => setLink('https://gist.github.com/' + res.data.id))
  .catch(err => console.log(err))
  .finally(() => app.stopLoading())
}

const ExportDraft = ({ gist, pattern, app }) => {

  const [link, setLink] = useState(false)
  const [format, setFormat] = useState(false)

  const { t } = useTranslation(['app'])

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
                onClick={() => handleExport(format, gist, pattern, app, setLink, setFormat)}
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
