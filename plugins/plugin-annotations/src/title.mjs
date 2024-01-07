const capitalize = (string) =>
  typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : ''

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
  notes: false,
  brand: 'FreeSewing',
  classes: {
    notes: 'text-md fill-current',
    date: 'text-sm fill-current',
    name: 'fill-note',
    nr: 'text-4xl fill-note font-bold',
    title: 'text-lg fill-current font-bold',
  },
}

/*
 * The title macro
 */
const title = function (config, { Point, points, scale, locale, store, part, log, complete }) {
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
   */
  const ids = store.generateMacroIds(['nr', 'date', 'title', 'name', 'notes'], mc.id)

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
      .attr('data-render-always', 1) // Render even when outside the part bounding box
    store.set(['partNumbers', part.name], mc.nr)
  } else delete ids.nr

  /*
   * Title: date
   */
  points[ids.date] = mc.at
    .shift(-90, shift / 2)
    .addText(
      new Date().toLocaleString(locale || 'en', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      `${mc.classes.date} ${mc.align}`
    )
    .attr('data-text-transform', transform)
    .attr('data-render-always', 1) // Render even when outside the part bounding box
  shift += mc.dy

  /*
   * Title: title
   */
  if (mc.title) {
    points[ids.title] = mc.at
      .clone()
      .shift(-90, shift)
      .attr('data-text-transform', transform)
      .attr('data-render-always', 1) // Render even when outside the part bounding box
    if (mc.append) points[ids.title].addText(mc.title, `${mc.classes.title} ${mc.align}`)
    else points[ids.title].setText(mc.title, `${mc.classes.title} ${mc.align}`)
    shift += mc.dy
    store.set(['partTitles', part.name], mc.title)
  } else delete ids.title

  /*
   * Title: name
   */
  points[ids.name] = mc.at
    .clone()
    .shift(-90, shift)
    .addText(
      `${mc.brand} ${capitalize(
        (store.data?.name || 'plugin-annotations:noName').replace('@freesewing/', '')
      )} v${store.data?.version || 'plugin-annotations:noVersion'} (`,

      `${mc.classes.name} ${mc.align}`
    )
    .addText(store.data?.for ? store.data.for : 'ephemeral')
    .addText(')')
    .attr('data-text-transform', transform)
    .attr('data-render-always', 1) // Render even when outside the part bounding box
  shift += mc.dy

  /*
   * Title: notes
   */
  const notes = []
  if (mc.cutlist) {
    points[ids.notes] = mc.at.clone().shift(-90, shift)
    /*
     * Get cutlist instructions from the store, only proceed if the list is available
     */
    const partCutlist = store.get(['cutlist', part.name], null)
    if (partCutlist?.materials) {
      /*
       * Iterate over materials
       */
      for (const [material, instructions] of Object.entries(partCutlist.materials)) {
        instructions.forEach(({ cut, identical, onBias, onFold }) => {
          /*
           * Concat line
           */
          notes.push('plugin-annotations:cut')
          notes.push(cut)
          if (!identical && cut > 1) notes.push('plugin-annotations:mirrored')
          if (onFold)
            notes.push(onBias ? 'plugin-annotations:onFoldAndBias' : 'plugin-annotations:onFold')
          else if (onBias) notes.push('plugin-annotations:onBias')
          notes.push('plugin-annotations:from', 'plugin-annotations:' + material)
          /*
           * Force a line break between materials
           */
          notes.push('\n')
        })
      }
    }
  }
  if (mc.notes) {
    if (Array.isArray(mc.notes)) notes.push(...mc.notes)
    else notes.push(mc.notes)
  }
  if (notes.length > 0) {
    /*
     * Add all text on a single point
     */
    points[ids.notes]
      .addText(notes, `${mc.classes.notes} ${mc.align}`)
      .attr('data-text-transform', transform)
      .attr('data-render-always', 1) // Render even when outside the part bounding box
      .attr('data-text-lineheight', mc.dy)
  } else delete ids.cutlist

  /*
   * Store all IDs in the store so we can remove this macro with rmtitle
   */
  store.storeMacroIds(mc.id, { points: ids })

  /*
   * Returning ids is a best practice for FreeSewing macros
   */
  return store.getMacroIds(mc.id)
}

// Export macros
export const titleMacros = {
  title,
  rmtitle: (id = macroDefaults.id, { store, part }) => store.removeMacroNodes(id, 'title', part),
}
