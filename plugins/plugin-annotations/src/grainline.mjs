// Export defs
export const grainlineDefs = [
  {
    name: 'grainlineFrom',
    def: (scale) => `
<marker orient="auto" refY="0" refX="0" id="grainlineFrom" style="overflow:visible;" markerWidth="12" markerHeight="8">
	<path class="note fill-note" d="M -10,0 L 2,-4 C 0,-2 0,2  2,4 z" transform="scale(${scale})"/>
</marker>`,
  },
  {
    name: 'grainlineTo',
    def: (scale) => `
<marker orient="auto" refY="0" refX="0" id="grainlineTo" style="overflow:visible;" markerWidth="12" markerHeight="8">
	<path class="note fill-note" d="M 10,0 L -2,-4 C 0,-2 -2,2  -2,4 z" transform="scale(${scale})"/>
</marker>`,
  },
]

const dflts = { text: 'grainline' }

// Export macros
export const grainlineMacros = {
  grainline: function (so = {}, { points, paths, Path, complete, store }) {
    if (so === false) {
      delete points.grainlineFrom
      delete points.grainlineTo
      delete paths.grainline
      if (store.cutlist?.setGrain) store.cutlist.setGrain(90) // Restoring default
      return true
    }
    so = {
      ...dflts,
      ...so,
    }

    // store in cutlist
    store.cutlist.setGrain(so.from.angle(so.to))

    if (complete) {
      points.grainlineFrom = so.from.shiftFractionTowards(so.to, 0.05)
      points.grainlineTo = so.to.shiftFractionTowards(so.from, 0.05)
      paths.grainline = new Path()
        .move(points.grainlineFrom)
        .line(points.grainlineTo)
        .attr('class', 'note')
        .attr('marker-start', 'url(#grainlineFrom)')
        .attr('marker-end', 'url(#grainlineTo)')
        .attr('data-text', so.text)
        .attr('data-text-class', 'center fill-note')
    }
  },
}
