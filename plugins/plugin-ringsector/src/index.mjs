import { name, version } from '../data.mjs'

/*
 * Helper method to get the various IDs for a macro
 */
export const getIds = (keys, id) => {
  const ids = {}
  for (const key of keys) ids[key] = `__macro_ringsector_${id}_${key}`

  return ids
}

/*
 * Helper method to calculate the arc
 */
const roundExtended = (radius, angle = 90, utils) => {
  const arg = utils.deg2rad(angle / 2)

  return (radius * 4 * (1 - Math.cos(arg))) / Math.sin(arg) / 3
}

/*
 * Short IDs
 */
const keys = [
  'center',
  'in1',
  'in1c',
  'in2',
  'in2c',
  'ex1',
  'ex1c',
  'ex2',
  'ex2c',
  'in2Flipped',
  'in2cFlipped',
  'in1cFlipped',
  'ex1cFlipped',
  'ex2cFlipped',
  'ex2Flipped',
]

/*
 * The plugin object itself
 */
export const plugin = {
  name,
  version,
  macros: {
    rmringsector: function (id = 'ringsector', { points, paths, store, part }) {
      const storeRoot = ['parts', part.name, 'macros', '@freesewing/plugin-ringsector', 'ids', id]
      for (const id of Object.values(store.get([...storeRoot, 'paths']))) delete paths[id]
      for (const id of Object.values(store.get([...storeRoot, 'points']))) delete points[id]
    },
    ringsector: function (mc, { utils, Point, points, Path, paths, store, part }) {
      const {
        angle,
        insideRadius,
        outsideRadius,
        rotate = false,
        center = new Point(0, 0),
        id = 'ringsector',
      } = mc

      /*
       * Get the list of IDs
       */
      const ids = getIds(keys, id)
      const pathId = getIds(['path'], id).path

      /**
       * Calculates the distance of the control point for the internal
       * and external arcs using bezierCircleExtended
       */
      const distIn = roundExtended(insideRadius, angle / 2, utils)
      const distEx = roundExtended(outsideRadius, angle / 2, utils)
      // The centre of the circles
      points[ids.center] = center.copy()

      /**
       * This function is expected to draft ring sectors for
       * angles up to 180%. Since roundExtended works
       * best for angles until 90º, we generate the ring
       * sector using the half angle and then duplicate it
       */

      /**
       * The first point of the internal arc, situated at
       * a insideRadius distance below the centre
       */
      points[ids.in1] = points[ids.center].shift(-90, insideRadius)

      /**
       * The control point for 'in1'. It's situated at a
       * distance $distIn calculated with bezierCircleExtended
       * and the line between it and 'in1' is perpendicular to
       * the line between 'in1' and the centre, so it's
       * shifted in the direction 0º
       */
      points[ids.in1c] = points[ids.in1].shift(0, distIn)

      /**
       * The second point of the internal arc, situated at
       * a $insideRadius distance of the centre in the direction
       * $angle/2 - 90º
       */
      points[ids.in2] = points[ids.center].shift(angle / 2 - 90, insideRadius)

      /**
       * The control point for 'in2'. It's situated at a
       * distance $distIn calculated with bezierCircleExtended
       * and the line between it and 'in2' is perpendicular to
       * the line between 'in2' and the centre, so it's
       * shifted in the direction $angle/2 + 180º
       */
      points[ids.in2c] = points[ids.in2].shift(angle / 2 + 180, distIn)

      /**
       * The points for the external arc are generated in the
       * same way, using $outsideRadius and $distEx instead
       */
      points[ids.ex1] = points[ids.center].shift(-90, outsideRadius)
      points[ids.ex1c] = points[ids.ex1].shift(0, distEx)
      points[ids.ex2] = points[ids.center].shift(angle / 2 - 90, outsideRadius)
      points[ids.ex2c] = points[ids.ex2].shift(angle / 2 + 180, distEx)

      // Flip all the points to generate the full ring sector
      for (const id of ['in2', 'in2c', 'in1c', 'ex1c', 'ex2c', 'ex2']) {
        points[ids[id + 'Flipped']] = points[ids[id]].flipX()
      }

      // Rotate all the points angle/2
      for (const id of keys) {
        points[ids[id] + 'Rotated'] = points[ids[id]].rotate(angle / 2, points[ids.center])
        // Also add this to the ids so we can save them later
        ids[id + 'Rotated'] = ids[id] + 'Rotated'
      }

      // (optionally) Rotate all points so the line from in1Rotated to ex1Rotated is vertical
      if (rotate) {
        const deg = 270 - points[ids.in2Flipped].angle(points[ids.ex2Flipped])
        for (const id of keys) {
          points[ids[id]] = points[ids[id]].rotate(deg, points[ids.in2Flipped])
          // We need the rotated points too
          points[ids[id] + 'Rotated'].rotate(deg, points[ids.in2Flipped])
        }
      }
      // Return the path of the full ring sector
      paths[pathId] = new Path()
        .move(points[ids.in2Flipped])
        .curve(points[ids.in2cFlipped], points[ids.in1cFlipped], points[ids.in1])
        .curve(points[ids.in1c], points[ids.in2c], points[ids.in2])
        .line(points[ids.ex2])
        .curve(points[ids.ex2c], points[ids.ex1c], points[ids.ex1])
        .curve(points[ids.ex1cFlipped], points[ids.ex2cFlipped], points[ids.ex2Flipped])
        .close()

      /*
       * Store all IDs in the store so we can remove this macro with rmringsector
       */
      store.set(['parts', part.name, 'macros', name, 'ids', id, 'paths'], { path: pathId })
      store.set(['parts', part.name, 'macros', name, 'ids', id, 'points'], ids)
    },
  },
}

// More specifically named exports
export const ringsectorPlugin = plugin
export const ringSectorPlugin = plugin
export const pluginRingSector = plugin
export const pluginRingsector = plugin
