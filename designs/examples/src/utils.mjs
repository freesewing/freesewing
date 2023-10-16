import { box } from './shared.mjs'

export const utils_beamintersectscircle = {
  name: 'examples.utils_beamintersectscircle',
  draft: ({ Point, points, Path, paths, Snippet, snippets, utils, part }) => {
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
  },
}

export const utils_beamintersectsx = {
  name: 'examples.utils_beamintersectsx',
  draft: ({ Point, points, Path, paths, Snippet, snippets, utils, part }) => {
    points.A = new Point(10, 10)
    points.B = new Point(90, 30)

    paths.AB = new Path().move(points.A).line(points.B)

    snippets.x = new Snippet('notch', utils.beamIntersectsX(points.A, points.B, 40))

    paths.help = new Path()
      .move(new Point(40, 5))
      .line(new Point(40, 35))
      .attr('class', 'note dashed')

    return part
  },
}

export const utils_beamintersectsy = {
  name: 'examples.utils_beamintersectsy',
  draft: ({ Point, points, Path, paths, Snippet, snippets, utils, part }) => {
    points.A = new Point(10, 10)
    points.B = new Point(50, 40)

    paths.AB = new Path().move(points.A).line(points.B)

    snippets.x = new Snippet('notch', utils.beamIntersectsY(points.A, points.B, 30))

    paths.help = new Path()
      .move(new Point(0, 30))
      .line(new Point(50, 30))
      .attr('class', 'note dashed')

    return part
  },
}

export const utils_beamintersectscurve = {
  name: 'examples.utils_beamintersectscurve',
  draft: ({ Point, points, Path, paths, Snippet, snippets, utils, part }) => {
    points.A = new Point(10, 10)
    points.Acp = new Point(10, 40)
    points.B = new Point(110, 10)
    points.Bcp = new Point(110, 40)
    points.E = new Point(45, 25)
    points.D = new Point(65, 25)
    paths.curve = new Path().move(points.A).curve(points.Acp, points.Bcp, points.B)
    paths.line = new Path().move(points.E).line(points.D)

    for (let p of utils.beamIntersectsCurve(
      points.D,
      points.E,
      points.A,
      points.Acp,
      points.Bcp,
      points.B
    )) {
      snippets[part.getId()] = new Snippet('notch', p)
    }

    paths.help = new Path()
      .move(new Point(0, 30))
      .line(new Point(50, 30))
      .attr('class', 'note dashed')

    return part
  },
}

export const utils_beamsintersect = {
  name: 'examples.utils_beamsintersect',
  draft: ({ Point, points, Path, paths, Snippet, snippets, utils, part }) => {
    points.A = new Point(10, 10)
    points.B = new Point(50, 40)
    points.C = new Point(45, 20)
    points.D = new Point(60, 15)

    paths.AB = new Path().move(points.A).line(points.B)
    paths.CD = new Path().move(points.C).line(points.D)

    snippets.x = new Snippet('notch', utils.beamsIntersect(points.A, points.B, points.C, points.D))

    return part
  },
}

export const utils_circlesintersect = {
  name: 'examples.utils_circlesintersect',
  draft: ({ Point, points, Snippet, snippets, utils, part }) => {
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
  },
}

export const utils_curveintersectsx = {
  name: 'examples.utils_curveintersectsx',
  draft: ({ Point, points, Path, paths, utils, snippets, Snippet, part }) => {
    points.start = new Point(10, 15)
    points.cp1 = new Point(80, 10)
    points.cp2 = new Point(-50, 80)
    points.end = new Point(110, 70)

    paths.curve = new Path().move(points.start).curve(points.cp1, points.cp2, points.end)

    for (let x of [30, 40]) {
      points['from' + x] = new Point(x, 10)
      points['to' + x] = new Point(x, 80)
      paths['line' + x] = new Path()
        .move(points['from' + x])
        .line(points['to' + x])
        .attr('class', 'lining dashed')
    }

    snippets.i40 = new Snippet(
      'notch',
      utils.curveIntersectsX(points.start, points.cp1, points.cp2, points.end, 40)
    )

    for (let p of utils.curveIntersectsX(points.start, points.cp1, points.cp2, points.end, 30))
      snippets[p.y] = new Snippet('notch', p)

    return part
  },
}

