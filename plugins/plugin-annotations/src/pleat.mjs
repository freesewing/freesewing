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
    so = {
      margin: 35,
      reverse: false,
      ...so,
    }
    if (complete) {
      points[so.id + '_From'] = so.from
      points[so.id + '_To'] = so.to
      points[so.id + '_FromIn'] = points[so.id + '_From'].shift(
        so.from.shiftTowards(so.to, 0.1).angle(so.from) + 270,
        so.margin * scale
      )
      points[so.id + '_ToIn'] = points[so.id + '_To'].shift(
        so.from.shiftTowards(so.to, 0.1).angle(so.to) + 90,
        so.margin * scale
      )
      paths[so.id + '_PleatFrom'] = new Path()
        .move(points[so.id + '_From'])
        .line(points[so.id + '_FromIn'])
        .attr('class', 'note' + (so.reverse ? ' dashed' : ''))
      paths[so.id + '_PleatTo'] = new Path()
        .move(points[so.id + '_To'])
        .line(points[so.id + '_ToIn'])
        .attr('class', 'note' + (so.reverse ? '' : ' dashed'))
      paths[so.id + '_PleatArrow'] = new Path()
        .move(
          points[so.id + (so.reverse ? '_To' : '_From')].shiftFractionTowards(
            points[so.id + (so.reverse ? '_ToIn' : '_FromIn')],
            0.25
          )
        )
        .line(
          points[so.id + (so.reverse ? '_From' : '_To')].shiftFractionTowards(
            points[so.id + (so.reverse ? '_FromIn' : '_ToIn')],
            0.25
          )
        )
        .attr('class', 'note')
        .attr('marker-end', 'url(#pleatTo)')
    }
  },
  rmpleat: function (id, { points, paths }) {
    delete points[id + '_pleatFrom']
    delete points[id + '_pleatFromIn']
    delete points[id + '_pleatTo']
    delete points[id + '_pleatToIn']
    delete paths[id + '_pleatTo']
    delete paths[id + '_pleatFrom']
    delete paths[id + '_pleatArrow']
    return true
  },
}
