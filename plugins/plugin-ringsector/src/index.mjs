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
 * Short IDs
 */
const keys = ['center', 'in1', 'in2', 'ex1', 'ex2', 'in2Flipped', 'ex2Flipped']

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
    ringsector: function (mc, { Point, points, Path, paths, store }) {
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
      const pathIds = getIds(['path'], id)

      // The centre of the circles
      points[ids.center] = center.copy()

      /**
       * The first point of the internal arc, situated at
       * a insideRadius distance below the centre
       */
      points[ids.in1] = points[ids.center].shift(-90, insideRadius)

      /**
       * The second point of the internal arc, situated at
       * a $insideRadius distance of the centre in the direction
       * $angle/2 - 90º
       */
      points[ids.in2] = points[ids.center].shift(angle / 2 - 90, insideRadius)
      /**
       * The points for the external arc are generated in the
       * same way, using $outsideRadius and $distEx instead
       */
      points[ids.ex1] = points[ids.center].shift(-90, outsideRadius)
      points[ids.ex2] = points[ids.center].shift(angle / 2 - 90, outsideRadius)

      // Flip all the points to generate the full ring sector
      for (const id of ['in2', 'ex2']) {
        points[ids[id + 'Flipped']] = points[ids[id]].flipX(center)
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
      // Construct the path of the full ring sector
      paths[pathIds.path] = new Path()
        .move(points[ids.ex2Flipped])
        .circleSegment(angle, points[ids.center])
        .line(points[ids.in2])
        .circleSegment(-angle, points[ids.center])
        .close()

      /*
       * Store all IDs in the store so we can remove this macro with rmringsector
       */
      store.storeMacroIds(mc.id, {
        paths: pathIds,
        points: ids,
      })

      /*
       * Returning ids is a best practice for FreeSewing macros
       */
      return store.getMacroIds(mc.id)
    },
  },
}

// More specifically named exports
export const ringsectorPlugin = plugin
export const ringSectorPlugin = plugin
export const pluginRingSector = plugin
export const pluginRingsector = plugin
