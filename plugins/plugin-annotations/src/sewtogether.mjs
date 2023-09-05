const prefix = 'sewtogether_'
// Export defs
export const sewtogetherDefs = [
  {
    name: 'sewTogetherStart',
    def: `
<marker id="sewTogetherStart" markerWidth="4" markerHeight="4" orient="auto" refX="0" refY="2">
  <path class="note stroke-sm" d="M4,4 L0,2 4,0" />
</marker>`,
  },
  {
    name: 'sewTogetherEnd',
    def: `
<marker id="sewTogetherEnd" markerWidth="4" markerHeight="4" orient="auto" refX="4" refY="2">
  <path class="note stroke-sm" d="M0,0 L4,2 0,4" />
</marker>`,
  },
  {
    name: 'sewTogetherCross',
    def: `
<marker id="sewTogetherCross" markerWidth="4" markerHeight="4" orient="auto" refX="2" refY="2">
  <path d="M 0,0 L 4,4 M 4,0 L 0,4" class="note stroke-sm"/>
</marker>`,
  },
]

// Export macros
export const sewtogetherMacros = {
  sewTogether: function (so, { points, paths, Path, complete, sa }) {
    const id = prefix + so.id
    so = {
      ...so,
    }
    if (complete) {
      if (null == so.middle) {
        so.middle = so.from.shiftFractionTowards(so.to, 0.5)
      }
      points[id + '_From'] = so.from
      points[id + '_Middle'] = so.middle
      points[id + '_To'] = so.to

      points[id + '_FromCp'] = points[id + '_From'].shift(
        points[id + '_From'].angle(points[id + '_Middle']) + 90,
        points[id + '_From'].dist(points[id + '_Middle']) / 1.5
      )
      points[id + '_ToCp'] = points[id + '_To'].shift(
        points[id + '_To'].angle(points[id + '_Middle']) - 90,
        points[id + '_To'].dist(points[id + '_Middle']) / 1.5
      )

      if (so.hinge) {
        points[id + '_Hinge'] = points[id + '_Middle'].shift(
          points[id + '_Middle'].angle(points[id + '_To']) +
            Math.abs(
              points[id + '_Middle'].angle(points[id + '_From']) -
                points[id + '_Middle'].angle(points[id + '_To'])
            ) /
              2 +
            (sa ? 180 : 0),
          sa
            ? sa
            : Math.min(
                points[id + '_From'].dist(points[id + '_Middle']),
                points[id + '_From'].dist(points[id + '_Middle'])
              ) / 4
        )
        paths[id + '_SewTogetherHinge'] = new Path()
          .move(points[id + '_Middle'])
          .line(points[id + '_Hinge'])
          .attr('marker-start', 'url(#sewTogetherCross)')
          .attr('class', 'dotted note stroke-sm')
      }
      paths[id + '_SewTogether'] = new Path()
        .move(points[id + '_From'])
        .curve(points[id + '_FromCp'], points[id + '_ToCp'], points[id + '_To'])
        .attr('class', 'dotted note stroke-sm')
        .attr('marker-start', 'url(#sewTogetherStart)')
        .attr('marker-end', 'url(#sewTogetherEnd)')
        .attr('data-text', 'sewTogether')
        .attr('data-text-class', 'center fill-note text-xs')
    }
  },
  rmsewTogether: function (id, { points, paths }) {
    const mid = prefix + id
    delete points[mid + '_From']
    delete points[mid + '_FromCp']
    delete points[mid + '_Middle']
    delete points[mid + '_To']
    delete points[mid + '_Hinge']
    delete points[mid + '_ToCp']
    delete paths[mid + '_SewTogetherHinge']
    delete paths[mid + '_SewTogether']
    return true
  },
}
