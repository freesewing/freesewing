const prefix = 'cutonfold_'
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
    const id = prefix + so.id
    // store in cutlist
    store.cutlist.setCutOnFold(so.from, so.to, id)
    if (so.grainline) store.cutlist.setGrain(so.from.angle(so.to))

    if (complete) {
      points[id + '_From'] = so.from.shiftFractionTowards(so.to, so.margin / 100)
      points[id + '_To'] = so.to.shiftFractionTowards(so.from, so.margin / 100)
      points[id + '_Via1'] = points[id + '_From']
        .shiftTowards(so.from, so.offset * scale)
        .rotate(-90, points[id + '_From'])
      points[id + '_Via2'] = points[id + '_To']
        .shiftTowards(so.to, so.offset * scale)
        .rotate(90, points[id + '_To'])
      const text = so.grainline ? 'cutOnFoldAndGrainline' : 'cutOnFold'
      paths[id + '_Cutonfold'] = new Path()
        .move(points[id + '_From'])
        .line(points[id + '_Via1'])
        .line(points[id + '_Via2'])
        .line(points[id + '_To'])
        .attr('class', 'note')
        .attr('marker-start', 'url(#cutonfoldFrom)')
        .attr('marker-end', 'url(#cutonfoldTo)')
        .attr('data-text', text)
        .attr('data-text-class', 'center fill-note')
    }
  },
  rmcutonfold: function (id, { points, paths, store }) {
    delete points[prefix + id + '_From']
    delete points[prefix + id + '_To']
    delete points[prefix + id + '_Via1']
    delete points[prefix + id + '_Via2']
    delete paths[prefix + id + '_Cutonfold']

    store.cutlist.setCutOnFold(false, undefined, id) // Restore default
  },
}
