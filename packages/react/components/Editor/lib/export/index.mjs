import Worker from 'web-worker'
import fileSaver from 'file-saver'
import { themePlugin } from '@freesewing/plugin-theme'
import { pluginI18n } from '@freesewing/plugin-i18n'
import { tilerPlugin } from './plugin-tiler.mjs'
import { capitalize, formatMm, get } from '@freesewing/utils'
import mustache from 'mustache'
import he from 'he'
import yaml from 'js-yaml'

export const exportTypes = {
  exportForPrinting: ['a4', 'a3', 'a2', 'a1', 'a0', 'letter', 'legal', 'tabloid'],
  exportForEditing: ['svg', 'pdf'],
  exportAsData: ['json', 'yaml'],
}

export const defaultPrintSettings = (units) => ({
  size: units === 'imperial' ? 'letter' : 'a4',
  orientation: 'portrait',
  margin: units === 'imperial' ? 12.7 : 10,
  coverPage: true,
  cutlist: true,
})

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
  pattern.use(pluginI18n, (key) => key)

  return pattern
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
  ui,
  t,
  startLoading,
  stopLoading,
  stopLoadingFail,
  onComplete,
  onError,
}) => {
  // start the loading indicator
  if (typeof startLoading === 'function') startLoading()

  // get a worker going
  const worker = new Worker(new URL('./export-worker.js', import.meta.url), { type: 'module' })

  /*
   * Guard against settings being false, which happens for
   * fully default designs that do not require measurements
   */
  if (settings === false) settings = {}

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
      // stop the loader
      if (typeof stopLoading === 'function') stopLoading()
    }
    // on error
    else {
      console.log(e.data.error)
      onError && onError(e)
      // stop the loader
      if (typeof stopLoadingFail === 'function') stopLoadingFail()
    }
  })

  // pdf settings
  const pageSettings = {
    ...defaultPrintSettings(settings.units),
    ...get(ui, 'layout', {}),
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
    pageSettings.size = format

    try {
      // add pages to pdf exports
      if (!exportTypes.exportForEditing.includes(format)) {
        pattern.use(
          tilerPlugin({
            ...pageSettings,
            printStyle: true,
            renderBlanks: false,
            setPatternSize: true,
          })
        )
      }

      // add the strings that are used on the cover page
      workerArgs.strings = {
        design: capitalize(design),
        tagline: 'Come for the sewing pattern. Stay for the community.',
        url: window.location.href,
        cuttingLayout: 'Cutting layout',
      }

      // Initialize the pattern stores
      pattern.getConfig()

      // Save the measurement set name to pattern stores
      if (settings?.metadata?.setName) {
        pattern.store.set('data.setName', settings.metadata.setName)
        for (const store of pattern.setStores) store.set('data.setName', settings.metadata.setName)
      }

      // draft and render the pattern
      pattern.draft()
      workerArgs.svg = pattern.render()

      // Get coversheet info: setName, settings YAML, version, notes, warnings
      const store = pattern.setStores[pattern.activeSet]
      workerArgs.strings.setName = settings?.metadata?.setName
        ? settings.metadata.setName
        : 'ephemeral'
      workerArgs.strings.yaml = yaml.dump(settings)
      workerArgs.strings.version = store?.data?.version ? store.data.version : ''
      const notes = store?.plugins?.['plugin-annotations']?.flags?.note
        ? store?.plugins?.['plugin-annotations']?.flags?.note
        : []
      const warns = store?.plugins?.['plugin-annotations']?.flags?.warn
        ? store?.plugins?.['plugin-annotations']?.flags?.warn
        : []
      workerArgs.strings.notes = flagsToString(notes, mustache, t)
      workerArgs.strings.warns = flagsToString(warns, mustache, t)

      if (format === 'pdf') pageSettings.size = [pattern.width, pattern.height]

      // add the svg and pages data to the worker args
      workerArgs.pages = pattern.setStores[pattern.activeSet].get('pages')
    } catch (err) {
      console.log(err)
      onError && onError(err)
    }
  }

  // post a message to the worker with all needed data
  worker.postMessage(workerArgs)
}

/**
 * Convert pattern flags to a formatted string for printing
 */
const flagsToString = (flags, mustache, t) => {
  let first = true
  let string = ''
  for (const flag of Object.values(flags)) {
    let title = flag.replace ? mustache.render(flag.title, flag.replace) : flag.title
    title = he.decode(title)
    let desc = flag.replace ? mustache.render(flag.desc, flag.replace) : flag.desc
    desc = desc.replaceAll('\n\n', '\n')
    desc = desc.replaceAll('\n', ' ')
    desc = he.decode(desc)
    if (!first) string += '\n'
    first = false
    string += '- ' + title + ': ' + desc
  }
  return string
}
