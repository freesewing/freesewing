import { name, version } from '../package.json' assert { type: 'json' }

const markers = `
<marker orient="auto" refY="4.0" refX="10.0" id="grainlineFrom" style="overflow:visible;" markerWidth="12" markerHeight="8">
	<path class="note fill-note" d="M 0,4 L 12,0 C 10,2 10,6  12,8 z" />
</marker>
<marker orient="auto" refY="4.0" refX="2.0" id="grainlineTo" style="overflow:visible;" markerWidth="12" markerHeight="8">
	<path class="note fill-note" d="M 12,4 L 0,0 C 2,2 2,6  0,8 z" />
</marker>`

const dflts = { text: 'grainline' }

export const plugin = {
  name,
  version,
  hooks: {
    preRender: (svg) => {
      if (svg.defs.indexOf(markers) === -1) svg.defs += markers
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
      const { points, complete, setGrain } = this.shorthand()
      // setGrain relies on plugin-cutlist
      if (typeof setGrain === 'function') {
        setGrain(so.from.angle(so.to))
      }
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

// More specifically named exports
export const grainlinePlugin = plugin
export const pluginGrainline = plugin

