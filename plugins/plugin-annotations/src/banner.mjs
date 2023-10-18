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
const rmbanner = (id = macroDefaults.id, { store, part }) =>
  store.removeMacroNodes(id, 'banner', part)

const banner = function (config, { paths, store, complete }) {
  /*
   * Don't add a banner when complete is false, unless force is true
   */
  if (!complete && !config.force) return

  /*
   * Merge macro defaults with user-provided config to create the macro config (mc)
   */
  const mc = { ...macroDefaults, ...config }

  /*
   * Get the list of IDs
   */
  const ids = store.generateMacroIds(['banner'], mc.id)

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
  store.storeMacroIds(mc.id, { paths: ids })

  /*
   * Returning ids is a best practice for FreeSewing macros
   */
  return store.getMacroIds(mc.id)
}

// Export macros
export const bannerMacros = { banner, rmbanner }
