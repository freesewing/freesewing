const prefix = 'pleat_'

// Export defs
export const pleatDefs = [
  {
    name: 'notch',
    def: `
<marker id="pleatTo" markerWidth="12" markerHeight="8" orient="auto" refY="4" refX="12">
  <path class="note fill-note" d="M 12,4 L 0,0 C 2,2 2,6  0,8 z" />
</marker>
`,
  },
]

// Export macros
export const pleatMacros = {
  pleat: function (so, { points, paths, Path, complete, scale }) {
    const id = prefix + so.id
    so = {
      margin: 35,
      reverse: false,
      ...so,
    }
    if (complete) {
      points[id + '_From'] = so.from
      points[id + '_To'] = so.to
      points[id + '_FromIn'] = points[id + '_From'].shift(
        so.from.shiftTowards(so.to, 0.1).angle(so.from) + 270,
        so.margin * scale
      )
      points[id + '_ToIn'] = points[id + '_To'].shift(
        so.from.shiftTowards(so.to, 0.1).angle(so.to) + 90,
        so.margin * scale
      )
      paths[id + '_PleatFrom'] = new Path()
        .move(points[id + '_From'])
        .line(points[id + '_FromIn'])
        .attr('class', 'note' + (so.reverse ? ' dashed' : ''))
      paths[id + '_PleatTo'] = new Path()
        .move(points[id + '_To'])
        .line(points[id + '_ToIn'])
        .attr('class', 'note' + (so.reverse ? '' : ' dashed'))
      paths[id + '_PleatArrow'] = new Path()
        .move(
          points[id + (so.reverse ? '_To' : '_From')].shiftFractionTowards(
            points[id + (so.reverse ? '_ToIn' : '_FromIn')],
            0.25
          )
        )
        .line(
          points[id + (so.reverse ? '_From' : '_To')].shiftFractionTowards(
            points[id + (so.reverse ? '_FromIn' : '_ToIn')],
            0.25
          )
        )
        .attr('class', 'note')
        .attr('marker-end', 'url(#pleatTo)')
    }
  },
  rmpleat: function (id, { points, paths }) {
    const mid = prefix + id
    delete points[mid + '_pleatFrom']
    delete points[mid + '_pleatFromIn']
    delete points[mid + '_pleatTo']
    delete points[mid + '_pleatToIn']
    delete paths[mid + '_pleatTo']
    delete paths[mid + '_pleatFrom']
    delete paths[mid + '_pleatArrow']
    return true
  },
}
