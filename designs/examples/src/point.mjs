import { box } from './shared.mjs'

export const point_angle = {
  name: 'examples.point_angle',
  draft: ({ Point, points, Path, paths, part }) => {
    points.sun = new Point(10, 5)
    points.moon = points.sun.shift(-15, 70)
    points.text = points.sun
      .shiftFractionTowards(points.moon, 0.8)
      .attr('data-text', points.sun.angle(points.moon) + '°')
      .attr('data-text-class', 'text-sm fill-note center')

    paths.line = new Path().move(points.sun).line(points.moon).attr('class', 'dashed')

    return part
  },
}

export const point_attr = {
  name: 'examples.point_attr',
  draft: ({ Point, points, part }) => {
    points.anchor = new Point(100, 25)
      .attr('data-text', 'supportFreesewingBecomeAPatron')
      .attr('data-text-class', 'center')

    return box(part, 200, 50)
  },
}

export const point_clone = {
  name: 'examples.point_clone',
  draft: ({ Point, points, Snippet, snippets, part }) => {
    points.A = new Point(25, 25)
      .attr('data-text', 'Point A')
      .attr('data-text-class', 'text-xl')
      .attr('data-text-fill-opacity', '0.5')
    points.B = points.A.clone().attr('data-text', 'Point B')

    snippets.x = new Snippet('notch', points.A)

    return box(part)
  },
}

export const point_copy = {
  name: 'examples.point_copy',
  draft: ({ Point, points, Snippet, snippets, part }) => {
    points.A = new Point(50, 25).attr('data-text', 'Point A').attr('data-text-class', 'text-xl')
    points.B = points.A.copy().attr('data-text', 'Point B')

    snippets.x = new Snippet('notch', points.A)

    return box(part)
  },
}

export const point_dist = {
  name: 'examples.point_dist',
  draft: ({ Point, points, Path, paths, part }) => {
    points.from = new Point(10, 10)
    points.to = new Point(80, 70)

    points.text = points.from
      .shiftFractionTowards(points.to, 0.6)
      .attr('data-text', points.from.dist(points.to) + 'mm')
      .attr('data-text-class', 'text-sm fill-note center')

    paths.line = new Path().move(points.from).line(points.to).attr('class', 'dashed')

    return part
  },
}

export const point_dx = {
  name: 'examples.point_dx',
  draft: ({ Point, points, Path, paths, part }) => {
    points.from = new Point(10, 10)
    points.to = new Point(80, 70)

    paths.line = new Path().move(points.from).line(points.to).attr('class', 'dashed')

    points.totop = points.from.shift(0, points.from.dx(points.to))

    points.text_dx = points.from
      .shiftFractionTowards(points.totop, 0.6)
      .shiftFractionTowards(points.to, 0.1)
      .attr('data-text', points.from.dx(points.to) + 'mm')
      .attr('data-text-class', 'text-sm fill-note center')

    paths.line_dx = new Path().move(points.from).line(points.totop).attr('class', 'dashed')

    paths.line_dy = new Path().move(points.to).line(points.totop).attr('class', 'dashed')

    return part
  },
}

export const point_dy = {
  name: 'examples.point_dy',
  draft: ({ Point, points, Path, paths, part }) => {
    points.from = new Point(10, 10)
    points.to = new Point(80, 70)

    paths.line = new Path().move(points.from).line(points.to).attr('class', 'dashed')

    points.totop = points.from.shift(0, points.from.dx(points.to))

    paths.line_dx = new Path().move(points.from).line(points.totop).attr('class', 'dashed')

    points.text_dy = points.totop
      .shiftFractionTowards(points.to, 0.4)
      .attr('data-text', points.from.dy(points.to) + 'mm')
      .attr('data-text-class', 'text-sm fill-note right')

    paths.line_dy = new Path().move(points.to).line(points.totop).attr('class', 'dashed')

    return part
  },
}

