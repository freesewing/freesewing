// Export defs
export const cutonfoldDefs = [
  {
    name: 'cutonfoldFrom',
    def: (scale) => `
<marker orient="auto" refY="0" refX="0" id="cutonfoldFrom" style="overflow:visible;" markerWidth="12" markerHeight="8" transform="scale(${scale})">
	<path class="note fill-note" d="M 0,0 L 12,-4 C 10,-2 10,2 12,4 z" transform="scale(${scale})"/>
</marker>`,
  },
  {
    name: 'cutonfoldTo',
    def: (scale) => `
<marker orient="auto" refY="0" refX="0" id="cutonfoldTo" style="overflow:visible;" markerWidth="12" markerHeight="8" transform="scale(${scale})">
	<path class="note fill-note" d="M 0,0 L -12,-4 C -10,-2 -10,2 -12,4 z" transform="scale(${scale})"/>
</marker>`,
  },
]

// Export macros
export const cutonfoldMacros = {
  cutonfold: function (so, { points, paths, Path, complete, store, scale }) {
    if (so === false) {
      delete points.cutonfoldFrom
      delete points.cutonfoldTo
      delete points.cutonfoldVia1
      delete points.cutonfoldVia2
      delete paths.cutonfoldCutonfold

      store.cutlist.setCutOnFold(false) // Restore default
      return true
    }
    so = {
      offset: 15,
      margin: 5,
      prefix: 'cutonfold',
      ...so,
    }

    // store in cutlist
    store.cutlist.setCutOnFold(so.from, so.to)
    if (so.grainline) store.cutlist.setGrain(so.from.angle(so.to))

    if (complete) {
      points[so.prefix + 'From'] = so.from.shiftFractionTowards(so.to, so.margin / 100)
      points[so.prefix + 'To'] = so.to.shiftFractionTowards(so.from, so.margin / 100)
      points[so.prefix + 'Via1'] = points[so.prefix + 'From']
        .shiftTowards(so.from, so.offset * scale)
        .rotate(-90, points[so.prefix + 'From'])
      points[so.prefix + 'Via2'] = points[so.prefix + 'To']
        .shiftTowards(so.to, so.offset * scale)
        .rotate(90, points[so.prefix + 'To'])
      const text = so.grainline ? 'cutOnFoldAndGrainline' : 'cutOnFold'
      paths[so.prefix + 'Cutonfold'] = new Path()
        .move(points[so.prefix + 'From'])
        .line(points[so.prefix + 'Via1'])
        .line(points[so.prefix + 'Via2'])
        .line(points[so.prefix + 'To'])
        .attr('class', 'note')
        .attr('marker-start', 'url(#cutonfoldFrom)')
        .attr('marker-end', 'url(#cutonfoldTo)')
        .attr('data-text', text)
        .attr('data-text-class', 'center fill-note')
    }
  },
}
