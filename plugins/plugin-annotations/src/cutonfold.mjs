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
    so = {
      offset: 15,
      margin: 5,
      ...so,
    }

    // store in cutlist
    store.cutlist.setCutOnFold(so.from, so.to)
    if (so.grainline) store.cutlist.setGrain(so.from.angle(so.to))

    if (complete) {
      points[so.id + '_From'] = so.from.shiftFractionTowards(so.to, so.margin / 100)
      points[so.id + '_To'] = so.to.shiftFractionTowards(so.from, so.margin / 100)
      points[so.id + '_Via1'] = points[so.id + '_From']
        .shiftTowards(so.from, so.offset * scale)
        .rotate(-90, points[so.id + '_From'])
      points[so.id + '_Via2'] = points[so.id + '_To']
        .shiftTowards(so.to, so.offset * scale)
        .rotate(90, points[so.id + '_To'])
      const text = so.grainline ? 'cutOnFoldAndGrainline' : 'cutOnFold'
      paths[so.id + '_Cutonfold'] = new Path()
        .move(points[so.id + '_From'])
        .line(points[so.id + '_Via1'])
        .line(points[so.id + '_Via2'])
        .line(points[so.id + '_To'])
        .attr('class', 'note')
        .attr('marker-start', 'url(#cutonfoldFrom)')
        .attr('marker-end', 'url(#cutonfoldTo)')
        .attr('data-text', text)
        .attr('data-text-class', 'center fill-note')
    }
  },
  rmcutonfold: function (id, { points, paths, store }) {
    delete points[id + '_From']
    delete points[id + '_To']
    delete points[id + '_Via1']
    delete points[id + '_Via2']
    delete paths[id + '_Cutonfold']

    store.cutlist.setCutOnFold(false) // Restore default
  },
}
