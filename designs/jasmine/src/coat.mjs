// First import the method

const nyx_vert_length = 380
const nyx_chest_circum = 584
const nyx_neck_circum = 368
const nyx_shoulder_to_shoulder = 228
const nyx_neck_to_chest = 127

function draftcoat({ options, Point, Path, points, paths, Snippet, snippets, sa, macro, part }) {
  const globalscale = options.backlength

  //15 inches * backlength percentage
  const vertlength = nyx_vert_length * options.backlength

  //23 inches /2 (for mirror) * chest_circum percentage *
  const chesthorizontal = (nyx_chest_circum / 2) * options.chest_circum * globalscale

  const neckcircum = nyx_neck_circum * options.neck_circum * globalscale
  const neckradius = neckcircum / 3.14
  //Neckbandwidth assumes 3 inches to start
  const neckbandwidth = options.neckband_width * neckcircum

  const armholevert = nyx_neck_to_chest * options.neck_to_chest * globalscale
  const armholehoriz =
    (nyx_shoulder_to_shoulder / 2) * options.chest_circum * options.shouldertoshoulder * globalscale

  points.neckCenter = new Point(0, 0)

  points.backCenter = new Point(0, vertlength)
  points.backedge = new Point(chesthorizontal * 0.8, vertlength)

  // I want closureback to use options.bellyclosurelength but i'm not sure how yet
  points.closurefront = new Point(chesthorizontal, armholevert)
  points.closureback = new Point(
    chesthorizontal,
    armholevert + (vertlength - armholevert) * options.bellyclosurelength
  )

  points.armholetop = new Point(armholehoriz, armholevert * 0.6)

  points.neckbandtop = new Point(neckradius, -neckradius)
  points.neckbandbottom = new Point(neckradius + neckbandwidth, -neckradius)

  points.neckclosuretop = points.neckbandtop.shift(90, neckcircum * options.neckoverlap)
  points.neckclosurebottom = points.neckbandbottom.shift(90, neckcircum * options.neckoverlap)

  points.neckbandbottomCp2 = points.neckbandbottom.shift(
    270,
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
    270,
    points.neckbandtop.dy(points.neckCenter) / 2
  )
  points.neckCenterCp2 = points.neckCenter.shift(0, points.neckCenter.dx(points.neckbandtop) / 2)

  paths.seam = new Path()
    .move(points.neckCenter)
    .line(points.backCenter)
    .line(points.backedge)
    .line(points.closureback)
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

  points.logo = points.armholetop.shiftFractionTowards(points.backedge, 0.5)
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
    x: points.closurefront.x + sa + 15,
  })
  macro('hd', {
    id: 'neckRadius',
    from: points.neckCenter,
    to: points.neckbandtop,
    y: points.neckbandtop.y,
  })
  macro('hd', {
    id: 'neckbandwidth',
    from: points.neckbandtop,
    to: points.neckbandbottom,
    y: points.neckclosuretop.y - sa - 15,
  })
  macro('hd', {
    id: 'shoulderwidth',
    from: points.neckCenter,
    to: points.armholetop,
    y: points.armholetop.y,
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
      min: 10,
      max: 250,
      menu: 'fit',
      toAbs: (pct, settings) =>
        nyx_chest_circum * pct * (settings.options?.backlength ? settings.options.backlength : 1),
    },
    neck_circum: {
      pct: 100,
      min: 10,
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

    neckoverlap: { pct: 5, min: 0, max: 30, menu: 'style' },

    bellyoverlap: { pct: 5, min: 0, max: 30, menu: 'style' },

    bellyclosurelength: { pct: 40, min: 10, max: 100, menu: 'style' },
    neckband_width: { pct: 24, min: 10, max: 50, menu: 'style' },

    armholecurve: { pct: 100, min: 10, max: 150, menu: 'advanced' },
    neck_percentage: { pct: 50, min: 10, max: 100, menu: 'advanced' },
  },
  draft: draftcoat,
}
