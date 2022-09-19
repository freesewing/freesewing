import { box } from './shared.mjs'

export const path__curve = {
  name: 'examples.path__curve',
  draft: ({ Point, points, Path, paths, part }) => {
    points.from = new Point(5, 20)
    points.cp2 = new Point(60, 30)
    points.to = new Point(90, 20)

    paths.line = new Path()
      .move(points.from)
      ._curve(points.cp2, points.to)
      .attr('data-text', 'Path._curve()')
      .attr('data-text-class', 'text-sm center fill-note')

    return box(part, 100, 25)
  },
}

export const path_attr = {
  name: 'examples.path_attr',
  draft: ({ Point, points, Path, paths, part }) => {
    points.B = new Point(10, 50)
    points.BCp2 = new Point(40, 10)
    points.C = new Point(90, 30)
    points.CCp1 = new Point(50, 90)

    paths.example = new Path()
      .move(points.B)
      .curve(points.BCp2, points.CCp1, points.C)
      .attr('class', 'canvas')
      .attr('data-text', 'supportFreesewingBecomeAPatron')
      .attr('data-text-class', 'text-xs center')

    return part
  },
}

export const path_clone = {
  name: 'examples.path_clone',
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

    paths.clone = paths.example
      .clone()
      .attr('class', 'note lashed stroke-l')
      .attr('style', 'stroke-opacity: 0.5')

    return part
  },
}

export const path_close = {
  name: 'examples.path_close',
  draft: ({ Point, points, Path, paths, part }) => {
    points.from = new Point(10, 20)
    points.cp2 = new Point(60, 30)
    points.to = new Point(90, 20)

    paths.line = new Path()
      .move(points.from)
      ._curve(points.cp2, points.to)
      .close()
      .reverse() // To keep text from being upside-down
      .attr('data-text', 'Path._close()')
      .attr('data-text-class', 'text-sm right fill-note')

    return box(part, 100, 25)
  },
}

export const path_curve = {
  name: 'examples.path_curve',
  draft: ({ Point, points, Path, paths, part }) => {
    points.from = new Point(10, 20)
    points.cp1 = new Point(40, 0)
    points.cp2 = new Point(60, 30)
    points.to = new Point(90, 20)

    paths.line = new Path()
      .move(points.from)
      .curve(points.cp1, points.cp2, points.to)
      .attr('data-text', 'Path.curve()')
      .attr('data-text-class', 'text-sm center fill-note')

    return box(part, 100, 25)
  },
}

export const path_curve_ = {
  name: 'examples.path_curve_',
  draft: ({ Point, points, Path, paths, part }) => {
    points.from = new Point(10, 20)
    points.cp1 = new Point(40, 0)
    points.to = new Point(90, 20)

    paths.line = new Path()
      .move(points.from)
      .curve_(points.cp1, points.to)
      .attr('data-text', 'Path.curve_()')
      .attr('data-text-class', 'text-sm center fill-note')

    return box(part, 100, 25)
  },
}

export const path_divide = {
  name: 'examples.path_divide',
  draft: ({ Point, points, Path, paths, part }) => {
    points.A = new Point(55, 40)
    points.B = new Point(10, 70)
    points.BCp2 = new Point(40, 20)
    points.C = new Point(90, 60)
    points.CCp1 = new Point(50, -30)
    points.D = new Point(50, 80)
    points.DCp1 = new Point(140, 50)

    paths.example = new Path()
      .move(points.A)
      .line(points.B)
      .curve(points.BCp2, points.CCp1, points.C)
      .curve(points.DCp1, points.DCp1, points.D)
      .close()

    let style = 'stroke-width: 4; stroke-opacity: 0.5;'
    let i = 0
    for (let p of paths.example.divide()) {
      i++
      paths[i] = p.attr('style', style).attr('style', `stroke: hsl(${i * 70}, 100%, 50%)`)
    }

    return part
  },
}

export const path_edge = {
  name: 'examples.path_edge',
  draft: ({ Point, points, Path, paths, Snippet, snippets, part }) => {
    points.A = new Point(45, 60)
    points.B = new Point(10, 30)
    points.BCp2 = new Point(40, 20)
    points.C = new Point(90, 30)
    points.CCp1 = new Point(50, -30)
    points.D = new Point(-60, 90)
    points.E = new Point(90, 190)

    paths.demo = new Path()
      .move(points.A)
      .line(points.B)
      .curve(points.BCp2, points.CCp1, points.C)
      .curve(points.E, points.D, points.A)
      .close()

    for (let i of [
      'topLeft',
      'topRight',
      'bottomLeft',
      'bottomRight',
      'top',
      'left',
      'bottom',
      'right',
    ])
      snippets[i] = new Snippet('notch', paths.demo.edge(i))

    return part
  },
}

