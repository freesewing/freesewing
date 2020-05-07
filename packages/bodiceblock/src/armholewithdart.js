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

  paths.armholeline = new Path()
  .move(points.armbottom)
  .line(points.curve1)
  .setRender(false);
  paths.armhole = new Path()
  .move(points.curve1)
  .curve(points.bottomcp,points.midcp1,points.curve2)
  .curve(points.midcp2,points.topcp,points.armtop)
  .attr("class", "lining dashed")
  .setRender(false);


  
 
  //armhole dart
  points.armholedartmid = paths.armhole.shiftFractionAlong(0.5);
  points.armbottomcopy = points.armbottom.copy();
  points.curve2copy = points.reference1.shiftFractionTowards(points.reference2,0.90);
  points.curve2copy = points.curve2.shift(0,options.armholecenter);
  points.curve1copy = points.armbottom.shift(180,12.7);
  points.curve1copy = points.curve1copy.shift(0,options.armbottomwidth);
  points.bottomcpcopy = points.curve1copy.shift(180,measurements.naturalWaistToUnderarm*options.bottomcpspread);
  points.midcp1copy = points.curve2copy.shift(-90,measurements.naturalWaistToUnderarm*options.midcp1spread);
  points.midcp2copy = points.curve2copy.shift(90,measurements.shoulderToShoulder*options.midcp2spread);

  points.cf = points.armbottom.translate(-(measurements.highBust / 4 + inch / 2), measurements.naturalWaistToUnderarm-inch/2);
  points.waistdart = points.cf.shift(0, measurements.bustSpan / 2);
  points.eightr = points.waistdart.shift(0, options.waistdartwidth / 2);
  points.eightl = points.waistdart.shift(180,options.waistdartwidth / 2);
  points.pivot = points.waistdart.shift(90,measurements.highBust / 4 - inch);
  points.cfwaistend = points.cf.shift(0, measurements.naturalWaist / 4 + inch / 8);
  points.cfpivot = points.cf.shift(90,measurements.highBust / 4 - inch);
  //shrinking waist dart
  points.eightrnew = points.waistdart.shift(0, options.waistdartwidth/2 -options.armholedartwidth);
  let rotationangle = points.eightrnew.angle(points.pivot) - points.eightr.angle(points.pivot) ;
  //rotating lower part of armhole
  points.armbottomcopy = points.armbottomcopy.rotate(rotationangle,points.pivot);
  points.curve1copy = points.curve1copy.rotate(rotationangle,points.pivot);
  points.curve2copy = points.curve2copy.rotate(rotationangle,points.pivot);
  points.bottomcpcopy = points.bottomcpcopy.rotate(rotationangle,points.pivot);
  points.midcp1copy = points.midcp1copy.rotate(rotationangle,points.pivot);
  points.cfwaistend = points.cfwaistend.rotate(rotationangle,points.pivot);
  points.midcp2copy = points.midcp2copy.rotate(rotationangle,points.pivot);
  points.armholedartmidcopy = points.armholedartmid.rotate(rotationangle,points.pivot);
  
  
  

  
    

  /*paths.waistdartref = new Path()
  .move(points.eightl)
  .line(points.pivot)
  .line(points.eightr)
  .attr("class", "lining dashed");*/
  paths.armholelower = new Path()
  .move(points.armbottomcopy)
  .line(points.curve1copy)
  .curve(points.bottomcpcopy,points.midcp1copy,points.curve2copy)
  .curve(points.midcp2copy,points.armholedartmidcopy,points.armholedartmidcopy)
  paths.armholeupper = new Path()
  .move(points.armholedartmid)
  .curve(points.topcp,points.armtop,points.armtop)
  paths.frontrotated = new Path()
  .move(points.armbottomcopy)
  .line(points.cfwaistend)
  .line(points.eightrnew)
  .line(points.pivot)
  .line(points.eightl)
  .line(points.cf)
  paths.armholedart = new Path()
  .move(points.armholedartmidcopy)
  .line(points.pivot)
  .line(points.armholedartmid)

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