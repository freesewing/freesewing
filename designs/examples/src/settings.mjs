export const settings_sa = {
  name: 'examples.settings_sa',
  draft: ({ Point, points, Path, paths, part }) => {
    points.A = new Point(45, 60)
    points.B = new Point(10, 30)
    points.BCp2 = new Point(40, 20)
    points.C = new Point(90, 30)
    points.CCp1 = new Point(50, -30)

    paths.example = new Path()
      .move(points.A)
      .line(points.B)
      .curve(points.BCp2, points.CCp1, points.C)
      .line(points.A)
      .close()
      .attr('class', 'fabric')

    paths.offset = paths.example.offset(-10).attr('class', 'fabric sa')

    return part
  },
}
