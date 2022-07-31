import markers from './markers'
import pkg from '../package.json'

const dflts = {
  text: 'grainline',
}

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: (svg) => {
      if (svg.attributes.get('freesewing:plugin-grainline') === false) {
        svg.attributes.set('freesewing:plugin-grainline', pkg.version)
        svg.defs += markers
      }
    },
  },
  macros: {
    grainline: function (so = {}) {
      if (so === false) {
        delete this.points.grainlineFrom
        delete this.points.grainlineTo
        delete this.paths.grainline
        this.setGrain(90) // Restoring default
        return true
      }
      so = {
        ...dflts,
        ...so,
      }
      const { points, complete } = this.shorthand()
      this.setGrain(so.from.angle(so.to))
      if (complete) {
        points.grainlineFrom = so.from.shiftFractionTowards(so.to, 0.05)
        points.grainlineTo = so.to.shiftFractionTowards(so.from, 0.05)
        this.paths.grainline = new this.Path()
          .move(points.grainlineFrom)
          .line(points.grainlineTo)
          .attr('class', 'note')
          .attr('marker-start', 'url(#grainlineFrom)')
          .attr('marker-end', 'url(#grainlineTo)')
          .attr('data-text', so.text)
          .attr('data-text-class', 'center fill-note')
      }
    },
  },
}
