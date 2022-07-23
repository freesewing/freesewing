import { useState, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import fileSaver from 'file-saver'
import yaml from 'js-yaml'
import axios from 'axios'
import Popout from 'shared/components/popout'
import WebLink from 'shared/components/web-link'
import theme from '@freesewing/plugin-theme'
import {sizes} from './layout/print/plugin'
import {jsPDF} from 'jspdf'
import 'svg2pdf.js'

import {
  Canvg
} from 'canvg'


export const exports = {
  exportForPrinting: ['a4', 'a3', 'a2', 'a1', 'a0', 'letter', 'tabloid'],
  exportForEditing: ['svg', 'pdf'],
  exportAsData: ['json', 'yaml', 'github gist'],
}

export const handleExport = (format, gist, design, app, setLink, setFormat, setSvg) => {
  setLink && setLink(false)
  setFormat && setFormat(format)
  if (exports.exportAsData.indexOf(format) !== -1) {
    if (format === 'json') exportJson(gist)
    else if (format === 'yaml') exportYaml(gist)
    else if (format === 'github gist') exportGithubGist(gist, app, setLink)
  }
  else {
    gist.embed=false
    let svg = ''
    let pattern = new design(gist)
    pattern.use(theme)
    try {
      pattern.draft()
      svg = pattern.render('printLayout', format === 'pdf' || exports.exportForPrinting.indexOf(format) !== -1)
      if (setSvg) setSvg(svg);
    } catch(err) {
      console.log(err)
    }
    if (format === 'svg') return exportSvg(gist, svg)

    const settings = format === 'pdf' ? (gist._state.layout?.forPrinting?.page || {
        size: 'a4',
        orientation: 'portrait',
        margin: 10
      }) : {
      size: format,
      orientation: 'portrait',
      margin: 10
    }
    return exportPdf(gist, pattern, svg, settings);
  }
}

const exportPdf = async (gist, pattern, svg, settings) => {
  const pageSize = sizes[settings.size]
  const pageWidth = pageSize[settings.orientation === 'portrait' ? 0 : 1]
  const pageHeight = pageSize[settings.orientation === 'portrait' ? 1 : 0]
  const margin = settings.margin || 10

  // const pageSettings =
  const pdf = new jsPDF({format: [pageWidth, pageHeight], orientation: settings.orientation === 'portrait' ? 'p' : 'l'})

  // await setTimeout(() => {}, 20)
  const divElem = document.createElement('div');
  divElem.innerHTML = svg;

  const svgElem = divElem.firstElementChild;

  svgElem.setAttribute('width', pageWidth - 20)
  svgElem.setAttribute('height', pageHeight - 20)
  pdf.rect(20, 20, pageWidth - 40, pageHeight - 40, 'S')

  // var c = pdf.canvas;
  // c.width = pageWidth - 40;
  // c.height = pageHeight - 40;

  // var ctx = c.getContext("2d");
  // ctx.ignoreClearRect = true;
  // ctx.fillStyle = "#ffffff";
  // ctx.fillRect(0, 0, pageWidth - 40, pageHeight - 40);

  // //load a svg snippet in the canvas with id = 'drawingArea'
  // const options = {
  //   ignoreMouse: true,
  //   ignoreAnimation: true,
  //   ignoreDimensions: true
  // };
  // const canvg = await Canvg.fromString(ctx, svg, options);
  // await canvg.render(options);

  // var doc = new jsPDF({
  //   orientation: "p",
  //   unit: "pt",
  //   format: "c1",
  //   floatPrecision: 3
  // });

  // var c = doc.canvas;
  // c.width = 1000;
  // c.height = 500;

  // var ctx = doc.canvas.getContext("2d");
  // ctx.ignoreClearRect = true;
  // ctx.fillStyle = "#ffffff";
  // ctx.fillRect(0, 0, 1000, 700);

  // //load a svg snippet in the canvas with id = 'drawingArea'
  // const options = {
  //   ignoreMouse: true,
  //   ignoreAnimation: true,
  //   ignoreDimensions: true
  // };

  // let canvSvg = svg.replaceAll('className','class')
  // // '<svg width="600" height="600"><text x="50" y="50">hello world!</text></svg>'

  // const canvg = await Canvg.fromString(ctx, canvSvg, options);
  // await canvg.render(options);
  // let jpeg = c.toDataURL('image/jpg');


  await pdf.svg(svgElem, 20, 20, pageWidth - 40, pageHeight - 40)

  svgElem.setAttribute('width', pageWidth)
  svgElem.setAttribute('height', pageHeight)
  const wPages = Math.ceil(pattern.width/pageWidth)
  const hPages = Math.ceil(pattern.height/pageHeight)
  for (var w = 0; w < wPages; w++) {
    for (var h = 0; h < hPages; h++) {
      pdf.addPage();
      pdf.setDrawColor('CCCCCC')
      pdf.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2, 'S')
      svgElem.setAttribute('viewBox', `${w * (pageWidth - margin)} ${h * (pageHeight - margin)} ${pageWidth} ${pageHeight}`)
      await pdf.svg(svgElem, 0,0, pageWidth, pageHeight)
    }
  }

  pdf.save(`freesewing-${gist.design || 'gist'}.pdf`)
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

const ExportDraft = ({ gist, design, app }) => {

  const [link, setLink] = useState(false)
  const [format, setFormat] = useState(false)
  const [svg, setSvg] = useState(null);
  const svgDiv = useRef(null)

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
                onClick={() => handleExport(format, gist, design, app, setLink, setFormat, setSvg, svgDiv)}
              >
                {type === 'exportForPrinting' ? `${format} pdf` : format }
              </button>
            ))}
          </div>
        ))}
      </div>
      <div ref={svgDiv} dangerouslySetInnerHTML={{__html: svg}}></div>
    </div>
  )
}

export default ExportDraft
