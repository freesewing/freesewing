function draftcoat({ options, Point, Path, points, paths, Snippet, snippets, sa, macro, part }) {
  const w = 500 * options.size

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(w, 0)
  points.bottomLeft = new Point(0, w / 2)
  points.bottomRight = new Point(w, w / 2)

  const globalscale = options.backlength

  //15 inches * backlength percentage
  const vertlength = 380 * options.backlength

  //23 inches /2 (for mirror) * chestwidth percentage * 
  const chesthorizontal = (584/2) * options.chestwidth * globalscale 


  const neckcircum = 368 * options.neckwidth * globalscale
  const neckradius = neckcircum/(2*3.14)
  //Neckbandwidth assumes 3 inches to start
  const neckbandwidth = 76 * options.neckwidth * globalscale



  const armholevert = 101 * options.armhole * options.backlength
  const armholehoriz = 190 * options.acrossback * options.backlength /2

  const frontdepth = options.backlength * 101

  points.neckCenter = new Point(0,0)


  points.backCenter = new Point(0,vertlength)
  points.backedge = new Point( (chesthorizontal * 1) ,vertlength)

  points.closureback = new Point (chesthorizontal, vertlength*0.8)
  // I want closureback to use options.bellyclosurelength but i'm not sure how yet
  points.closurefront = new Point(chesthorizontal, armholevert)

  points.armholetop = new Point(armholehoriz, armholevert * 0.7)

  points.neckbandtop = new Point(neckradius, -neckradius)
  points.neckbandbottom = new Point(neckradius + neckbandwidth, -neckradius)

  //Neck curve control points
  points.neckbandtopCp1 = points.neckbandtop.shift(
    points.neckbandtop.dx(points.neckCenter)/2, 0
  )
  points.neckCenterCp2 = points.neckCenter.shift(
    0, -points.neckCenter.dy(points.neckbandtop) /2
  )

  paths.seam = new Path()
    .move(points.neckCenter)
    .line(points.backCenter)
    .line(points.backedge)
    .line(points.closureback)
    .line(points.closurefront)
    .line(points.armholetop)
    .line(points.neckbandbottom)
    .line(points.neckbandtop)
    .curve(points.neckbandtopCp1, points.neckCenterCp2, points.neckCenter)

    //.line(points.neckCenter)
    .close()
    .attr('class', 'fabric')

  points.logo = points.neckCenter.shiftFractionTowards(points.closureback, 0.5)
  snippets.logo = new Snippet('logo', points.logo)
  points.text = points.logo.shift(-90, w / 8).addText('hello', 'center')

  if (sa) {
    paths.sa = paths.seam.offset(sa).addClass('fabric sa')
  }

  macro('hd', {
    id: 'hWidth',
    from: points.neckCenter,
    to: points.closurefront,
    y: points.backCenter.y + sa + 15,
  })
  macro('vd', {
    id: 'vHeight',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })

  return part
}

export const coat = {
  name: 'coat',
  options: {
    size: { pct: 50, min:10, max:100},

    backlength: { pct: 100, min: 10, max: 1000, menu: 'fit' },
    chestwidth: { pct: 100, min: 10, max: 1000, menu: 'fit' },
    neckwidth: { pct: 100, min: 10, max: 1000, menu: 'fit' },

    armhole: { pct: 100, min: 10, max: 1000, menu: 'fit' },
    acrossback: { pct: 100, min: 10, max: 1000, menu: 'fit' },

    neckoverlap: { pct: 100, min: 10, max: 1000, menu: 'style' },
    bellyoverlap: { pct: 100, min: 10, max: 1000, menu: 'style' },
    
    bellyclosurelength: { pct: 100, min: 10, max: 1000, menu: 'style' },
  },
  draft: draftcoat,
}
