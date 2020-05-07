export default function(part) {
  let { Point, points, Path, paths, measurements, options, utils, snippets, snippet, macro, paperless } = part.shorthand();
  // Design pattern here
  const inch = 25.4;
  points.temptopline = points.armbottom.shift(90,measurements.topToWaist - (measurements.naturalWaistToUnderarm - inch/2));
  points.neckorigin = points.temptopline.shift(180,measurements.highBust/4 + inch/2);
  points.neckright = points.neckorigin.shift(0,options.neckwidth);
  points.neckbottom = points.neckorigin.shift(-90,options.neckdepth);

  
  
  
  //control points
 points.neckcp1 = points.neckright.shift(-90-options.neckcprightangle,options.neckcprightspread*points.neckright.dy(points.neckbottom));
 points.neckcp2 = points.neckbottom.shift(0+options.neckcpbottomangle,-options.neckcpbottomspread*points.neckright.dx(points.neckbottom));

  

  //paths
  /*paths.topline = new Path()
  .move(points.armtop)
  .line(points.temptopline)
  .line(points.neckorigin)
  .attr("class", "lining dashed");*/
  paths.neck = new Path()
  .move(points.armtop)
  .line(points.neckright)
  .curve(points.neckcp1,points.neckcp2,points.neckbottom)


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