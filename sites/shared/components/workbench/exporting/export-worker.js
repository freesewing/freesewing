/**
 * A web worker to handle the business of exporting pattern files
 * */
import yaml from 'js-yaml'
import axios from 'axios'
import { PdfMaker } from './pdf-maker'

/** when the worker receives data from the page, do the appropriate export */
addEventListener('message', async (e) => {
  const { format, settings, svg } = e.data
  // handle export by type
  try {
    switch (format) {
      case 'json':
        return exportJson(settings)
      case 'yaml':
        return exportYaml(settings)
      case 'github gist':
        return exportGithubGist(settings)
      case 'svg':
        return exportSvg(svg)
      default:
        return await exportPdf(e.data)
    }
  } catch (e) {
    postMessage({ success: false, error: e })
    close()
  }
})

/** post a blob from a successful export */
const postSuccess = (blob) => {
  postMessage({ success: true, blob })
  close()
}

/** export a blob */
const exportBlob = (blobContent, type) => {
  const blob = new Blob([blobContent], {
    type: `${type};charset=utf-8`,
  })
  postSuccess(blob)
}

const exportJson = (settings) => exportBlob(JSON.stringify(settings, null, 2), 'application/json')

const exportYaml = (settings) => exportBlob(yaml.dump(settings), 'application/x-yaml')

const exportSvg = (svg) => exportBlob(svg, 'image/svg+xml')

const exportPdf = async (data) => {
  const maker = new PdfMaker(data)
  await maker.makePdf()
  postSuccess(await maker.toBlob())
}

const exportGithubGist = (data) => {
  axios
    .post('https://backend.freesewing.org/github/gist', {
      design: data.design,
      data: yaml.dump(data),
    })
    .then((res) => {
      postMessage({
        success: true,
        link: 'https://gist.github.com/' + res.data.id,
      })
    })
}
