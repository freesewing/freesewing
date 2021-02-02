export default function (part) {
  let {
    measurements,
    Point,
    Path,
    points,
    store,
  } = part.shorthand()

  let pctBandBelowKnee = 25;
  let pctSeatAdjustment = 50;
  let halfInch = measurements.waistToKnee /48;

  let inseam = measurements.inseam -(measurements.waistToFloor-measurements.waistToKnee);
  let seat = measurements.seat *pctSeatAdjustment /100;
  let waist = measurements.waist *pctSeatAdjustment /100;

  store.set( 'waist', waist );
  store.set( 'seat', seat );
  store.set( 'halfInch', halfInch );

  console.log( 'measurements.waist: ' +measurements.waist);
  console.log( 'measurements.seat: ' +measurements.seat);
  console.log( 'measurements.waistToKnee: ' +(measurements.waistToKnee/2.54));
  console.log( 'measurements.waistToFloor: ' +(measurements.waistToFloor)/2.54);
  console.log( 'measurements.floorToKnee: ' +((measurements.waistToFloor-measurements.waistToKnee)/2.54));
  console.log( 'measurements.inseam: ' +(measurements.inseam/2.54));
  console.log( 'inseam: ' +(inseam/2.54));
  console.log( 'waist to inseam: ' +((measurements.waistToKnee -inseam)/2.54));
  console.log( 'inseam*pctBandBelowKnee /100: ' +inseam*pctBandBelowKnee /100);
  console.log( 'seat /4: ' +seat /4)

  // points.tr = new Point( 30, -30 );
  // points.tl = new Point( -700, -30 );
  // points.br = new Point( 30, 800 );
  // points.bl = new Point( -700, 800 );
  // paths.box = new Path().move(points.tr).line(points.tl).line(points.bl).line(points.br).close().attr('class', 'lining dotted stroke-sm');

  points.pO = new Point( 0, 0 )
  .attr("data-text", "O").attr("data-text-class", "center");
  points.pB = points.pO.shift( 270, measurements.waistToKnee)
  .attr("data-text", "B").attr("data-text-class", "center");
  points.pA = points.pB.shift( 90, inseam)
  .attr("data-text", "A").attr("data-text-class", "center");
  points.pC = points.pB.shift( 270, measurements.waistToKnee *pctBandBelowKnee /100)
  .attr("data-text", "C").attr("data-text-class", "center");
  points.pT = points.pA.shift( 90, (measurements.waistToKnee -inseam)/3)
  .attr("data-text", "T").attr("data-text-class", "center");
  points.pE = points.pA.shift( 180, seat /4)
  .attr("data-text", "E").attr("data-text-class", "center");
  points.pF = points.pA.shift( 180, seat /2)
  .attr("data-text", "F").attr("data-text-class", "center");
  points.pD = points.pO.shift( 180, seat /4)
  .attr("data-text", "D").attr("data-text-class", "center");
  points.pH = points.pC.shift( 180, seat /4)
  .attr("data-text", "H").attr("data-text-class", "center");
  points.pG = points.pO.shift( 180, seat /2)
  .attr("data-text", "G").attr("data-text-class", "center");

  points.pV = points.pF.shift( 0, halfInch)
  .attr("data-text", "V").attr("data-text-class", "center");
  points.pX = points.pF.shift( 180, halfInch)
  .attr("data-text", "X").attr("data-text-class", "center");
  
  let tPath = new Path().move(points.pG).line(points.pV);
  let tPoints = tPath.intersectsY(points.pT.y);
  if( null != tPoints && tPoints.length > 0 ) {
    points.pS = tPoints[0].clone()
    .attr("data-text", "S").attr("data-text-class", "center");
  }
  tPath = new Path().move(points.pG).line(points.pX);
  tPoints = tPath.intersectsY(points.pT.y);
  if( null != tPoints && tPoints.length > 0 ) {
    points.pZ = tPoints[0].clone()
    .attr("data-text", "Z").attr("data-text-class", "center");
  }

  points.pP = points.pE.shift( 180, seat /3)
  .attr("data-text", "P").attr("data-text-class", "center");
  points.pR = points.pP.shift( 180, halfInch +halfInch)
  .attr("data-text", "R").attr("data-text-class", "center");

  points.pJ = points.pH.shift( 0, measurements.knee /4)
  .attr("data-text", "J").attr("data-text-class", "center");
  points.pK = points.pH.shift( 180, measurements.knee /4)
  .attr("data-text", "K").attr("data-text-class", "center");

  points.pU = points.pG.shift( 0, waist /2)
  .attr("data-text", "U").attr("data-text-class", "center");
}
