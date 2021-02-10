import frontPoints from './frontPoints'

export default function (part) {
  let {
    options,
    measurements,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    complete, 
    sa,
    store,
    paperless,
    macro
  } = part.shorthand()

  frontPoints(part);

  let waist = store.get( 'waist' );
  let seat = store.get( 'seat' );
  let halfInch = store.get( 'halfInch' );




  
  points.pAextra = points.pA.shift( 0, halfInch)
    .attr("data-text", "a").attr("data-text-class", "center");

  let aCPu = points.pA.dist( points.pO ) *options.pctAtoO /100;
  let aCPj = points.pA.dist( points.pC ) *options.pctAtoC /100;

  points.pAextraCPu = points.pAextra.shift(90, aCPu )
    .attr("data-text", "aCPu").attr("data-text-class", "center");
  points.pAextraCPj = points.pAextra.shift(270, aCPj )
    .attr("data-text", "aCPj").attr("data-text-class", "center");

  points.pUcpA = points.pU.shiftFractionTowards( points.pAextraCPu, options.pctUtoA /100)
    .attr("data-text", "uCPa").attr("data-text-class", "center");
  points.pJcpA = points.pJ.shiftFractionTowards( points.pAextraCPj, options.pctJtoA /100)
    .shift( 0, points.pJ.dist( points.pH ) *options.fullness )
    .attr("data-text", "jCPa").attr("data-text-class", "center");

  paths.sideSeam = new Path()
    .move(points.pJ)
    .curve(points.pJcpA,points.pAextraCPj, points.pAextra)
    .curve(points.pAextraCPu,points.pUcpA, points.pU)
  store.set( 'sideSeam', paths.sideSeam.length() );

  points.pZcpR = points.pZ.shiftFractionTowards( points.pX, options.pctZtoR /100)
    .attr("data-text", "zCPr").attr("data-text-class", "center");
  points.pRcpZ = points.pR.shiftFractionTowards( points.pF, options.pctRtoZin /100)
    .shiftFractionTowards( points.pZ, options.pctRtoZup /100)
    .attr("data-text", "rCPz").attr("data-text-class", "center");
  
  paths.crotchSeam = new Path()
    .move(points.pW)
    .line(points.pZ)
    .curve(points.pZcpR,points.pRcpZ, points.pR)

  points.pRcpK = points.pR.shiftFractionTowards( points.pF, options.pctRtoKin /100)
    .shiftFractionTowards( points.pK, options.pctRtoKdown /100)
    .attr("data-text", "rCPk").attr("data-text-class", "center");
  points.pKcpR = points.pK.shiftFractionTowards( points.pH, -1 * ((options.pctKtoRout /100) +options.fullness))
    .shiftFractionTowards( points.pR, options.pctKtoRup /100)
    .attr("data-text", "kCPr").attr("data-text-class", "center");

  paths.insideSeam = new Path()
    .move(points.pR)
    .curve(points.pRcpK,points.pKcpR, points.pK)
  store.set( 'insideSeam', paths.insideSeam.length() );

  let tempP = points.pH.shift(270, halfInch *1.5 )
  points.pKcpH = points.pK.shiftFractionTowards(tempP, options.pctKtoH /100 )
    .attr("data-text", "kCPh").attr("data-text-class", "center");
  points.pJcpH = points.pJ.shiftFractionTowards(tempP, options.pctKtoH /100 )
    .attr("data-text", "kCPh").attr("data-text-class", "center");

  paths.legSeam = new Path()
    .move(points.pK)
    .curve(points.pKcpH,points.pJcpH, points.pJ)

  points.pSlitBottom = paths.legSeam.shiftAlong( paths.legSeam.length() - (halfInch *4));
  // points.pSlitBottomT1 = paths.legSeam.shiftAlong( paths.legSeam.length() - (halfInch *4)+1);
  // points.pSlitBottomT2 = paths.legSeam.shiftAlong( paths.legSeam.length() - (halfInch *4)-1);
  // points.pSlitTop = points.pSlitBottom.shift( points.pSlitBottomT2.angle(points.pSlitBottomT1) +90, halfInch *4 );
  points.pSlitTop = points.pSlitBottom.shift( 90, halfInch *4 );

  store.set( 'slitDistance', paths.legSeam.length() - (halfInch *4) );

  macro('ld', {
    from: points.pSlitBottom,
    to: points.pSlitTop
  })
  macro('ld', {
    from: points.pSlitBottom,
    to: points.pJ
  })

  paths.waistSeam = new Path()
    .move(points.pU)
    .line(points.pD)
    .line(points.pW)

  paths.seam = paths.waistSeam
    .join( paths.crotchSeam )
    .join( paths.insideSeam )
    .join( paths.legSeam )
    .join( paths.sideSeam )
    .close()
    .attr('class', 'fabric')

    snippets.n1 = new Snippet( 'notch', points.pSlitBottom );

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

  /*
  let chestWidth = measurements.chest / 4
  let bibWidth = chestWidth * options.bibWidth
  let bibLength = measurements.hpsToWaistBack * options.bibLength
  let apronLength =
    measurements.hpsToWaistBack * options.bibLength +
    measurements.waistToKnee * (1 + options.lengthBonus)
  
  let apronWidth =
    Math.max(measurements.hips, measurements.waist) *
    (1 - options.backOpening)
  
  let apronWidth = measurements.waist * (1 - options.backOpening)
  let strapWidth = (measurements.hpsToWaistBack * options.strapWidth) / 8
  let hemWidth = 3 * sa
  let pocketSize = apronLength / 4

  points.topLeft = new Point(0, 0)
  points.topLeftHem = points.topLeft.shift(270, hemWidth)
  points.bottomLeftHem = points.topLeftHem.shift(270, apronLength)
  points.waistLeft = points.topLeftHem.shift(270, bibLength)
  points.bottomLeft = points.bottomLeftHem.shift(270, hemWidth)
  points.topRight = points.topLeft.shift(0, bibWidth / 2)
  points.topRightHem = points.topLeftHem.shift(0, bibWidth / 2)
  points.bottomRightHem = points.bottomLeftHem.shift(0, apronWidth / 2)
  points.bottomRight = points.bottomLeft.shift(0, apronWidth / 2)
  points.topRightBack = points.bottomRightHem.shift(90, apronLength - bibLength)
  points.topRightBackCPfront = points.topRightBack.shift(180, (apronWidth - bibWidth) / 2 / 1.5)
  points.topRightCPdown = points.topRightHem.shift(
    270,
    (measurements.hpsToWaistBack * options.bibLength) / 4
  )

  points.topCOF = points.topLeft.shift(270, apronLength / 5)
  points.bottomCOF = points.bottomLeft.shift(90, apronLength / 5)

  points.pocketLeftTop = points.waistLeft.shift(270, hemWidth)
  points.pocketRightTop = points.pocketLeftTop.shift(0, pocketSize)
  points.pocketLeftBottom = points.pocketLeftTop.shift(270, pocketSize)
  points.pocketRightBottom = points.pocketLeftBottom.shift(0, pocketSize)

  points.crossBoxTo1 = new Point(points.topRightHem.x - strapWidth, points.topRightHem.y + hemWidth)
  points.crossBoxTo2 = new Point(
    points.topRightBack.x - strapWidth,
    points.topRightBack.y + hemWidth
  )

  paths.rightHem = new Path()
    .move(points.bottomRight)
    .line(points.topRightBack)
    .curve(points.topRightBackCPfront, points.topRightCPdown, points.topRightHem)
    .line(points.topRight)
    .attr('class', 'various dashed')
    .attr('data-text', 'narrow hem')
    .attr('data-text-class', 'text-xs center')

  paths.pocket = new Path()
    .move(points.pocketLeftBottom)
    .line(points.pocketLeftTop)
    .line(points.pocketRightTop)
    .line(points.pocketRightBottom)
    .line(points.pocketLeftBottom)
    .attr('class', 'lining dotted stroke-sm')
    .attr('data-text', 'pocket')
    .attr('data-text-class', 'text-xs center')

  paths.right = paths.rightHem.offset(sa)

  paths.seam = new Path()
    .move(points.bottomLeft)
    .join(paths.right)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  paths.complete = paths.seam.clone().line(points.bottomLeft).close()

  paths.topHem = new Path()
    .move(points.topLeftHem)
    .line(points.topRightHem.shift(0, sa))
    .attr('class', 'various dashed')
    .attr('data-text', 'hem')
    .attr('data-text-class', 'text-xs center')
  paths.bottomHem = new Path()
    .move(points.bottomLeftHem)
    .line(points.bottomRightHem.shift(0, sa))
    .attr('class', 'various dashed')
    .attr('data-text', 'hem')
    .attr('data-text-class', 'text-xs center')

  // Complete?
  if (complete) {
    points.logo = points.topRightBack.shiftFractionTowards(points.pocketRightBottom, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    points.title = points.logo.shift(-90, 100)
    macro('title', {
      nr: 1,
      at: points.title,
      title: 'Front'
    })

    points.scaleboxAnchor = points.pocketLeftBottom.shiftFractionTowards(points.bottomRight, 0.5)
    macro('scalebox', { at: points.scaleboxAnchor })

    macro('crossBox', {
      from: points.topRightHem,
      to: points.crossBoxTo1
    })
    macro('crossBox', {
      from: points.topRightBack,
      to: points.crossBoxTo2,
      text: 'attachment'
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    macro('cutonfold', {
      from: points.topCOF,
      to: points.bottomCOF
    })
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15
    })
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.topLeft.y - sa - 15
    })
    macro('vd', {
      from: points.bottomLeft,
      to: points.topLeft,
      x: points.topLeft.x - sa - 15
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRightBack,
      x: points.topRightBack.x + sa + 15
    })
    macro('vd', {
      from: points.topRightBack,
      to: points.topRight,
      x: points.topRightBack.x + sa + 15
    })
    macro('vd', {
      from: points.topLeft,
      to: points.topLeftHem,
      x: points.topLeftHem.x + sa + 15
    })
    macro('vd', {
      from: points.topLeftHem,
      to: points.bottomLeftHem,
      x: points.topLeftHem.x + sa + 15
    })
    macro('vd', {
      from: points.bottomLeftHem,
      to: points.bottomLeft,
      x: points.bottomLeftHem.x + sa + 15
    })
  }
*/

  return part
}
