import { name, version } from '../data.mjs'
import { getIds } from './utils.mjs'

/*
 * These are the keys for macro IDs
 */
const pointKeys = ['start', 'cp1', 'cp2', 'end']
const pathKeys = ['path']

export const plugin = {
  name,
  version,
  macros: {
    round: function (mc, { points, paths, Point, Path, store, part }) {
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
      const ids = getIds([...pointKeys, ...pathKeys], id, name)

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
      store.set(
        ['parts', part.name, 'macros', 'round', 'ids', mc.id, 'points'],
        getIds(pointKeys, id, name)
      )
      store.set(
        ['parts', part.name, 'macros', 'round', 'ids', mc.id, 'paths'],
        getIds(pathKeys, id, name)
      )

      return store.getMacroIds(id, 'round')
    },
  },
}

// More specifically named exports
export const roundPlugin = plugin
export const pluginRound = plugin
