export default function(part) {
    let { Point, points, Path, paths, measurements, options } = part.shorthand();
    const inch = 25.4;
  
    // Design pattern here
    points.origin = new Point(0, 0);
    points.rHem = points.origin.translate(measurements.frontHipArc - (measurements.frontHipArc - measurements.frontWaistArc/2 - options.frontDartWidth)*0.8 + options.manipulateHem , measurements.length);
    points.lHem = points.origin.shift(-90, measurements.length);
    points.rHip = points.origin.translate(measurements.frontHipArc, options.naturalWaistToHip);
    points.rWaist = points.origin.translate(measurements.frontWaistArc / 2 + options.frontDartWidth , -(1/2) * inch);
    points.waistCp = points.rWaist.shift(195, points.origin.dx(points.rWaist) / 3);
    points.topRight = points.origin.shift(0, measurements.frontHipArc);
    points.bottomRight = points.topRight.shift(-90, measurements.length);
  
    paths.waistCurve = new Path()
      .move(points.origin)
      ._curve(points.waistCp, points.rWaist)
      .setRender(false);
  
    // Dart points
    let waistlength = paths.waistCurve.length()/2;
    points.leftDartC = paths.waistCurve
      .shiftAlong(waistlength);
    points.leftDartR = paths.waistCurve
      .shiftAlong(waistlength + options.frontDartWidth/2);
    points.leftDartL = paths.waistCurve
      .shiftAlong(waistlength - options.frontDartWidth/2);
    points.leftDartPoint = points.leftDartC
      .shift(-90, options.frontLeftDartLength);

    //Dividing panels
    points.hemmid1 = new Point(points.origin.dx(points.leftDartPoint),points.origin.dy(points.lHem));
    points.leftDartPointnew = points.leftDartPoint.shift(0,20);
    points.leftDartR = points.leftDartR.shift(0,20);
    points.waistCp = points.waistCp.shift(0,20);
    points.rWaist = points.rWaist.shift(0,20);
    points.rHip = points.rHip.shift(0,20);
    points.rHem = points.rHem.shift(0,20);
    points.hemmid2 = points.hemmid1.shift(0,20);
    points.mark1 = points.hemmid1.shift(90,points.origin.dy(points.rHem)/3);
    points.mark1end = points.mark1.shift(180,12.5);
    paths.mark1 = new Path()
    .move(points.mark1)
    .line(points.mark1end);
    points.mark3 = points.leftDartL.shiftFractionTowards(points.leftDartPoint,1/3);
  
    paths.panel1 = new Path()
      .move(points.origin)
      .line(points.lHem)
      .line(points.hemmid1)
      .line(points.leftDartPoint)
      .line(points.leftDartL)
      .line(points.origin)

    paths.panel2 = new Path()
      .move(points.hemmid2)
      .line(points.rHem)
      
    paths.panel2outer = new Path()  
      .move(points.rWaist)
      .line(points.rHip)
      .line(points.rHem)

    paths.panel2waist = new Path()
      .move(points.rWaist)
      .curve_(points.waistCp,points.leftDartR)
      .line(points.leftDartPointnew)
      .line(points.hemmid2)
    points.mark2 = points.hemmid2.shiftTowards(points.leftDartPointnew,points.origin.dy(points.rHem)/3);
    points.mark2end = points.mark2.shift(0,12.5);
    paths.mark2 = new Path()
    .move(points.mark2)
    .line(points.mark2end);
    points.mark4 = points.leftDartR.shiftFractionTowards(points.leftDartPointnew,1/3);
    let slashgap = (points.mark2.dist(points.leftDartPointnew))/5;
//slash and spread on panel

   
  //copyting points
  points.slashstart1 = points.leftDartPointnew.shiftFractionTowards(points.mark4,0.5) ; 
  points.slashstart3 = points.leftDartPointnew.shiftTowards(points.mark2,slashgap);
  points.slashstart4 = points.slashstart3.shiftTowards(points.mark2,slashgap);
  points.slashstart5 = points.slashstart4.shiftTowards(points.mark2,slashgap);
  points.slashstart6 = points.slashstart5.shiftTowards(points.mark2,slashgap);
 
  points.slashend1 = points.slashstart1.copy();
  points.rotationcenter = points.origin.copy();

 /* for(let i=0; ;i++ )
  {
    
    points.rotationcenter = paths.panel2outer.shiftAlong(i);
    if(points.rotationcenter.dy(points.rWaist) == points.slashstart1.dy(points.rWaist))
      break;
  }
  /*let rotationangle = points.rightDartPoint.angle(points.rightDartL) - points.rightDartPoint.angle(points.rightDartR);

  //rotating
  points.slashend1 = points.slashend1.rotate(rotationangle,points.rotationcenter);
  points.rHemcopy = points.rHemcopy.rotate(rotationangle,points.rotationcenter);
  points.rHipcopy = points.rHipcopy.rotate(rotationangle,points.rotationcenter);
  points.cp2copy = points.cp2copy.rotate(rotationangle,points.rotationcenter);
  points.cp1copy = points.cp1copy.rotate(rotationangle,points.rotationcenter);
  points.rWaistcopy = points.rWaistcopy.rotate(rotationangle,points.rotationcenter);
  points.waistCpcopy = points.waistCpcopy.rotate(rotationangle,points.rotationcenter);
 

}*/
      
  
    
  
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