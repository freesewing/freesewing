import { name, version } from '../data.mjs'

/*
 * These are the keys for macro IDs
 */
const pointKeys = ['start', 'cp1', 'cp2', 'end']
const pathKeys = ['path']

export const plugin = {
  name,
  version,
  macros: {
    round: function (mc, { points, paths, Point, Path, store }) {
      const C = 0.55191502449
      const {
        from = new Point(0, 0),
        to = new Point(666, 666),
        via = new Point(666, 0),
        id = 'round',
        classes = '',
        hide = true,
      } = mc
      let { radius = 66.6 } = mc
      const pointIds = store.generateMacroIds(pointKeys, id)
      const pathIds = store.generateMacroIds(pathKeys, id)
      const ids = { ...pointIds, ...pathIds }

      const fd = from.dist(via)
      const td = to.dist(via)
      if (radius > fd || radius > td) radius = fd > td ? td : fd
      points[ids.start] = via.shiftTowards(from, radius)
      points[ids.cp1] = via.shiftTowards(from, radius * (1 - C))
      points[ids.cp2] = via.shiftTowards(to, radius * (1 - C))
      points[ids.end] = via.shiftTowards(to, radius)
      paths[ids.path] = new Path()
        .move(this.points[ids.start])
        .curve(points[ids.cp1], points[ids.cp2], points[ids.end])
        .addClass(classes)
      if (hide) paths[ids.path].hide()
      else paths[ids.path].unhide()

      /*
       * Store all IDs in the store so we can remove this macro with rmtitle
       */
      store.storeMacroIds(mc.id, {
        paths: pathIds,
        points: pointIds,
      })

      /*
       * Returning ids is a best practice for FreeSewing macros
       */
      return store.getMacroIds(mc.id)
    },
  },
}

// More specifically named exports
export const roundPlugin = plugin
export const pluginRound = plugin
