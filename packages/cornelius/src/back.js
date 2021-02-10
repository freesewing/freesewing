import { rawListeners } from 'process';

function rotateDistance(part, point, distance, center) {
  let {
    options,
    Path,
    points,
    paths,
    store,
    raise
  } = part.shorthand();

  console.log( 'distance: ' +distance );
  let dCenter = point.dist(center);
  console.log( 'dCenter: ' +dCenter );

  let length = store.get('insideSeam');
  //let aCenter = center.angle( point );

  let angle = Math.atan( distance / dCenter ) * (180 /Math.PI);
  console.log( 'angle: ' +angle );
  let aOffset = ( distance / dCenter ) *-3 //angle *-.05;

  let pDistance = 0;
  let dOffset = 0;
  let distAdjust = 0.05;
  let pLength = 0;
  let dLength = 0;
  let iteration = 0;

  do {
    points.p3 = point.rotate( angle, center )
      .attr("data-text", "3").attr("data-text-class", "center");

    points.p3cp10 = points.p3.shiftFractionTowards( points.pF, options.pctRtoKin /200)
      .shiftFractionTowards( points.p10, options.pctRtoKdown /100)
      .attr("data-text", "3CP10").attr("data-text-class", "center");
    points.p10cp3 = points.p10.shiftFractionTowards( points.pH, -1 * ((options.pctKtoRout /100) +options.fullness))
      .shiftFractionTowards( points.p3, options.pctKtoRup /100)
      .attr("data-text", "10CP3").attr("data-text-class", "center");

    console.log( '--' );
    
    paths.insideSeam = new Path()
      .move(points.p3)
      .curve(points.p3cp10,points.p10cp3, points.p10)
    
    console.log( '--' );
    pLength = paths.insideSeam.length();

    pDistance = point.dist( points.p3 );
    dOffset = distance -pDistance;
    dLength = pLength -length;

    if( dLength > 0.1 ) {
      distAdjust = dLength *-.9;
      point = point.shiftTowards( center, distAdjust );
    } else if( dLength < -0.1 ) {
      distAdjust = dLength *.8;
      point = point.shiftTowards( center, distAdjust );
    } else {
      if( dOffset > 0 ) {
        if( aOffset > 0 ) aOffset *= .8;
        else aOffset *= -.8;
      } else {
        if( aOffset > 0 ) aOffset *= -.9;
        else aOffset *= .9;
      }
      angle += aOffset;
    }

    console.log( 'pLenght: ' +pLength );
    console.log( 'dLenght: ' +dLength );
    console.log( 'distAdjust: ' +distAdjust );
    console.log( 'angle: ' +angle );
    console.log( 'pDistance: ' +pDistance );
    console.log( 'dOffset: ' +dOffset );
    console.log( 'aOffset: ' +aOffset );
    console.log( 'iteration: ' +iteration );

    iteration ++;
  } while( (dOffset > 0.1 || dOffset < -0.1 || dLength < -0.1 || dLength > 0.1) && iteration < 100 )

  if( iteration >= 100 ) {
    raise.error( 'Could not find a point for "3" within 100 iterations');
  }
}

