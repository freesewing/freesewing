import { getIds } from './utils.mjs'

/*
 * Defaults for the title macro
 */
const macroDefaults = {
  classes: {
    lead: 'text-xs bold',
    title: 'text bold',
    text: 'text-xs',
    link: 'text-sm fill-note bold',
    metric: 'text-xs center',
    imperial: 'text-xs center',
    imperialBox: 'scalebox imperial fill-current',
    metricBox: 'scalebox metric fill-bg',
  },
  lead: 'FreeSewing',
  link: 'FreeSewing.org/patrons/join',
  text: 'plugin-annotations:supportFreeSewingBecomeAPatron',
  title: false,
}

/*
 * Various sizes for scaleboxes per units
 */
const sizes = {
  scalebox: {
    metric: [
      [10, 5, '1cm', '0.5cm'],
      [20, 10, '2cm', '1cm'],
      [30, 15, '3cm', '1.5cm'],
      [40, 20, '4cm', '2cm'],
      [50, 25, '5cm', '2.5cm'],
      [60, 30, '6cm', '3cm'],
      [70, 35, '7cm', '3.5cm'],
      [80, 40, '8cm', '4cm'],
      [90, 45, '9cm', '4.5cm'],
      [100, 50, '10cm', '5cm'],
    ],
    imperial: [
      [25.4 * 0.5, 25.4 * 0.25, '½″', '¼″'],
      [25.4 * 0.875, 25.4 * 0.5, '⅞″', '½″'],
      [25.4 * 1.25, 25.4 * 0.625, '1 ¼″', '⅝″'],
      [25.4 * 1.625, 25.4 * 0.875, '1 ⅝″', '⅞″'],
      [25.4 * 2, 25.4 * 1, '2″', '1″'],
      [25.4 * 2.375, 25.4 * 1.25, '2 ⅜″', '1 ¼″'],
      [25.4 * 2.875, 25.4 * 1.5, '2 ⅞″', '1 ½″'],
      [25.4 * 3.25, 25.4 * 1.625, '3 ¼″', '1 ⅝″'],
      [25.4 * 3.625, 25.4 * 1.875, '3 ⅝″', '1 ⅞″'],
      [25.4 * 4, 25.4 * 2, '4″', '2″'],
    ],
  },
  miniscale: [
    [10, '1cm', 25.4 * 0.375, '⅜″'],
    [13, '1.3cm', 25.4 * 0.5, '½″'],
    [16, '1.6cm', 25.4 * 0.625, '⅝″'],
    [19, '1.9cm', 25.4 * 0.75, '¾″'],
    [22, '2.2cm', 25.4 * 0.875, '⅞″'],
    [25, '2.5cm', 25.4 * 1, '1″'],
  ],
}

/*
 * This removes a given macro type
 */
const removeScaleAnnotation = function (id = false, { paths, points, store, part }, type) {
  if (!id) id = type
  const both = store.get(['parts', part.name, 'macros', type, 'ids', id], { paths: {}, points: {} })
  for (const pid of Object.values(both.points)) delete points[pid]
  for (const pid of Object.values(both.paths)) delete paths[pid]
}

/*
 * The scalebox macro
 */