export const point_flipx = {
  name: 'examples.point_flipy',
  draft: ({ Point, points, Path, paths, part }) => {
    points.top = new Point(50, 10)
    points.out1 = new Point(70, 30)
    points.in1 = new Point(55, 35)
    points.out2 = new Point(75, 50)
    points.in2 = new Point(60, 55)
    points.out3 = new Point(80, 70)
    points.in3 = new Point(55, 70)
    points.trunkOut = new Point(55, 80)
    points.trunkIn = new Point(50, 80)

    points._out1 = points.out1.flipX(points.top)
    points._in1 = points.in1.flipX(points.top)
    points._out2 = points.out2.flipX(points.top)
    points._in2 = points.in2.flipX(points.top)
    points._out3 = points.out3.flipX(points.top)
    points._in3 = points.in3.flipX(points.top)
    points._trunkOut = points.trunkOut.flipX(points.top)

    points.bottom = new Point(50, 80)

    paths.tree = new Path()
      .move(points.top)
      .line(points.out1)
      .line(points.in1)
      .line(points.out2)
      .line(points.in2)
      .line(points.out3)
      .line(points.in3)
      .line(points.trunkOut)
      .line(points._trunkOut)
      .line(points._in3)
      .line(points._out3)
      .line(points._in2)
      .line(points._out2)
      .line(points._in1)
      .line(points._out1)
      .close()

    paths.mirror = new Path().move(points.top).line(points.bottom).attr('class', 'note dashed')

    return part
  },
}

export const point_flipy = {
  name: 'examples.point_flipy',
  draft: ({ Point, points, Path, paths, part }) => {
    points.start = new Point(0, 50)
    points.churchTowerWallLeft = new Point(10, 50)
    points.churchTowerRoofLeft = new Point(10, 30)
    points.churchTowerTop = new Point(15, 10)
    points.churchTowerRoofRight = new Point(20, 30)
    points.churchRoofRight = new Point(50, 30)
    points.churchWallRight = new Point(50, 50)
    points.houseWallLeft = new Point(65, 50)
    points.houseRoofLeft = new Point(65, 35)
    points.houseRoofTop = new Point(75, 25)
    points.houseRoofRight = new Point(85, 35)
    points.houseWallRight = new Point(85, 50)
    points.end = new Point(95, 50)

    points.mirror = new Point(0, 60)
    points.mirrorLineEnd = new Point(95, 60)

    points._start = points.start.flipY(points.mirror)
    points._churchTowerWallLeft = points.churchTowerWallLeft.flipY(points.mirror)
    points._churchTowerRoofLeft = points.churchTowerRoofLeft.flipY(points.mirror)
    points._churchTowerTop = points.churchTowerTop.flipY(points.mirror)
    points._churchTowerRoofRight = points.churchTowerRoofRight.flipY(points.mirror)
    points._churchRoofRight = points.churchRoofRight.flipY(points.mirror)
    points._churchWallRight = points.churchWallRight.flipY(points.mirror)
    points._houseWallLeft = points.houseWallLeft.flipY(points.mirror)
    points._houseRoofLeft = points.houseRoofLeft.flipY(points.mirror)
    points._houseRoofTop = points.houseRoofTop.flipY(points.mirror)
    points._houseRoofRight = points.houseRoofRight.flipY(points.mirror)
    points._houseWallRight = points.houseWallRight.flipY(points.mirror)
    points._end = points.end.flipY(points.mirror)

    paths.skylineTop = new Path()
      .move(points.start)
      .line(points.churchTowerWallLeft)
      .line(points.churchTowerRoofLeft)
      .line(points.churchTowerTop)
      .line(points.churchTowerRoofRight)
      .line(points.churchRoofRight)
      .line(points.churchWallRight)
      .line(points.houseWallLeft)
      .line(points.houseRoofLeft)
      .line(points.houseRoofTop)
      .line(points.houseRoofRight)
      .line(points.houseWallRight)
      .line(points.end)

    paths.skylineBottom = new Path()
      .move(points._start)
      .line(points._churchTowerWallLeft)
      .line(points._churchTowerRoofLeft)
      .line(points._churchTowerTop)
      .line(points._churchTowerRoofRight)
      .line(points._churchRoofRight)
      .line(points._churchWallRight)
      .line(points._houseWallLeft)
      .line(points._houseRoofLeft)
      .line(points._houseRoofTop)
      .line(points._houseRoofRight)
      .line(points._houseWallRight)
      .line(points._end)

    paths.mirrorLine = new Path()
      .move(points.mirror)
      .line(points.mirrorLineEnd)
      .attr('class', 'note dashed')

    return part
  },
}

export const point_rotate = {
  name: 'examples.point_rotate',
  draft: ({ Point, points, Path, paths, part }) => {
    points.sun = new Point(40, 40)
    points.moon = new Point(70, 40)
    let step = 360 / 36
    for (let i = 1; i < 37; i++) {
      let angle = step * i
      points[`moon${i}`] = points.moon.rotate(angle, points.sun)
      paths[`moon${i}`] = new Path().move(points.sun).line(points[`moon${i}`])
    }

    return part
  },
}

