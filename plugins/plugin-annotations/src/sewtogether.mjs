// Export defs
export const sewtogetherDefs = [
  {
    name: 'sewTogetherStart',
    def: (scale) => `
<marker id="sewTogetherStart" markerWidth="8" markerHeight="8" style="overflow:visible;" orient="auto" refX="0" refY="0">
  <path class="note stroke-sm" d="M 8,4 L 0,0 8,-4" transform="scale(${scale})"/>
</marker>`,
  },
  {
    name: 'sewTogetherEnd',
    def: (scale) => `
<marker id="sewTogetherEnd" markerWidth="8" markerHeight="8" style="overflow:visible;" orient="auto" refX="0" refY="0">
  <path class="note stroke-sm" d="M -8,-4 L 0,0 -8,4" transform="scale(${scale})"/>
</marker>`,
  },
  {
    name: 'sewTogetherCross',
    def: (scale) => `
<marker id="sewTogetherCross" markerWidth="8" markerHeight="8" style="overflow:visible;" orient="auto" refX="0" refY="0">
  <path d="M -4,-4 L 4,4 M 4,-4 L -4,4" class="note stroke-sm" transform="scale(${scale})"/>
</marker>`,
  },
]

// Export macros
export const sewtogetherMacros = {
  sewTogether: function (so, { points, paths, Path, complete, sa }) {
    if (so === false) {
      delete points.sewtogetherFrom
      delete points.sewtogetherFromCp
      delete points.sewtogetherMiddle
      delete points.sewtogetherTo
      delete points.sewtogetherHinge
      delete points.sewtogetherToCp
      delete paths.sewtogetherSewTogetherHinge
      delete paths.sewtogetherSewTogether
      return true
    }
    so = {
      prefix: 'sewtogether',
      ...so,
    }
    if (complete) {
      if (null == so.middle) {
        so.middle = so.from.shiftFractionTowards(so.to, 0.5)
      }
      points[so.prefix + 'From'] = so.from
      points[so.prefix + 'Middle'] = so.middle
      points[so.prefix + 'To'] = so.to

      points[so.prefix + 'FromCp'] = points[so.prefix + 'From'].shift(
        points[so.prefix + 'From'].angle(points[so.prefix + 'Middle']) + 90,
        points[so.prefix + 'From'].dist(points[so.prefix + 'Middle']) / 1.5
      )
      points[so.prefix + 'ToCp'] = points[so.prefix + 'To'].shift(
        points[so.prefix + 'To'].angle(points[so.prefix + 'Middle']) - 90,
        points[so.prefix + 'To'].dist(points[so.prefix + 'Middle']) / 1.5
      )

      if (so.hinge) {
        points[so.prefix + 'Hinge'] = points[so.prefix + 'Middle'].shift(
          points[so.prefix + 'Middle'].angle(points[so.prefix + 'To']) +
            Math.abs(
              points[so.prefix + 'Middle'].angle(points[so.prefix + 'From']) -
                points[so.prefix + 'Middle'].angle(points[so.prefix + 'To'])
            ) /
              2 +
            (sa ? 180 : 0),
          sa
            ? sa
            : Math.min(
                points[so.prefix + 'From'].dist(points[so.prefix + 'Middle']),
                points[so.prefix + 'From'].dist(points[so.prefix + 'Middle'])
              ) / 4
        )
        paths[so.prefix + 'SewTogetherHinge'] = new Path()
          .move(points[so.prefix + 'Middle'])
          .line(points[so.prefix + 'Hinge'])
          .attr('marker-start', 'url(#sewTogetherCross)')
          .attr('class', 'dotted note stroke-sm')
      }
      paths[so.prefix + 'SewTogether'] = new Path()
        .move(points[so.prefix + 'From'])
        .curve(points[so.prefix + 'FromCp'], points[so.prefix + 'ToCp'], points[so.prefix + 'To'])
        .attr('class', 'dotted note stroke-sm')
        .attr('marker-start', 'url(#sewTogetherStart)')
        .attr('marker-end', 'url(#sewTogetherEnd)')
        .attr('data-text', 'sewTogether')
        .attr('data-text-class', 'center fill-note text-xs')
    }
  },
}