const scalebox = function (
  config,
  { store, points, paths, scale, Point, Path, complete, log, part }
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
    id: 'scalebox',
    ...config,
    classes: macroDefaults.classes,
  }
  if (config.classes) mc.classes = { ...mc.classes, ...config.classes }

  /*
   * Figure out what size to use
   * We convert scale to a value between 0 and 9, inclusive.
   * Then pick the right size from the sizes[units] array.
   * Array holds width, height, displayWidth, displayHeight
   */
  const scaleIndex = Math.round(10 * Math.max(0.1, Math.min(1, scale))) - 1
  const [mw, mh, mdw, mdh] = sizes.scalebox.metric[scaleIndex]
  const [iw, ih, idw, idh] = sizes.scalebox.imperial[scaleIndex]

  /*
   * Make sure mc.at is a Point instance
   */
  if (!mc.at || typeof mc.at.attr !== 'function') {
    log.warn(`Scalebox macro called without a valid at point. Using (0,0) for at.`)
    mc.at = new Point(0, 0)
  }

  /*
   * Get the list of IDs
   */
  const ids = getIds(
    [
      'metric',
      'imperial',
      'textLead',
      'textMetric',
      'textImperial',
      'textTitle',
      'textText',
      'textLink',
    ],
    mc.id,
    'scalebox'
  )

  /*
   * Box points (no need to add these to the part)
   */
  const box = {
    mtl: new Point(mc.at.x - mw / 2, mc.at.y - mh / 2),
    mtr: new Point(mc.at.x + mw / 2, mc.at.y - mh / 2),
    mbl: new Point(mc.at.x - mw / 2, mc.at.y + mh / 2),
    mbr: new Point(mc.at.x + mw / 2, mc.at.y + mh / 2),
    itl: new Point(mc.at.x - iw / 2, mc.at.y - ih / 2),
    itr: new Point(mc.at.x + iw / 2, mc.at.y - ih / 2),
    ibl: new Point(mc.at.x - iw / 2, mc.at.y + ih / 2),
    ibr: new Point(mc.at.x + iw / 2, mc.at.y + ih / 2),
  }

  /*
   * Text points
   */
  const text = {
    lead: new Point(mc.at.x - 45 * scale, mc.at.y - 15 * scale),
    metric: new Point(mc.at.x, mc.at.y + 20 * scale),
    imperial: new Point(mc.at.x, mc.at.y + 24 * scale),
  }
  text.title = text.lead.shift(-90, 10 * scale)
  text.text = text.title.shift(-90, 12 * scale)
  text.link = text.text.shift(-90, 5 * scale)

  /*
   * Handle rotation if needed
   */
  if (mc.rotate) {
    mc.rotate = Number(mc.rotate)
    for (const pid in box) box[pid] = box[pid].rotate(mc.rotate, mc.at)
    for (const pid in text) {
      text[pid] = text[pid]
        .rotate(mc.rotate, mc.at)
        .attr(
          'data-text-transform',
          `rotate(${mc.rotate * -1}, ${text[pid].x}, ${text[pid].y})`,
          true
        )
    }
  }

  /*
   * Draw the imperial box
   */
  paths[ids.imperial] = new Path()
    .addClass(mc.classes.imperialBox)
    .move(box.itl)
    .line(box.ibl)
    .line(box.ibr)
    .line(box.itr)
    .line(box.itl)
    .close()

  /*
   * Draw the metric box
   */
  paths[ids.metric] = new Path()
    .addClass(mc.classes.metricBox)
    .move(box.mtl)
    .line(box.mbl)
    .line(box.mbr)
    .line(box.mtr)
    .line(box.mtl)
    .close()

  /*
   * Add lead text to the part points
   */
  points[ids.textLead] = text.lead.addText(mc.lead, mc.classes.lead)

  /*
   * Figure out what title to use, and add the title text to the part points
   */
  let title = mc.title
  if (!title) {
    title = store.data?.name || 'plugin-annotations:noName'
    if (title.indexOf('@freesewing/') !== -1) title = title.replace('@freesewing/', '')
  }
  points[ids.textTitle] = text.title
    .addText(title, mc.classes.title)
    .attr('data-text', 'v' + (store.data?.version || 'No Version'))

  /*
   * Add text text to the part points
   */
  points[ids.textText] = text.text.addText(mc.text, mc.classes.text)

  /*
   * Add link text to the part points
   */
  points[ids.textLink] = text.link.addText(mc.link, mc.classes.link).attr('data-text-lineheight', 4)

  /*
   * Add metric instructions text to the part points
   */
  points[ids.textMetric] = text.metric
    .attr('data-text', 'plugin-annotations:theWhiteInsideOfThisBoxShouldMeasure')
    .attr('data-text', mdw)
    .attr('data-text', 'x')
    .attr('data-text', mdh)
    .attr('data-text-class', mc.classes.metric)

  /*
   * Add imperial instructions text to the part points
   */
  points[ids.textImperial] = text.imperial
    .attr('data-text', 'plugin-annotations:theBlackOutsideOfThisBoxShouldMeasure')
    .attr('data-text', idw)
    .attr('data-text', 'x')
    .attr('data-text', idh)
    .attr('data-text-class', mc.classes.imperial)

  /*
   * Store all IDs in the store so we can remove this macro with rmscaleboc
   */
  store.set(['parts', part.name, 'macros', 'scalebox', 'ids', mc.id], {
    points: {
      textLead: ids.textLead,
      textMetric: ids.textMetric,
      textImperial: ids.textImperial,
      textTitle: ids.textTitle,
      textText: ids.textText,
      textLink: ids.textLink,
    },
    paths: {
      metric: ids.metric,
      imperial: ids.imperial,
    },
  })
}

