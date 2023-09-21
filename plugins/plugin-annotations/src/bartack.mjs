import { getIds } from './utils.mjs'

/*
 * Defaults for the bartack macro
 */
const macroDefaults = {
  anchor: false,
  angle: 0,
  bartackAlong: false,
  bartackFractionAlong: false,
  classes: 'stroke-sm stroke-mark',
  density: 3,
  end: 1,
  from: false,
  id: 'bartack',
  length: 15,
  path: false,
  start: 0,
  to: false,
  width: 3,
}

// Method that draws the actual bartack
const drawBartack = (pointList, { Path }) => {
  let path = new Path().move(pointList.path1[0])
  for (const i in pointList.path1) {
    if (pointList.path1[i]) path = path.line(pointList.path1[i])
    if (pointList.path2[i]) path = path.line(pointList.path2[i])
  }

  return path
}

// Helper method to generate the points to draw on later
const getPoints = (path, mc) => {
  let path1 = path.offset(mc.width / 2)
  let path2 = path.offset(mc.width / -2)
  let len = path1.length()
  let len2 = path2.length()

  // Make sure path1 is always the longest one
  if (len2 > len) {
    let tmp = path2
    path2 = path1
    path1 = tmp
    len = len2
  }

  let points = {
    path1: [path1.start()],
    path2: [path2.start()],
  }
  let steps = Math.ceil((len / mc.width) * mc.density)
  for (let i = 1; i < steps; i++) {
    points.path1.push(path1.shiftFractionAlong((1 / steps) * i))
    points.path2.push(path2.shiftFractionAlong((1 / steps) * i))
  }

  return points
}

const bartackPath = (path, mc, props) => (path ? drawBartack(getPoints(path, mc), props) : null)

/*
 * This method creates the actual bartack
 */
function createBartack(config, props) {
  /*
   * Don't add a bartack when complete is false, unless force is true
   */
  if (!props.complete && !config.force) return

  /*
   * Merge macro defaults with user-provided config to create the macro config (mc)
   */
  const mc = { ...macroDefaults, ...config }

  /*
   * Destructure what we need from props
   */
  const { Path, paths } = props

  /*
   * Handle negative angle
   */
  if (mc.angle < 0) mc.angle = 360 + (mc.angle % -360)

  /*
   * Construct the guide path
   */
  let guide = false
  let name = 'bartack'
  if (mc.anchor)
    // Anchor + angle + length
    guide = new Path().move(mc.anchor).line(mc.anchor.shift(mc.angle, mc.length))
  else if (mc.from && mc.to)
    // From to
    guide = new Path().move(mc.from).line(mc.to)
  else if (mc.path) {
    // Along path
    let start = false
    let end = false
    name = 'bartackalong'
    if (mc.bartackAlong) guide = mc.path.clone()
    else if (mc.bartackFractionAlong) {
      name = 'bartackfractionalong'
      if (mc.start === mc.end) return null
      if (mc.start > mc.end) {
        const newEnd = mc.start
        mc.start = mc.end
        mc.end = newEnd
      }
      if (mc.start > 0) start = mc.path.shiftFractionAlong(mc.start)
      if (mc.end < 1) end = mc.path.shiftFractionAlong(mc.end)
      if (start && end) guide = mc.path.split(start).pop().split(end).shift()
      else if (start) guide = mc.path.split(start).pop()
      else if (end) guide = mc.path.split(end).shift()
      else guide = mc.path.clone()
    }
  }

  /*
   * Get the list of IDs
   */
  const ids = getIds(['stitches'], mc.id, name)
  paths[ids.stitches] = bartackPath(guide, mc, props).attr('class', mc.classes)

  /*
   * Store all IDs in the store so we can remove this macro with rm[name]
   */
  props.store.set(['parts', props.part.name, 'macros', name, 'ids', mc.id, 'paths'], ids)
}

/*
 * The method that will remove all macros
 */
const removeBartack = function (name = 'bartack', id = macroDefaults.id, { paths, store, part }) {
  for (const pid of Object.values(
    store.get(['parts', part.name, 'macros', name, 'ids', id, 'paths'], {})
  ))
    delete paths[pid]
}

/*
 * The rmbartackalong and rmbartackfractionalong macros just call rmbartack with the correct name
 */
const rmbartack = (id, props) => removeBartack('bartack', id, props)
const rmbartackAlong = (id, props) => removeBartack('bartackalong', id, props)
const rmbartackFractionAlong = (id, props) => removeBartack('bartackfractionalong', id, props)

/*
 * The bartack macro
 */
const bartack = (config, props) => createBartack(config, props)

/*
 * The bartackAlong macro
 */
const bartackAlong = (config, props) =>
  createBartack(
    {
      ...config,
      bartackFractionAlong: false,
      bartackAlong: true,
      anchor: false,
      from: false,
      to: false,
    },
    props
  )

/*
 * The bartackFractionAlong macro
 */
const bartackFractionAlong = (config, props) =>
  createBartack(
    {
      ...config,
      bartackFractionAlong: true,
      bartackAlong: false,
      anchor: false,
      from: false,
      to: false,
    },
    props
  )

// Export macros
export const bartackMacros = {
  bartack,
  bartackAlong,
  bartackFractionAlong,
  rmbartack,
  rmbartackAlong,
  rmbartackFractionAlong,
}