export const utils_curveintersectsy = {
  name: 'examples.utils_curveintersectsy',
  draft: ({ Point, points, Path, paths, utils, snippets, Snippet, part }) => {
    points.start = new Point(10, 45)
    points.cp1 = new Point(50, 10)
    points.cp2 = new Point(0, 80)
    points.end = new Point(110, 70)

    paths.curve = new Path().move(points.start).curve(points.cp1, points.cp2, points.end)

    for (let y of [40, 50]) {
      points['from' + y] = new Point(10, y)
      points['to' + y] = new Point(110, y)
      paths['line' + y] = new Path()
        .move(points['from' + y])
        .line(points['to' + y])
        .attr('class', 'lining dashed')
    }

    snippets.i50 = new Snippet(
      'notch',
      utils.curveIntersectsY(points.start, points.cp1, points.cp2, points.end, 50)
    )

    for (let p of utils.curveIntersectsY(points.start, points.cp1, points.cp2, points.end, 40))
      snippets[p.x] = new Snippet('notch', p)

    return part
  },
}

export const utils_curvesintersect = {
  name: 'examples.utils_curvesintersect',
  draft: ({ Point, points, Path, paths, Snippet, snippets, utils, part }) => {
    points.A = new Point(10, 10)
    points.Acp = new Point(310, 40)
    points.B = new Point(110, 70)
    points.Bcp = new Point(-210, 40)

    points.C = new Point(20, -5)
    points.Ccp = new Point(60, 300)
    points.D = new Point(100, 85)
    points.Dcp = new Point(70, -220)
    paths.curveA = new Path().move(points.A).curve(points.Acp, points.Bcp, points.B)
    paths.curveB = new Path().move(points.C).curve(points.Ccp, points.Dcp, points.D)

    for (let p of utils.curvesIntersect(
      points.A,
      points.Acp,
      points.Bcp,
      points.B,
      points.C,
      points.Ccp,
      points.Dcp,
      points.D
    )) {
      snippets[part.getId()] = new Snippet('notch', p)
    }

    return part
  },
}

export const utils_lineintersectscircle = {
  name: 'examples.utils_lineintersectscircle',
  draft: ({ Point, points, Path, paths, Snippet, snippets, utils, part }) => {
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

    let intersections1 = utils.lineIntersectsCircle(
      points.A,
      points.A.attributes.get('data-circle'),
      points.B,
      points.C
    )
    let intersections2 = utils.lineIntersectsCircle(
      points.A,
      points.A.attributes.get('data-circle'),
      points.D,
      points.E,
      'y'
    )
    let intersections3 = utils.lineIntersectsCircle(
      points.A,
      points.A.attributes.get('data-circle'),
      points.F,
      points.G
    )
    snippets.first1 = new Snippet('bnotch', intersections1[0])
    snippets.first2 = new Snippet('bnotch', intersections2[0])
    snippets.second2 = new Snippet('notch', intersections2[1])
    snippets.first3 = new Snippet('bnotch', intersections3[0])
    snippets.second3 = new Snippet('notch', intersections3[1])

    return box(part, 200, 80)
  },
}

export const utils_lineintersectscurve = {
  name: 'examples.utils_lineintersectscurve',
  draft: ({ Point, points, Path, paths, Snippet, snippets, utils, part }) => {
    points.A = new Point(10, 10)
    points.Acp = new Point(310, 40)
    points.B = new Point(110, 70)
    points.Bcp = new Point(-210, 40)
    points.E = new Point(20, -5)
    points.D = new Point(100, 85)
    paths.curve = new Path().move(points.A).curve(points.Acp, points.Bcp, points.B)
    paths.line = new Path().move(points.E).line(points.D)

    for (let p of utils.lineIntersectsCurve(
      points.D,
      points.E,
      points.A,
      points.Acp,
      points.Bcp,
      points.B
    )) {
      snippets[part.getId()] = new Snippet('notch', p)
    }

    return part
  },
}

export const utils_linesintersect = {
  name: 'examples.utils_linesintersect',
  draft: ({ Point, points, Path, paths, Snippet, snippets, utils, part }) => {
    points.A = new Point(10, 10)
    points.B = new Point(50, 40)
    points.C = new Point(15, 30)
    points.D = new Point(60, 15)

    paths.AB = new Path().move(points.A).line(points.B)
    paths.CD = new Path().move(points.C).line(points.D)

    snippets.X = new Snippet('notch', utils.linesIntersect(points.A, points.B, points.C, points.D))

    return part
  },
}

