import Worker from 'web-worker'
import fileSaver from 'file-saver'
import { themePlugin } from '@freesewing/plugin-theme'
import { pluginI18n } from '@freesewing/plugin-i18n'
import { pagesPlugin, fabricPlugin } from 'shared/plugins/plugin-layout-part.mjs'
import { pluginAnnotations } from '@freesewing/plugin-annotations'
import { cutLayoutPlugin } from '../layout/cut/plugin-cut-layout.mjs'
import { fabricSettingsOrDefault } from '../layout/cut/index.mjs'
import { useFabricLength } from '../layout/cut/settings.mjs'
import { capitalize, formatMm } from 'shared/utils.mjs'
import {
  defaultPrintSettings,
  printSettingsPath,
} from 'shared/components/workbench/views/print/config.mjs'
import get from 'lodash.get'

export const ns = ['plugin', 'common']
export const exportTypes = {
  exportForPrinting: ['a4', 'a3', 'a2', 'a1', 'a0', 'letter', 'tabloid'],
  exportForEditing: ['svg', 'pdf'],
  exportAsData: ['json', 'yaml', 'github gist'],
}

/**
 * Instantiate a pattern that uses plugins theme, i18n, and cutlist
 * @param  {Design} Design    the design to construct the pattern from
 * @param  {Object} settings      the settings
 * @param  {Object} overwrite settings to overwrite settings settings with
 * @param  {string} format    the export format this pattern will be prepared for
 * @param  {function} t         the i18n function
 * @return {Pattern}           a pattern
 */
const themedPattern = (Design, settings, overwrite, format, t) => {
  const pattern = new Design({ ...settings, ...overwrite })

  // add the theme and translation to the pattern
  pattern.use(themePlugin, { stripped: format !== 'svg', skipGrid: ['pages'] })
  pattern.use(pluginI18n, { t })
  pattern.use(pluginAnnotations)

  return pattern
}

/**
 * Generate svgs of all cutting layouts for the pattern
 * @param  {Pattern} pattern the pattern to generate cutting layouts for
 * @param  {Design} design  the design constructor for the pattern
 * @param  {Object} settings    the settings
 * @param  {string} format  the export format this pattern will be prepared for
 * @param  {function} t       the i18n function
 * @return {Object}         a dictionary of svgs and related translation strings, keyed by fabric
 */
const generateCutLayouts = (pattern, Design, settings, format, t, ui) => {
  // get the fabrics from the already drafted base pattern
  const fabrics = pattern.setStores[pattern.activeSet].cutlist.getCutFabrics(
    pattern.settings[0]
  ) || ['fabric']
  if (!fabrics.length) return

  const isImperial = settings.units === 'imperial'
  const cutLayouts = {}
  // each fabric
  fabrics.forEach((f) => {
    // get the settings and layout for that fabric
    const fabricSettings = fabricSettingsOrDefault(settings.units, ui, f)
    const fabricLayout = get(ui, ['layouts', 'cut', f], true)

    // make a new pattern
    const fabricPattern = themedPattern(Design, settings, { layout: fabricLayout }, format, t)
      // add cut layout plugin and fabric plugin
      .use(cutLayoutPlugin(f, fabricSettings.grainDirection))
      .use(fabricPlugin({ ...fabricSettings, printStyle: true, setPatternSize: 'width' }))

    // draft and render
    fabricPattern.draft()
    const svg = fabricPattern.render()
    // include translations
    cutLayouts[f] = {
      svg,
      title: t('plugin:' + f),
      dimensions: t('plugin:fabricSize', {
        width: formatMm(fabricSettings.sheetWidth, settings.units, 'notags'),
        length: useFabricLength(isImperial, fabricPattern.height, 'notags'),
        interpolation: { escapeValue: false },
      }),
    }
  })

  return cutLayouts
}
/**
 * Handle exporting the draft or settings
 * format: format to export to
 * settings: the settings
 * Design: the pattern constructor for the design to be exported
 * t: a translation function to attach to the draft
 * onComplete: business to perform after a successful export
 * onError: business to perform on error
 * */
export const handleExport = async ({
  format,
  settings,
  Design,
  design,
  t,
  startLoading,
  stopLoading,
  onComplete,
  onError,
  ui,
}) => {
  // start the loading indicator
  if (typeof startLoading === 'function') startLoading()

  // get a worker going
  const worker = new Worker(new URL('./export-worker.js', import.meta.url), { type: 'module' })

  // listen for the worker's message back
  worker.addEventListener('message', (e) => {
    // on success
    if (e.data.success) {
      // save it out
      if (e.data.blob) {
        const fileType = exportTypes.exportForPrinting.indexOf(format) === -1 ? format : 'pdf'
        fileSaver.saveAs(e.data.blob, `freesewing-${design || 'pattern'}.${fileType}`)
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
    if (typeof stopLoading === 'function') stopLoading()
  })

  // pdf settings
  const pageSettings = {
    ...defaultPrintSettings(settings.units),
    ...get(ui, printSettingsPath, {}),
  }

  // arguments to pass to the worker
  const workerArgs = { format, settings, pageSettings }

  // data passed to the worker must be JSON serializable, so we can't pass functions or prototypes
  // that means if it's not a data export there's more work to do before we can hand off to the worker
  if (exportTypes.exportAsData.indexOf(format) === -1) {
    settings.embed = false
    // make a pattern instance for export rendering
    const layout = settings.layout || ui.layouts?.print || true
    let pattern = themedPattern(Design, settings, { layout }, format, t)

    // a specified size should override the settings one
    if (format !== 'pdf') {
      pageSettings.size = format
    }

    try {
      throw new Error('bad bad bad')
      // add pages to pdf exports
      if (format !== 'svg') {
        pattern.use(
          pagesPlugin({
            ...pageSettings,
            printStyle: true,
            renderBlanks: false,
            setPatternSize: true,
          })
        )

        // add the strings that are used on the cover page
        workerArgs.strings = {
          design: capitalize(design),
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
      if (format !== 'svg' && pageSettings.cutlist) {
        workerArgs.cutLayouts = generateCutLayouts(pattern, Design, settings, format, t, ui)
      }

      // post a message to the worker with all needed data
      worker.postMessage(workerArgs)
    } catch (err) {
      console.log(err)
      if (typeof stopLoading === 'function') stopLoading()
      onError && onError(err)
    }
  }
}
