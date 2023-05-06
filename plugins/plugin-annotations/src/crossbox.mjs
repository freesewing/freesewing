// Export macros
export const crossboxMacros = {
  crossbox: function (so, { points, Point, paths, Path, getId }) {
    let id = getId()
    let shiftFraction = 0.1
    points[id + '_boxTopLeft'] = so.from.copy()
    points[id + '_boxBottomRight'] = so.to.copy()
    points[id + '_boxTopRight'] = new Point(so.to.x, so.from.y)
    points[id + '_boxBottomLeft'] = new Point(so.from.x, so.to.y)

    points[id + '_topCrossTL'] = points[id + '_boxTopLeft'].shiftFractionTowards(
      points[id + '_boxBottomRight'],
      shiftFraction
    )
    points[id + '_topCrossTR'] = points[id + '_boxTopRight'].shiftFractionTowards(
      points[id + '_boxBottomLeft'],
      shiftFraction
    )
    points[id + '_topCrossBL'] = points[id + '_boxBottomLeft'].shiftFractionTowards(
      points[id + '_boxTopRight'],
      shiftFraction
    )
    points[id + '_topCrossBR'] = points[id + '_boxBottomRight'].shiftFractionTowards(
      points[id + '_boxTopLeft'],
      shiftFraction
    )

    paths[id + 'crossBox'] = new Path()
      .move(points[id + '_boxTopLeft'])
      .line(points[id + '_boxTopRight'])
      .line(points[id + '_boxBottomRight'])
      .line(points[id + '_boxBottomLeft'])
      .line(points[id + '_boxTopLeft'])
      .close()
      .attr('class', 'lining dotted stroke-sm')
    paths[id + '_topCross'] = new Path()
      .move(points[id + '_topCrossTL'])
      .line(points[id + '_topCrossBR'])
      .line(points[id + '_topCrossTR'])
      .line(points[id + '_topCrossBL'])
      .line(points[id + '_topCrossTL'])
      .line(points[id + '_topCrossTR'])
      .move(points[id + '_topCrossBR'])
      .line(points[id + '_topCrossBL'])
      .attr('class', 'lining dotted stroke-sm')
    if (typeof so.text === 'string') {
      points.textAnchor = points[id + '_boxTopLeft']
        .shiftFractionTowards(points[id + '_boxBottomRight'], 0.5)
        .attr('data-text', so.text)
        .attr('data-text-class', 'center')
    }
  },
}
