export default function(part) {
  let { Point, points, Path, paths, measurements, options, utils, snippets, snippet, macro, paperless } = part.shorthand();
  // Design pattern here
  const inch = 25.4;
  points.armbottom = new Point(0,0);
  let dist1 = measurements.topToWaist - (measurements.naturalWaistToUnderarm - inch/2) - options.shoulderslopedepth; 
  let dist2 = (measurements.highBust/4 + inch/2) - (measurements.shoulderToShoulder * 0.5);
  points.armtop = points.armbottom.translate(-dist2,-dist1);  

  //Using neck points
  points.temptoplinetemp = points.armbottom.shift(90,measurements.topToWaist - (measurements.naturalWaistToUnderarm - 12.7));
  points.neckorigintemp = points.temptoplinetemp.shift(180,measurements.highBust/4 + inch/2);
  points.shoulderslopeleft = points.neckorigintemp.shift(0,options.neckwidth);
  points.armtop = points.armtop.shiftTowards(points.shoulderslopeleft,options.armtopshift);

  points.reference1 = points.armbottom.shift(180,63.5);
  points.reference2 = points.reference1.shift(90,63.5);
  points.curve2 = points.reference1.shiftFractionTowards(points.reference2,0.90);
  points.curve2 = points.curve2.shift(0,options.armholecenter);
  points.curve1 = points.armbottom.shift(180,12.7);
  points.curve1 = points.curve1.shift(0,options.armbottomwidth);
  points.box1 = points.armtop.shift(90,250);
  points.box2 = points.box1.shift(180,50);
  points.box3 = points.box2.shift(0,300);
  points.box4 = points.armbottom.shift(0,250);

  
  
  
  //control points
  points.bottomcp = points.curve1.shift(180,measurements.naturalWaistToUnderarm*options.bottomcpspread);
  points.midcp1 = points.curve2.shift(-90,measurements.naturalWaistToUnderarm*options.midcp1spread);
  points.midcp2 = points.curve2.shift(90,measurements.shoulderToShoulder*options.midcp2spread);
  let angletopcp = points.armtop.angle(points.midcp2); //reference2
  points.topcp = points.armtop.shift(angletopcp - 6.5,measurements.shoulderToShoulder*options.topcpspread); //-10
  


  //paths
  /*paths.reference = new Path()
  .move(points.armbottom)
  .line(points.reference1)
  .line(points.reference2)
  .attr("class", "lining dashed");

  paths.referencenew = new Path()
  .move(points.armbottom)
  .line(points.armtop)
  .attr("class", "lining dashed");

  paths.scale = new Path()
  .move(points.midcp2)
  .line(points.box2)
  .line(points.box3)
  .line(points.box4)
  .attr("class", "lining dashed");*/

  paths.armhole = new Path()
  .move(points.armbottom)
  .line(points.curve1)
  .curve(points.bottomcp,points.midcp1,points.curve2)
  .curve(points.midcp2,points.topcp,points.armtop)





  //macros
 

  // Complete?
  if (complete) {
    if (sa) {
    }
    // Paperless?
    if (paperless) {
    }
  }
  return part;
}