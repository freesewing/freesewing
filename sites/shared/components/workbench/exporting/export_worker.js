import yaml from 'js-yaml'
import axios from 'axios'
import PdfExporter from './pdfExporter'

addEventListener('message', async(e) => {
	const {format, gist, svg} = e.data
	// handle the data exports
  try {
    if (format === 'json') return exportJson(gist)
  	if (format === 'yaml') return exportYaml(gist)
  	if (format === 'github gist') return exportGithubGist(gist)

    if (format === 'svg') return exportSvg(gist, svg)

    await new PdfExporter(e.data).export(postSuccess)
  } catch (e) {
    postMessage({success: false, error: e})
  }
})

const postSuccess = (blob) => {
	postMessage({success: true, blob})
	close()
}

const exportJson = gist => {
  const blob = new Blob([JSON.stringify(gist, null, 2)], {
    type: 'application/json;charset=utf-8'
  })
  postSuccess(blob)
}

const exportYaml = gist => {
  const blob = new Blob([yaml.dump(gist)], {
    type: 'application/x-yaml;charset=utf-8'
  })
  postSuccess(blob)
}

const exportSvg = (gist, svg) => {
  const blob = new Blob([svg], {
    type: 'image/svg+xml;charset=utf-8'
  })
  postSuccess(blob)
}

const exportGithubGist = (data) => {
  axios.post('https://backend.freesewing.org/github/gist', {
    design: data.design,
    data: yaml.dump(data)
  })
  .then(res => {
  	postMessage({
  		success: true,
  		link: 'https://gist.github.com/' + res.data.id
  	})
  })
  .catch(err => console.log(err))
}
