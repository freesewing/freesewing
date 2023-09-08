import { getIds } from './utils.mjs'

/*
 * Defaults for the title macro
 */
const macroDefaults = {
  align: 'left',
  append: false,
  cutlist: true,
  dy: 8,
  id: 'title',
  force: false,
  nr: 1,
  rotation: 0,
  scale: 1,
  title: 'plugin-annotations:noName',
  classes: {
    cutlist: 'text-md fill-current',
    date: 'text-sm fill-current',
    for: 'fill-current font-bold',
    name: 'fill-note',
    nr: 'text-4xl fill-note font-bold',
    title: 'text-lg fill-current font-bold',
  },
}

/*
 * Removing all this is easy as all IDs are available in the store
 * and all we need to remove are points.
 */
const removeTitleMacro = function (id = macroDefaults.id, { points, store, part }) {
  for (const pid of Object.values(
    store.get(['parts', part.name, 'macros', 'title', 'ids', id, 'points'], {})
  ))
    delete points[pid]
}

/*
 * The title macro
 */
const addTitleMacro = function (
  config,
  { Point, points, scale, locale, store, part, log, complete }
) {
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
   * Take global scale setting into account
   */
  mc.scale = mc.scale * scale

  /*
   * Make sure mc.at is a Point so we can anchor the title
   */
  if (!mc.at || typeof mc.at.attr !== 'function') {
    log.warn(`Title macro called without a valid anchor point. Anchoring title at (0,0).`)
    mc.at = new Point(0, 0)
  }

  /*
   * Make sure mc.align is a valid alignment
   */
  if (!['left', 'right', 'center'].includes(mc.align)) {
    log.warn(`Title macro called with invalid alignement (${mc.align}). Left-aligning title.`)
    mc.align = 'left'
  }

  /*
   * Calculate the transform only once
   */
  const transform =
    'matrix(' +
    `${mc.scale}, 0, 0, ${mc.scale}, ` +
    `${mc.at.x - mc.scale * mc.at.x}, ` +
    `${mc.at.y - mc.scale * mc.at.y}` +
    `) rotate(${mc.rotation} ${mc.at.x} ${mc.at.y})`

  /*
   * Get the list of IDs
   * Initialize the verticle cadence
   */
  const ids = getIds(['cutlist', 'date', 'for', 'name', 'nr', 'title'], mc.id, 'title')

  let shift = mc.dy

  /*
   * Title: nr
   */
  if (typeof mc.nr !== 'undefined') {
    points[ids.nr] = mc.at
      .clone()
      .attr('data-text', mc.nr, mc.append ? false : true)
      .attr('data-text-class', `${mc.classes.nr} ${mc.align}`)
      .attr('data-text-transform', transform)
    store.set(['partNumbers', part.name], mc.nr)
  } else delete ids.nr

  /*
   * Title: title
   */
  if (mc.title) {
    points[ids.title] = mc.at
      .clone()
      .shift(-90, shift)
      .attr('data-text', mc.title, mc.append ? false : true)
      .attr('data-text-class', `${mc.classes.title} ${mc.align}`)
      .attr('data-text-transform', transform)
    shift += mc.dy
    store.set(['partTitles', part.name], mc.title)
  } else delete ids.title

  /*
   * Title: cutlist
   */
  if (mc.cutlist) {
    /*
     * Get cutlist instructions from the store, only proceed if the list is available
     */
    const partCutlist = store.get(['cutlist', part.name], null)
    if (partCutlist?.materials) {
      /*
       * Iterate over materials
       */
      for (const [material, instructions] of Object.entries(partCutlist.materials)) {
        instructions.forEach(({ cut, identical, bias, ignoreOnFold }, c) => {
          /*
           * Create point
           */
          const id = `${ids.cutlist}_${material}_${c}`
          ids[`cutlist_${material}_${c}`] = id
          points[id] = mc.at
            .clone()
            .shift(-90, shift)
            .attr('data-text', 'plugin-annotations:cut')
            .attr('data-text-class', `${mc.classes.cutlist} ${mc.align}`)
            .attr('data-text-transform', transform)
            .addText(cut)
          shift += mc.dy

          /*
           * Add instructions if parts are mirrored
           */
          if (!identical && cut > 1) points[id].addText('plugin-annotations:mirrored')

          /*
           * Add instructions if parts are cut on fold
           */
          if (partCutlist.cutOnFold && !ignoreOnFold)
            points[id].addText(
              bias ? 'plugin-annotations:onFoldAndBias' : 'plugin-annotations:onFold'
            )
          /*
           * Add instructions if parts on on bias
           */ else if (bias) points[id].addText('plugin-annotations:onBias')

          /*
           * Add 'from' (material) text
           */
          points[id].addText('plugin-annotations:from').addText('plugin-annotations:' + material)
        })
      }
    }
  } else delete ids.cutlist

  /*
   * Title: Design name
   */
  points[ids.name] = mc.at
    .clone()
    .shift(-90, shift)
    .attr(
      'data-text',
      `${(store.data?.name || 'plugin-annotations:noName').replace('@freesewing/', '')} v${
        store.data?.version || 'plugin-annotations:noVersion'
      }`
    )
    .attr('data-text-class', `${mc.classes.name} ${mc.align}`)
    .attr('data-text-transform', transform)
  shift += mc.dy

  /*
   * Title: For (measurements set)
   */
  if (store.data.for) {
    points[ids.for] = mc.at
      .shift(-90, shift)
      .attr('data-text', `(${store.data.for})`)
      .attr('data-text-class', `${mc.classes.for} ${mc.align}`)
      .attr('data-text-transform', transform)
    shift += mc.dy
  } else delete ids.for

  /*
   * Title: Date
   */
  points[ids.date] = mc.at
    .shift(-90, shift)
    .attr(
      'data-text',
      new Date().toLocaleString(locale || 'en', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    )
    .attr('data-text-class', `${mc.classes.date} ${mc.align}`)
    .attr('data-text-transform', transform)

  /*
   * Store all IDs in the store so we can remove this macro with rmtitle
   */
  store.set(['parts', part.name, 'macros', 'title', 'ids', mc.id, 'points'], ids)
}

// Export macros
export const titleMacros = {
  title: addTitleMacro,
  rmtitle: removeTitleMacro,
}
