export default function (part) {
    let { Point, points, Path, paths, measurements, options } = part.shorthand();
  
    // Design pattern here
    points.origin = new Point(0, 0);
    points.topLeft = points.origin
     .shift(180, (measurements.naturalWaist/options.numOfPanels) / 2);
    points.topRight = points.origin
     .shift(0, (measurements.naturalWaist/options.numOfPanels) / 2);  
    points.lHip = points.origin
     .translate(-(measurements.hipsCircumference/options.numOfPanels) / 2, options.naturalWaistToHip);  
    points.rHip = points.lHip
     .shift(0, measurements.hipsCircumference / options.numOfPanels);
    points.bottomLeft = points.origin
     .translate(-((measurements.hipsCircumference/options.numOfPanels)/2 + options.hemExcess/2), options.panelLength);
    points.bottomRight = points.origin
     .translate((measurements.hipsCircumference/options.numOfPanels)/2 + options.hemExcess/2, options.panelLength);
    let hiphemdifference = points.bottomLeft.dx(points.bottomRight) - points.lHip.dx(points.rHip);
    points.bottom = points.bottomRight.shift(0,points.bottomRight.dx(points.bottomLeft)/2)

  
    paths.seam = new Path()
       .move(points.topLeft)
       .line(points.lHip)
       .line(points.bottomLeft)
       .line(points.bottomRight)
       .line(points.rHip)
       .line(points.topRight)
       .line(points.topLeft)
       .close();
    
  
    paths.hipLine = new Path()
       .move(points.lHip)
       .line(points.rHip)
       .attr("data-text", `No. of Panels = ${options.numOfPanels}`)
       .attr("data-text-class", "text-xl center fill-note");
   if(hiphemdifference>0)
    {
      points.bottomLeftcp = points.bottom.shift(0,points.bottomRight.dx(points.bottom)*0.7);
      points.bottomRightcp = points.bottom.shift(180,points.bottomRight.dx(points.bottom)*0.7);
      points.bottomLeft = points.bottomLeft.shift(90,hiphemdifference*0.1);
      points.bottomRight = points.bottomRight.shift(90,hiphemdifference*0.1);
      paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .curve(points.bottomLeft,points.bottomLeftcp,points.bottom)
      .curve(points.bottomRightcp,points.bottomRight,points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close();
      paths.hipLine = new Path()
       .move(points.lHip)
       .line(points.rHip)
       .attr("class", "lining dashed")
       .attr("data-text", `No. of Panels = ${options.numOfPanels}`)
       .attr("data-text-class", "text-xl center fill-note");
    }
  
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