export const path_end = {
  name: 'examples.path_end',
  draft: ({ Point, points, Path, paths, Snippet, snippets, part }) => {
    points.A = new Point(45, 60)
    points.B = new Point(10, 30)
    points.BCp2 = new Point(40, 20)
    points.C = new Point(90, 30)
    points.CCp1 = new Point(50, -30)

    paths.demo = new Path().move(points.A).line(points.B).curve(points.BCp2, points.CCp1, points.C)

    snippets.end = new Snippet('notch', paths.demo.end())

    return part
  },
}

export const path_intersects = {
  name: 'examples.path_intersects',
  draft: ({ Point, points, Path, paths, Snippet, snippets, part }) => {
    points.A = new Point(45, 60)
    points.B = new Point(10, 30)
    points.BCp2 = new Point(40, 20)
    points.C = new Point(90, 30)
    points.CCp1 = new Point(50, -30)
    points.D = new Point(50, 130)
    points.DCp1 = new Point(150, 30)

    points._A = new Point(55, 40)
    points._B = new Point(0, 55)
    points._BCp2 = new Point(40, -20)
    points._C = new Point(90, 40)
    points._CCp1 = new Point(50, -30)
    points._D = new Point(40, 120)
    points._DCp1 = new Point(180, 40)

    paths.demo1 = new Path()
      .move(points.A)
      .line(points.B)
      .curve(points.BCp2, points.CCp1, points.C)
      .curve(points.DCp1, points.DCp1, points.D)
    paths.demo2 = new Path()
      .move(points._A)
      .line(points._B)
      .curve(points._BCp2, points._CCp1, points._C)
      .curve(points._DCp1, points._DCp1, points._D)

    for (let p of paths.demo1.intersects(paths.demo2)) {
      snippets[part.getId()] = new Snippet('notch', p)
    }

    return part
  },
}

export const path_intersectsx = {
  name: 'examples.path_intersectsx',
  draft: ({ Point, points, Path, paths, Snippet, snippets, part }) => {
    points.A = new Point(95, 50)
    points.B = new Point(10, 30)
    points.BCp2 = new Point(40, 20)
    points.C = new Point(90, 30)
    points.CCp1 = new Point(50, -30)
    points.D = new Point(50, 130)
    points.DCp1 = new Point(150, 30)

    points.top = new Point(60, -10)
    points.bot = new Point(60, 140)

    paths.line = new Path().move(points.top).line(points.bot).attr('class', 'lining dashed')

    paths.demo = new Path()
      .move(points.A)
      .line(points.B)
      .curve(points.BCp2, points.CCp1, points.C)
      .curve(points.DCp1, points.DCp1, points.D)

    for (let p of paths.demo.intersectsX(60)) {
      snippets[part.getId()] = new Snippet('notch', p)
    }

    return part
  },
}

export const path_intersectsy = {
  name: 'examples.path_intersectsy',
  draft: ({ Point, points, Path, paths, Snippet, snippets, part }) => {
    points.A = new Point(55, 40)
    points.B = new Point(10, 70)
    points.BCp2 = new Point(40, 20)
    points.C = new Point(90, 60)
    points.CCp1 = new Point(50, -30)
    points.D = new Point(50, 80)
    points.DCp1 = new Point(140, 50)

    points.top = new Point(10, 58)
    points.bot = new Point(130, 58)

    paths.line = new Path().move(points.top).line(points.bot).attr('class', 'lining dashed')

    paths.demo = new Path()
      .move(points.A)
      .line(points.B)
      .curve(points.BCp2, points.CCp1, points.C)
      .curve(points.DCp1, points.DCp1, points.D)
    for (let p of paths.demo.intersectsY(58)) {
      snippets[part.getId()] = new Snippet('notch', p)
    }

    return part
  },
}

