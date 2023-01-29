/**
 * A web worker to handle the business of exporting pattern files
 * */
import yaml from 'js-yaml'
import axios from 'axios'
import { PdfMaker } from './pdf-maker'

/** when the worker receives data from the page, do the appropriate export */
addEventListener('message', async (e) => {
  const { format, gist, svg } = e.data
  // handle export by type
  try {
    if (format === 'json') return exportJson(gist)
    if (format === 'yaml') return exportYaml(gist)
    if (format === 'github gist') return exportGithubGist(gist)

    if (format === 'svg') return exportSvg(svg)

    await exportPdf(e.data)
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

const exportJson = (gist) => exportBlob(JSON.stringify(gist, null, 2), 'application/json')

const exportYaml = (gist) => exportBlob(yaml.dump(gist), 'application/x-yaml')

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
