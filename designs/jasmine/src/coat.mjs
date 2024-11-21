// First import the method

const nyx_vert_length = 380
const nyx_chest_circum = 584
const nyx_neck_circum = 368
const nyx_shoulder_to_shoulder = 304
const nyx_neck_to_chest = 76

function draftcoat({ options, Point, Path, points, paths, Snippet, snippets, sa, macro, part }) {
  const globalscale = options.backlength

  //15 inches * backlength percentage
  const vertlength = nyx_vert_length * options.backlength

  const back_adjusted_length = vertlength * options.back_length_percentage

  //23 inches /2 (for mirror) * chest_circum percentage *
  const chesthorizontal = (nyx_chest_circum / 2) * options.chest_circum * globalscale

  const neckcircum = nyx_neck_circum * options.neck_circum * globalscale
  const neckradius = neckcircum * (1 / 3.14) * (0.5 / options.neck_circle_percentage)

  const neck_angle_offset = -1 * (0.5 - options.neck_circle_percentage) * 180

  //Neckbandwidth assumes 3 inches to start
  const neckbandwidth = options.neckband_width * neckcircum

  const armholevert = nyx_neck_to_chest * options.neck_to_chest * globalscale
  const armholehoriz =
    (nyx_shoulder_to_shoulder / 2) * options.chest_circum * options.shouldertoshoulder * globalscale

  points.neckCenter = new Point(0, 0)
  points.neckCircleCenter = new Point(0, -neckradius)

  const hip_back = chesthorizontal * options.back_width
  points.backCenter = new Point(0, back_adjusted_length)
  points.backedge = new Point(hip_back, back_adjusted_length)

  points.backedgeCp = points.backedge.shift(0, chesthorizontal / 3)

  // I want closureback to use options.bellyclosurelength but i'm not sure how yet
  points.closurefront = new Point(chesthorizontal, armholevert)
  points.closureback = new Point(
    chesthorizontal,
    armholevert + (vertlength - armholevert) * options.bellyclosurelength
  )

  points.closurebackCp = points.closureback.shift(180, chesthorizontal / 3)

  points.bellyoverlapfront = points.closurefront.shift(
    0,
    chesthorizontal * 2 * options.bellyoverlap
  )
  points.bellyoverlapback = points.closureback.shift(0, chesthorizontal * 2 * options.bellyoverlap)

  points.armholetop = new Point(armholehoriz, armholevert * 0.6)

  points.neckbandtop = points.neckCircleCenter.shift(neck_angle_offset, neckradius)
  points.neckbandbottom = points.neckbandtop.shift(neck_angle_offset, neckbandwidth)

  points.neckclosuretop = points.neckbandtop.shift(
    neck_angle_offset + 90,
    neckcircum * options.neckoverlap
  )
  points.neckclosurebottom = points.neckbandbottom.shift(
    neck_angle_offset + 90,
    neckcircum * options.neckoverlap
  )

  points.neckbandbottomCp2 = points.neckbandbottom.shift(
    neck_angle_offset - 90,
    points.neckbandtop.dy(points.neckCenter)
  )

  points.armholetopCp1 = points.armholetop.shift(
    90,
    points.neckbandtop.dy(points.neckCenter) * options.armholecurve
  )
  points.armholetopCp2 = points.armholetop.shift(
    270,
    points.neckbandtop.dy(points.neckCenter) * options.armholecurve
  )

  points.closurefrontCp = points.closurefront.shift(180, neckbandwidth)

  //Neck curve control points
  points.neckbandtopCp1 = points.neckbandtop.shift(
    neck_angle_offset - 90,
    points.neckbandtop.dy(points.neckCenter) / 2
  )
  points.neckCenterCp2 = points.neckCenter.shift(
    0,
    Math.max(
      neckcircum * 0.25 * options.neck_circle_percentage,
      points.neckCenter.dx(points.neckbandtop) / 2
    )
  )

  paths.seam = new Path()
    .move(points.neckCenter)
    .line(points.backCenter)

    .line(points.backedge)
    //.line(points.closureback)
    .curve(points.backedgeCp, points.closurebackCp, points.closureback)

    .line(points.bellyoverlapback)
    .line(points.bellyoverlapfront)
    .line(points.closurefront)
    .curve(points.closurefrontCp, points.armholetopCp2, points.armholetop)
    //.line(points.armholetop)

    .curve(points.armholetopCp1, points.neckbandbottomCp2, points.neckbandbottom)

    .line(points.neckclosurebottom)
    .line(points.neckclosuretop)

    .line(points.neckbandtop)
    .curve(points.neckbandtopCp1, points.neckCenterCp2, points.neckCenter)

    //.line(points.neckCenter)
    .close()
    .attr('class', 'fabric')

  paths.neckoverlapline = new Path()
    .move(points.neckbandtop)
    .line(points.neckbandbottom)
    .attr('class', 'sa')
  paths.bellyoverlapline = new Path()
    .move(points.closureback)
    .line(points.closurefront)
    .attr('class', 'sa')

  paths.neckmeasure = new Path()
    .move(points.neckCenter)
    .curve(points.neckCenterCp2, points.neckbandtopCp1, points.neckbandtop)

  points.logo = points.closurefront.shiftFractionTowards(points.backCenter, 0.5)
  snippets.logo = new Snippet('logo', points.logo)

  if (sa) {
    paths.sa = paths.seam.offset(sa).addClass('fabric sa')
  }

  macro('hd', {
    id: 'hWidth',
    from: points.neckCenter,
    to: points.closurefront,
    y: points.closureback.y,
  })
  macro('vd', {
    id: 'vHeight',
    from: points.neckclosuretop,
    to: points.backCenter,
    x: points.bellyoverlapfront.x + sa + 15,
  })
  macro('vd', {
    id: 'bellybackvertical',
    from: points.closureback,
    to: points.backCenter,
    x: points.closureback.x + sa + 15,
  })
  macro('vd', {
    id: 'bellyfrontvertical',
    from: points.closurefront,
    to: points.neckclosuretop,
    x: points.closureback.x + sa + 15,
  })
  macro('vd', {
    id: 'bellyclosurevertiacl',
    from: points.closurefront,
    to: points.closureback,
    x: points.closureback.x + sa + 15,
  })
  macro('hd', {
    id: 'neckRadius',
    from: points.neckCenter,
    to: points.neckbandtop,
    y: points.neckbandtop.y,
  })
  macro('ld', {
    id: 'neckbandwidth',
    from: points.neckbandtop,
    to: points.neckbandbottom,
    //y: points.neckclosuretop.y - sa - 15,
  })
  macro('hd', {
    id: 'shoulderwidth',
    from: points.neckCenter,
    to: points.armholetop,
    y: points.armholetop.y,
  })
  macro('hd', {
    id: 'hipwidth',
    from: points.backCenter,
    to: points.backedge,
    y: points.backedge.y - 15,
  })
  macro('vd', {
    id: 'shoulderHeight',
    from: points.armholetop,
    to: points.backCenter,
    x: points.armholetop.x,
  })
  macro('vd', {
    id: 'centerlength',
    from: points.backCenter,
    to: points.neckCenter,
    x: points.backCenter.x - sa - 15,
  })
  /*
  macro('vd', {
    id: 'neckcenterpoint',
    from: points.neckCenter,
    to: points.neckCircleCenter,
    x: points.neckCenter.x,
  })*/
  macro('pd', {
    path: paths.neckmeasure,
    d: 15,
  })

  macro('cutonfold', {
    from: points.neckCenter,
    to: points.backCenter,
    grainline: true,
  })

  return part
}