export const path_join = {
  name: 'examples.path_join',
  draft: ({ Point, points, Path, paths, part }) => {
    points.A = new Point(45, 60)
    points.B = new Point(10, 30)
    points.BCp2 = new Point(40, 20)
    points.C = new Point(90, 30)
    points.CCp1 = new Point(50, -30)

    paths.path1 = new Path().move(points.A).line(points.B).attr('class', 'various')

    paths.path2 = new Path()
      .move(points.B)
      .curve(points.BCp2, points.CCp1, points.C)
      .attr('class', 'canvas')

    paths.joint = paths.path1
      .join(paths.path2)
      .attr('class', 'note lashed stroke-l')
      .attr('style', 'stroke-opacity: 0.5')

    return part
  },
}

export const path_length = {
  name: 'examples.path_length',
  draft: ({ Point, points, Path, paths, macro, part }) => {
    points.A = new Point(45, 60)
    points.B = new Point(10, 30)
    points.BCp2 = new Point(40, 20)
    points.C = new Point(90, 30)
    points.CCp1 = new Point(50, -30)

    paths.example = new Path()
      .move(points.A)
      .line(points.B)
      .curve(points.BCp2, points.CCp1, points.C)

    macro('pd', {
      path: paths.example,
      d: -20,
    })

    macro('pd', {
      path: new Path().move(points.B).line(points.A),
      d: 10,
    })

    macro('pd', {
      path: new Path().move(points.B).curve(points.BCp2, points.CCp1, points.C),
      d: -10,
    })

    return part
  },
}

export const path_line = {
  name: 'examples.path_line',
  draft: ({ Point, points, Path, paths, part }) => {
    points.from = new Point(10, 10)
    points.to = new Point(90, 10)

    paths.line = new Path()
      .move(points.from)
      .line(points.to)
      .attr('data-text', 'Path.line()')
      .attr('data-text-class', 'text-sm center fill-note')

    return box(part, 100, 15)
  },
}

export const path_move = {
  name: 'examples.path_move',
  draft: ({ Point, points, Path, paths, part }) => {
    points.to = new Point(50, 10)
      .attr('data-text', 'Path.move()')
      .attr('data-text-class', 'fill-note center')

    paths.noline = new Path().move(points.to)

    return box(part, 100, 15)
  },
}

export const path_noop = {
  name: 'examples.path_noop',
  draft: ({ Point, points, Path, paths, part }) => {
    points.left = new Point(10, 10)
    points.dartLeft = new Point(40, 10)
    points.dartTip = new Point(50, 50)
    points.dartRight = new Point(60, 10)
    points.right = new Point(90, 10)

    paths.without = new Path()
      .move(points.left)
      .line(points.dartLeft)
      .noop('dart')
      .line(points.right)

    paths.withDart = paths.without
      .insop('dart', new Path().line(points.dartTip).line(points.dartRight))
      .attr('style', 'stroke-width: 2px; stroke-opacity: 0.5; stroke: orange;')

    return part
  },
}

export const path_offset = {
  name: 'examples.path_offset',
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

    paths.offset = paths.example.offset(-10).attr('class', 'interfacing')

    paths.lineOffset = new Path().move(points.A).line(points.B).offset(-5).attr('class', 'various')

    paths.curveOffset = new Path()
      .move(points.B)
      .curve(points.BCp2, points.CCp1, points.C)
      .offset(-5)
      .attr('class', 'canvas')

    return part
  },
}

export const path_ops = {
  name: 'examples.path_ops',
  draft: ({ Point, points, Path, paths, options, part }) => {
    const textClasses = (label) =>
      options.focus === label ? 'center text-xs fill-note' : 'center text-xs'

    points.A = new Point(10, 10)
      .attr('data-text', 'Path.move()')
      .attr('data-text-class', textClasses('move'))
    points.B = new Point(70, 30)
    points.BCp2 = new Point(40, 10)
    points.C = new Point(90, -50)
    points.CCp1 = new Point(125, -30)
    points.D = new Point(20, -50)
    points.DCp = new Point(40, 0)
    points.E = new Point(-20, -20)
    points.ECp = new Point(-20, -50)

    paths.line = new Path()
      .move(points.A)
      .line(points.B)
      .attr('data-text', 'Path.line()')
      .attr('data-text-class', textClasses('line'))

    paths.curve = new Path()
      .move(points.B)
      .curve(points.BCp2, points.CCp1, points.C)
      .attr('data-text', 'Path.curve()')
      .attr('data-text-class', textClasses('curve'))

    paths._curve = new Path()
      .move(points.C)
      ._curve(points.DCp, points.D)
      .attr('data-text', 'Path._curve()')
      .attr('data-text-class', textClasses('_curve'))

    paths.curve_ = new Path()
      .move(points.D)
      .curve_(points.ECp, points.E)
      .attr('data-text', 'Path.curve_()')
      .attr('data-text-class', textClasses('curve_'))

    paths.close = new Path()
      .move(points.E)
      .line(points.A)
      .attr('data-text', 'Path.close()')
      .attr('data-text-class', textClasses('close'))

    paths.example = paths.line.join(paths.curve).join(paths._curve).join(paths.curve_).close()

    return part
  },
}

