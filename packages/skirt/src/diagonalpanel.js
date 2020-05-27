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
     .translate(-((measurements.hipsCircumference/options.numOfPanels)/2 + options.hemExcess/2 + (measurements.hipsCircumference/options.numOfPanels)*2.4), options.panelLength);
    points.bottomRight = points.origin
     .translate((measurements.hipsCircumference/options.numOfPanels)/2 + options.hemExcess/2 - (measurements.hipsCircumference/options.numOfPanels)*1.3, options.panelLength);
    let hiphemdifference = points.bottomLeft.dx(points.bottomRight) - points.lHip.dx(points.rHip);
    points.lHip = points.lHip.shift(180,measurements.hipsCircumference / options.numOfPanels);
    points.rHip = points.rHip.shift(180,(measurements.hipsCircumference / options.numOfPanels));
    points.bottomLeft = points.bottomLeft.shift(90,hiphemdifference*0.5);
    points.bottomRight = points.bottomRight.shift(90,hiphemdifference*0.1);
    points.bottomleftangle = points.bottomLeft.shift(-90,12.6);
    points.bottomrightangle = points.bottomRight.shift(-90,12.6);
    points.bottom = points.bottomRight.shiftTowards(points.bottomLeft,-points.bottomRight.dx(points.bottomLeft)/2);
    points.bottom = points.bottom.shift(points.bottomRight.angle(points.bottomLeft)+90,12.6);
    points.bottomLeftcp = points.bottom.shiftTowards(points.bottomleftangle,-points.bottomRight.dx(points.bottom)*0.7);
    points.bottomRightcp = points.bottom.shiftTowards(points.bottomrightangle,-points.bottomRight.dx(points.bottom)*0.7);
    points.anglerefl = points.lHip.shift(-90,25.4);
    points.anglerefr = points.rHip.shift(-90,25.4);
    points.lHipcp = points.lHip.shift(points.lHip.angle(points.bottomLeft)-((points.lHip.angle(points.bottomLeft)-points.lHip.angle(points.anglerefl))/6),points.lHip.dy(points.bottomLeft)*0.8);
    points.rHipcp = points.rHip.shift(points.rHip.angle(points.bottomRight)-((points.rHip.angle(points.bottomRight)-points.rHip.angle(points.anglerefr))/6)-10,points.rHip.dy(points.bottomRight)*0.8)
    

  
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