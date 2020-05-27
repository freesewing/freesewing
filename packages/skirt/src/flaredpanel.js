export default function (part) {
    let { Point, points, Path, paths, measurements, options } = part.shorthand();
    const inch = 25.4;
  
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
     .translate(-((measurements.hipsCircumference/options.numOfPanels)/2 + options.hemExcess/2+ inch*3.5), options.panelLength);
    points.bottomRight = points.origin
     .translate((measurements.hipsCircumference/options.numOfPanels)/2 + options.hemExcess/2 + inch*3.5, options.panelLength);
    points.anglerefl = points.lHip.shift(-90,25.4);
    let hiphemdifference = points.bottomLeft.dx(points.bottomRight) - points.lHip.dx(points.rHip);
    points.lHipcp = points.lHip.shift(points.lHip.angle(points.bottomLeft)-((points.lHip.angle(points.bottomLeft)-points.lHip.angle(points.anglerefl))/1.7),points.lHip.dy(points.bottomLeft)*0.8);
    points.rHipcp = points.lHipcp.flipX();
    points.bottom = points.bottomRight.shift(0,points.bottomRight.dx(points.bottomLeft)/2);
    points.bottomLeftcp = points.bottom.shift(0,points.bottomRight.dx(points.bottom)*0.7);
    points.bottomRightcp = points.bottom.shift(180,points.bottomRight.dx(points.bottom)*0.7);
    points.bottomLeft = points.bottomLeft.shift(90,hiphemdifference*0.1);
    points.bottomRight = points.bottomRight.shift(90,hiphemdifference*0.1);

  
    paths.seam = new Path()
       .move(points.topLeft)
       .line(points.lHip)
       .curve(points.lHipcp,points.bottomLeft,points.bottomLeft)
       .curve(points.bottomLeft,points.bottomLeftcp,points.bottom)
       .curve(points.bottomRightcp,points.bottomRight,points.bottomRight)
       .curve(points.bottomRight,points.rHipcp,points.rHip)
       .line(points.topRight)
       .line(points.topLeft)
       .close();
    
  
    paths.hipLine = new Path()
       .move(points.lHip)
       .line(points.rHip)
       .attr("data-text", `No. of Panels = ${options.numOfPanels}`)
       .attr("data-text-class", "text-xl center fill-note");
  
  
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