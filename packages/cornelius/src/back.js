import frontPoints from './frontPoints'

function rotateDistance(point, distance, center) {
  console.log( 'distance: ' +distance );
  let dCenter = point.dist(center);
  console.log( 'dCenter: ' +dCenter );

  //let aCenter = center.angle( point );

  let angle = Math.atan( distance / dCenter ) * (180 /Math.PI);
  console.log( 'angle: ' +angle );
  let aOffset = ( distance / dCenter ) *-3 //angle *-.05;

  let p = null;
  let pDistance = 0;
  let dOffset = 0;

  let iteration = 0;

  do {
    angle += aOffset;
    p = point.rotate( angle, center );

    pDistance = point.dist( p );
    dOffset = distance -pDistance;
    if( dOffset > 0 && aOffset > 0 ) aOffset *= .8;
    else aOffset *= -.9;

    console.log( 'angle: ' +angle );
    console.log( 'pDistance: ' +pDistance );
    console.log( 'dOffset: ' +dOffset );
    console.log( 'aOffset: ' +aOffset );
    console.log( 'iteration: ' +iteration );

    iteration ++;
  } while( (dOffset > 0.01 || dOffset < -0.01) && iteration < 100 )

  return( p );
}

function rotateDistance2(point, distance, center, origin) {
  console.log( 'distance: ' +distance );
  let dCenter = point.dist(center);
  console.log( 'dCenter: ' +dCenter );

  // startDistance = origin.dist( point );

  //let aCenter = center.angle( point );
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
    angle += aOffset *direction;
    console.log( 'angle: ' +angle );
    p = point.rotate( angle, center );

    pDistance = origin.dist( p );
    console.log( 'pDistance: ' +pDistance );
    dOffset = distance -pDistance;
    console.log( 'dOffset: ' +dOffset );
    console.log( '-aOffset: ' +aOffset );
    if( dOffset > 0 ) {
      if( aOffset > 0 ) aOffset *= .8;
      else aOffset *= -.9;
    } else {
      if( aOffset > 0 ) aOffset *= -.9;
      else aOffset *= .9;
    }

    console.log( '=aOffset: ' +aOffset );
    console.log( 'iteration: ' +iteration );

    iteration ++;
  } while( (dOffset > 0.01 || dOffset < -0.01) && iteration < 100 )

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

  points.tr = new Point( 150, -100 );
  points.tl = new Point( -400, -100 );
  points.br = new Point( 150, 800 );
  points.bl = new Point( -400, 800 );
  paths.box = new Path().move(points.tr).line(points.tl).line(points.bl).line(points.br).close().attr('class', 'lining dotted stroke-sm');

  frontPoints(part);

  let waist = store.get( 'waist' );
  let seat = store.get( 'seat' );
  let halfInch = store.get( 'halfInch' );

  points.p2 = points.pD.shift( 90, seat/12 +halfInch )
  .attr("data-text", "2").attr("data-text-class", "center");
  points.p3 = rotateDistance( points.pR, halfInch *2, points.pK )
  .attr("data-text", "3").attr("data-text-class", "center");
  
  console.log( 'Pu -> Pj: ' + points.pU.angle( points.pJ ));
  points.p4 = rotateDistance2( points.pU, -1*(waist/2 +halfInch), points.pJ, points.p2 )
  .attr("data-text", "4").attr("data-text-class", "center");
  points.p2a = points.p2.shiftTowards( points.p4, halfInch )
  .attr("data-text", "2a").attr("data-text-class", "center");
  
  let pivotAngle = points.pJ.angle( points.p4 );
  let originalAngle = points.pJ.angle( points.pU );
  let angleChange = originalAngle -pivotAngle;

  console.log( 'pivotAngle: ' +pivotAngle );
  console.log( 'originalAngle: ' +originalAngle );
  points.p6 = points.pJ.shift( points.pJ.angle( points.pT ) -angleChange, points.pJ.dist( points.pT) )
  .attr("data-text", "6").attr("data-text-class", "center");
  points.p7 = points.pJ.shift( points.pJ.angle( points.pA ) -angleChange, points.pJ.dist( points.pA) )
  .attr("data-text", "7").attr("data-text-class", "center");

  points.p10 = points.pK.shiftTowards( points.pH, -halfInch )
  .attr("data-text", "10").attr("data-text-class", "center");
  points.p11 = points.pJ.shiftTowards( points.pH, -halfInch )
  .attr("data-text", "11").attr("data-text-class", "center");
  
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
    .attr('class', 'fabric')


  let aCPu = points.p7.dist( points.p4 ) *options.pctAtoO /100;
  let aCPj = points.p7.dist( points.p11 ) *options.pctAtoC /100;

  let a4to11 = points.p4.angle( points.p11 );

  points.p7cp4 = points.p7.shift( a4to11 +180, aCPu )
  .attr("data-text", "7cp4").attr("data-text-class", "center");
  points.p7cp11 = points.p7.shift( a4to11, aCPj )
  .attr("data-text", "7cp11").attr("data-text-class", "center");
  
  console.log('============');
  
  points.p4cp7 = points.p4.shiftFractionTowards( points.p7cp4, options.pctUtoA /100)
  .attr("data-text", "uCPa").attr("data-text-class", "center");
  points.p11cp7 = points.p11.shiftFractionTowards( points.p7cp11, options.pctJtoA /100)
  .attr("data-text", "jCPa").attr("data-text-class", "center");
  

  paths.sideSeam = new Path()
    .move(points.p11)
    .curve(points.p11cp7,points.p7cp11, points.p7)
    .curve(points.p7cp4,points.p4cp7, points.p4)
    .attr('class', 'fabric')



  points.p3cp10 = points.p3.shiftFractionTowards( points.pF, options.pctRtoKin /200)
    .shiftFractionTowards( points.p10, options.pctRtoKdown /100)
    .attr("data-text", "rCPk").attr("data-text-class", "center");
  points.p10cp3 = points.p10.shiftFractionTowards( points.pH, -1 * options.pctKtoRout /100)
    .shiftFractionTowards( points.p3, options.pctKtoRup /100)
    .attr("data-text", "kCPr").attr("data-text-class", "center");

  paths.frontSeam = new Path()
    .move(points.p3)
    .curve(points.p3cp10,points.p10cp3, points.p10)
    .attr('class', 'fabric')



  tempP = points.pH.shift(90, halfInch *1.5 )
  points.p10cpH = points.p10.shiftFractionTowards(tempP, options.pctKtoH /100 )
    .attr("data-text", "10CPh").attr("data-text-class", "center");
  points.p11cpH = points.p11.shiftFractionTowards(tempP, options.pctKtoH /100 )
    .attr("data-text", "11CPh").attr("data-text-class", "center");

  paths.legSeam = new Path()
    .move(points.p10)
    .curve(points.p10cpH,points.p11cpH, points.p11)
    .attr('class', 'fabric')

  paths.waistSeam = new Path()
    .move(points.p2)
    .line(points.p4)
    .attr('class', 'fabric')




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
