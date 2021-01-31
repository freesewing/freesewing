export default function (part) {
  let { Point, points, paths, macro, complete, snippets, Snippet } = part.shorthand()

  // Complete?
  if (complete) {
    snippets.snapMale = new Snippet('snap-male', points.snapLeft)
    snippets.snapFemale = new Snippet('snap-female', points.snapRight).attr('opacity', 0.5)

    paths.bias = paths.seam
      .offset(-5)
      .attr('class', 'various dashed')
      .attr('data-text', 'finishWithBiasTape')
      .attr('data-text-class', 'center fill-various')

    points.title = points.bottom.shift(-90, 45)
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'bib'
    })

    points.scalebox = points.title.shift(-90, 55)
    macro('scalebox', { at: points.scalebox })

    points.logo = new Point(0, 0)
    snippets.logo = new Snippet('logo', points.logo)
  }

  return part
}
