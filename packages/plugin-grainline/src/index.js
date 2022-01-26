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
        return true
      }
      so = {
        ...dflts,
        ...so,
      }
      let points = this.points
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
    },
  },
}
const frowns = -1
