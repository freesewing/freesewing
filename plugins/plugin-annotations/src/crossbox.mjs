/*
 * Defaults for the title macro
 */
const macroDefaults = {
  classes: {
    box: 'lining dotted stroke-sm',
    cross: 'lining dotted stroke-sm',
    text: 'center fill-lining',
  },
  id: 'crossbox',
  offset: 0.1,
  text: '',
}

/*
 * The rmcrossbox macro
 */
const rmcrossbox = (id = macroDefaults.id, { store, part }) =>
  store.removeMacroNodes(id, 'crossbox', part)

/*
 * The crossbox macro
 */
const crossbox = function (config, { points, Point, paths, Path, complete, store, log }) {
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
    log.warn(`Crossbox macro called without a valid topLeft point. Using (0,0) for topLeft.`)
    mc.topLeft = new Point(0, 0)
  }
  if (!mc.bottomRight || typeof mc.bottomRight.attr !== 'function') {
    log.warn(
      `Crossbox macro called without a valid bottomRight point. Using (666,666) for bottomRight.`
    )
    mc.bottomRight = new Point(666, 666)
  }

  /*
   * Get the list of IDs
   */
  const flatIds = store.generateMacroIds(['box', 'cross', 'text'], mc.id)
  const ids = {
    paths: {
      box: flatIds.box,
      cross: flatIds.cross,
    },
    points: { text: flatIds.text },
  }

  /*
   * Calculate the cross offset as [offset]% of the shortest side of the box
   */
  const offset =
    Math.abs(mc.topLeft.dx(mc.bottomRight)) > Math.abs(mc.topLeft.dy(mc.bottomRight))
      ? Math.abs(mc.topLeft.dx(mc.bottomRight)) * mc.offset
      : Math.abs(mc.topLeft.dy(mc.bottomRight)) * mc.offset

  /*
   * Draw the box
   */
  paths[ids.paths.box] = new Path()
    .move(mc.topLeft)
    .line(new Point(mc.topLeft.x, mc.bottomRight.y))
    .line(mc.bottomRight)
    .line(new Point(mc.bottomRight.x, mc.topLeft.y))
    .line(mc.topLeft)
    .close()
    .attr('class', mc.classes.box)

  /*
   * Draw the cross
   */
  paths[ids.paths.cross] = new Path()
    .move(mc.topLeft.shift(315, offset))
    .line(new Point(mc.bottomRight.x, mc.topLeft.y).shift(225, offset))
    .line(mc.bottomRight.shift(135, offset))
    .line(new Point(mc.topLeft.x, mc.bottomRight.y).shift(45, offset))
    .line(mc.topLeft.shift(315, offset))
    .line(mc.bottomRight.shift(135, offset))
    .move(new Point(mc.bottomRight.x, mc.topLeft.y).shift(225, offset))
    .line(new Point(mc.topLeft.x, mc.bottomRight.y).shift(45, offset))
    .attr('class', mc.classes.box)

  /*
   * If there is text, add it
   */
  if (mc.text)
    points[ids.points.text] = mc.topLeft
      .shiftFractionTowards(mc.bottomRight, 0.5)
      .addText(mc.text, mc.classes.text)
  else delete ids.points.text

  /*
   * Store all IDs in the store so we can remove this macro with rmtitle
   * Just make sure to keep points and paths apart
   */
  store.storeMacroIds(mc.id, ids)

  /*
   * Returning ids is a best practice for FreeSewing macros
   */
  return store.getMacroIds(mc.id)
}

// Export macros
export const crossboxMacros = { crossbox, rmcrossbox }
