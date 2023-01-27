import { pluginBundle } from '@freesewing/plugin-bundle'

const markers = `
<marker id="pointer" markerWidth="10" markerHeight="8" refX="9.5" refY="5.1" orient="-45" markerUnits="userSpaceOnUse"><polyline points="1 1, 9 5, 1 7" />
</marker>
`
const notches = `
<g id="snotch">
  <path d="M -10 -6 L -0.5 0 L -10 6 Z" class="note" />
  <path d="M -10 -6 L -20 0 L -10 6 Z" class="note" />
  <!-- path d="M 10 6 L -0.5 0 L 10 -6 Z" class="note" /-->
</g>
<g id="sfnotch">
  <path d="M -10 -6 L -0.5 0 L -10 6 Z" class="note fill-note" />
  <path d="M -10 -6 L -20 0 L -10 6 Z" class="note fill-note" />
</g>
<g id="dnotch">
  <path d="M -10 -12 L -0.5 -6 L -10 0 Z" class="note" />
  <path d="M -10 0 L -0.5 8 L -10 12 Z" class="note" />
  <path d="M -10 -12 L -20 -6 L -20 6 L -10 12 Z" class="note" />
</g>
<g id="dfnotch">
  <path d="M -10 -12 L -0.5 -6 L -10 0 Z" class="note fill-note" />
  <path d="M -10 0 L -0.5 8 L -10 12 Z" class="note fill-note" />
  <path d="M -10 -12 L -20 -6 L -20 6 L -10 12 Z" class="note fill-note" />
</g>
<g id="circle">
  <circle cx="0" cy="0" r="2.5" class="note" />
</g>
<g id="fcircle">
  <circle cx="0" cy="0" r="2.5" class="note fill-note" />
</g>
<g id="square">
  <path d="M -2.5 -2.5 H 2.5 V 2.5 H -2.5 Z" class="note" />
</g>
<g id="fsquare">
  <path d="M -2.5 -2.5 H 2.5 V 2.5 H -2.5 Z" class="note fill-note" />
</g>
<g id="triangle">
  <path d="M 0 -2.165 L -2.5 2.165 L 2.5 2.165 Z Z" class="note" />
</g>
<g id="ftriangle">
  <path d="M 0 -2.165 L -2.5 2.165 L 2.5 2.165 Z Z" class="note fill-note" />
</g>
<g id="star">
<path d="m 0,-2.5 L .667,-.611 h2 l-1.556,1.22 .556,1.889 -1.667-1.111
-1.667,1.111 .556,-1.889 -1.556-1.22 h2 z" class="note" />
</g>
<g id="fstar">
<path d="m 0,-2.5 L .667,-.611 h2 l-1.556,1.22 .556,1.889 -1.667-1.111
-1.667,1.111 .556,-1.889 -1.556-1.22 h2 z" class="note fill-note" />
</g>
<g id="pentagon">
<path d="m 1.62,2.50 H -1.63 L -2.63,-0.59 L 0,-2.5 2.63,-0.59
Z" class="note" />
</g>
<g id="fpentagon">
<path d="m 1.62,2.50 H -1.63 L -2.63,-0.59 L 0,-2.5 2.63,-0.59
Z" class="note fill-note" />
</g>
<g id="circleplus">
  <circle cx="0" cy="0" r="2.5" class="note" />
  <path d="M 0,-2.5 V 2.5" class="note" />
  <path d="M -2.5,0 H 2.5" class="note" />
</g>
<g id="circlex">
  <circle cx="0" cy="0" r="2.5" class="note" />
  <path d="M 0,-2.5 V 2.5" transform="rotate(45)" class="note" />
  <path d="M -2.5,0 H 2.5" transform="rotate(45)" class="note" />
</g>
<g id="diamond">
  <path d="M 0,-2.5 L 1.8,0 L 0,2.5 L -1.8,0 Z" class="note" />
</g>
<g id="fdiamond">
  <path d="M 0,-2.6 L 1.8,0 L 0,2.6 L -1.8,0 Z" class="note fill-note" />
</g>
`

export const benplugin = {
  name: 'benplugin',
  version: 'test1',
  hooks: {
    preRender: (svg) => {
      if (svg.defs.indexOf(markers) === -1) svg.defs += markers
      if (svg.defs.indexOf(notches) === -1) svg.defs += notches
    },
  },
}

export const bib = {
  name: 'bob.bib',
  plugins: [pluginBundle, benplugin],
  draft: ({ Point, points, Path, paths, Snippet, snippets, part, sa }) => {
    points.start = new Point(10, 10)
    points.end = new Point(90, 90)

    paths.test = new Path()
      .move(points.start)
      .line(points.end)
      //.attr('marker-end', 'url(#pointer)')
      .attr('class', 'fabric')

    const length = paths.test.length()
    for (let p = 0; p <= 5; p++) {
      points['p' + p] = paths.test.shiftAlong((length * p) / 5)
    }
    points.pa = new Point(-10, 20)
    points.pb = points.pa.shift(-90, 10)
    points.pc = points.pa.shift(-90, 20)
    points.pd = points.pa.shift(-90, 30)
    points.pe = points.pa.shift(-90, 40)
    points.pf = points.pa.shift(-90, 50)
    points.pg = points.pa.shift(-90, 60)
    points.ph = points.pa.shift(-90, 70)
    points.pi = points.pa.shift(-90, 80)
    points.pj = points.pa.shift(-90, 90)
    points.pk = points.pj.shift(0, 10)
    points.pl = points.pj.shift(0, 20)
    points.pm = points.pj.shift(0, 30)
    points.pn = points.pj.shift(0, 40)
    points.po = points.pj.shift(0, 50)
    points.pp = points.pj.shift(0, 60)

    const angle = paths.test.start().angle(paths.test.end())
    let notchScale = 1
    if (sa) notchScale = sa / 10
    let notchAngle = angle

    snippets.s1 = new Snippet('snotch', points.p1)
      .attr('data-rotate', notchAngle)
      .attr('data-scale', notchScale)
    snippets.s2 = new Snippet('sfnotch', points.p2)
      .attr('data-rotate', notchAngle)
      .attr('data-scale', notchScale)
    snippets.s3 = new Snippet('dnotch', points.p3)
      .attr('data-rotate', notchAngle)
      .attr('data-scale', notchScale)
    snippets.s4 = new Snippet('dfnotch', points.p4)
      .attr('data-rotate', notchAngle)
      .attr('data-scale', notchScale)

    snippets.s5 = new Snippet('circle', points.pa)
    snippets.s6 = new Snippet('fcircle', points.pb)
    snippets.s7 = new Snippet('square', points.pc)
    snippets.s8 = new Snippet('fsquare', points.pd)
    snippets.s9 = new Snippet('triangle', points.pe)
    snippets.s10 = new Snippet('ftriangle', points.pf)
    snippets.s11 = new Snippet('star', points.pg)
    snippets.s12 = new Snippet('fstar', points.ph)
    snippets.s13 = new Snippet('pentagon', points.pi)
    snippets.s14 = new Snippet('fpentagon', points.pj)
    snippets.s15 = new Snippet('circleplus', points.pk)
    snippets.s16 = new Snippet('circlex', points.pl)
    snippets.s17 = new Snippet('diamond', points.pm)
    snippets.s18 = new Snippet('fdiamond', points.pn)

    paths.sa = paths.test.offset(sa).setClass('fabric sa')

    paths.noclip = new Path().move(new Point(-40, -40)).move(new Point(150, 150))

    return part
  },
}