function rotateDistance2(part, point, distance, center, origin) {
  let {
    options,
    Path,
    points,
    paths,
    store,
    raise
  } = part.shorthand();

  let halfInch = store.get( 'halfInch' );

  let aCPu, aCPj, a4to11 = null;

  let length = store.get('sideSeam');
  let distAdjust = 0.05;
  let pLength = 0;
  let dLength = 0;

  let pivotAngle, originalAngle, angleChange;

  console.log( 'distance: ' +distance );
  let dCenter = point.dist(center);
  console.log( 'dCenter: ' +dCenter );

  let pDistance = 0;
  let direction = 1;
  
  let angle = Math.atan( Math.abs(distance) / dCenter ) * (180 /Math.PI);
  if( distance < 0 ) {
    angle = 360 -angle;
    distance *= -1;
    direction = -1;
  }
  let p = point.rotate( angle, center );
  console.log( 'angle: ' +angle );
  console.log( 'pDistance: ' +origin.dist( p ) );

  let aOffset = ( origin.dist( p ) / dCenter ) *-3 //angle *-.15;
  console.log( 'aOffset: ' +aOffset );

  let dOffset = 0;

  let iteration = 0;

  do {
    p = point.rotate( angle, center )
    points.p4 = p.clone()
      .attr("data-text", "4").attr("data-text-class", "center");

    pivotAngle = points.pJ.angle( points.p4 );
    originalAngle = points.pJ.angle( points.pU );
    angleChange = originalAngle -pivotAngle;
  
    points.p6 = points.pJ.shift( points.pJ.angle( points.pT ) -angleChange, points.pJ.dist( points.pT) )
      .attr("data-text", "6").attr("data-text-class", "center");
    points.p7 = points.pJ.shift( points.pJ.angle( points.pA ) -angleChange, points.pJ.dist( points.pA) )
      .attr("data-text", "7").attr("data-text-class", "center");
    
    aCPu = points.p7.dist( points.p4 ) *options.pctAtoO /100;
    aCPj = points.p7.dist( points.p11 ) *options.pctAtoC /100;
  
    a4to11 = points.p4.angle( points.p11 );
  
    points.p7cp4 = points.p7.shift( a4to11 +180, aCPu )
      .attr("data-text", "7cp4").attr("data-text-class", "center");
    points.p7cp11 = points.p7.shift( a4to11, aCPj )
      .attr("data-text", "7cp11").attr("data-text-class", "center");
    
    points.p4cp7 = points.p4.shiftFractionTowards( points.p7cp4, options.pctUtoA /100)
      .attr("data-text", "uCPa").attr("data-text-class", "center");
    points.p11cp7 = points.p11.shiftFractionTowards( points.p7cp11, options.pctJtoA /100)
      .shift( 0, points.p11.dist( points.pH ) *options.fullness )
      .attr("data-text", "jCPa").attr("data-text-class", "center");
  
    paths.sideSeam = new Path()
      .move(points.p11)
      .curve(points.p11cp7,points.p7cp11, points.p7)
      .curve(points.p7cp4,points.p4cp7, points.p4)
    
    pLength = paths.sideSeam.length();

    pDistance = origin.dist( points.p4 );
    dOffset = distance -pDistance;
    dLength = pLength -length;

    if( dLength > 0.1 ) {
      distAdjust = dLength *.9;
      point = point.shiftTowards( center, distAdjust );
    } else if( dLength < -0.1 ) {
      distAdjust = dLength *.8;
      point = point.shiftTowards( center, distAdjust );
    } else {
      if( dOffset > 0 ) {
        if( aOffset > 0 ) aOffset *= .8;
        else aOffset *= -.9;
      } else {
        if( aOffset > 0 ) aOffset *= -.9;
        else aOffset *= .9;
      }
      angle += aOffset *direction;
    }
    // console.log( 'pLenght: ' +pLength );
    // console.log( 'dLenght: ' +dLength );
    // console.log( 'distAdjust: ' +distAdjust );
    // console.log( 'angle: ' +angle );
    // console.log( 'pDistance: ' +pDistance );
    // console.log( 'dOffset: ' +dOffset );
    // console.log( 'aOffset: ' +aOffset );
    // console.log( 'iteration: ' +iteration );

    iteration ++;
  } while( (dOffset > 0.1 || dOffset < -0.1 || dLength > 0.1 || dLength < -0.1) && iteration < 100 )

  if( iteration >= 100 ) {
    raise.error( 'Could not find a point for "4" within 100 iterations');
  }

  return( p.clone() );
}

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
  } = part.shorthand();

  let tempP = null;

  // points.tr = new Point( 150, -100 );
  // points.tl = new Point( -400, -100 );
  // points.br = new Point( 150, 800 );
  // points.bl = new Point( -400, 800 );
  // paths.box = new Path().move(points.tr).line(points.tl).line(points.bl).line(points.br).close().attr('class', 'lining dotted stroke-sm');


  let waist = store.get( 'waist' );
  let seat = store.get( 'seat' );
  let halfInch = store.get( 'halfInch' );

  points.p2 = points.pD.shift( 90, seat/12 +halfInch )
    .attr("data-text", "2").attr("data-text-class", "center");
  points.p10 = points.pK.shiftTowards( points.pH, -halfInch )
    .attr("data-text", "10").attr("data-text-class", "center");
  rotateDistance( part, points.pR.clone(), halfInch *2, points.pK )
    
  points.p11 = points.pJ.shiftTowards( points.pH, -halfInch )
  .attr("data-text", "11").attr("data-text-class", "center");

  console.log( 'Pu -> Pj: ' + points.pU.angle( points.pJ ));
  rotateDistance2( part, points.pU, -1*(waist/2 +halfInch), points.pJ, points.p2 )

  points.p2a = points.p2.shiftTowards( points.p4, halfInch )
    .attr("data-text", "2a").attr("data-text-class", "center");
  
  tempP = points.p6.shiftTowards( points.pT, 1000 );
  console.log(tempP);
  let pathXto2a = new Path().move(points.pX).line(points.p2a);
  let path6ThroughT = new Path().move(points.p6).line(tempP);
  points.p5 = path6ThroughT.intersects(pathXto2a)[0];

  points.p5cp3 = points.p5.shiftFractionTowards( points.pX, options.pctZtoR /50)
    .attr("data-text", "zCPr").attr("data-text-class", "center");
  points.p3cp5 = points.p3.shiftFractionTowards( points.pF, options.pctRtoZin /100)
    .shiftFractionTowards( points.p5, options.pctRtoZup /400)
    .attr("data-text", "rCPz").attr("data-text-class", "center");

  points.p2cp5 = points.p2.shiftFractionTowards( points.pD, options.pctZtoR /100)
    .attr("data-text", "5CP2").attr("data-text-class", "center");
  points.p5cp2 = points.p5.shiftFractionTowards( points.p2a, options.pctZtoR /50)
    .attr("data-text", "5CP2").attr("data-text-class", "center");

  paths.crotchSeam = new Path()
    .move(points.p2)
    .curve(points.p2cp5,points.p5cp2, points.p5)
    .curve(points.p5cp3,points.p3cp5, points.p3)

  tempP = points.pH.shift(90, halfInch *1.5 )
  points.p10cpH = points.p10.shiftFractionTowards(tempP, options.pctKtoH /100 )
    .attr("data-text", "10CPh").attr("data-text-class", "center");
  points.p11cpH = points.p11.shiftFractionTowards(tempP, options.pctKtoH /100 )
    .attr("data-text", "11CPh").attr("data-text-class", "center");

  paths.legSeam = new Path()
    .move(points.p10)
    .curve(points.p10cpH,points.p11cpH, points.p11)

  paths.waistSeam = new Path()
    .move(points.p4)
    .line(points.p2)

  paths.seam = paths.waistSeam
    .join( paths.crotchSeam )
    .join( paths.insideSeam )
    .join( paths.legSeam )
    .join( paths.sideSeam )
    .close()
    .attr('class', 'fabric')


    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }




  // macro('ld', {
  //   from: points.pJ,
  //   to: points.p6,
  // })
  // macro('ld', {
  //   from: points.pT,
  //   to: points.p6,
  // })
  // macro('ld', {
  //   from: points.pJ,
  //   to: points.p7,
  // })
  // macro('ld', {
  //   from: points.pA,
  //   to: points.p7,
  // })


  // macro('ld', {
  //   from: points.pR,
  //   to: points.pK,
  // })
  // macro('ld', {
  //   from: points.p3,
  //   to: points.pK,
  // })

  return part
}
