/*
 * Defaults for the bannerbox macro
 */
const macroDefaults = {
  classes: {
    text: 'text-xs fill-note',
    box: 'stroke-xs stroke-note lashed',
  },
  dy: 4,
  id: 'bannerbox',
  margin: 15,
  repeat: 99,
  spaces: 12,
  text: '',
}

/*
 * Removing all this is easy as all IDs are available in the store
 * and all we need to remove are paths.
 */
const rmbannerbox = (id = macroDefaults.id, { macro, store, part }) => {
  macro('rmbanner', id)
  return store.removeMacroNodes(id, 'bannerbox', part)
}

/*
 * The bannerbox macro
 */
const bannerbox = function (config, { Point, paths, Path, macro, log, store, complete }) {
  /*
   * Don't add a title when complete is false, unless force is true
   */
  if (!complete && !config.force) return

  /*
   * Merge macro defaults with user-provided config to create the macro config (mc)
   */
  const mc = {
    ...macroDefaults,
    ...config,
    classes: macroDefaults.classes,
  }
  if (config.classes) mc.classes = { ...mc.classes, ...config.classes }

  /*
   * Make sure mc.topLeft and mc.bottomRight are Point instances
   */
  if (!mc.topLeft || typeof mc.topLeft.attr !== 'function') {
    log.warn(`Bannerbox macro called without a valid topLeft point. Using (0,0) for topLeft.`)
    mc.topLeft = new Point(0, 0)
  }
  if (!mc.bottomRight || typeof mc.bottomRight.attr !== 'function') {
    log.warn(
      `Bannerbox macro called without a valid bottomRight point. Using (6660,666) for bottomRight.`
    )
    mc.bottomRight = new Point(666, 666)
  }

  /*
   * Get the list of IDs
   */
  const ids = store.generateMacroIds(['box'], mc.id)

  /*
   * Calculate the offset from the bounding box
   */
  const offset = Math.sqrt(2 * Math.pow(mc.margin, 2))

  /*
   * Bannerbox: box
   */
  paths[ids.box] = new Path()
    .move(mc.topLeft.shift(135, offset))
    .line(new Point(mc.bottomRight.x, mc.topLeft.y).shift(45, offset))
    .line(mc.bottomRight.shift(315, offset))
    .line(new Point(mc.topLeft.x, mc.bottomRight.y).shift(225, offset))
    .line(mc.topLeft.shift(135, offset))
    .close()
    .addClass(mc.classes.box)

  /*
   * Call the banner macro on the box
   */
  macro('banner', {
    id: mc.id,
    path: paths[ids.box],
    text: mc.text,
    className: mc.classes.text,
    repeat: mc.repeat,
    spaces: mc.spaces,
    dy: mc.dy,
  })

  /*
   * Store all IDs in the store so we can remove this macro with rmtitle
   */
  store.storeMacroIds(mc.id, { paths: ids })

  /*
   * Returning ids is a best practice for FreeSewing macros
   */
  return store.getMacroIds(mc.id)
}

export const bannerboxMacros = { bannerbox, rmbannerbox }
