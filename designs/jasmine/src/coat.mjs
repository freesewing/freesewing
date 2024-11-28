const nyx_vert_length = 380
const nyx_chest_circum = 584
const nyx_neck_circum = 368
const nyx_shoulder_to_shoulder = 304
const nyx_neck_to_chest = 76

function draftcoat({
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  sa,
  macro,
  part,
  store,
  units,
  utils,
}) {
  const globalscale = options.chest_circum

  //15 inches * backlength percentage
  const vertlength = nyx_vert_length * options.backlength * globalscale

  const back_adjusted_length = vertlength * options.back_length_percentage

  //If other fit settings are adjusted before the chest circumference, put up a warning
  if (options.chest_circum == 1) {
    if (
      options.backlength *
        options.neck_circum *
        options.neck_to_chest *
        options.shouldertoshoulder !=
      1
    ) {
      store.flag.note({
        msg: 'jasmine:measurementsWarning',
      })
    }
  }

  //23 inches /2 (for mirror) * chest_circum percentage
  const chesthorizontal = (nyx_chest_circum / 2) * options.chest_circum

  const neckcircum = nyx_neck_circum * options.neck_circum * globalscale
  const neckradius = neckcircum * (1 / 3.14) * (0.5 / options.neck_circle_percentage)

  const neck_angle_offset = -1 * (0.5 - options.neck_circle_percentage) * 180

  const neckbandwidth = options.neckband_width * neckcircum

  const armholevert = nyx_neck_to_chest * options.neck_to_chest * options.backlength * globalscale
  const armholehoriz = (nyx_shoulder_to_shoulder / 2) * options.shouldertoshoulder * globalscale

  points.neckCenter = new Point(0, 0)
  points.neckCircleCenter = new Point(0, -neckradius)

  const hip_back = chesthorizontal * options.back_width
  points.backCenter = new Point(0, back_adjusted_length)
  points.backedge = new Point(hip_back, back_adjusted_length)

  points.backedgeCp = points.backedge.shift(0, chesthorizontal / 3)

  const bellyclosurelength = (vertlength - armholevert) * options.bellyclosurelength

  points.closurefront = new Point(chesthorizontal, armholevert)
  points.closureback = new Point(chesthorizontal, armholevert + bellyclosurelength)

  points.closurebackCp = points.closureback.shift(180, chesthorizontal / 3)

  const belly_overlap_width = chesthorizontal * 2 * options.bellyoverlap
  points.bellyoverlapfront = points.closurefront.shift(0, belly_overlap_width)
  points.bellyoverlapback = points.closureback.shift(0, belly_overlap_width)

  points.bellyclosurefront_inner = points.closurefront.shift(0, -belly_overlap_width)
  points.bellyclosureback_inner = points.closureback.shift(0, -belly_overlap_width)

  //Create control points for belly round edges
  const belly_round_ids = {
    bellyoverlapfront: macro('round', {
      id: 'bellyoverlapfront',
      from: points.bellyoverlapback,
      to: points.bellyclosurefront_inner,
      via: points.bellyoverlapfront,
      radius: Math.min(belly_overlap_width * options.belly_round_edges, bellyclosurelength / 2),
    }),
    bellyoverlapback: macro('round', {
      id: 'bellyoverlapback',
      from: points.bellyclosureback_inner,
      to: points.bellyoverlapfront,
      via: points.bellyoverlapback,
      radius: Math.min(belly_overlap_width * options.belly_round_edges, bellyclosurelength / 2),
    }),
  }
  //Create points from them with easy names
  for (const side in belly_round_ids) {
    for (const id of ['start', 'cp1', 'cp2', 'end']) {
      points[`${side}${utils.capitalize(id)}`] = points[belly_round_ids[side].points[id]].copy()
    }
  }

  points.armholetop = new Point(armholehoriz, armholevert * 0.6)

  //Overlap points at end of neckband
  points.neckbandtop = points.neckCircleCenter.shift(neck_angle_offset, neckradius)
  points.neckbandbottom = points.neckbandtop.shift(neck_angle_offset, neckbandwidth)

  //Actual ends of neckband

  points.neckclosuretop = points.neckbandtop.shift(
    neck_angle_offset + 90,
    neckcircum * options.neckoverlap
  )
  points.neckclosurebottom = points.neckbandbottom.shift(
    neck_angle_offset + 90,
    neckcircum * options.neckoverlap
  )

  points.neckbandtop_overlap_inner = points.neckbandtop.shift(
    neck_angle_offset + 90,
    neckcircum * options.neckoverlap * -1
  )
  points.neckbandbottom_overlap_inner = points.neckbandbottom.shift(
    neck_angle_offset + 90,
    neckcircum * options.neckoverlap * -1
  )

  points.neckbandbottomCp2 = points.neckbandbottom.shift(
    neck_angle_offset - 90,
    points.neckbandtop.dy(points.neckCenter)
  )

  //Create control points for neck round edges
  const neck_round_ids = {
    neckclosuretop: macro('round', {
      id: 'necktopcorner',
      from: points.neckclosurebottom,
      to: points.neckbandtop_overlap_inner,
      via: points.neckclosuretop,
      radius: Math.min(
        neckcircum * options.neckoverlap * options.neck_round_edges,
        neckbandwidth / 2
      ),
    }),
    neckclosurebottom: macro('round', {
      id: 'neckbottomcorner',
      from: points.neckbandbottom_overlap_inner,
      to: points.neckclosuretop,
      via: points.neckclosurebottom,
      radius: Math.min(
        neckcircum * options.neckoverlap * options.neck_round_edges,
        neckbandwidth / 2
      ),
    }),
  }
  //Create points from them with easy names
  for (const side in neck_round_ids) {
    for (const id of ['start', 'cp1', 'cp2', 'end']) {
      points[`${side}${utils.capitalize(id)}`] = points[neck_round_ids[side].points[id]].copy()
    }
  }

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

  paths.outer_edge = new Path()
    .move(points.backCenter)

    .line(points.backedge)
    .curve(points.backedgeCp, points.closurebackCp, points.closureback)

    //Round edges of belly closure
    .line(points.bellyoverlapbackStart)
    .curve(points.bellyoverlapbackCp1, points.bellyoverlapbackCp2, points.bellyoverlapbackEnd)

    .line(points.bellyoverlapfrontStart)
    .curve(points.bellyoverlapfrontCp1, points.bellyoverlapfrontCp2, points.bellyoverlapfrontEnd)

    //Curve from the belly closure up to the armhole
    .curve(points.closurefrontCp, points.armholetopCp2, points.armholetop)

    //Curve from the armhole up to the neck
    .curve(points.armholetopCp1, points.neckbandbottomCp2, points.neckbandbottom_overlap_inner)

    //Round edges for the corners of the neck
    .line(points.neckclosurebottomStart)
    .curve(points.neckclosurebottomCp1, points.neckclosurebottomCp2, points.neckclosurebottomEnd)

    .line(points.neckclosuretopStart)
    .curve(points.neckclosuretopCp1, points.neckclosuretopCp2, points.neckclosuretopEnd)

    //Curve back to the center of the neck
    .line(points.neckbandtop_overlap_inner)
    .curve(points.neckbandtopCp1, points.neckCenterCp2, points.neckCenter)

    .hide()

  paths.seam = paths.outer_edge.unhide().close().attr('class', 'fabric')

  //Let the user know about the bias tape requirements
  store.flag.info({
    msg: 'jasmine:biasTapeLength',
    replace: {
      l: units(2 * paths.outer_edge.length()),
    },
  })

  //Overlap line markings
  paths.neckoverlapline = new Path()
    .move(points.neckbandtop)
    .line(points.neckbandbottom)
    .attr('class', 'sa')
  paths.bellyoverlapline = new Path()
    .move(points.closureback)
    .line(points.closurefront)
    .attr('class', 'sa')

  if (options.closure_style == 'velcro') {
    const neck_velcro_y = neckcircum * options.neckoverlap
    const neck_velcro_x = neckbandwidth

    const velcro_neck_corner_offset = Math.min(
      (options.neck_velcro_shrink * (neck_velcro_x + neck_velcro_y)) / 2,
      neck_velcro_y * 0.7
    )

    const velcro_width_neck = neck_velcro_y - velcro_neck_corner_offset

    //Neck velcro rectangle first
    points.neck_velcro_top_center = points.neckbandtop.shiftTowards(
      points.neckbandbottom,
      velcro_neck_corner_offset
    )
    points.neck_velcro_bottom_center = points.neckbandbottom.shiftTowards(
      points.neckbandtop,
      velcro_neck_corner_offset
    )

    points.neck_velcro_top_inner = points.neck_velcro_top_center.shift(
      neck_angle_offset + 90,
      velcro_width_neck
    )
    points.neck_velcro_top_outer = points.neck_velcro_top_center.shift(
      neck_angle_offset + 90,
      -1 * velcro_width_neck
    )

    points.neck_velcro_bottom_inner = points.neck_velcro_bottom_center.shift(
      neck_angle_offset + 90,
      velcro_width_neck
    )
    points.neck_velcro_bottom_outer = points.neck_velcro_bottom_center.shift(
      neck_angle_offset + 90,
      -1 * velcro_width_neck
    )

    paths.neck_velcro_rectangle = new Path()
      .move(points.neck_velcro_top_inner)
      .line(points.neck_velcro_top_outer)
      .line(points.neck_velcro_bottom_outer)
      .line(points.neck_velcro_bottom_inner)
      .line(points.neck_velcro_top_inner)
      .attr('class', 'sa')

    const belly_velcro_x = belly_overlap_width
    const belly_velcro_y = (vertlength - armholevert) * options.bellyclosurelength

    const velcro_belly_corner_offset = Math.min(
      (options.belly_velcro_shrink * (belly_velcro_x + belly_velcro_y)) / 2,
      belly_velcro_x * 0.7,
      belly_velcro_y * 0.7
    )

    const velcro_width_belly = belly_overlap_width - velcro_belly_corner_offset

    //Belly velcro rectangle
    points.belly_velcro_top_center = points.closurefront.shiftTowards(
      points.closureback,
      velcro_belly_corner_offset
    )
    points.belly_velcro_bottom_center = points.closureback.shiftTowards(
      points.closurefront,
      velcro_belly_corner_offset
    )

    points.belly_velcro_top_inner = points.belly_velcro_top_center.shift(0, velcro_width_belly)
    points.belly_velcro_top_outer = points.belly_velcro_top_center.shift(180, velcro_width_belly)

    points.belly_velcro_bottom_inner = points.belly_velcro_bottom_center.shift(
      0,
      velcro_width_belly
    )
    points.belly_velcro_bottom_outer = points.belly_velcro_bottom_center.shift(
      180,
      velcro_width_belly
    )

    paths.belly_velcro_rectangle = new Path()
      .move(points.belly_velcro_top_inner)
      .line(points.belly_velcro_top_outer)
      .line(points.belly_velcro_bottom_outer)
      .line(points.belly_velcro_bottom_inner)
      .line(points.belly_velcro_top_inner)
      .attr('class', 'sa')

    macro('hd', {
      id: 'belly_velcro_width',
      from: points.belly_velcro_top_outer,
      to: points.belly_velcro_top_inner,
      y: points.closureback.shiftFractionTowards(points.closurefront, 0.2).y,
    })
    macro('pd', {
      id: 'neck_velcro_width',
      path: new Path().move(points.neck_velcro_bottom_inner).line(points.neck_velcro_bottom_outer),
      d: neckbandwidth / 4,
    })
  }

  if (options.closure_style == 'buttons' || options.closure_style == 'snaps') {
    let j = options.neck_button_count
    j++

    let k = options.belly_button_count
    k++
    let neckButtonPoints = []
    let bellyButtonPoints = []

    //Identify points to place closures
    for (let i = 1; i < j; i++) {
      neckButtonPoints.push(points.neckbandtop.shiftFractionTowards(points.neckbandbottom, i / j))
    }
    for (let i = 1; i < k; i++) {
      bellyButtonPoints.push(points.closurefront.shiftFractionTowards(points.closureback, i / k))
    }

    //Generate snippets for closures
    let typestring
    if (options.closure_style == 'buttons') typestring = 'button'
    else typestring = 'snap-socket'

    for (let b in neckButtonPoints) {
      snippets[b + 'neck'] = new Snippet(typestring, neckButtonPoints[b]).attr(
        'data-scale',
        options.button_scale
      )
      if (options.closure_style == 'buttons') {
        snippets[b + 'neck_hole'] = new Snippet('buttonhole-end', neckButtonPoints[b])
          .attr('data-rotate', -neck_angle_offset)
          .attr('data-scale', options.button_scale)
      }
    }
    for (let b in bellyButtonPoints) {
      snippets[b + 'stomach'] = new Snippet(typestring, bellyButtonPoints[b]).attr(
        'data-scale',
        options.button_scale
      )

      if (options.closure_style == 'buttons') {
        snippets[b + 'stomach_hole'] = new Snippet('buttonhole-end', bellyButtonPoints[b])
          .attr('data-rotate', 90)
          .attr('data-scale', options.button_scale)
      }
    }
  }

  paths.neckmeasure = new Path()
    .move(points.neckCenter)
    .curve(points.neckCenterCp2, points.neckbandtopCp1, points.neckbandtop_overlap_inner)
    .line(points.neckbandtop)
    .hide()

  points.logo = points.neckCenter.shiftFractionTowards(points.closureback, 0.5)
  snippets.logo = new Snippet('logo', points.logo)

  if (sa) {
    paths.sa = paths.seam.offset(sa).addClass('fabric sa')
  }

  /*
  macro('round', {
    id: 'necktopcorner',
    from: points.neckbandtop,
    to: points.neckclosurebottom,
    via: points.neckclosuretop,
    radius: neckbandwidth/3,
    hide: false,
  })
  macro('round', {
    id: 'neckbottomcorner',
    from: points.neckclosuretop,
    to: points.neckbandbottom,
    via: points.neckclosurebottom,
    radius: neckbandwidth/3,
    hide: false,
  })
    */

  macro('hd', {
    id: 'hWidth',
    from: points.neckCenter,
    to: points.bellyoverlapfront,
    y: points.closureback.shiftFractionTowards(points.closurefront, 0.5).y,
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
    id: 'bellyclosurevertical',
    from: points.closurefront,
    to: points.closureback,
    x: points.closureback.x + sa + 15,
  })
  macro('vd', {
    id: 'necktochest',
    from: points.neckCenter,
    to: points.closurefront,
    x: points.armholetop.shiftFractionTowards(points.closurefront, 0.8).x,
  })
  macro('hd', {
    id: 'neckRadius',
    from: points.neckCenter,
    to: points.neckbandtop,
    y: points.neckbandtop.y,
  })
  macro('vd', {
    id: 'neckRadius_v',
    from: points.neckCenter,
    to: points.neckCircleCenter,
    y: points.neckCircleCenter.y,
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

  if (options.pocket_type == 'kangaroo') {
    const pocket_width = chesthorizontal * options.pocket_width
    const pocket_depth = vertlength * options.pocket_depth

    const pocket_vert_offset = Math.min(
      vertlength * options.pocket_vert_offset,
      back_adjusted_length - pocket_depth
    )

    points.pocket_bottom_center = new Point(0, 0)
    points.pocket_bottom_outer_edge = new Point(0.8 * pocket_width, 0)
    points.pocket_outer_point = new Point(pocket_width, pocket_depth * 0.7)
    points.pocket_top_outer_edge = new Point(0.9 * pocket_width, pocket_depth)
    points.pocket_top_center = new Point(0, pocket_depth)

    paths.pocket = new Path()
      .move(points.pocket_bottom_center)
      .line(points.pocket_top_center)
      .line(points.pocket_top_outer_edge)
      .line(points.pocket_outer_point)
      .line(points.pocket_bottom_outer_edge)
      .line(points.pocket_bottom_center)

      .close()
      .translate(0, pocket_vert_offset)
      .attr('class', 'sa')
  }

  if (options.pocket_type == 'cargo') {
    const pocket_width = chesthorizontal * options.pocket_width * 0.35
    const pocket_depth = vertlength * options.pocket_depth

    const pocket_vert_offset = Math.min(
      vertlength * options.pocket_vert_offset,
      back_adjusted_length - pocket_depth
    )

    const pocket_horiz_offset = chesthorizontal * options.pocket_horiz_offset

    points.inner_top_center = new Point(pocket_horiz_offset, pocket_vert_offset)
    points.inner_bottom_center = points.inner_top_center.shift(270, pocket_depth)

    points.inner_top_edge_right = points.inner_top_center.shift(0, 2 * pocket_width)
    points.inner_bottom_edge_right = points.inner_bottom_center.shift(0, 2 * pocket_width)

    paths.pocketline = new Path()
      .move(points.inner_top_center)
      .line(points.inner_top_edge_right)
      .line(points.inner_bottom_edge_right)
      .line(points.inner_bottom_center)
      .close()
      .attr('class', 'fabric sa')

    paths.pocket_top_edge = new Path().move(points.inner_top_center)
    if (options.cargo_pocket_orientation == 'vertical') {
      paths.pocket_top_edge.line(points.inner_top_edge_right)
    } else {
      paths.pocket_top_edge.line(points.inner_bottom_center)
    }

    paths.pocket_top_edge.hide()

    points.pocket_top_center = paths.pocket_top_edge.shiftFractionAlong(0.5, 15)

    snippets.pockettopnotch = new Snippet('notch', points.pocket_top_center)
  }

  return part
}

export const coat = {
  name: 'coat',
  options: {
    chest_circum: {
      pct: 100,
      min: 10,
      max: 250,
      menu: 'first',
      toAbs: (pct, settings) => nyx_chest_circum * pct,
    },

    backlength: {
      pct: 100,
      min: 60,
      max: 170,
      menu: 'fit',
      toAbs: function (value, settings) {
        return (
          value *
          nyx_vert_length *
          (settings.options?.chest_circum ? settings.options.chest_circum : 1)
        )
      },
    },
    neck_circum: {
      pct: 100,
      min: 60,
      max: 170,
      menu: 'fit',
      toAbs: (pct, settings) =>
        nyx_neck_circum *
        pct *
        (settings.options?.chest_circum ? settings.options.chest_circum : 1),
    },

    neck_to_chest: {
      pct: 100,
      min: 50,
      max: 200,
      menu: 'fit.bonus',
      toAbs: (pct, settings) =>
        nyx_neck_to_chest *
        pct *
        (settings.options?.chest_circum ? settings.options.chest_circum : 1) *
        (settings.options?.backlength ? settings.options.backlength : 1),
    },
    shouldertoshoulder: {
      pct: 100,
      min: 50,
      max: 200,
      menu: 'fit.bonus',
      toAbs: (pct, settings) =>
        nyx_shoulder_to_shoulder *
        pct *
        (settings.options?.chest_circum ? settings.options.chest_circum : 1),
    },

    back_width: {
      pct: 35,
      min: 10,
      max: 100,
      menu: 'style',
      toAbs: (pct, settings) =>
        nyx_chest_circum *
        pct *
        (settings.options?.backlength ? settings.options.backlength : 1) *
        (settings.options?.chest_circum ? settings.options.chest_circum : 1),
    },

    neckoverlap: { pct: 5, min: 0, max: 15, menu: 'style.closures' },

    bellyoverlap: { pct: 5, min: 0, max: 30, menu: 'style.closures' },

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
    neck_circle_percentage: { pct: 50, min: 20, max: 90, menu: 'advanced' },

    neck_round_edges: { pct: 60, min: 0, max: 200, menu: 'style.closures' },
    belly_round_edges: { pct: 65, min: 0, max: 200, menu: 'style.closures' },

    closure_style: {
      dflt: 'velcro',
      list: ['none', 'buttons', 'snaps', 'velcro'],
      menu: 'style.closures',
    },

    neck_button_count: { count: 2, min: 1, max: 3, menu: 'style.closures.buttons' },
    belly_button_count: { count: 4, min: 1, max: 8, menu: 'style.closures.buttons' },
    button_scale: { pct: 100, min: 20, max: 400, menu: 'style.closures.buttons' },

    belly_velcro_shrink: { pct: 10, min: 0, max: 50, menu: 'style.closures.velcro' },
    neck_velcro_shrink: { pct: 10, min: 0, max: 50, menu: 'style.closures.velcro' },

    pocket_type: {
      dflt: 'none',
      list: ['none', 'kangaroo', 'cargo'],
      menu: 'style.pocket',
    },

    pocket_vert_offset: { pct: 50, min: 0, max: 100, menu: 'style.pocket' },
    pocket_width: { pct: 40, min: 10, max: 100, menu: 'style.pocket' },
    pocket_depth: { pct: 25, min: 10, max: 50, menu: 'style.pocket' },

    pocket_horiz_offset: { pct: 15, min: 5, max: 50, menu: 'style.pocket.cargo' },
    cargo_pocket_orientation: {
      dflt: 'vertical',
      list: ['vertical', 'horizontal'],
      menu: 'style.pocket.cargo',
    },
  },
  draft: draftcoat,
}