export const coat = {
  name: 'coat',
  options: {
    size: { pct: 50, min: 10, max: 100 },

    backlength: {
      pct: 100,
      min: 10,
      max: 250,
      menu: 'first',
      toAbs: function (value, settings) {
        return value * nyx_vert_length
      },
    },
    chest_circum: {
      pct: 100,
      min: 50,
      max: 250,
      menu: 'fit',
      toAbs: (pct, settings) =>
        nyx_chest_circum * pct * (settings.options?.backlength ? settings.options.backlength : 1),
    },
    neck_circum: {
      pct: 100,
      min: 50,
      max: 250,
      menu: 'fit',
      toAbs: (pct, settings) =>
        nyx_neck_circum * pct * (settings.options?.backlength ? settings.options.backlength : 1),
    },

    neck_to_chest: {
      pct: 100,
      min: 50,
      max: 200,
      menu: 'fit',
      toAbs: (pct, settings) =>
        nyx_neck_to_chest * pct * (settings.options?.backlength ? settings.options.backlength : 1),
    },
    shouldertoshoulder: {
      pct: 100,
      min: 50,
      max: 200,
      menu: 'fit',
      toAbs: (pct, settings) =>
        nyx_shoulder_to_shoulder *
        pct *
        (settings.options?.backlength ? settings.options.backlength : 1) *
        (settings.options?.chest_circum ? settings.options.chest_circum : 1),
    },

    back_width: {
      pct: 35,
      min: 10,
      max: 100,
      menu: 'advanced',
      toAbs: (pct, settings) =>
        nyx_chest_circum *
        pct *
        (settings.options?.backlength ? settings.options.backlength : 1) *
        (settings.options?.chest_circum ? settings.options.chest_circum : 1),
    },

    neckoverlap: { pct: 5, min: 0, max: 30, menu: 'style' },

    bellyoverlap: { pct: 5, min: 0, max: 30, menu: 'style' },

    back_length_percentage: { pct: 100, min: 40, max: 100, menu: 'style' },

    bellyclosurelength: { pct: 40, min: 10, max: 100, menu: 'style' },
    neckband_width: {
      pct: 24,
      min: 10,
      max: 50,
      menu: 'style',
      toAbs: (pct, settings) =>
        pct * nyx_neck_circum * (settings.options?.neck_circum ? settings.options.neck_circum : 1),
    },

    armholecurve: { pct: 47.5, min: 10, max: 150, menu: 'advanced' },
    neck_circle_percentage: { pct: 50, min: 10, max: 100, menu: 'advanced' },
  },
  draft: draftcoat,
}
