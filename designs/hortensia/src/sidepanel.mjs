import { pluginBundle } from '@freesewing/plugin-bundle'
import { bottomsidepanel } from './bottomsidepanel.mjs'

function draftHortensiaSidepanel({
  store,
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  paperless,
  macro,
  part,
}) {
  const c = 0.551915024494 // circle constant
  const phi = 1.6180339887

  const zWidth = new Map([
    ['Invisible', 0],
    ['#3', 4.8],
    ['#4', 5.4],
    ['#4.5', 5.9],
    ['#5', 6.2],
    ['#6', 7],
    ['#8', 8],
    ['#10', 10.6],
  ])

  const w = options.width * options.size
  const sizeRatio = w / 230

  const h = options.height * sizeRatio
  const d = h * phi

  const sideLength = h * 0.44 //options.sideFactor;
  const shoulderCP = 50 * sizeRatio
  const topCP = 30 * sizeRatio

  const topRadius = 60 * sizeRatio

  const sidePanelReinforcementHeight = h / phi / phi / phi / phi
  const zipperWidth = zWidth.get(options.zipperSize)
  const zipperPanelWidth = sidePanelReinforcementHeight / phi
  // console.log( '---' );
  // console.log( options.zipperSize );
  // console.log( zipperWidth );
  // console.log( '---' );

  store.set('width', w)
  store.set('depth', d)
  store.set('sizeRatio', sizeRatio)
  store.set('sideLenght', sideLength)
  store.set('shoulderCP', shoulderCP)
  store.set('topCP', topCP)
  store.set('topRadius', topRadius)
  store.set('sidePanelReinforcementHeight', sidePanelReinforcementHeight)
  store.set('zipperWidth', zipperWidth)
  store.set('zipperPanelWidth', zipperPanelWidth)

  points.topCenter = new Point(0, 0)
  points.topCircleLeft = points.topCenter.shift(135, topRadius)
  points.topCircleRight = points.topCenter.shift(45, topRadius)
  points.topCircleLeftCPu = points.topCircleLeft.shift(45, topRadius * c)
  points.topCircleRightCPu = points.topCircleRight.shift(135, topRadius * c)

  points.topMiddle = points.topCenter.shift(90, topRadius)
  points.topLeft = points.topMiddle.shift(180, w / 2)
  points.topRight = points.topMiddle.shift(0, w / 2)
  points.topMiddleCPL = points.topMiddle.shift(180, topCP)
  points.topMiddleCPR = points.topMiddle.shift(0, topCP * 1.1)

  bottomsidepanel(points, points.topMiddle, w, h, sizeRatio)

  points.shoulderLeft = points.bottomLeft.shift(90, sideLength)
  points.shoulderLeftCP = points.shoulderLeft.shift(90, shoulderCP)
  points.shoulderRight = points.bottomRight.shift(90, sideLength)
  points.shoulderRightCP = points.shoulderRight.shift(90, shoulderCP)

  // points.topCircleLeftCPd = points.topCircleLeft.shiftTowards( points.shoulderLeft, topCP );
  points.topCircleLeftCPd = points.topCircleLeft.shift(225, topCP)
  points.topCircleRightCPd = points.topCircleRight.shift(315, topCP)

  points.bottomSeamLeft = points.bottomLeft.shift(90, sidePanelReinforcementHeight)
  points.bottomSeamRight = points.bottomRight.shift(90, sidePanelReinforcementHeight)
  points.bottomMiddle = points.bottomLeft.shift(0, w / 2)

  let pBottom = new Path()
    .move(points.bottomLeftU)
    .curve(points.bottomLeftUcp, points.bottomLeftRcp, points.bottomLeftR)
    .line(points.bottomRightL)
    .curve(points.bottomRightLcp, points.bottomRightUcp, points.bottomRightU)
    .line(points.bottomRightU)

  let pBottomPanel = new Path()
    .move(points.bottomSeamLeft)
    .join(pBottom)
    .line(points.bottomSeamRight)

  let pTop = new Path()
    .move(points.topCircleRight)
    .curve(points.topCircleRightCPu, points.topCircleLeftCPu, points.topCircleLeft)

  let topCircleLength = pTop.length()

  points.topZipperRight = pTop.shiftAlong(topCircleLength / 2 - zipperWidth / 2)
  points.topZipperLeft = pTop.shiftAlong(topCircleLength / 2 + zipperWidth / 2)
  points.topZipperPanelRight = pTop.shiftAlong(topCircleLength / 2 - zipperPanelWidth / 2)
  points.topZipperPanelLeft = pTop.shiftAlong(topCircleLength / 2 + zipperPanelWidth / 2)

  store.set('bottomPanelLength', pBottomPanel.length())

  let pSidesAndTop = new Path()
    .move(points.bottomSeamRight)
    .line(points.shoulderRight)
    .curve(points.shoulderRightCP, points.topCircleRightCPd, points.topCircleRight)
    .join(pTop)
    .curve(points.topCircleLeftCPd, points.shoulderLeftCP, points.shoulderLeft)
    .line(points.bottomSeamLeft)

  let frontPanelLength = (pSidesAndTop.length() - zipperPanelWidth) / 2

  store.set('frontPanelLength', frontPanelLength)

  paths.seam = new Path()
    .move(points.bottomRightU)
    .join(pSidesAndTop)
    .join(pBottom)
    .close()
    .attr('class', 'fabric')

  store.cutlist.addCut()
  store.cutlist.addCut({ material: 'lining' })

  // Complete?
  if (complete) {
    if (options.size > 0.4) {
      points.logo = points.topMiddle.shiftFractionTowards(points.bottomMiddle, 0.3)
      snippets.logo = new Snippet('logo', points.logo)
    }

    points.title = points.topMiddle
      .shiftFractionTowards(points.bottomMiddle, 0.6)
      .attr('data-text-class', 'center')

    macro('title', {
      at: points.title,
      nr: 1,
      title: 'SidePanel',
    })

    points.__titleNr.attr('data-text-class', 'center')
    points.__titleName.attr('data-text-class', 'center')
    points.__titlePattern.attr('data-text-class', 'center')
    // points.__titleFor.attr("data-text-class", "center");

    snippets.topNotch = new Snippet('notch', points.topMiddle)
    snippets.zipperLeft = new Snippet('notch', points.topZipperLeft)
    snippets.zipperRight = new Snippet('notch', points.topZipperRight)
    snippets.zipperPanelLeft = new Snippet('notch', points.topZipperPanelLeft)
    snippets.zipperPanelRight = new Snippet('notch', points.topZipperPanelRight)
    snippets.bottomLeft = new Snippet('notch', points.bottomSeamLeft)
    snippets.bottomRight = new Snippet('notch', points.bottomSeamRight)
    snippets.bottomMiddle = new Snippet('notch', points.bottomMiddle)

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeftU,
      to: points.bottomRightU,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('hd', {
      from: points.topZipperPanelLeft,
      to: points.topZipperPanelRight,
      y: points.topZipperPanelRight.y + 15,
    })
    macro('vd', {
      from: points.bottomRightL,
      to: points.topMiddle,
      x: points.topRight.x + sa + 15,
    })
    macro('vd', {
      from: points.bottomRightL,
      to: points.shoulderRight,
      x: points.bottomRightL.x,
    })
    macro('ld', {
      from: points.topCenter,
      to: points.topCircleLeft,
      noStartMarker: true,
    })
    macro('ld', {
      from: points.topCenter,
      to: points.topCircleRight,
      noStartMarker: true,
    })
    macro('ld', {
      from: points.topCenter,
      to: points.topMiddle,
      noStartMarker: true,
    })
    // macro('pd', {
    //   path: pSidesAndTop,
    //   d: -20
    // })
    // macro('pd', {
    //   path: pTop,
    //   d: -30
    // })
  }

  return part
}

export const sidepanel = {
  name: 'hortensia.sidepanel',
  options: {
    width: 230,
    height: 330,
    size: { pct: 50, min: 20, max: 200, menu: 'style' },
    zipperSize: {
      dflt: '#5',
      list: ['#3', '#4', '#4.5', '#5', '#6', '#8', '#10', 'Invisible'],
      menu: 'style',
    },
  },
  plugins: [pluginBundle],
  draft: draftHortensiaSidepanel,
}
