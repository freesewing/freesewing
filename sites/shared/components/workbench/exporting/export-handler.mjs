import Worker from 'web-worker'
import fileSaver from 'file-saver'
import { themePlugin } from '@freesewing/plugin-theme'
import { pluginI18n } from '@freesewing/plugin-i18n'
import { pagesPlugin, fabricPlugin } from '../layout/plugin-layout-part.mjs'
import { pluginCutlist } from '@freesewing/plugin-cutlist'
import { cutLayoutPlugin } from '../layout/cut/plugin-cut-layout.mjs'
import { fabricSettingsOrDefault } from '../layout/cut/index.mjs'
import { useFabricLength } from '../layout/cut/settings.mjs'
import { capitalize, formatFraction128, formatMm } from 'shared/utils.mjs'
import get from 'lodash.get'

export const exportTypes = {
  exportForPrinting: ['a4', 'a3', 'a2', 'a1', 'a0', 'letter', 'tabloid'],
  exportForEditing: ['svg', 'pdf'],
  exportAsData: ['json', 'yaml', 'github gist'],
}

export const defaultPdfSettings = {
  size: 'a4',
  orientation: 'portrait',
  margin: 10,
  coverPage: true,
  cutlist: true,
}

const themedPattern = (design, gist, overwrite, format, t) => {
  const pattern = new design({ ...gist, ...overwrite })

  // add the theme and translation to the pattern
  pattern.use(themePlugin, { stripped: format !== 'svg', skipGrid: ['pages'] })
  pattern.use(pluginI18n, { t })
  pattern.use(pluginCutlist)

  return pattern
}
const generateCutLayouts = (pattern, design, gist, format, t) => {
  const fabrics = pattern.setStores[pattern.activeSet].cutlist.getCutFabrics(
    pattern.settings[0]
  ) || ['fabric']
  if (!fabrics.length) return

  const isImperial = gist.units === 'imperial'
  const cutLayouts = {}
  fabrics.forEach((f) => {
    const fabricSettings = fabricSettingsOrDefault(gist, f)
    const fabricLayout = get(gist, ['layouts', 'cuttingLayout', f], true)
    const fabricPattern = themedPattern(design, gist, { layout: fabricLayout }, format, t)
      .use(cutLayoutPlugin(f, fabricSettings.grainDirection))
      .use(fabricPlugin({ ...fabricSettings, printStyle: true, setPatternSize: 'width' }))

    fabricPattern.draft()
    const svg = fabricPattern.render()
    cutLayouts[f] = {
      svg,
      title: t('plugin:' + f),
      dimensions: t('plugin:fabricSize', {
        width: formatMm(fabricSettings.sheetWidth, gist.units, 'notags'),
        length: useFabricLength(isImperial, fabricPattern.height, 'notags'),
        interpolation: { escapeValue: false },
      }),
    }
  })

  return cutLayouts
}
/**
 * Handle exporting the draft or gist
 * format: format to export to
 * gist: the gist
 * design: the pattern constructor for the design to be exported
 * t: a translation function to attach to the draft
 * app: an app instance
 * onComplete: business to perform after a successful export
 * onError: business to perform on error
 * */
export const handleExport = async (format, gist, design, t, app, onComplete, onError) => {
  // start the loading indicator
  app.startLoading()

  // get a worker going
  const worker = new Worker(new URL('./export-worker.js', import.meta.url), { type: 'module' })

  // listen for the worker's message back
  worker.addEventListener('message', (e) => {
    // on success
    if (e.data.success) {
      // save it out
      if (e.data.blob) {
        const fileType = exportTypes.exportForPrinting.indexOf(format) === -1 ? format : 'pdf'
        fileSaver.saveAs(e.data.blob, `freesewing-${gist.design || 'gist'}.${fileType}`)
      }
      // do additional business
      onComplete && onComplete(e)
    }
    // on error
    else {
      console.log(e.data.error)
      onError && onError(e)
    }

    // stop the loader
    app.stopLoading()
  })

  // pdf settings
  const settings = {
    ...defaultPdfSettings,
    ...(gist._state.layout?.forPrinting?.page || {}),
  }

  // arguments to pass to the worker
  const workerArgs = { format, gist, settings }

  // data passed to the worker must be JSON serializable, so we can't pass functions or prototypes
  // that means if it's not a data export there's more work to do before we can hand off to the worker
  if (exportTypes.exportAsData.indexOf(format) === -1) {
    gist.embed = false
    // make a pattern instance for export rendering
    const layout = gist.layouts?.printingLayout || gist.layout || true
    let pattern = themedPattern(design, gist, { layout }, format, t)

    // a specified size should override the gist one
    if (format !== 'pdf') {
      settings.size = format
    }

    try {
      // add pages to pdf exports
      if (format !== 'svg') {
        pattern.use(
          pagesPlugin({
            ...settings,
            printStyle: true,
            renderBlanks: false,
            setPatternSize: true,
          })
        )

        // add the strings that are used on the cover page
        workerArgs.strings = {
          design: capitalize(pattern.designConfig.data.name.replace('@freesewing/', '')),
          tagline: t('common:sloganCome') + '. ' + t('common:sloganStay'),
          url: window.location.href,
          cuttingLayout: t('plugin:cuttingLayout'),
        }
      }

      // draft and render the pattern
      pattern.draft()
      workerArgs.svg = pattern.render()

      // add the svg and pages data to the worker args
      workerArgs.pages = pattern.setStores[pattern.activeSet].get('pages')

      // add cutting layouts if requested
      if (format !== 'svg' && settings.cutlist) {
        workerArgs.cutLayouts = generateCutLayouts(pattern, design, gist, format, t)
      }

      // post a message to the worker with all needed data
      worker.postMessage(workerArgs)
    } catch (err) {
      console.log(err)
      app.stopLoading()
      onError && onError(err)
    }
  }
}
