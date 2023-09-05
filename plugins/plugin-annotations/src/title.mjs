/*
 * Defaults for the title macro
 */
const macroDefaults = {
  align: 'left',
  append: false,
  cutlist: true,
  dy: 8,
  id: 'title',
  nr: 1,
  rotation: 0,
  scale: 1,
  title: 'title',
}

/*
 * Helper method to get the various IDs for points added by this macro
 */
const getIds = (id) => ({
  cutlist: `__macro_title_${id}_cutlist`,
  date: `__macro_title_${id}_date`,
  for: `__macro_title_${id}_for`,
  name: `__macro_title_${id}_name`,
  nr: `__macro_title_${id}_nr`,
  title: `__macro_title_${id}_title`,
})

/*
 * Helper method to calculate the title transform
 */

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
const addTitleMacro = function (config, { Point, points, scale, locale, store, part, log }) {
  /*
   * Merge macro defaults with user-provided config
   */
  const so = { ...macroDefaults, ...config }

  /*
   * Take global scale setting into account
   */
  so.scale = so.scale * scale

  /*
   * Make sure so.at is a Point so we can anchor the title
   */
  if (typeof so.at.attr !== 'function') {
    log.warn(`Title macro called without a valid anchor point. Anchoring title at (0,0).`)
    so.at = new Point(0, 0)
  }

  /*
   * Make sure so.align is a valid alignment
   */
  if (!['left', 'right', 'center'].includes(so.align)) {
    log.warn(`Title macro called with invalid alignement (${so.align}). Left-aligning title.`)
    so.align = 'left'
  }

  /*
   * Calculate the transform only once
   */
  const transform =
    'matrix(' +
    `${so.scale}, 0, 0, ${so.scale}, ` +
    `${so.at.x - so.scale * so.at.x}, ` +
    `${so.at.y - so.scale * so.at.y}` +
    `) rotate(${so.rotation} ${so.at.x} ${so.at.y})`

  /*
   * Get the list of IDs
   * Initialize the verticle cadence
   */
  const ids = getIds(so.id)
  let shift = so.dy

  /*
   * Title: nr
   */
  if (typeof so.nr !== 'undefined') {
    points[ids.nr] = so.at
      .clone()
      .attr('data-text', so.nr, so.append ? false : true)
      .attr('data-text-class', 'text-4xl fill-note font-bold ' + so.align)
      .attr('data-text-transform', transform)
  } else delete ids.nr

  /*
   * Title: title
   */
  if (so.title) {
    points[ids.title] = so.at
      .clone()
      .shift(-90, shift)
      .attr('data-text', so.title, so.append ? false : true)
      .attr('data-text-class', 'text-lg fill-current font-bold ' + so.align)
      .attr('data-text-transform', transform)
    shift += so.dy
  } else delete ids.title

  /*
   * Title: cutlist
   */
  if (so.cutlist) {
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
          points[id] = so.at
            .clone()
            .shift(-90, shift)
            .attr('data-text', 'plugin:cut')
            .attr('data-text-class', 'text-md fill-current ' + so.align)
            .attr('data-text-transform', transform)
            .addText(cut)
          shift += so.dy

          /*
           * Add instructions if parts are mirrored
           */
          if (!identical && cut > 1) points[id].addText('plugin:mirrored')

          /*
           * Add instructions if parts are cut on fold
           */
          if (partCutlist.cutOnFold && !ignoreOnFold)
            points[id].addText(bias ? 'plugin:onFoldAndBias' : 'plugin:onFoldLower')
          /*
           * Add instructions if parts on on bias
           */ else if (bias) points[id].addText('plugin:onBias')

          /*
           * Add 'from' (material) text
           */
          points[id].addText('plugin:from').addText('plugin:' + material)
        })
      }
    }
  } else delete ids.cutlist

  /*
   * Title: Design name
   */
  points[ids.name] = so.at
    .clone()
    .shift(-90, shift)
    .attr(
      'data-text',
      `${(store.data?.name || 'noName').replace('@freesewing/', '')} v ${
        store.data?.version || 'noVersion'
      }`
    )
    .attr('data-text-class', 'fill-note ' + so.align)
    .attr('data-text-transform', transform)
  shift += so.dy

  /*
   * Title: For (measurements set)
   */
  if (store.data.for) {
    points[ids.for] = so.at
      .shift(-90, shift)
      .attr('data-text', `(${store.data.for})`)
      .attr('data-text-class', 'fill-current font-bold ' + so.align)
    shift += so.dy
  } else delete ids.for

  /*
   * Title: Date
   */
  points[ids.date] = so.at
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
    .attr('data-text-class', 'text-sm fill-current ' + so.align)

  /*
   * Store all IDs in the store so we can remove this macro with rmtitle
   */
  store.set(['parts', part.name, 'macros', 'title', 'ids', so.id, 'points'], ids)
}

// Export macros
export const titleMacros = {
  title: addTitleMacro,
  rmtitle: removeTitleMacro,
}
