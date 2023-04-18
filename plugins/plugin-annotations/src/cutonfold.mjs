// Export defs
export const cutonfoldDefs = [
  {
    name: 'cutonfoldFrom',
    def: `
<marker orient="auto" refY="4.0" refX="0.0" id="cutonfoldFrom" style="overflow:visible;" markerWidth="12" markerHeight="8">
	<path class="note fill-note" d="M 0,4 L 12,0 C 10,2 10,6  12,8 z" />
</marker>`,
  },
  {
    name: 'cutonfoldTo',
    def: `
<marker orient="auto" refY="4.0" refX="12.0" id="cutonfoldTo" style="overflow:visible;" markerWidth="12" markerHeight="8">
	<path class="note fill-note" d="M 12,4 L 0,0 C 2,2 2,6  0,8 z" />
</marker>`,
  },
]

// Export macros
export const cutonfoldMacros = {
  cutonfold: function (so, { points, paths, Path, complete, store, scale }) {
    const prefix = (so.prefix || '') + '_cutonfold'

    if (so === false) {
      for (const pointName in points) {
        if (pointName.match('_cutonfold')) delete points[pointName]
      }
      for (const pathName in paths) {
        if (pathName.match('_cutonfold')) delete paths[pathName]
      }
      store.cutlist.setCutOnFold(false) // Restore default
      return true
    }
    so = {
      offset: 15,
      margin: 5,
      ...so,
    }

    // store in cutlist
    store.cutlist.setCutOnFold(so.from, so.to)
    if (so.grainline) store.cutlist.setGrain(so.from.angle(so.to))
    if (complete) {
      points[prefix + 'From'] = so.from.shiftFractionTowards(so.to, so.margin / 100)
      points[prefix + 'To'] = so.to.shiftFractionTowards(so.from, so.margin / 100)
      points[prefix + 'Via1'] = points[prefix + 'From']
        .shiftTowards(so.from, so.offset * scale)
        .rotate(-90, points[prefix + 'From'])
      points[prefix + 'Via2'] = points[prefix + 'To']
        .shiftTowards(so.to, so.offset * scale)
        .rotate(90, points[prefix + 'To'])
      const text = so.grainline ? 'cutOnFoldAndGrainline' : 'cutOnFold'
      paths[prefix + 'Cutonfold'] = new Path()
        .move(points[prefix + 'From'])
        .line(points[prefix + 'Via1'])
        .line(points[prefix + 'Via2'])
        .line(points[prefix + 'To'])
        .attr('class', 'note')
        .attr('marker-start', 'url(#cutonfoldFrom)')
        .attr('marker-end', 'url(#cutonfoldTo)')
        .attr('data-text', text)
        .attr('data-text-class', 'center fill-note')
    }
  },
}
