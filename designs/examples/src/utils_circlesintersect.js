export default (part) => {
  let { Point, points, Snippet, snippets, utils } = part.shorthand()

  points.A = new Point(10, 10).attr('data-circle', 15).attr('data-circle-class', 'fabric')
  points.B = new Point(30, 30).attr('data-circle', 35).attr('data-circle-class', 'fabric')
  points.C = new Point(90, 10).attr('data-circle', 15).attr('data-circle-class', 'various')
  points.D = new Point(110, 30).attr('data-circle', 35).attr('data-circle-class', 'various')

  let intersections1 = utils.circlesIntersect(
    points.A,
    points.A.attributes.get('data-circle'),
    points.B,
    points.B.attributes.get('data-circle')
  )
  let intersections2 = utils.circlesIntersect(
    points.C,
    points.C.attributes.get('data-circle'),
    points.D,
    points.D.attributes.get('data-circle'),
    'y'
  )

  snippets.first1 = new Snippet('bnotch', intersections1[0])
  snippets.second1 = new Snippet('notch', intersections1[1])
  snippets.first2 = new Snippet('bnotch', intersections2[0])
  snippets.second2 = new Snippet('notch', intersections2[1])

  return part
}