export const utils_pointonbeam = {
  name: 'examples.utils_pointonbeam',
  draft: ({ Point, points, Path, paths, Snippet, snippets, utils, part }) => {
    points.from1 = new Point(10, 10)
    points.to1 = new Point(90, 60)
    points.from2 = new Point(10, 30)
    points.to2 = new Point(90, 80)
    points.b1 = new Point(170, 110)
    points.b2 = new Point(170, 130)

    let scatter = []
    for (let i = 1; i < 36; i++) {
      for (let j = 1; j < 27; j++) {
        scatter.push(new Point(i * 10, j * 10))
      }
    }
    let snippet
    for (let point of scatter) {
      if (utils.pointOnBeam(points.from1, points.to1, point)) snippet = 'notch'
      else snippet = 'bnotch'
      snippets[part.getId()] = new Snippet(snippet, point)
      if (utils.pointOnBeam(points.from2, points.to2, point, 0.01)) {
        snippet = 'notch'
      } else snippet = 'bnotch'
      snippets[part.getId()] = new Snippet(snippet, point)
    }
    paths.line1 = new Path().move(points.from1).line(points.to1).attr('class', 'fabric stroke-lg')
    paths.lne1 = new Path().move(points.to1).line(points.b1).attr('class', 'fabric dashed')
    paths.line2 = new Path().move(points.from2).line(points.to2).attr('class', 'fabric stroke-lg')
    paths.lne2 = new Path().move(points.to2).line(points.b2).attr('class', 'fabric dashed')

    return part
  },
}

export const utils_pointoncurve = {
  name: 'examples.utils_pointoncurve',
  draft: ({ Point, points, Path, paths, Snippet, snippets, utils, part }) => {
    points.start = new Point(10, 10)
    points.cp1 = new Point(90, 10)
    points.cp2 = new Point(10, 60)
    points.end = new Point(90, 60)

    let scatter = []
    for (let i = 1; i < 19; i++) {
      for (let j = 1; j < 14; j++) {
        scatter.push(new Point(i * 10, j * 10))
      }
    }
    let snippet
    for (let point of scatter) {
      if (utils.pointOnCurve(points.start, points.cp1, points.cp2, points.end, point)) {
        snippet = 'notch'
      } else snippet = 'bnotch'
      snippets[part.getId()] = new Snippet(snippet, point)
    }
    paths.curve = new Path()
      .move(points.start)
      .curve(points.cp1, points.cp2, points.end)
      .attr('class', 'fabric stroke-lg')

    return part
  },
}

export const utils_pointonline = {
  name: 'examples.utils_pointonline',
  draft: ({ Point, points, Path, paths, Snippet, snippets, utils, part }) => {
    points.from1 = new Point(10, 10)
    points.to1 = new Point(90, 60)
    points.from2 = new Point(10, 30)
    points.to2 = new Point(90, 80)
    points.b1 = new Point(170, 110)
    points.b2 = new Point(170, 130)

    let scatter = []
    for (let i = 1; i < 36; i++) {
      for (let j = 1; j < 27; j++) {
        scatter.push(new Point(i * 10, j * 10))
      }
    }
    let snippet
    for (let point of scatter) {
      if (utils.pointOnLine(points.from1, points.to1, point)) snippet = 'notch'
      else snippet = 'bnotch'
      snippets[part.getId()] = new Snippet(snippet, point)
      if (utils.pointOnLine(points.from2, points.to2, point, 0.01)) {
        snippet = 'notch'
      } else snippet = 'bnotch'
      snippets[part.getId()] = new Snippet(snippet, point)
    }
    paths.line1 = new Path().move(points.from1).line(points.to1).attr('class', 'fabric stroke-lg')
    paths.lne1 = new Path().move(points.to1).line(points.b1).attr('class', 'fabric dashed')
    paths.line2 = new Path().move(points.from2).line(points.to2).attr('class', 'fabric stroke-lg')
    paths.lne2 = new Path().move(points.to2).line(points.b2).attr('class', 'fabric dashed')

    return part
  },
}

export const utils_splitcurve = {
  name: 'examples.utils_splitcurve',
  draft: ({ Point, points, Path, paths, utils, part }) => {
    points.from = new Point(40, 10)
    points.to = new Point(40, 80)
    paths.line = new Path().move(points.from).line(points.to).attr('class', 'lining dashed')

    points.start = new Point(10, 15)
    points.cp1 = new Point(80, 10)
    points.cp2 = new Point(-50, 80)
    points.end = new Point(110, 70)

    points.i40 = utils.curveIntersectsX(points.start, points.cp1, points.cp2, points.end, 40)

    let parts = utils.splitCurve(points.start, points.cp1, points.cp2, points.end, points.i40)

    let colors = ['lining', 'interfacing']
    for (let p of parts) {
      let color = colors.pop()
      paths[color] = new Path()
        .move(p.start)
        .curve(p.cp1, p.cp2, p.end)
        .attr('class', 'stroke-xl ' + color)
    }

    return part
  },
}
