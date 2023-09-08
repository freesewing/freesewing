import { getIds } from './utils.mjs'

/*
 * Defaults for the bannner macro
 */
const macroDefaults = {
  classes: 'center',
  dy: -1,
  force: false,
  id: 'banner',
  repeat: 10,
  spaces: 12,
}

/*
 * The rmbanner macro
 */
const rmbanner = function (id = macroDefaults.id, { paths, store, part }) {
  for (const pid of Object.values(
    store.get(['parts', part.name, 'macros', 'banner', 'ids', id, 'paths'], {})
  ))
    delete paths[pid]
}

const banner = function (config, { part, paths, store, complete }) {
  /*
   * Don't add a banne when complete is false, unless force is true
   */
  if (!complete && !config.force) return

  /*
   * Merge macro defaults with user-provided config to create the macro config (mc)
   */
  const mc = { ...macroDefaults, ...config }

  /*
   * Get the list of IDs
   */
  const ids = getIds(['banner'], mc.id, 'banner')

  /*
   * Prepare the path to hold the banner text
   */
  paths[ids.banner] = mc.path
    .clone()
    .setClass('hidden')
    .attr('data-text-dy', mc.dy)
    .attr('data-text-class', mc.classes)

  /*
   * Construct the text string piece by piece so it gets translated
   */
  const spacer = '&#160;'.repeat(mc.spaces)
  for (let i = 0; i < mc.repeat; i++) paths[ids.banner].addText(mc.text).addText(spacer)
  paths[ids.banner].addText(mc.text)

  /*
   * Store all IDs in the store so we can remove this macro with rmbanner
   */
  store.set(['parts', part.name, 'macros', 'banner', 'ids', mc.id, 'paths'], ids)
}

// Export macros
export const bannerMacros = { banner, rmbanner }
