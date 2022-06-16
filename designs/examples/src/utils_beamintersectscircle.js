import { box } from './shared'

export default (part) => {
  let { Point, points, Path, paths, Snippet, snippets, utils } = part.shorthand()

  points.A = new Point(95, 45).attr('data-circle', 35).attr('data-circle-class', 'fabric')
  points.B = new Point(55, 50)
  points.C = new Point(75, 30)
  points.D = new Point(55, 65)
  points.E = new Point(115, 5)
  points.F = new Point(65, 75)
  points.G = new Point(125, 15)

  paths.line1 = new Path().move(points.B).line(points.C)
  paths.line2 = new Path().move(points.D).line(points.E)
  paths.line3 = new Path().move(points.F).line(points.G)

  let intersections1 = utils.beamIntersectsCircle(
    points.A,
    points.A.attributes.get('data-circle'),
    points.B,
    points.C
  )
  let intersections2 = utils.beamIntersectsCircle(
    points.A,
    points.A.attributes.get('data-circle'),
    points.D,
    points.E,
    'y'
  )
  let intersections3 = utils.beamIntersectsCircle(
    points.A,
    points.A.attributes.get('data-circle'),
    points.F,
    points.G
  )

  snippets.first1 = new Snippet('bnotch', intersections1[0])
  snippets.second1 = new Snippet('notch', intersections1[1])
  snippets.first2 = new Snippet('bnotch', intersections2[0])
  snippets.second2 = new Snippet('notch', intersections2[1])
  snippets.first3 = new Snippet('bnotch', intersections3[0])
  snippets.second3 = new Snippet('notch', intersections3[1])

  return box(part, 200, 80)
}