export const path_reverse = {
  name: 'examples.path_reverse',
  draft: ({ Point, points, Path, paths, part }) => {
    points.B = new Point(10, 30)
    points.BCp2 = new Point(40, 20)
    points.C = new Point(90, 30)
    points.CCp1 = new Point(50, -30)

    paths.example = new Path()
      .move(points.B)
      .curve(points.BCp2, points.CCp1, points.C)
      .attr('data-text', 'freesewingIsMadeByJoostDeCockAndContributors')
      .attr('data-text-class', 'text-xs fill-note')

    paths.reverse = paths.example
      .reverse()
      .attr('data-text', 'freesewingIsMadeByJoostDeCockAndContributors')
      .attr('data-text-class', 'text-xs fill-lining')

    return part
  },
}

export const path_shiftalong = {
  name: 'examples.path_shiftalong',
  draft: ({ Point, points, Path, paths, Snippet, snippets, part }) => {
    points.A = new Point(45, 60)
    points.B = new Point(10, 30)
    points.BCp2 = new Point(40, 20)
    points.C = new Point(90, 30)
    points.CCp1 = new Point(50, -30)

    paths.example = new Path()
      .move(points.A)
      .line(points.B)
      .curve(points.BCp2, points.CCp1, points.C)

    points.x1 = paths.example
      .shiftAlong(20)
      .attr('data-text', '2cm')
      .attr('data-text-class', 'center fill-note')
      .attr('data-text-lineheight', 6)
    points.x2 = paths.example
      .shiftAlong(90)
      .attr('data-text', '9cm')
      .attr('data-text-class', 'center fill-note')
      .attr('data-text-lineheight', 6)

    snippets.x1 = new Snippet('notch', points.x1)
    snippets.x2 = new Snippet('notch', points.x2)

    return part
  },
}

export const path_shiftfractionalong = {
  name: 'examples.path_shiftfractionalong',
  draft: ({ Point, points, Path, paths, Snippet, snippets, part }) => {
    points.A = new Point(45, 60)
    points.B = new Point(10, 30)
    points.BCp2 = new Point(40, 20)
    points.C = new Point(90, 30)
    points.CCp1 = new Point(50, -30)

    paths.example = new Path()
      .move(points.A)
      .line(points.B)
      .curve(points.BCp2, points.CCp1, points.C)

    points.x1 = paths.example
      .shiftFractionAlong(0.2)
      .attr('data-text', '20%')
      .attr('data-text-class', 'center fill-note')
      .attr('data-text-lineheight', 6)
    points.x2 = paths.example
      .shiftFractionAlong(0.9)
      .attr('data-text', '90%')
      .attr('data-text-class', 'center fill-note')
      .attr('data-text-lineheight', 6)

    snippets.xl = new Snippet('notch', points.x1)
    snippets.x2 = new Snippet('notch', points.x2)

    return part
  },
}

export const path_smurve = {
  name: 'examples.path_smurve',
  draft: ({ Point, points, Path, paths, part }) => {
    points.from = new Point(10, 20)
    points.cp1 = new Point(40, 10)
    points.cp2 = new Point(60, 30)
    points.to = new Point(90, 20)
    points.scp2 = new Point(140, 30)
    points.sto = new Point(170, 20)

    paths.line = new Path()
      .move(points.from)
      .curve(points.cp1, points.cp2, points.to)
      .smurve(points.scp2, points.sto)
      .attr('data-text', 'Path.smurve()')
      .attr('data-text-class', 'text-sm center fill-note')

    return box(part, 180, 40)
  },
}

