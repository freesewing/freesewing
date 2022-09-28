import { name, version } from '../data.mjs'

export const plugin = {
  name,
  version,
  macros: {
    flip: function (so, { paths, points, snippets }) {
      const axis = so?.axis === 'y' ? 'y' : 'x'
      let flipped = null
      const ops = ['from', 'to', 'cp1', 'cp2']
      for (const id in points) {
        // Keep track of the amount of flips
        // (needed to allow flipping twice, but also avoid double flips in paths below)
        if (flipped === null) {
          flipped = points[id].attributes.get('flipped')
          if (flipped === false) flipped = 1
          else flipped += 1
        }
        points[id][axis] = points[id][axis] * -1
        points[id].attributes.set('flipped', flipped)
      }
      for (let id of Object.keys(paths)) {
        for (let op in paths[id].ops) {
          for (let type of ops) {
            if (typeof paths[id].ops[op][type] !== 'undefined') {
              // Path ops can use points not listed in part.points. We should only flip those here
              // and not double flip the points flipped above
              let wasFlipped = paths[id].ops[op][type].attributes.get('flipped')
              if (wasFlipped !== false) wasFlipped = parseInt(wasFlipped)
              if (wasFlipped !== flipped) {
                paths[id].ops[op][type][axis] = paths[id].ops[op][type][axis] * -1
                paths[id].ops[op][type].attributes.set('flipped', flipped)
              }
            }
          }
        }
      }
      for (let id of Object.keys(snippets)) {
        // Snippets use points not listed in part.points. We should only flip those here
        // and not double flip the points flipped above
        let wasFlipped = snippets[id].anchor.attributes.get('flipped')
        if (wasFlipped !== false) wasFlipped = parseInt(wasFlipped)
        if (wasFlipped !== flipped) snippets[id].anchor[axis] = snippets[id].anchor[axis] * -1
      }
    },
  },
}

// More specifically named exports
export const flipPlugin = plugin
export const pluginFlip = plugin