export const point_shift = {
  name: 'examples.point_shift',
  draft: ({ Point, points, macro, part }) => {
    points.A = new Point(90, 40).attr('data-text', 'Point A').attr('data-text-class', 'right')
    points.B = points.A.shift(155, 70)
      .attr('data-text', 'Point B is point A shifted 7cm\nat a 155 degree angle')
      .attr('data-text-lineheight', 6)

    macro('ld', {
      from: points.B,
      to: points.A,
      d: -10,
    })

    return box(part, 100, 45)
  },
}

export const point_shiftfractiontowards = {
  name: 'examples.point_shiftfractiontowards',
  draft: ({ Point, points, Path, paths, macro, part }) => {
    points.A = new Point(90, 70).attr('data-text', 'Point A')
    points.B = new Point(10, 10).attr('data-text', 'Point B')
    points.C = points.A.shiftFractionTowards(points.B, 0.5)
      .attr('data-text', 'Point C is point A shifted 50%\nin the direction of point B')
      .attr('data-text-class', 'center')
      .attr('data-text-lineheight', 6)

    paths.direction = new Path().move(points.A).line(points.B).attr('class', 'note dashed')

    macro('ld', {
      from: points.C,
      to: points.A,
      d: -10,
    })

    macro('ld', {
      from: points.B,
      to: points.A,
      d: 20,
    })

    return part
  },
}

export const point_shiftoutwards = {
  name: 'examples.point_shiftoutwards',
  draft: ({ Point, points, Path, paths, macro, part }) => {
    points.A = new Point(90, 70).attr('data-text', 'Point A')
    points.B = new Point(30, 30).attr('data-text', 'Point B')
    points.C = points.A.shiftOutwards(points.B, 30)
      .attr('data-text', 'Point C is point A shifted 3cm\nbeyond point B')
      .attr('data-text-lineheight', 6)

    paths.direction = new Path().move(points.A).line(points.C).attr('class', 'note dashed')

    macro('ld', {
      from: points.C,
      to: points.B,
      d: -10,
    })

    return box(part, 110, 75)
  },
}

export const point_shifttowards = {
  name: 'examples.point_shifttowards',
  draft: ({ Point, points, Path, paths, macro, part }) => {
    points.A = new Point(90, 70).attr('data-text', 'Point A')
    points.B = new Point(10, 10).attr('data-text', 'Point B')
    points.C = points.A.shiftTowards(points.B, 35)
      .attr('data-text', 'Point C is point A shifted 3.5cm\nin the direction of point B')
      .attr('data-text-class', 'center')
      .attr('data-text-lineheight', 6)

    paths.direction = new Path().move(points.A).line(points.B).attr('class', 'note dashed')

    macro('ld', {
      from: points.C,
      to: points.A,
      d: -10,
    })

    return box(part, 110, 80)
  },
}

export const point_sitson = {
  name: 'examples.point_sitson',
  draft: ({ Point, points, Snippet, snippets, part }) => {
    let s
    for (let i = 0; i < 10; i++) {
      points[`a${i}`] = new Point(i * 10, 40)
      points[`b${i}`] = new Point(i * 10, i * 8)
      if (points[`a${i}`].sitsOn(points[`b${i}`])) s = 'notch'
      else s = 'bnotch'
      snippets[`b${i}`] = new Snippet(s, points[`b${i}`])
      snippets[`a${i}`] = new Snippet(s, points[`a${i}`])
    }

    return box(part)
  },
}

export const point_sitsroughlyon = {
  name: 'examples.point_sitsroughlyon',
  draft: ({ Point, points, Snippet, snippets, part }) => {
    box(part)

    let s
    for (let i = 0; i < 10; i++) {
      points[`a${i}`] = new Point(i * 10, 40)
      points[`b${i}`] = new Point(i * 10, i * 8)
      if (points[`a${i}`].sitsRoughlyOn(points[`b${i}`])) s = 'notch'
      else s = 'bnotch'
      snippets[`b${i}`] = new Snippet(s, points[`b${i}`])
      snippets[`a${i}`] = new Snippet(s, points[`a${i}`])
    }

    return part
  },
}

export const point_translate = {
  name: 'examples.point_translate',
  draft: ({ Point, points, macro, part }) => {
    points.A = new Point(20, 20).attr('data-text', 'Point A')
    points.B = points.A.translate(120, 60)
      .attr('data-text', 'Point B is point A with a\ntranslate(120, 60)\ntransform applied')
      .attr('data-text-class', 'right')
      .attr('data-text-dy', -6)
      .attr('data-text-lineheight', 6)

    macro('ld', {
      from: points.A,
      to: points.B,
      text: 'translate(120,60)',
      noStartMarker: true,
    })

    return box(part, 150, 85)
  },
}