/*
 * The miniscale macro
 */
const miniscale = function (
  config,
  { points, paths, scale, Point, Path, part, complete, log, store }
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
    id: 'miniscale',
    ...config,
    classes: macroDefaults.classes,
  }
  if (config.classes) mc.classes = { ...mc.classes, ...config.classes }

  /*
   * Figure out what size to use
   * We convert scale to a value between 0 and 5, inclusive.
   * Then pick the right size from the sizes.miniscale array.
   * Array holds metricSize, metricDisplaySize, imperialSize, imperialDisplaySize
   */
  const scaleIndex = Math.ceil(6 * Math.max(0.1, Math.min(1, scale))) - 1
  const [ms, mds, is, imds] = sizes.miniscale[scaleIndex]

  /*
   * Make sure mc.at is a Point instance
   */
  if (!mc.at || typeof mc.at.attr !== 'function') {
    log.warn(`Scalebox macro called without a valid at point. Using (0,0) for at.`)
    mc.at = new Point(0, 0)
  }

  /*
   * Get the list of IDs
   */
  const ids = getIds(['metric', 'imperial', 'textMetric', 'textImperial'], mc.id, 'miniscale')

  /*
   * Box points (no need to add these to the part)
   */
  const box = {
    mtl: new Point(mc.at.x - ms / 2, mc.at.y - ms / 2),
    mtr: new Point(mc.at.x + ms / 2, mc.at.y - ms / 2),
    mbl: new Point(mc.at.x - ms / 2, mc.at.y + ms / 2),
    mbr: new Point(mc.at.x + ms / 2, mc.at.y + ms / 2),
    itl: new Point(mc.at.x - is / 2, mc.at.y - is / 2),
    itr: new Point(mc.at.x + is / 2, mc.at.y - is / 2),
    ibl: new Point(mc.at.x - is / 2, mc.at.y + is / 2),
    ibr: new Point(mc.at.x + is / 2, mc.at.y + is / 2),
  }

  /*
   * Text points
   */
  const text = {
    metric: new Point(mc.at.x, mc.at.y - 2 * scale),
    imperial: new Point(mc.at.x, mc.at.y + 8 * scale),
  }

  /*
   * Handle rotation if needed
   */
  if (mc.rotate) {
    mc.rotate = Number(mc.rotate)
    for (const pid in box) box[pid] = box[pid].rotate(mc.rotate, mc.at)
    for (const pid in text) {
      text[pid] = text[pid]
        .rotate(mc.rotate, mc.at)
        .attr(
          'data-text-transform',
          `rotate(${mc.rotate * -1}, ${text[pid].x}, ${text[pid].y})`,
          true
        )
    }
  }

  /*
   * Draw the imperial box
   */
  paths[ids.imperial] = new Path()
    .attr('class', 'scalebox imperial fill-current')
    .move(box.itl)
    .line(box.ibl)
    .line(box.ibr)
    .line(box.itr)
    .line(box.itl)
    .close()

  /*
   * Draw the metric box
   */
  paths[ids.metric] = new Path()
    .attr('class', 'scalebox metric fill-bg')
    .move(box.mtl)
    .line(box.mbl)
    .line(box.mbr)
    .line(box.mtr)
    .line(box.mtl)
    .close()

  /*
   * Add metric text to the part points
   */
  points[ids.textMetric] = text.metric.addText(`${mds} x ${mds}`, mc.classes.metric)

  /*
   * Add imperial text to the part points
   */
  points[ids.textImperial] = text.imperial.addText(`${imds} x ${imds}`, mc.classes.imperial)

  /*
   * Store all IDs in the store so we can remove this macro with rmscaleboc
   */
  store.set(['parts', part.name, 'macros', 'miniscale', 'ids', mc.id], {
    points: {
      textMetric: ids.textMetric,
      textImperial: ids.textImperial,
    },
    paths: {
      metric: ids.metric,
      imperial: ids.imperial,
    },
  })
}

// Export macros
export const scaleboxMacros = {
  scalebox,
  miniscale,
  rmscalebox: (id, props) => removeScaleAnnotation(id, props, 'scalebox'),
  rmminiscale: (id, props) => removeScaleAnnotation(id, props, 'miniscale'),
}
