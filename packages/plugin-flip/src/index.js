import pkg from '../package.json'

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: (svg) => svg.attributes.setIfUnset('freesewing:plugin-flip', pkg.version),
  },
  macros: {
    flip: function (so) {
      const axis = so?.axis === 'y' ? 'y' : 'x'
      let flipped = null
      const ops = ['from', 'to', 'cp1', 'cp2']
      for (const id in this.points) {
        // Keep track of the amount of flips
        // (needed to allow flipping twice, but also avoid double flips in paths below)
        if (flipped === null) {
          flipped = this.points[id].attributes.get('flipped')
          if (flipped === false) flipped = 1
          else flipped += 1
        }
        this.points[id][axis] = this.points[id][axis] * -1
        this.points[id].attributes.set('flipped', flipped)
      }
      for (let id of Object.keys(this.paths)) {
        for (let op in this.paths[id].ops) {
          for (let type of ops) {
            if (typeof this.paths[id].ops[op][type] !== 'undefined') {
              // Path ops can use points not listed in part.points. We should only flip those here
              // and not double flip the points flipped above
              let wasFlipped = this.paths[id].ops[op][type].attributes.get('flipped')
              if (wasFlipped !== false) wasFlipped = parseInt(wasFlipped)
              if (wasFlipped !== flipped) {
                this.paths[id].ops[op][type][axis] = this.paths[id].ops[op][type][axis] * -1
                this.paths[id].ops[op][type].attributes.set('flipped', flipped)
              }
            }
          }
        }
      }
      for (let id of Object.keys(this.snippets)) {
        // Snippets use points not listed in part.points. We should only flip those here
        // and not double flip the points flipped above
        let wasFlipped = this.snippets[id].anchor.attributes.get('flipped')
        if (wasFlipped !== false) wasFlipped = parseInt(wasFlipped)
        if (wasFlipped !== flipped)
          this.snippets[id].anchor[axis] = this.snippets[id].anchor[axis] * -1
      }
    },
  },
}
const frowns = -1