export const path_smurve_ = {
  name: 'examples.path_smurve_',
  draft: ({ Point, points, Path, paths, part }) => {
    points.from = new Point(10, 20)
    points.cp1 = new Point(40, 10)
    points.cp2 = new Point(60, 30)
    points.to = new Point(90, 20)
    points.sto = new Point(170, 20)

    paths.line = new Path()
      .move(points.from)
      .curve(points.cp1, points.cp2, points.to)
      .smurve_(points.sto)
      .attr('data-text', 'Path.smurve_()')
      .attr('data-text-class', 'text-sm center fill-note')

    return box(part, 180, 40)
  },
}

export const path_split = {
  name: 'examples.path_split',
  draft: ({ Point, points, Path, paths, Snippet, snippets, part }) => {
    points.A = new Point(45, 60)
    points.B = new Point(10, 30)
    points.BCp2 = new Point(40, 20)
    points.C = new Point(90, 30)
    points.CCp1 = new Point(50, -30)
    points.D = new Point(50, 130)
    points.DCp1 = new Point(150, 30)

    paths.demo = new Path()
      .move(points.D)
      .curve(points.DCp1, points.DCp1, points.C)
      .curve(points.CCp1, points.BCp2, points.B)
      .line(points.A)

    points.split = paths.demo.shiftFractionAlong(0.75)
    snippets.x = new Snippet('x', points.split)

    let style = 'stroke-width: 3; stroke-opacity: 0.5;'
    let halves = paths.demo.split(points.split)
    for (let i in halves) {
      paths[i] = halves[i].attr('style', style).attr('style', `stroke: hsl(${i * 70}, 100%, 50%)`)
    }

    return part
  },
}

export const path_start = {
  name: 'examples.path_start',
  draft: ({ Point, points, Path, paths, Snippet, snippets, part }) => {
    points.A = new Point(45, 60)
    points.B = new Point(10, 30)
    points.BCp2 = new Point(40, 20)
    points.C = new Point(90, 30)
    points.CCp1 = new Point(50, -30)

    paths.example = new Path()
      .move(points.A)
      .line(points.B)
      .curve(points.BCp2, points.CCp1, points.C)

    snippets.start = new Snippet('notch', paths.example.start())
    return part
  },
}

export const path_translate = {
  name: 'examples.path_translate',
  draft: ({ Point, points, Path, paths, macro, part }) => {
    points.A = new Point(45, 60)
    points.B = new Point(10, 30)
    points.BCp2 = new Point(40, 20)
    points.C = new Point(90, 30)
    points.CCp1 = new Point(50, -30)

    paths.A = new Path().move(points.A).line(points.B).curve(points.BCp2, points.CCp1, points.C)

    paths.B = paths.A.translate(60, 30)

    points.step1 = points.B.shift(0, 60)
    points.step2 = points.step1.shift(-90, 30)
    macro('ld', {
      from: points.B,
      to: points.step1,
      noStartMarker: true,
    })
    macro('ld', {
      from: points.step1,
      to: points.step2,
      noStartMarker: true,
    })

    return part
  },
}

export const path_trim = {
  name: 'examples.path_trim',
  draft: ({ Point, points, Path, paths, part }) => {
    points.center = new Point(0, 0)
    points.base = new Point(0, 10)
    points.tip = new Point(0, 50)
    points.tipCpRight = new Point(30, 50)
    points.tipCpLeft = new Point(-30, 50)
    paths.example = new Path().move(points.base)
    for (let i = 0; i < 4; i++) {
      points['base' + i] = points.base.rotate(60 * i, points.center)
      points['tip' + i] = points.tip.rotate(60 * i, points.center)
      points['tipCpRight' + i] = points.tipCpRight.rotate(60 * i, points.center)
      points['tipCpLeft' + i] = points.tipCpLeft.rotate(60 * i, points.center)
      if (i < 2) {
        paths.example
          .line(points['base' + i])
          .curve(points['base' + i], points['tipCpLeft' + i], points['tip' + i])
          .curve(points['tipCpRight' + i], points['base' + i], points['base' + i])
      } else {
        paths.example
          .line(points['base' + i])
          .line(points['tip' + i])
          .line(points['tipCpRight' + i])
          .line(points['base' + i])
      }
    }

    paths.offset = paths.example.offset(10).attr('class', 'lining dotted stroke-sm')

    paths.trimmed = paths.offset
      .trim()
      .attr('class', 'various stroke-xl')
      .attr('style', 'stroke-opacity: 0.5;')
    return part
  },
}
